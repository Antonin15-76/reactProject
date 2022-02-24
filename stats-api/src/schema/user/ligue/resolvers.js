import { GeneralError, NotFoundError, UserInputError, HasChildrenError, UniqueError, CreateManyError, UpdateManyError, DeleteManyError, IsDefaultError, errorablePromiseHandler, DeleteCascadeError } from 'errors/'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { clearFromLoader, loadFromLoader } from 'server/dataloaders'
import { ObjectId } from 'mongodb'

const collectionName = 'user'

const schema = Joi.object({
    role: Joi.string().trim().required().label('role'),
    ligueName: Joi.string().trim().required().allow(null, '').label('lastName'),
    isAccepted: Joi.boolean().required().label('isAccepted'),
    isBan: Joi.boolean().required().label('isBan')
})

export const roleResolve = async (user, _, ctx) => user.lastName
export const ligueNameResolve = async (user, _, ctx) => user.firstName
export const isAcceptedResolve = async (user, _, ctx) => user.pseudo
export const isBanResolve = async (user, _, ctx) => user.password

export const acceptedResolve = async (root, { id }, ctx) => {
    if (!id) return null
    const user = await loadFromLoader(ctx.loaders.acceptedLoader, id)
    if (!user) throw new NotFoundError('Accepted not found', { userId: id })
    return user
}

export const acceptedsResolve = async (root, { input = {}, count = false }, ctx) => {
    const collection = await ctx.db.collection(collectionName)
    const datas = collection.find().toArray()
    // const { search = {}, sort = { name: 1 }, limit = 0, skip = 0 } = input
    // const aggregation = []
    // const { text } = search

    // if (text?.trim()) aggregation.push({ $match: { $text: { $search: text.trim().toLowerCase() } } })
    // if (count) {
    //   aggregation.push({ $count: 'count' })
    //   const res = await collection.aggregate(aggregation).next()
    // return res?.count ?? 0
    // }

    // aggregation.push({ $sort: text?.trim() ? { score: { $meta: 'textScore' }, ...sortInputToSortObject(sort) } : { ...sortInputToSortObject(sort) } })
    // if (skip) aggregation.push({ $skip: skip })
    // if (limit) aggregation.push({ $limit: limit })
    // return collection.aggregate(aggregation).toArray()
    return datas
}

const testValidity = async (doc, ctx) => {
    const objectToUser = {
        role: doc.role,
        ligueName: doc.ligueName,
        isAccepted: doc.isAccepted,
        isBan: doc.isBan
    }
    const result = schema.validate(objectToUser)
    if (result.error) throw new UserInputError('Validation Failed', { error: result.error })
    const findObj = { ligueName: doc.ligueName }
    if (doc._id) findObj._id = { $ne: doc._id }
    const userDocument = await ctx.db.collection(collectionName).findOne(findObj)
    if (userDocument) throw new UniqueError('', { value: doc, otherValue: userDocument })

    return userDocument
}

const preCreate = async (doc, ctx) => {
    return testValidity(doc, ctx)
}

const postCreate = async (id, ctx) => {
    return acceptedResolve(null, { id }, ctx)
}

export const createAcceptedResolve = async (root, { input }, ctx) => {
    const collection = await ctx.db.collection(collectionName)

    const objectToInsert = {
        role: input.role,
        ligueName: input.ligueName,
        isAccepted: input.isAccepted,
        isBan: input.isBan,
        // createdBy: ObjectId(ctx.currentUser),
        // updatedBy: ObjectId(ctx.currentUser),
        createdAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate(),
        updatedAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate()
    }

    try {
        const userDocument = await preCreate(objectToInsert, ctx)
        if (userDocument) postCreate(userDocument._id, ctx)
        const id = (await collection.insertOne(objectToInsert)).insertedId
        return postCreate(id, ctx)
    } catch (err) {
        if (err instanceof ApolloError) throw err
        throw new GeneralError(err.message, err)
    }
}

// UPDATE

const preUpdate = async (doc, ctx, bypassUnicity) => {
    return testValidity(doc, ctx, bypassUnicity)
}

const postUpdate = async (id, ctx) => {
    await clearFromLoader(ctx.loaders.userLoader, id)
    const user = await userResolve(null, { id }, ctx)
    return user
}

export const updateUserResolve = async (root, { id, input, bypassUnicity }, ctx) => {
    const collection = await ctx.db.collection(collectionName)
    const prevValue = await userResolve(null, { id }, ctx)
    const objectToUpdate = {
        ...prevValue,
        updatedBy: ObjectId(ctx.currentUser),
        updatedAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate()
    }

    if (input?.firstName) objectToUpdate.firstName = input.firstName

    if (input?.lastName) objectToUpdate.lastName = input.lastName

    if (input?.pseudo) objectToUpdate.pseudo = input.pseudo

    if (input?.password) objectToUpdate.password = input.password

    if (input?.email) objectToUpdate.email = input.email

    if (input?.ligue) {
        const ligueIds = []
        for (const ligue of input.ligue) {
            const ligueId = ligue.id || (await createLigueResolve(null, { input: ligue.input }, ctx))._id
            ligueIds.push(ligueId)
        }
        objectToUpdate.ligueIds = ligueIds
    }

    if (input?.ligueIds) objectToUpdate.ligueIds = input.ligueIds

    await preUpdate(objectToUpdate, ctx, bypassUnicity)

    try {
        await collection.updateOne({ _id: objectToUpdate._id }, { $set: { ...objectToUpdate } })
    } catch (err) {
        if (err instanceof ApolloError) throw err
        throw new GeneralError(err.message, err)
    }
    return postUpdate(id, ctx)
}

// Delete

const preDelete = async (id, ctx, forceDelete) => {
    const user = await materialResolve(null, { id }, ctx)
    if (!forceDelete) {
        const childPromises = []
        //   childPromises.push(errorablePromiseHandler(checkNumberOfMaterialBooking, material, ctx))
        const res = await Promise.allSettled(childPromises)
        const errors = res.filter(x => x.status === 'rejected').map(x => x.reason)
        if (errors.length) {
            throw new HasChildrenError('User has children', { ...errors.reduce((accu, x) => ({ ...accu, ...x }), {}) })
        }
    }
    return user
}

const postDelete = async (user, ctx, forceDelete = false) => {
    return user
}

export const deleteUserResolve = async (root, { id, forceDelete }, ctx) => {
    const collection = await ctx.db.collection(collectionName)
    const user = await preDelete(id, ctx, forceDelete)
    try {
        await collection.deleteOne({ _id: ObjectId(user._id) })
    } catch (err) {
        if (err instanceof ApolloError) throw err
        throw new GeneralError(err.message, err)
    }
    await postDelete(user, ctx, forceDelete)
    return user
}

export const deleteUsersResolve = async (root, { ids, forceDelete }, ctx) => {
    const deletePromises = ids.map(async id => deleteUserResolve(null, { id, forceDelete }, ctx))
    const res = await Promise.allSettled(deletePromises)
    const errors = res.filter(x => x.status === 'rejected').map(x => x.reason)
    if (errors.length > 0) {
        throw new DeleteManyError('', { errors })
    }
    const values = res.filter(x => x.status === 'fulfilled').map(x => x.value)
    return values
}
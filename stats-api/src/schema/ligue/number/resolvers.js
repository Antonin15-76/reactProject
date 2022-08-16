import { GeneralError, NotFoundError, UserInputError, HasChildrenError, UniqueError, CreateManyError, UpdateManyError, DeleteManyError, IsDefaultError, errorablePromiseHandler, DeleteCascadeError } from 'errors/'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { loadFromLoader } from 'server/dataloaders'
import { ObjectId } from 'mongodb'

const collectionName = 'leagueNumber'

const schema = Joi.object({
  number: Joi.number().required().label('numéro'),
  isAttributed: Joi.any().required().label('attribution')
})

export const numberResolve = async (leagueNumber, _, ctx) => leagueNumber.number
export const isAttributedResolve = async (leagueNumber, _, ctx) => {
  return leagueNumber.isAttributed
}

export const leagueNumbersResolve = async (root, { input = {}, count = false }, ctx) => {
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

export const leagueNumberResolve = async (root, { id }, ctx) => {
  if (!id) return null
  const leagueNumber = await loadFromLoader(ctx.loaders.leagueNumberLoader, id)
  if (!leagueNumber) throw new NotFoundError('Agency not found', { leagueNumberId: id })
  return leagueNumber
}

const leagueNumberValidity = async (doc, ctx) => {
  const objectToDriver = {
    number: doc.number,
    isAttributed: doc.isAttributed
  }

  const result = schema.validate(objectToDriver)
  if (result.error) throw new UserInputError('Validation Failed', { error: result.error })
  const findObj = { number: doc.number }
  if (doc._id) findObj._id = { $ne: doc._id }
  const leagueNumberDocument = await ctx.db.collection(collectionName).findOne(findObj)
  if (leagueNumberDocument) throw new UniqueError('', { value: doc, otherValue: leagueNumberDocument })

  return leagueNumberDocument
}

const preCreate = async (doc, ctx) => {
  return leagueNumberValidity(doc, ctx)
}

const postCreate = async (id, ctx) => {
  return leagueNumberResolve(null, { id }, ctx)
}

export const createLeagueNumberResolve = async (root, {input}, ctx) => {
  const collection = await ctx.db.collection(collectionName)

  const objectToInsert = {
    number: input.number,
    isAttributed: input.isAttributed,
    // createdBy: ObjectId(ctx.currentUser),
    // updatedBy: ObjectId(ctx.currentUser),
    createdAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate(),
    updatedAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate()
  }
  const leagueNumberDocument = await preCreate(objectToInsert, ctx)
  if (leagueNumberDocument) postCreate(leagueNumberDocument._id, ctx)
  let id
  try {
    id = (await collection.insertOne(objectToInsert)).insertedId
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new GeneralError(err.message, err)
  }
  return postCreate(id, ctx)
}

export const createAllNumberResolve = async (root, { input }, ctx) => {
  const collection = await ctx.db.collection(collectionName)
  const values = []
  const errors = []
  for (let i = 2; i < 100; i++) {
    const inputInsert = {
          number: i,
          isAttributed: []
      }
    try {
      const values = await createLeagueNumberResolve(null, { input: inputInsert }, ctx)
      values.push(values)
    } catch (err) {
      errors.push(err)
    }
  }
  return values
}

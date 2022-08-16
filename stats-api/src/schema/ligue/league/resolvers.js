import { GeneralError, NotFoundError, UserInputError, HasChildrenError, UniqueError, CreateManyError, UpdateManyError, DeleteManyError, IsDefaultError, errorablePromiseHandler, DeleteCascadeError } from 'errors/'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { loadFromLoader } from 'server/dataloaders'
import { ObjectId } from 'mongodb'

const collectionName = 'league'

const schema = Joi.object({
  name: Joi.string().required().label('name')
})

export const nameResolve = async (league, _, ctx) => league.name

export const leagueResolve = async (root, { id }, ctx) => {
  if (!id) return null
  const league = await loadFromLoader(ctx.loaders.leagueLoader, id)
  if (!league) throw new NotFoundError('league not found', { leagueId: id })
  return league
}

export const leaguesResolve = async (root, { input = {}, count = false }, ctx) => {
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

const leagueValidity = async (doc, ctx) => {
  const objectToDriver = {
    name: doc.name
  }

  const result = schema.validate(objectToDriver)
  if (result.error) throw new UserInputError('Validation Failed', { error: result.error })
  const findObj = { name: doc.name }
  if (doc._id) findObj._id = { $ne: doc._id }
  const driverDocument = await ctx.db.collection(collectionName).findOne(findObj)
  if (driverDocument) throw new UniqueError('', { value: doc, otherValue: driverDocument })

  return driverDocument
}

const preCreate = async (doc, ctx) => {
  return leagueValidity(doc, ctx)
}

const postCreate = async (id, ctx) => {
  return leagueResolve(null, { id }, ctx)
}

export const createLeagueResolve = async (root, {input}, ctx) => {
  const collection = await ctx.db.collection(collectionName)

  const objectToInsert = {
    name: input.name,
    // createdBy: ObjectId(ctx.currentUser),
    // updatedBy: ObjectId(ctx.currentUser),
    createdAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate(),
    updatedAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate()
  }

  const driverDocument = await preCreate(objectToInsert, ctx)
  if (driverDocument) postCreate(driverDocument._id, ctx)
  let id
  try {
    id = (await collection.insertOne(objectToInsert)).insertedId
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new GeneralError(err.message, err)
  }
  return postCreate(id, ctx)
}

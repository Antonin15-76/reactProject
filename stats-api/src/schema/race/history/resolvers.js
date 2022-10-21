import { GeneralError, NotFoundError, UserInputError, HasChildrenError, UniqueError, CreateManyError, UpdateManyError, DeleteManyError, IsDefaultError, errorablePromiseHandler, DeleteCascadeError } from 'errors/'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { loadFromLoader } from 'server/dataloaders'
import { ObjectId } from 'mongodb'

const collectionName = 'history'

const schema = Joi.object({
  year: Joi.number().required().label('année'),
  text: Joi.string().required().label('texte'),
  race: Joi.any().required().label('circuit')
})

export const yearResolve = async (history, _, ctx) => history.year
export const textResolve = async (history, _, ctx) => history.text
export const raceResolve = async (history, _, ctx) => history.race

export const historyResolve = async (root, { id }, ctx) => {
  if (!id) return null
  console.log(ctx.loaders)
  const history = await loadFromLoader(ctx.loaders.historyLoader, id)
  if (!history) throw new NotFoundError('History not found', { historyId: id })
  return history
}

export const historysResolve = async (root, { input = {}, count = false }, ctx) => {
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
  const objectToHistory = {
    year: doc.year,
    text: doc.text,
    race: doc.race
  }
  const result = schema.validate(objectToHistory)
  if (result.error) throw new UserInputError('Validation Failed', { error: result.error })
  const findObj = { name: doc.name }
  if (doc._id) findObj._id = { $ne: doc._id }
  const historyDocument = await ctx.db.collection(collectionName).findOne(findObj)
  if (historyDocument) throw new UniqueError('', { value: doc, otherValue: historyDocument })

  return historyDocument
}

const preCreate = async (doc, ctx) => {
  return testValidity(doc, ctx)
}

const postCreate = async (id, ctx) => {
  return historyResolve(null, { id }, ctx)
}

export const createHistoryResolve = async (root, {input}, ctx) => {
  const collection = await ctx.db.collection(collectionName)

  const objectToInsert = {
    year: input.year,
    text: input.text,
    race: input.race,
    // createdBy: ObjectId(ctx.currentUser),
    // updatedBy: ObjectId(ctx.currentUser),
    createdAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate(),
    updatedAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate()
  }
  const historyDocument = await preCreate(objectToInsert, ctx)
  if (historyDocument) postCreate(historyDocument._id, ctx)
  let id
  try {
    id = (await collection.insertOne(objectToInsert)).insertedId
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new GeneralError(err.message, err)
  }
  return postCreate(id, ctx)
}

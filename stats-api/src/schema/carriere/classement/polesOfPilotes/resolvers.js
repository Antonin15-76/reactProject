import { GeneralError, NotFoundError, UserInputError, HasChildrenError, UniqueError, CreateManyError, UpdateManyError, DeleteManyError, IsDefaultError, errorablePromiseHandler, DeleteCascadeError } from 'errors/'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { loadFromLoader } from 'server/dataloaders'
import { ObjectId } from 'mongodb'

const collectionName = 'poleCarrer'

const schema = Joi.object({
  year: Joi.number().required().label('année'),
  driver: Joi.any().required().label('vainqueur'),
  team: Joi.any().required().label('écurie'),
  race: Joi.any().required().label('circuit'),
})

export const yearResolve = async (poleCarrer, _, ctx) => poleCarrer.year
export const driverResolve = async (poleCarrer, _, ctx) => poleCarrer.driver
export const teamResolve = async (poleCarrer, _, ctx) => poleCarrer.team
export const raceResolve = async (poleCarrer, _, ctx) => poleCarrer.race

export const poleCarrerResolve = async (root, { id }, ctx) => {
  if (!id) return null
  console.log(ctx.loaders)
  const poleCarrer = await loadFromLoader(ctx.loaders.poleCarrerLoader, id)
  if (!poleCarrer) throw new NotFoundError('PoleCarrer not found', { poleCarrerId: id })
  return poleCarrer
}

export const poleCarrersResolve = async (root, { input = {}, count = false }, ctx) => {
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

const poleCarrerValidity = async (doc, ctx) => {
  const objectToPoleCarrer = {
    year: doc.year,
    driver: doc.driver,
    race: doc.race,
    team: doc.team,
  }
  const result = schema.validate(objectToPoleCarrer)
  if (result.error) throw new UserInputError('Validation Failed', { error: result.error })
  const findObj = { name: doc.name }
  if (doc._id) findObj._id = { $ne: doc._id }
  const poleCarrerDocument = await ctx.db.collection(collectionName).findOne(findObj)
  if (poleCarrerDocument) throw new UniqueError('', { value: doc, otherValue: poleCarrerDocument })

  return poleCarrerDocument
}

const preCreate = async (doc, ctx) => {
  return poleCarrerValidity(doc, ctx)
}

const postCreate = async (id, ctx) => {
  return poleCarrerResolve(null, { id }, ctx)
}

export const createPoleCarrerResolve = async (root, {input}, ctx) => {
  const collection = await ctx.db.collection(collectionName)

  const objectToInsert = {
    year: input.year,
    race: input.race,
    team: input.team,
    driver: input.driver,
    // createdBy: ObjectId(ctx.currentUser),
    // updatedBy: ObjectId(ctx.currentUser),
    createdAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate(),
    updatedAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate()
  }
  const poleCarrerDocument = await preCreate(objectToInsert, ctx)
  if (poleCarrerDocument) postCreate(poleCarrerDocument._id, ctx)
  let id
  try {
    id = (await collection.insertOne(objectToInsert)).insertedId
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new GeneralError(err.message, err)
  }
  return postCreate(id, ctx)
}

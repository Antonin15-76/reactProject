import { GeneralError, NotFoundError, UserInputError, HasChildrenError, UniqueError, CreateManyError, UpdateManyError, DeleteManyError, IsDefaultError, errorablePromiseHandler, DeleteCascadeError } from 'errors/'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { loadFromLoader } from 'server/dataloaders'
import { ObjectId } from 'mongodb'

const collectionName = 'season'

const schema = Joi.object({
  year: Joi.number().required().label('année'),
  driver: Joi.any().required().label('vainqueur'),
  team: Joi.any().required().label('écurie'),
  race: Joi.any().required().label('circuit'),
  position: Joi.number().required().label('année'),
  points: Joi.any().required().label('vainqueur'),
  isBestTime: Joi.any().required().label('écurie'),
  bestTime: Joi.any().required().label('circuit')
})

export const yearResolve = async (season, _, ctx) => season.year
export const driverResolve = async (season, _, ctx) => season.driver
export const teamResolve = async (season, _, ctx) => season.team
export const raceResolve = async (season, _, ctx) => season.race
export const positionResolve = async (season, _, ctx) => season.position
export const pointsResolve = async (season, _, ctx) => season.points
export const isBestTimeResolve = async (season, _, ctx) => season.isBestTime
export const bestTimeResolve = async (season, _, ctx) => season.bestTime

export const seasonResolve = async (root, { id }, ctx) => {
  if (!id) return null
  console.log(ctx.loaders)
  const season = await loadFromLoader(ctx.loaders.seasonLoader, id)
  if (!season) throw new NotFoundError('Season not found', { seasonId: id })
  return season
}

export const seasonsResolve = async (root, { input = {}, count = false }, ctx) => {
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

const seasonValidity = async (doc, ctx) => {
  const objectToSeason = {
    year: doc.year,
    driver: doc.driver,
    race: doc.race,
    team: doc.team,
    position: doc.position,
    points: doc.points,
    isBestTime: doc.isBestTime,
    bestTime: doc.bestTime,
  }
  const result = schema.validate(objectToSeason)
  if (result.error) throw new UserInputError('Validation Failed', { error: result.error })
  const findObj = { name: doc.name }
  if (doc._id) findObj._id = { $ne: doc._id }
  const seasonDocument = await ctx.db.collection(collectionName).findOne(findObj)
  if (seasonDocument) throw new UniqueError('', { value: doc, otherValue: seasonDocument })

  return seasonDocument
}

const preCreate = async (doc, ctx) => {
  return seasonValidity(doc, ctx)
}

const postCreate = async (id, ctx) => {
  return seasonResolve(null, { id }, ctx)
}

export const createSeasonResolve = async (root, {input}, ctx) => {
  const collection = await ctx.db.collection(collectionName)

  const objectToInsert = {
    year: input.year,
    race: input.race,
    team: input.team,
    driver: input.driver,
    position: input.position,
    points: input.points,
    isBestTime: input.isBestTime,
    bestTime: input.bestTime,
    // createdBy: ObjectId(ctx.currentUser),
    // updatedBy: ObjectId(ctx.currentUser),
    createdAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate(),
    updatedAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate()
  }
  const seasonDocument = await preCreate(objectToInsert, ctx)
  if (seasonDocument) postCreate(seasonDocument._id, ctx)
  let id
  try {
    id = (await collection.insertOne(objectToInsert)).insertedId
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new GeneralError(err.message, err)
  }
  return postCreate(id, ctx)
}

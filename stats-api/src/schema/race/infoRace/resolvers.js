import { GeneralError, NotFoundError, UserInputError, HasChildrenError, UniqueError, CreateManyError, UpdateManyError, DeleteManyError, IsDefaultError, errorablePromiseHandler, DeleteCascadeError } from 'errors/'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { loadFromLoader } from 'server/dataloaders'
import { ObjectId } from 'mongodb'

const collectionName = 'race'

const schema = Joi.object({
  name: Joi.number().required().label('nom'),
  country: Joi.any().required().label('pays'),
  openDate: Joi.any().required().label('écurie'),
  sens: Joi.any().required().label('circuit'),
  capacity: Joi.number().required().label('année'),
  long: Joi.any().required().label('vainqueur'),
  nbTurn: Joi.any().required().label('écurie'),
  bestTimePole: Joi.any().required().label('circuit'),
  piloteBestTimePole: Joi.number().required().label('année'),
  teamBestTimePole: Joi.any().required().label('vainqueur'),
  yearBestTimePole: Joi.any().required().label('écurie'),
  bestTimeRace: Joi.any().required().label('circuit'),
  piloteBestTimeRace: Joi.any().required().label('circuit'),
  teamBestTimeRace: Joi.any().required().label('vainqueur'),
  yearBestTimeRace: Joi.any().required().label('écurie'),
  nbLap: Joi.any().required().label('circuit'),
  palmares: Joi.any().required().label('circuit'),
  history: Joi.any().required().label('circuit'),
})

export const nameResolve = async (race, _, ctx) => race.name
export const countryResolve = async (race, _, ctx) => race.country
export const openDateResolve = async (race, _, ctx) => race.openDate
export const sensResolve = async (race, _, ctx) => race.sens
export const capacityResolve = async (race, _, ctx) => race.capacity
export const longResolve = async (race, _, ctx) => race.long
export const nbTurnResolve = async (race, _, ctx) => race.nbTurn
export const bestTimePoleResolve = async (race, _, ctx) => race.bestTimePole
export const piloteBestTimePoleResolve = async (race, _, ctx) => race.piloteBestTimePole
export const teamBestTimePoleResolve = async (race, _, ctx) => race.teamBestTimePole
export const yearBestTimePoleResolve = async (race, _, ctx) => race.yearBestTimePole
export const piloteBestTimeRaceResolve = async (race, _, ctx) => race.piloteBestTimeRace
export const teamBestTimeRaceResolve = async (race, _, ctx) => race.teamBestTimeRace
export const yearBestRaceTimeResolve = async (race, _, ctx) => race.yearBestTimeRace
export const nbLapResolve = async (race, _, ctx) => race.nbLap
export const palmaresResolve = async (race, _, ctx) => race.palmares
export const historyResolve = async (race, _, ctx) => race.history

export const raceResolve = async (root, { id }, ctx) => {
  if (!id) return null
  console.log(ctx.loaders)
  const race = await loadFromLoader(ctx.loaders.raceLoader, id)
  if (!race) throw new NotFoundError('Race not found', { raceId: id })
  return race
}

export const racesResolve = async (root, { input = {}, count = false }, ctx) => {
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
  const objectToRace = {
    year: doc.year,
    country: doc.country,
    openDate: doc.openDate,
    sens: doc.sens,
    capacity: doc.capacity,
    long: doc.long,
    nbTurn: doc.nbTurn,
    bestTimePole: doc.bestTimePole,
    piloteBestTimePole: doc.piloteBestTimePole,
    teamBestTimePole: doc.teamBestTimePole,
    yearBestTimePole: doc.yearBestTimePole,
    piloteBestTimeRace: doc.piloteBestTimeRace,
    teamBestTimeRace: doc.teamBestTimeRace,
    yearBestTimeRace: doc.yearBestTimeRace,
    nbLap: doc.nbLap,
    palmares: doc.palmares,
    history: doc.history
  }
  const result = schema.validate(objectToRace)
  if (result.error) throw new UserInputError('Validation Failed', { error: result.error })
  const findObj = { name: doc.name }
  if (doc._id) findObj._id = { $ne: doc._id }
  const raceDocument = await ctx.db.collection(collectionName).findOne(findObj)
  if (raceDocument) throw new UniqueError('', { value: doc, otherValue: raceDocument })

  return raceDocument
}

const preCreate = async (doc, ctx) => {
  return testValidity(doc, ctx)
}

const postCreate = async (id, ctx) => {
  return raceResolve(null, { id }, ctx)
}

export const createRaceResolve = async (root, {input}, ctx) => {
  const collection = await ctx.db.collection(collectionName)

  const objectToInsert = {
    year: input.year,
    country: input.country,
    openDate: input.openDate,
    sens: input.sens,
    capacity: input.capacity,
    long: input.long,
    nbTurn: input.nbTurn,
    bestTimePole: input.bestTimePole,
    piloteBestTimePole: input.piloteBestTimePole,
    teamBestTimePole: input.teamBestTimePole,
    yearBestTimePole: input.yearBestTimePole,
    piloteBestTimeRace: input.piloteBestTimeRace,
    teamBestTimeRace: input.teamBestTimeRace,
    yearBestTimeRace: input.yearBestTimeRace,
    nbLap: input.nbLap,
    palmares: input.palmares,
    history: input.history,
    // createdBy: ObjectId(ctx.currentUser),
    // updatedBy: ObjectId(ctx.currentUser),
    createdAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate(),
    updatedAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate()
  }
  const raceDocument = await preCreate(objectToInsert, ctx)
  if (raceDocument) postCreate(raceDocument._id, ctx)
  let id
  try {
    id = (await collection.insertOne(objectToInsert)).insertedId
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new GeneralError(err.message, err)
  }
  return postCreate(id, ctx)
}

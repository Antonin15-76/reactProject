import { GeneralError, NotFoundError, UserInputError, HasChildrenError, UniqueError, CreateManyError, UpdateManyError, DeleteManyError, IsDefaultError, errorablePromiseHandler, DeleteCascadeError } from 'errors/'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { loadFromLoader } from 'server/dataloaders'
import { ObjectId } from 'mongodb'

const collectionName = 'leagueDriver'

const schema = Joi.object({
  pseudo: Joi.string().required().label('pseudo'),
  nationality: Joi.string().required().label('nationalité'),
  number: Joi.number().required().label('numéro'),
  teamActual: Joi.any().required().label('team actuelle'),
  actualLeague: Joi.any().required().label('ligue actuelle'),
  birthDate: Joi.date().required().label('date de naissance'),
  numberVictory: Joi.number().required().label('nombre de victoire'),
  numberPodium: Joi.number().required().label('nombre de podium'),
  numberPole: Joi.number().required().label('nombre de pole'),
  numberTitlePilote: Joi.number().required().label('nombre titre de pole'),
  seasonTitle: Joi.any().required().label('saisons de titre')
})

export const pseudoResolve = async (leagueDriver, _, ctx) => leagueDriver.pseudo
export const nationalityResolve = async (leagueDriver, _, ctx) => leagueDriver.nationality
export const numberResolve = async (leagueDriver, _, ctx) => leagueDriver.number
export const teamActualResolve = async (leagueDriver, _, ctx) => leagueDriver.teamActual
export const actualLeagueResolve = async (leagueDriver, _, ctx) => leagueDriver.actualLeague
export const birthDateResolve = async (leagueDriver, _, ctx) => leagueDriver.birthDate
export const numberVictoryResolve = async (leagueDriver, _, ctx) => leagueDriver.numberVictory
export const numberPodiumResolve = async (leagueDriver, _, ctx) => leagueDriver.numberPodium
export const numberPoleResolve = async (leagueDriver, _, ctx) => leagueDriver.numberPole
export const numberTitlePiloteResolve = async (leagueDriver, _, ctx) => leagueDriver.numberTitlePilote
export const numberLapResolve = async (leagueDriver, _, ctx) => leagueDriver.numberLap
export const seasonTitleResolve = async (leagueDriver, _, ctx) => leagueDriver.seasonTitle

export const driverResolve = async (root, { id }, ctx) => {
  if (!id) return null
  console.log(ctx.loaders)
  const leagueDriver = await loadFromLoader(ctx.loaders.leagueDriverLoader, id)
  if (!leagueDriver) throw new NotFoundError('leagueDriver not found', { leagueDriverId: id })
  return leagueDriver
}

export const leagueDriversResolve = async (root, { input = {}, count = false }, ctx) => {
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

const leagueDriverValidity = async (doc, ctx) => {
  const objectToDriver = {
    pseudo: doc.pseudo,
    nationality: doc.nationality,
    number: doc.number,
    teamActual: doc.teamActual,
    actualLeague: doc.actualLeague,
    birthDate: doc.birthDate,
    numberVictory: doc.numberVictory,
    numberPodium: doc.numberPodium,
    numberPole: doc.numberPole,
    numberTitlePilote: doc.numberTitlePilote,
    seasonTitle: doc.seasonTitle
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
  return leagueDriverValidity(doc, ctx)
}

const postCreate = async (id, ctx) => {
  return leagueDriverResolve(null, { id }, ctx)
}

export const createLeagueDriverResolve = async (root, {input}, ctx) => {
  const collection = await ctx.db.collection(collectionName)

  const objectToInsert = {
    pseudo: input.pseudo,
    nationality: input.nationality,
    number: input.number,
    teamActual: input.teamActual,
    actualLeague: input.actualLeague,
    birthDate: input.birthDate,
    numberVictory: input.numberVictory,
    numberPodium: input.numberPodium,
    numberPole: input.numberPole,
    numberTitlePilote: input.numberTitlePilote,
    seasonTitle: input.yearsTitle,
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

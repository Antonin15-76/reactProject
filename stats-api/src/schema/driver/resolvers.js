import { GeneralError, NotFoundError, UserInputError, HasChildrenError, UniqueError, CreateManyError, UpdateManyError, DeleteManyError, IsDefaultError, errorablePromiseHandler, DeleteCascadeError } from 'errors/'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { loadFromLoader } from 'server/dataloaders'
import { ObjectId } from 'mongodb'

const collectionName = 'driver'

const schema = Joi.object({
  firstName: Joi.string().required().label('prenom'),
  lastName: Joi.string().required().label('nom de famille'),
  nationality: Joi.string().required().label('nationalité'),
  number: Joi.number().required().label('numéro'),
  teamActual: Joi.any().required().label('team actuelle'),
  birthDate: Joi.date().required().label('date de naissance'),
  tall: Joi.number().required().label('taille'),
  numberVictory: Joi.number().required().label('nombre de victoire'),
  numberPodium: Joi.number().required().label('nombre de podium'),
  numberPole: Joi.number().required().label('nombre de pole'),
  numberTitlePilote: Joi.number().required().label('nombre titre de pole'),
  numberLap: Joi.number().required().label('nombre de tour'),
  yearsTitle: Joi.any().required().label('année de titre'),
  startCarrer: Joi.date().required().label('début de carrière'),
  endCarrer: Joi.date().required().label('fin de carrière'),
  otherTeam: Joi.any().required().label('autre écuries'),
})

export const firstNameResolve = async (driver, _, ctx) => driver.firstName
export const lastNameResolve = async (driver, _, ctx) => driver.lastName
export const nationalityResolve = async (driver, _, ctx) => driver.nationality
export const numberResolve = async (driver, _, ctx) => driver.number
export const teamActualResolve = async (driver, _, ctx) => driver.teamActual
export const birthDateResolve = async (driver, _, ctx) => driver.birthDate
export const tallResolve = async (driver, _, ctx) => driver.tall
export const numberVictoryResolve = async (driver, _, ctx) => driver.numberVictory
export const numberPodiumResolve = async (driver, _, ctx) => driver.numberPodium
export const numberPoleResolve = async (driver, _, ctx) => driver.numberPole
export const numberTitlePiloteResolve = async (driver, _, ctx) => driver.numberTitlePilote
export const numberLapResolve = async (driver, _, ctx) => driver.numberLap
export const yearsTitleResolve = async (driver, _, ctx) => driver.yearsTitle
export const startCarrerResolve = async (driver, _, ctx) => driver.startCarrer
export const endCarrerResolve = async (driver, _, ctx) => driver.endCarrer
export const otherTeamResolve = async (driver, _, ctx) => driver.otherTeam

export const driverResolve = async (root, { id }, ctx) => {
  if (!id) return null
  console.log(ctx.loaders)
  const driver = await loadFromLoader(ctx.loaders.driverLoader, id)
  if (!driver) throw new NotFoundError('Driver not found', { driverId: id })
  return driver
}

export const driversResolve = async (root, { input = {}, count = false }, ctx) => {
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

const driverValidity = async (doc, ctx) => {
  const objectToDriver = {
    firstName: doc.firstName,
    lastName: doc.lastName,
    nationality: doc.nationality,
    number: doc.number,
    teamActual: doc.teamActual,
    birthDate: doc.birthDate,
    tall: doc.tall,
    numberVictory: doc.numberVictory,
    numberPodium: doc.numberPodium,
    numberPole: doc.numberPole,
    numberTitlePilote: doc.numberTitlePilote,
    numberLap: doc.numberLap,
    yearsTitle: doc.yearsTitle,
    startCarrer: doc.startCarrer,
    endCarrer: doc.endCarrer,
    otherTeam: doc.otherTeam
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
  return driverValidity(doc, ctx)
}

const postCreate = async (id, ctx) => {
  return driverResolve(null, { id }, ctx)
}

export const createDriverResolve = async (root, {input}, ctx) => {
  const collection = await ctx.db.collection(collectionName)

  const objectToInsert = {
    firstName: input.firstName,
    lastName: input.lastName,
    nationality: input.nationality,
    number: input.number,
    teamActual: input.teamActual,
    birthDate: input.birthDate,
    tall: input.tall,
    numberVictory: input.numberVictory,
    numberPodium: input.numberPodium,
    numberPole: input.numberPole,
    numberTitlePilote: input.numberTitlePilote,
    numberLap: input.numberLap,
    yearsTitle: input.yearsTitle,
    startCarrer: input.startCarrer,
    endCarrer: input.endCarrer,
    otherTeam: input.otherTeam,
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

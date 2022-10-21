import { GeneralError, NotFoundError, UserInputError, HasChildrenError, UniqueError, CreateManyError, UpdateManyError, DeleteManyError, IsDefaultError, errorablePromiseHandler, DeleteCascadeError } from 'errors/'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { loadFromLoader } from 'server/dataloaders'
import { ObjectId } from 'mongodb'

const collectionName = 'team'

const schema = Joi.object({
  name: Joi.string().required().label('nom'),
  nationality: Joi.string().required().label('nationalité'),
  start: Joi.number().required().label('début'),
  end: Joi.any().required().label('fin'),
  drivers: Joi.date().required().label('pilotes'),
  numberTitleConstructor: Joi.number().required().label('nombre de titre constructeur'),
  numberVictory: Joi.number().required().label('nombre de victoire'),
  numberPodium: Joi.number().required().label('nombre de podium'),
  numberPole: Joi.number().required().label('nombre de pole'),
  numberTitlePilote: Joi.number().required().label('nombre titre de pole'),
  numberLap: Joi.number().required().label('nombre de tour'),
  yearsTitlePilote: Joi.any().required().label('année des titres pilotes'),
  yearsTitleConstructor: Joi.date().required().label('année des titres constructeurs')
})

export const nameResolve = async (team, _, ctx) => team.name
export const nationalityResolve = async (team, _, ctx) => team.nationality
export const startResolve = async (team, _, ctx) => team.start
export const endResolve = async (team, _, ctx) => team.end
export const driversResolve = async (team, _, ctx) => team.drivers
export const numberTitleConstructorResolve = async (team, _, ctx) => team.numberTitleConstructor
export const numberVictoryResolve = async (team, _, ctx) => team.numberVictory
export const numberPodiumResolve = async (team, _, ctx) => team.numberPodium
export const numberPoleResolve = async (team, _, ctx) => team.numberPole
export const numberTitlePiloteResolve = async (team, _, ctx) => team.numberTitlePilote
export const numberLapResolve = async (team, _, ctx) => team.numberLap
export const yearsTitlePiloteResolve = async (team, _, ctx) => team.yearsTitle
export const yearsTitleConstructorResolve = async (team, _, ctx) => team.yearsTitleConstructor

export const teamResolve = async (root, { id }, ctx) => {
  if (!id) return null
  console.log(ctx.loaders)
  const team = await loadFromLoader(ctx.loaders.teamLoader, id)
  if (!team) throw new NotFoundError('Team not found', { teamId: id })
  return team
}

export const teamsResolve = async (root, { input = {}, count = false }, ctx) => {
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

const teamValidity = async (doc, ctx) => {
  const objectToTeam = {
    name: doc.name,
    nationality: doc.nationality,
    start: doc.start,
    end: doc.end,
    drivers: doc.drivers,
    numberTitleConstructor: doc.numberTitleConstructor,
    numberVictory: doc.numberVictory,
    numberPodium: doc.numberPodium,
    numberPole: doc.numberPole,
    numberTitlePilote: doc.numberTitlePilote,
    numberLap: doc.numberLap,
    yearsTitle: doc.yearsTitle,
    yearsTitleConstructor: doc.yearsTitleConstructor
  }

  const result = schema.validate(objectToTeam)
  if (result.error) throw new UserInputError('Validation Failed', { error: result.error })
  const findObj = { name: doc.name }
  if (doc._id) findObj._id = { $ne: doc._id }
  const teamDocument = await ctx.db.collection(collectionName).findOne(findObj)
  if (teamDocument) throw new UniqueError('', { value: doc, otherValue: teamDocument })

  return teamDocument
}

const preCreate = async (doc, ctx) => {
  return teamValidity(doc, ctx)
}

const postCreate = async (id, ctx) => {
  return teamResolve(null, { id }, ctx)
}

export const createTeamResolve = async (root, {input}, ctx) => {
  const collection = await ctx.db.collection(collectionName)

  const objectToInsert = {
    name: input.name,
    nationality: input.nationality,
    start: input.start,
    end: input.end,
    drivers: input.drivers,
    numberTitleConstructor: input.numberTitleConstructor,
    numberVictory: input.numberVictory,
    numberPodium: input.numberPodium,
    numberPole: input.numberPole,
    numberTitlePilote: input.numberTitlePilote,
    numberLap: input.numberLap,
    yearsTitle: input.yearsTitle,
    yearsTitleConstructor: input.yearsTitleConstructor,
    // createdBy: ObjectId(ctx.currentUser),
    // updatedBy: ObjectId(ctx.currentUser),
    createdAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate(),
    updatedAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate()
  }
  const teamDocument = await preCreate(objectToInsert, ctx)
  if (teamDocument) postCreate(teamDocument._id, ctx)
  let id
  try {
    id = (await collection.insertOne(objectToInsert)).insertedId
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new GeneralError(err.message, err)
  }
  return postCreate(id, ctx)
}

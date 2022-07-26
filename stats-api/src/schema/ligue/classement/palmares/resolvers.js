import { GeneralError, NotFoundError, UserInputError, HasChildrenError, UniqueError, CreateManyError, UpdateManyError, DeleteManyError, IsDefaultError, errorablePromiseHandler, DeleteCascadeError } from 'errors/'
import Joi from 'joi'
import { DateTime } from 'luxon'
import { loadFromLoader } from 'server/dataloaders'
import { ObjectId } from 'mongodb'

const collectionName = 'palmaresLeague'

const schema = Joi.object({
  season: Joi.number().required().label('saison'),
  driver: Joi.any().required().label('vainqueur'),
  team: Joi.any().required().label('écurie'),
  race: Joi.any().required().label('circuit'),
})

export const seasonResolve = async (palmaresLeague, _, ctx) => palmaresLeague.season
export const driverResolve = async (palmaresLeague, _, ctx) => palmaresLeague.driver
export const teamResolve = async (palmaresLeague, _, ctx) => palmaresLeague.team
export const raceResolve = async (palmaresLeague, _, ctx) => palmaresLeague.race

export const palmaresLeagueResolve = async (root, { id }, ctx) => {
  if (!id) return null
  console.log(ctx.loaders)
  const palmaresLeague = await loadFromLoader(ctx.loaders.palmaresLeagueLoader, id)
  if (!palmaresLeague) throw new NotFoundError('PalmaresLeague not found', { palmaresLeagueId: id })
  return palmaresLeague
}

export const palmaresLeaguesResolve = async (root, { input = {}, count = false }, ctx) => {
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

const palmaresLeagueValidity = async (doc, ctx) => {
  const objectToPalmaresLeague = {
    season: doc.season,
    driver: doc.driver,
    race: doc.race,
    team: doc.team,
  }
  const result = schema.validate(objectToPalmaresLeague)
  if (result.error) throw new UserInputError('Validation Failed', { error: result.error })
  const findObj = { name: doc.name }
  if (doc._id) findObj._id = { $ne: doc._id }
  const palmaresLeagueDocument = await ctx.db.collection(collectionName).findOne(findObj)
  if (palmaresLeagueDocument) throw new UniqueError('', { value: doc, otherValue: palmaresLeagueDocument })

  return palmaresLeagueDocument
}

const preCreate = async (doc, ctx) => {
  return palmaresLeagueValidity(doc, ctx)
}

const postCreate = async (id, ctx) => {
  return palmaresLeagueResolve(null, { id }, ctx)
}

export const createPalmaresLeagueResolve = async (root, {input}, ctx) => {
  const collection = await ctx.db.collection(collectionName)

  const objectToInsert = {
    season: input.season,
    race: input.race,
    team: input.team,
    driver: input.driver,
    // createdBy: ObjectId(ctx.currentUser),
    // updatedBy: ObjectId(ctx.currentUser),
    createdAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate(),
    updatedAt: DateTime.local().setZone(ctx.timeZone).toUTC().toJSDate()
  }
  const palmaresLeagueDocument = await preCreate(objectToInsert, ctx)
  if (palmaresLeagueDocument) postCreate(palmaresLeagueDocument._id, ctx)
  let id
  try {
    id = (await collection.insertOne(objectToInsert)).insertedId
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new GeneralError(err.message, err)
  }
  return postCreate(id, ctx)
}

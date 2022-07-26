
import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { Driver, DriverInput } from "schema/driver"
import { objIdArg } from "schema/globalNexusTypes"
import { Race, RaceInput } from "schema/race/infoRace"
import { Team, TeamInput } from "schema/team"
import * as resolvers from "./resolvers"

export const Season = objectType({
  name: 'Season',
  definition (t) {
    t.implements('Node')
    t.int('year', { nullable: false, resolve: resolvers.yearResolve })
    t.objID('driver', { type: Driver, nullable: false, resolve: resolvers.driverResolve })
    t.objID('team', { type: Team, nullable: false, resolve: resolvers.teamResolve })
    t.objID('race', { type: Race, nullable: false, resolve: resolvers.raceResolve })
    t.int('position', { nullable: false, resolve: resolvers.positionResolve })
    t.int('points', { nullable: false, resolve: resolvers.pointsResolve })
    t.boolean('isBestTime', { nullable: false, resolve: resolvers.isBestTimeResolve })
    t.time('bestTime', { nullable: false, resolve: resolvers.bestTimeResolve })
  }
})

// QUERIES

// export const SeasonArgumentInput = inputObjectType({
//   name: 'SeasonArgumentInput',
//   description: 'Input des arguments pour requêter les seasonAttribution',
//   definition (t) {
//     t.int('limit', { description: 'Nombre de season à récupérer', nullable: true })
//     t.int('skip', { description: "Nombre de season à passer avant d'appliquer la limite", nullable: true })
//   }
// })

export const seasonQueryField = queryField('season', {
  type: Season,
  nullable: false,
  description: 'recupérer season par ID',
  args: { id: objIdArg({ description: 'ID de Season', nullable: false }) },
  resolve: resolvers.seasonResolve
})

// export const seasonsQueryField = queryField('seasons', {
//   list: true,
//   type: Season,
//   nullable: false,
//   description: 'recupérer la liste des seasons',
//   args: { input: arg({ type: SeasonArgumentInput, nullable: true }) },
//   resolve: resolvers.seasonsResolve
// })

// MUTATION

export const CreateSeasonInput = inputObjectType({
  name: 'CreateSeasonInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.int('year', { nullable: false })
    t.objID('driver', { type: DriverInput, nullable: false })
    t.objID('team', { type: TeamInput, nullable: false })
    t.objID('race', { type: RaceInput, nullable: false })
    t.int('position', { nullable: false })
    t.int('points', { nullable: false })
    t.boolean('isBestTime', { nullable: false })
    t.time('bestTime', { nullable: false })
  }
})

export const createSeasonMutationField = mutationField('createSeason', {
  type: Season,
  nullable: false,
  args: { input: arg({ type: CreateSeasonInput, nullable: true }) },
  resolve: resolvers.createSeasonResolve
})

//UPDATE

export const UpdateSeasonInput = inputObjectType({
    name: 'UpdateSeasonInput',
    nullable: false,
    description: 'Input de modification de season',
    definition (t) {
      t.int('year', { nullable: false })
      t.objID('driver', { type: DriverInput, nullable: false })
      t.objID('team', { type: TeamInput, nullable: false })
      t.objID('race', { type: RaceInput, nullable: false })
      t.int('position', { nullable: false })
      t.int('points', { nullable: false })
      t.boolean('isBestTime', { nullable: false })
      t.time('bestTime', { nullable: false })
    }
  })
  
  export const UpdateSeasonMutationField = mutationField('updateSeason', {
    type: Season,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdateSeasonInput, nullable: false }) },
    resolve: resolvers.updateSeasonResolve
  })

  // DELETE

export const deleteSeasonMutationField = mutationField('deleteSeason', {
    type: Season,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: resolvers.deleteSeasonResolve
  })
  
//   export const deleteSeasonsMutationField = mutationField('deleteMaterials', {
//     type: Season,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deleteSeasonResolve(...params) }
//   })
  
// INPUT

export const SeasonInput = inputObjectType({
  name: 'SeasonInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreateSeasonInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
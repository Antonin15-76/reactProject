
import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { objIdArg } from "schema/globalNexusTypes"
import { Race } from "schema/race/infoRace"
import { Team, TeamInput } from "schema/team"
import * as resolvers from "./resolvers"
import { League, LeagueInput } from "schema/ligue/league"

export const LeagueDriver = objectType({
  name: 'LeagueDriver',
  definition (t) {
    t.implements('Node')
    t.string('pseudo', { nullable: false, resolve: resolvers.pseudoResolve })
    t.string('nationality', { nullable: false, resolve: resolvers.nationalityResolve })
    t.int('number', { nullable: false, resolve: resolvers.numberResolve })
    t.objID('teamActual', { type: Team, nullable: false, resolve: resolvers.teamActualResolve })
    t.objID('actualLeague', { type: League, nullable: false, resolve: resolvers.actualLeagueResolve })
    t.date('birthDate', { nullable: false, resolve: resolvers.birthDateResolve })
    t.int('numberVictory', { nullable: false, resolve: resolvers.numberVictoryResolve })
    t.int('numberPodium', { nullable: false, resolve: resolvers.numberPodiumResolve })
    t.int('numberPole', { nullable: false, resolve: resolvers.numberPoleResolve })
    t.int('numberTitlePilote', { nullable: false, resolve: resolvers.numberTitlePiloteResolve })
    t.int('seasonTitle', { nullable: false, resolve: resolvers.seasonTitleResolve })
  }
})

// QUERIES

export const LeagueDriverArgumentInput = inputObjectType({
  name: 'LeagueDriverArgumentInput',
  description: 'Input des arguments pour requêter les driverAttribution',
  definition (t) {
    t.int('limit', { description: 'Nombre de leagueDriver à récupérer', nullable: true })
    t.int('skip', { description: "Nombre de leagueDriver à passer avant d'appliquer la limite", nullable: true })
  }
})

export const driverQueryField = queryField('leagueDriver', {
  type: LeagueDriver,
  nullable: false,
  description: 'recupérer leagueDriver par ID',
  args: { id: objIdArg({ description: 'ID de LeagueDriver', nullable: false }) },
  resolve: resolvers.driverResolve
})

export const driversQueryField = queryField('leagueDrivers', {
  list: true,
  type: LeagueDriver,
  nullable: true,
  description: 'recupérer la liste des drivers',
  args: { input: arg({ type: LeagueDriverArgumentInput, nullable: true }) },
  resolve: resolvers.driversResolve
})

// MUTATION

export const CreateLeagueDriverInput = inputObjectType({
  name: 'CreateLeagueDriverInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.string('pseudo', { nullable: false })
    t.string('nationality', { nullable: false })
    t.int('number', { nullable: false })
    t.objID('teamActual', { type: TeamInput, nullable: false })
    t.objID('actualLeague', { type: LeagueInput, nullable: false })
    t.date('birthDate', { nullable: false })
    t.int('numberVictory', { nullable: false })
    t.int('numberPodium', { nullable: false })
    t.int('numberPole', { nullable: false })
    t.int('numberTitlePilote', { nullable: false })
    t.int('seasonTitle', { nullable: false })
  }
})

export const createLeagueDriverMutationField = mutationField('createLeagueDriver', {
  type: LeagueDriver,
  nullable: false,
  args: { input: arg({ type: CreateLeagueDriverInput, nullable: true }) },
  resolve: resolvers.createLeagueDriverResolve
})

//UPDATE

export const UpdateLeagueDriverInput = inputObjectType({
    name: 'UpdateLeagueDriverInput',
    nullable: false,
    description: 'Input de modification de leagueDriver',
    definition (t) {
      t.string('pseudo', { nullable: false })
      t.string('nationality', { nullable: false })
      t.int('number', { nullable: false })
      t.objID('teamActual', { type: TeamInput, nullable: false })
      t.objID('actualLeague', { type: LeagueInput, nullable: false })
      t.date('birthDate', { nullable: false })
      t.int('numberVictory', { nullable: false })
      t.int('numberPodium', { nullable: false })
      t.int('numberPole', { nullable: false })
      t.int('numberTitlePilote', { nullable: false })
      t.int('seasonTitle', { nullable: false })
    }
  })
  
  export const UpdateLeagueDriverMutationField = mutationField('updateLeagueDriver', {
    type: LeagueDriver,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdateLeagueDriverInput, nullable: false }) },
    resolve: resolvers.updateLeagueDriverResolve
  })

  // DELETE

export const deleteLeagueDriverMutationField = mutationField('deleteLeagueDriver', {
    type: LeagueDriver,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: resolvers.deleteLeagueDriverResolve
  })
  
//   export const deleteLeagueDriversMutationField = mutationField('deleteMaterials', {
//     type: LeagueDriver,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deleteLeagueDriverResolve(...params) }
//   })
  
// INPUT

export const LeagueDriverInput = inputObjectType({
  name: 'LeagueDriverInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreateLeagueDriverInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
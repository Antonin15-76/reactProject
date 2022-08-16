
import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { objIdArg } from "schema/globalNexusTypes"
import { Race } from "schema/race/infoRace"
import { Team, TeamInput } from "schema/team"
import { LeagueDriver } from "../seasons/pilotes"
import * as resolvers from "./resolvers"

export const League = objectType({
  name: 'League',
  definition (t) {
    t.implements('Node')
    t.string('name', { nullable: false, resolve: resolvers.nameResolve })
  }
})

// QUERIES

export const LeagueArgumentInput = inputObjectType({
  name: 'LeagueArgumentInput',
  description: 'Input des arguments pour requêter les driverAttribution',
  definition (t) {
    t.int('limit', { description: 'Nombre de league à récupérer', nullable: true })
    t.int('skip', { description: "Nombre de league à passer avant d'appliquer la limite", nullable: true })
  }
})

export const leagueQueryField = queryField('league', {
  type: League,
  nullable: false,
  description: 'recupérer league par ID',
  args: { id: objIdArg({ description: 'ID de League', nullable: false }) },
  resolve: resolvers.leagueResolve
})

export const leaguesQueryField = queryField('leagues', {
  list: true,
  type: League,
  nullable: true,
  description: 'recupérer la liste des leagues',
  args: { input: arg({ type: LeagueArgumentInput, nullable: true }) },
  resolve: resolvers.leaguesResolve
})

// MUTATION

export const CreateLeagueInput = inputObjectType({
  name: 'CreateLeagueInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.string('name', { nullable: false })
  }
})

export const createLeagueMutationField = mutationField('createLeague', {
  type: League,
  nullable: false,
  args: { input: arg({ type: CreateLeagueInput, nullable: true }) },
  resolve: resolvers.createLeagueResolve
})

//UPDATE

export const UpdateLeagueInput = inputObjectType({
    name: 'UpdateLeagueInput',
    nullable: false,
    description: 'Input de modification de league',
    definition (t) {
      t.string('name', { nullable: false })
    }
  })
  
  export const UpdateLeagueMutationField = mutationField('updateLeague', {
    type: League,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdateLeagueInput, nullable: false }) },
    resolve: resolvers.updateLeagueResolve
  })

  // DELETE

export const deleteLeagueMutationField = mutationField('deleteLeague', {
    type: League,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: resolvers.deleteLeagueResolve
  })
  
//   export const deleteLeaguesMutationField = mutationField('deleteMaterials', {
//     type: League,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deleteLeagueResolve(...params) }
//   })
  
// INPUT

export const LeagueInput = inputObjectType({
  name: 'LeagueInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreateLeagueInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
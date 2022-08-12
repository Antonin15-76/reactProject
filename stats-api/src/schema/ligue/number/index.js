
import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { objIdArg } from "schema/globalNexusTypes"
import { Race } from "schema/race/infoRace"
import { Team, TeamInput } from "schema/team"
import { League, LeagueInput } from "../league"
import { LeagueDriver, LeagueDriverInput } from "../seasons/pilotes"
import * as resolvers from "./resolvers"


export const AttributionNumber = objectType({
  name: 'AttributionNumber',
  definition (t) {
    t.implements('Node')
    t.objID('nameLeague', { type: League, nullable: false, resolve: resolvers.nameLeagueResolve })
    t.objID('driver', { type: LeagueDriver, nullable: false, resolve: resolvers.driverResolve })
  }
})

export const LeagueNumber = objectType({
  name: 'LeagueNumber',
  definition (t) {
    t.implements('Node')
    t.int('number', { nullable: false, resolve: resolvers.numberResolve })
    t.list.objID('isAttributed', { type: AttributionNumber, nullable: true, resolve: resolvers.isAttributedResolve })
  }
})

// QUERIES

export const LeagueNumberArgumentInput = inputObjectType({
  name: 'LeagueNumberArgumentInput',
  description: 'Input des arguments pour requêter les driverAttribution',
  definition (t) {
    t.int('limit', { description: 'Nombre de leagueNumber à récupérer', nullable: true })
    t.int('skip', { description: "Nombre de leagueNumber à passer avant d'appliquer la limite", nullable: true })
  }
})

export const leagueNumberQueryField = queryField('leagueNumber', {
  type: LeagueNumber,
  nullable: false,
  description: 'recupérer leagueNumber par ID',
  args: { id: objIdArg({ description: 'ID de LeagueNumber', nullable: false }) },
  resolve: resolvers.driverResolve
})

export const leagueNumbersQueryField = queryField('leagueNumbers', {
  list: true,
  type: LeagueNumber,
  nullable: true,
  description: 'recupérer la liste des drivers',
  args: { input: arg({ type: LeagueNumberArgumentInput, nullable: true }) },
  resolve: resolvers.driversResolve
})

// MUTATION

export const CreateLeagueNumberInput = inputObjectType({
  name: 'CreateLeagueNumberInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.int('number', { nullable: false })
    t.objID('isAttributed', { type: AttributionNumberInput, nullable: false })
  }
})

export const CreateAttributionNumberInput = inputObjectType({
  name: 'CreateAttributionNumberInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.objID('nameLeague', { type: LeagueInput, nullable: false })
    t.objID('driver', { type: LeagueDriverInput, nullable: false })
  }
})

export const createAllNumberMutationField = mutationField('createAllNumber', {
  type: LeagueNumber,
  nullable: false,
  args: { },
  resolve: resolvers.createAllNumberResolve
})

export const createLeagueNumberMutationField = mutationField('createLeagueNumber', {
  type: LeagueNumber,
  nullable: false,
  args: { input: arg({ type: CreateLeagueNumberInput, nullable: true }) },
  resolve: resolvers.createLeagueNumberResolve
})

//UPDATE

export const UpdateLeagueNumberInput = inputObjectType({
    name: 'UpdateLeagueNumberInput',
    nullable: false,
    description: 'Input de modification de leagueNumber',
    definition (t) {
      t.int('number', { nullable: false })
      t.objID('isAttributed', { type: AttributionNumberInput, nullable: false })
    }
  })
  
  export const UpdateLeagueNumberMutationField = mutationField('updateLeagueNumber', {
    type: LeagueNumber,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdateLeagueNumberInput, nullable: false }) },
    resolve: resolvers.updateLeagueNumberResolve
  })

  // DELETE

export const deleteLeagueNumberMutationField = mutationField('deleteLeagueNumber', {
    type: LeagueNumber,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: resolvers.deleteLeagueNumberResolve
  })
  
//   export const deleteLeagueNumbersMutationField = mutationField('deleteMaterials', {
//     type: LeagueNumber,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deleteLeagueNumberResolve(...params) }
//   })
  
// INPUT

export const AttributionNumberInput = inputObjectType({
  name: 'AttributionNumberInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreateAttributionNumberInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
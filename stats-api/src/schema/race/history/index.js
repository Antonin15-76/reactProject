
import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { objIdArg } from "schema/globalNexusTypes"
import { Palmares, PalmaresInput } from "schema/ligue/classement/palmares"
import { Race, RaceInput } from "../infoRace"
import * as resolvers from "./resolvers"

export const History = objectType({
  name: 'History',
  definition (t) {
    t.implements('Node')
    t.int('year', { nullable: false, resolve: resolvers.yearResolve })
    t.string('text', { nullable: false, resolve: resolvers.textResolve })
    t.objID('race', { type: Race, nullable: false, resolve: resolvers.raceResolve })
  }
})

// QUERIES

// export const HistoryArgumentInput = inputObjectType({
//   name: 'HistoryArgumentInput',
//   description: 'Input des arguments pour requêter les historyAttribution',
//   definition (t) {
//     t.int('limit', { description: 'Nombre de history à récupérer', nullable: true })
//     t.int('skip', { description: "Nombre de history à passer avant d'appliquer la limite", nullable: true })
//   }
// })

export const historyQueryField = queryField('history', {
  type: History,
  nullable: false,
  description: 'recupérer history par ID',
  args: { id: objIdArg({ description: 'ID de History', nullable: false }) },
  resolve: resolvers.historyResolve
})

// export const historysQueryField = queryField('historys', {
//   list: true,
//   type: History,
//   nullable: false,
//   description: 'recupérer la liste des historys',
//   args: { input: arg({ type: HistoryArgumentInput, nullable: true }) },
//   resolve: resolvers.historysResolve
// })

// // MUTATION

export const CreateHistoryInput = inputObjectType({
  name: 'CreateHistoryInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.int('year', { nullable: false })
    t.string('text', { nullable: false })
    t.objID('race', { type: RaceInput, nullable: false })
  }
})

export const createHistoryMutationField = mutationField('createHistory', {
  type: History,
  nullable: false,
  args: { input: arg({ type: CreateHistoryInput, nullable: true }) },
  resolve: resolvers.createHistoryResolve
})

// UPDATE

export const UpdateHistoryInput = inputObjectType({
    name: 'UpdateHistoryInput',
    nullable: false,
    description: 'Input de modification de history',
    definition (t) {
      t.int('year', { nullable: false })
      t.string('text', { nullable: false })
      t.objID('race', { type: RaceInput, nullable: false })
    }
  })
  
  export const UpdateHistoryMutationField = mutationField('updateHistory', {
    type: History,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdateHistoryInput, nullable: false }) },
    resolve: resolvers.updateHistoryResolve
  })

  // DELETE

export const deleteHistoryMutationField = mutationField('deleteHistory', {
    type: History,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: resolvers.deleteHistoryResolve
  })
  
//   export const deleteHistorysMutationField = mutationField('deleteMaterials', {
//     type: History,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deleteHistoryResolve(...params) }
//   })
  
// INPUT

export const HistoryInput = inputObjectType({
  name: 'HistoryInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreateHistoryInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
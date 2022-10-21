
import { arg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { objIdArg } from "schema/globalNexusTypes"
import { Palmares, PalmaresInput } from "schema/ligue/classement/palmares"
import { History, HistoryInput } from "../history"
import * as resolvers from "./resolvers"

export const Race = objectType({
  name: 'Race',
  definition (t) {
    t.implements('Node')
    t.string('name', { nullable: false, resolve: resolvers.nameResolve })
    t.string('country', { nullable: false, resolve: resolvers.countryResolve })
    t.date('openDate', { nullable: false, resolve: resolvers.openDateResolve })
    t.string('sens', { nullable: false, resolve: resolvers.sensResolve })
    t.int('capacity', { nullable: false, resolve: resolvers.capacityResolve })
    t.int('long', { nullable: false, resolve: resolvers.longResolve })
    t.int('nbTurn', { nullable: false, resolve: resolvers.nbTurnResolve })
    t.time('bestTimePole', { nullable: false, resolve: resolvers.bestTimePoleResolve })
    t.string('piloteBestTimePole', { nullable: false, resolve: resolvers.piloteBestTimePoleResolve })
    t.string('teamBestTimePole', { nullable: false, resolve: resolvers.teamBestTimePoleResolve })
    t.int('yearBestTimePole', { nullable: false, resolve: resolvers.yearBestTimePoleResolve })
    t.time('bestTimeRace', { nullable: false, resolve: resolvers.bestTimeRaceResolve })
    t.string('piloteBestTimeRace', { nullable: false, resolve: resolvers.piloteBestTimeRaceResolve })
    t.string('teamBestTimeRace', { nullable: false, resolve: resolvers.teamBestTimeRaceResolve })
    t.int('yearBestTimeRace', { nullable: false, resolve: resolvers.yearBestTimeRaceResolve })
    t.float('nbLap', { nullable: false, resolve: resolvers.nbLapResolve })
    t.list.field('palmares', { type: Palmares, nullable: false, resolve: resolvers.palmaresResolve })
    t.list.field('history', { type: History, nullable: false, resolve: resolvers.historyResolve })
  }
})

// QUERIES

// export const RaceArgumentInput = inputObjectType({
//   name: 'RaceArgumentInput',
//   description: 'Input des arguments pour requêter les raceAttribution',
//   definition (t) {
//     t.int('limit', { description: 'Nombre de race à récupérer', nullable: true })
//     t.int('skip', { description: "Nombre de race à passer avant d'appliquer la limite", nullable: true })
//   }
// })

export const raceQueryField = queryField('race', {
  type: Race,
  nullable: false,
  description: 'recupérer race par ID',
  args: { id: objIdArg({ description: 'ID de Race', nullable: false }) },
  resolve: resolvers.raceResolve
})

// export const racesQueryField = queryField('races', {
//   list: true,
//   type: Race,
//   nullable: false,
//   description: 'recupérer la liste des races',
//   args: { input: arg({ type: RaceArgumentInput, nullable: true }) },
//   resolve: resolvers.racesResolve
// })

// MUTATION

export const CreateRaceInput = inputObjectType({
  name: 'CreateRaceInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.string('name', { nullable: false })
    t.string('country', { nullable: false })
    t.date('openDate', { nullable: false })
    t.string('sens', { nullable: false })
    t.int('capacity', { nullable: false })
    t.int('long', { nullable: false })
    t.int('nbTurn', { nullable: false })
    t.time('bestTimePole', { nullable: false })
    t.string('piloteBestTimePole', { nullable: false })
    t.string('teamBestTimePole', { nullable: false })
    t.int('yearBestTimePole', { nullable: false })
    t.time('bestTimeRace', { nullable: false })
    t.string('piloteBestTimeRace', { nullable: false })
    t.string('teamBestTimeRace', { nullable: false })
    t.int('yearBestTimeRace', { nullable: false })
    t.float('nbLap', { nullable: false })
    t.list.objID('palmares', { nullable: false })
    t.list.objID('history', { nullable: false })
  }
})

export const createRaceMutationField = mutationField('createRace', {
  type: Race,
  nullable: false,
  args: { input: arg({ type: CreateRaceInput, nullable: true }) },
  resolve: resolvers.createRaceResolve
})

//UPDATE

export const UpdateRaceInput = inputObjectType({
    name: 'UpdateRaceInput',
    nullable: false,
    description: 'Input de modification de race',
    definition (t) {
      t.string('name', { nullable: false })
    t.string('country', { nullable: false })
    t.date('openDate', { nullable: false })
    t.string('sens', { nullable: false })
    t.int('capacity', { nullable: false })
    t.int('long', { nullable: false })
    t.int('nbTurn', { nullable: false })
    t.time('bestTimePole', { nullable: false })
    t.string('piloteBestTimePole', { nullable: false })
    t.string('teamBestTimePole', { nullable: false })
    t.int('yearBestTimePole', { nullable: false })
    t.time('bestTimeRace', { nullable: false })
    t.string('piloteBestTimeRace', { nullable: false })
    t.string('teamBestTimeRace', { nullable: false })
    t.int('yearBestTimeRace', { nullable: false })
    t.float('nbLap', { nullable: false })
    t.list.objID('palmares', { nullable: false })
    t.list.objID('history', { nullable: false })
    }
  })
  
  export const UpdateRaceMutationField = mutationField('updateRace', {
    type: Race,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdateRaceInput, nullable: false }) },
    resolve: resolvers.updateRaceResolve
  })

  // DELETE

// export const deleteRaceMutationField = mutationField('deleteRace', {
//     type: Race,
//     nullable: false,
//     args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deleteRaceResolve(...params) }
//   })
  
//   export const deleteRacesMutationField = mutationField('deleteMaterials', {
//     type: Race,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deleteRaceResolve(...params) }
//   })
  
// INPUT

export const RaceInput = inputObjectType({
  name: 'RaceInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreateRaceInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
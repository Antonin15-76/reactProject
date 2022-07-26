
import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { Driver, DriverInput } from "schema/driver"
import { objIdArg } from "schema/globalNexusTypes"
import { Race, RaceInput } from "schema/race/infoRace"
import { Team, TeamInput } from "schema/team"
import * as resolvers from "./resolvers"

export const Palmares = objectType({
  name: 'Palmares',
  definition (t) {
    t.implements('Node')
    t.int('season', { nullable: false, resolve: resolvers.seasonResolve })
    t.objID('driver', { type: Driver, nullable: false, resolve: resolvers.driverResolve })
    t.objID('team', { type: Team, nullable: false, resolve: resolvers.teamResolve })
    t.objID('race', { type: Race, nullable: false, resolve: resolvers.raceResolve })
  }
})

// QUERIES

// export const PalmaresArgumentInput = inputObjectType({
//   name: 'PalmaresArgumentInput',
//   description: 'Input des arguments pour requêter les palmaresAttribution',
//   definition (t) {
//     t.int('limit', { description: 'Nombre de palmares à récupérer', nullable: true })
//     t.int('skip', { description: "Nombre de palmares à passer avant d'appliquer la limite", nullable: true })
//   }
// })

export const palmaresQueryField = queryField('palmares', {
  type: Palmares,
  nullable: false,
  description: 'recupérer palmares par ID',
  args: { id: objIdArg({ description: 'ID de Palmares', nullable: false }) },
  resolve: resolvers.palmaresResolve
})

// export const palmaressQueryField = queryField('palmaress', {
//   list: true,
//   type: Palmares,
//   nullable: false,
//   description: 'recupérer la liste des palmaress',
//   args: { input: arg({ type: PalmaresArgumentInput, nullable: true }) },
//   resolve: resolvers.palmaressResolve
// })

// MUTATION

export const CreatePalmaresInput = inputObjectType({
  name: 'CreatePalmaresInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.int('season', { nullable: false })
    t.objID('driver', { type: DriverInput, nullable: false })
    t.objID('team', { type: TeamInput, nullable: false })
    t.objID('race', { type: RaceInput, nullable: false })
  }
})

export const createPalmaresMutationField = mutationField('createPalmares', {
  type: Palmares,
  nullable: false,
  args: { input: arg({ type: CreatePalmaresInput, nullable: true }) },
  resolve: resolvers.createPalmaresResolve
})

//UPDATE

export const UpdatePalmaresInput = inputObjectType({
    name: 'UpdatePalmaresInput',
    nullable: false,
    description: 'Input de modification de palmares',
    definition (t) {
      t.int('season', { nullable: false })
      t.objID('driver', { type: DriverInput, nullable: false })
      t.objID('team', { type: TeamInput, nullable: false })
      t.objID('race', { type: RaceInput, nullable: false })
    }
  })
  
  export const UpdatePalmaresMutationField = mutationField('updatePalmares', {
    type: Palmares,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdatePalmaresInput, nullable: false }) },
    resolve: resolvers.updatePalmaresResolve
  })

  // DELETE

export const deletePalmaresMutationField = mutationField('deletePalmares', {
    type: Palmares,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: resolvers.deletePalmaresResolve
  })
  
//   export const deletePalmaressMutationField = mutationField('deleteMaterials', {
//     type: Palmares,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deletePalmaresResolve(...params) }
//   })
  
// INPUT

export const PalmaresInput = inputObjectType({
  name: 'PalmaresInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreatePalmaresInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
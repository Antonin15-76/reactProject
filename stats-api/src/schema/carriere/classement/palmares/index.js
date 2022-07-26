
import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { Driver, DriverInput } from "schema/driver"
import { objIdArg } from "schema/globalNexusTypes"
import { Race, RaceInput } from "schema/race/infoRace"
import { Team, TeamInput } from "schema/team"
import * as resolvers from "./resolvers"

export const PalmaresCarrer = objectType({
  name: 'PalmaresCarrer',
  definition (t) {
    t.implements('Node')
    t.int('year', { nullable: false, resolve: resolvers.yearResolve })
    t.objID('driver', { type: Driver, nullable: false, resolve: resolvers.driverResolve })
    t.objID('team', { type: Team, nullable: false, resolve: resolvers.teamResolve })
    t.objID('race', { type: Race, nullable: false, resolve: resolvers.raceResolve })
  }
})

// QUERIES

// export const PalmaresCarrerArgumentInput = inputObjectType({
//   name: 'PalmaresCarrerArgumentInput',
//   description: 'Input des arguments pour requêter les palmaresCarrerAttribution',
//   definition (t) {
//     t.int('limit', { description: 'Nombre de palmaresCarrer à récupérer', nullable: true })
//     t.int('skip', { description: "Nombre de palmaresCarrer à passer avant d'appliquer la limite", nullable: true })
//   }
// })

export const palmaresCarrerQueryField = queryField('palmaresCarrer', {
  type: PalmaresCarrer,
  nullable: false,
  description: 'recupérer palmaresCarrer par ID',
  args: { id: objIdArg({ description: 'ID de PalmaresCarrer', nullable: false }) },
  resolve: resolvers.palmaresCarrerResolve
})

// export const palmaresCarrersQueryField = queryField('palmaresCarrers', {
//   list: true,
//   type: PalmaresCarrer,
//   nullable: false,
//   description: 'recupérer la liste des palmaresCarrers',
//   args: { input: arg({ type: PalmaresCarrerArgumentInput, nullable: true }) },
//   resolve: resolvers.palmaresCarrersResolve
// })

// MUTATION

export const CreatePalmaresCarrerInput = inputObjectType({
  name: 'CreatePalmaresCarrerInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.int('year', { nullable: false })
    t.objID('driver', { type: DriverInput, nullable: false })
    t.objID('team', { type: TeamInput, nullable: false })
    t.objID('race', { type: RaceInput, nullable: false })
  }
})

export const createPalmaresCarrerMutationField = mutationField('createPalmaresCarrer', {
  type: PalmaresCarrer,
  nullable: false,
  args: { input: arg({ type: CreatePalmaresCarrerInput, nullable: true }) },
  resolve: resolvers.createPalmaresCarrerResolve
})

//UPDATE

export const UpdatePalmaresCarrerInput = inputObjectType({
    name: 'UpdatePalmaresCarrerInput',
    nullable: false,
    description: 'Input de modification de palmaresCarrer',
    definition (t) {
      t.int('year', { nullable: false })
      t.objID('driver', { type: DriverInput, nullable: false })
      t.objID('team', { type: TeamInput, nullable: false })
      t.objID('race', { type: RaceInput, nullable: false })
    }
  })
  
  export const UpdatePalmaresCarrerMutationField = mutationField('updatePalmaresCarrer', {
    type: PalmaresCarrer,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdatePalmaresCarrerInput, nullable: false }) },
    resolve: resolvers.updatePalmaresCarrerResolve
  })

  // DELETE

export const deletePalmaresCarrerMutationField = mutationField('deletePalmaresCarrer', {
    type: PalmaresCarrer,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: resolvers.deletePalmaresCarrerResolve
  })
  
//   export const deletePalmaresCarrersMutationField = mutationField('deleteMaterials', {
//     type: PalmaresCarrer,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deletePalmaresCarrerResolve(...params) }
//   })
  
// INPUT

export const PalmaresCarrerInput = inputObjectType({
  name: 'PalmaresCarrerInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreatePalmaresCarrerInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
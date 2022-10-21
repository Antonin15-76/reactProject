
import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { Driver, DriverInput } from "schema/driver"
import { objIdArg } from "schema/globalNexusTypes"
import { Race, RaceInput } from "schema/race/infoRace"
import { Team, TeamInput } from "schema/team"
import * as resolvers from "./resolvers"

export const PoleCarrer = objectType({
  name: 'PoleCarrer',
  definition (t) {
    t.implements('Node')
    t.int('year', { nullable: false, resolve: resolvers.yearResolve })
    t.objID('driver', { type: Driver, nullable: false, resolve: resolvers.driverResolve })
    t.objID('team', { type: Team, nullable: false, resolve: resolvers.teamResolve })
    t.objID('race', { type: Race, nullable: false, resolve: resolvers.raceResolve })
  }
})

// QUERIES

// export const PoleCarrerArgumentInput = inputObjectType({
//   name: 'PoleCarrerArgumentInput',
//   description: 'Input des arguments pour requêter les poleCarrerAttribution',
//   definition (t) {
//     t.int('limit', { description: 'Nombre de poleCarrer à récupérer', nullable: true })
//     t.int('skip', { description: "Nombre de poleCarrer à passer avant d'appliquer la limite", nullable: true })
//   }
// })

export const poleCarrerQueryField = queryField('poleCarrer', {
  type: PoleCarrer,
  nullable: false,
  description: 'recupérer poleCarrer par ID',
  args: { id: objIdArg({ description: 'ID de PoleCarrer', nullable: false }) },
  resolve: resolvers.poleCarrerResolve
})

// export const poleCarrersQueryField = queryField('poleCarrers', {
//   list: true,
//   type: PoleCarrer,
//   nullable: false,
//   description: 'recupérer la liste des poleCarrers',
//   args: { input: arg({ type: PoleCarrerArgumentInput, nullable: true }) },
//   resolve: resolvers.poleCarrersResolve
// })

// MUTATION

export const CreatePoleCarrerInput = inputObjectType({
  name: 'CreatePoleCarrerInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.int('year', { nullable: false })
    t.objID('driver', { type: DriverInput, nullable: false })
    t.objID('team', { type: TeamInput, nullable: false })
    t.objID('race', { type: RaceInput, nullable: false })
  }
})

export const createPoleCarrerMutationField = mutationField('createPoleCarrer', {
  type: PoleCarrer,
  nullable: false,
  args: { input: arg({ type: CreatePoleCarrerInput, nullable: true }) },
  resolve: resolvers.createPoleCarrerResolve
})

//UPDATE

export const UpdatePoleCarrerInput = inputObjectType({
    name: 'UpdatePoleCarrerInput',
    nullable: false,
    description: 'Input de modification de poleCarrer',
    definition (t) {
      t.int('year', { nullable: false })
      t.objID('driver', { type: DriverInput, nullable: false })
      t.objID('team', { type: TeamInput, nullable: false })
      t.objID('race', { type: RaceInput, nullable: false })
    }
  })
  
  export const UpdatePoleCarrerMutationField = mutationField('updatePoleCarrer', {
    type: PoleCarrer,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdatePoleCarrerInput, nullable: false }) },
    resolve: resolvers.updatePoleCarrerResolve
  })

  // DELETE

export const deletePoleCarrerMutationField = mutationField('deletePoleCarrer', {
    type: PoleCarrer,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: resolvers.deletePoleCarrerResolve
  })
  
//   export const deletePoleCarrersMutationField = mutationField('deleteMaterials', {
//     type: PoleCarrer,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deletePoleCarrerResolve(...params) }
//   })
  
// INPUT

export const PoleCarrerInput = inputObjectType({
  name: 'PoleCarrerInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreatePoleCarrerInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
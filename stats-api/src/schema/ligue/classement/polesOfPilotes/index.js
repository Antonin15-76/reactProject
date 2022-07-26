
import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { Driver, DriverInput } from "schema/driver"
import { objIdArg } from "schema/globalNexusTypes"
import { Race, RaceInput } from "schema/race/infoRace"
import { Team, TeamInput } from "schema/team"
import * as resolvers from "./resolvers"

export const Pole = objectType({
  name: 'Pole',
  definition (t) {
    t.implements('Node')
    t.int('year', { nullable: false, resolve: resolvers.yearResolve })
    t.objID('driver', { type: Driver, nullable: false, resolve: resolvers.driverResolve })
    t.objID('team', { type: Team, nullable: false, resolve: resolvers.teamResolve })
    t.objID('race', { type: Race, nullable: false, resolve: resolvers.raceResolve })
    t.int('league', { nullable: false, resolve: resolvers.leagueResolve })
  }
})

// QUERIES

// export const PoleArgumentInput = inputObjectType({
//   name: 'PoleArgumentInput',
//   description: 'Input des arguments pour requêter les poleAttribution',
//   definition (t) {
//     t.int('limit', { description: 'Nombre de pole à récupérer', nullable: true })
//     t.int('skip', { description: "Nombre de pole à passer avant d'appliquer la limite", nullable: true })
//   }
// })

export const poleQueryField = queryField('pole', {
  type: Pole,
  nullable: false,
  description: 'recupérer pole par ID',
  args: { id: objIdArg({ description: 'ID de Pole', nullable: false }) },
  resolve: resolvers.poleResolve
})

// export const polesQueryField = queryField('poles', {
//   list: true,
//   type: Pole,
//   nullable: false,
//   description: 'recupérer la liste des poles',
//   args: { input: arg({ type: PoleArgumentInput, nullable: true }) },
//   resolve: resolvers.polesResolve
// })

// MUTATION

export const CreatePoleInput = inputObjectType({
  name: 'CreatePoleInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.int('year', { nullable: false })
    t.objID('driver', { type: DriverInput, nullable: false })
    t.objID('team', { type: TeamInput, nullable: false })
    t.objID('race', { type: RaceInput, nullable: false })
    t.int('league', { nullable: false })
  }
})

export const createPoleMutationField = mutationField('createPole', {
  type: Pole,
  nullable: false,
  args: { input: arg({ type: CreatePoleInput, nullable: true }) },
  resolve: resolvers.createPoleResolve
})

//UPDATE

export const UpdatePoleInput = inputObjectType({
    name: 'UpdatePoleInput',
    nullable: false,
    description: 'Input de modification de pole',
    definition (t) {
      t.int('year', { nullable: false })
      t.objID('driver', { type: DriverInput, nullable: false })
      t.objID('team', { type: TeamInput, nullable: false })
      t.objID('race', { type: RaceInput, nullable: false })
      t.int('league', { nullable: false })
    }
  })
  
  export const UpdatePoleMutationField = mutationField('updatePole', {
    type: Pole,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdatePoleInput, nullable: false }) },
    resolve: resolvers.updatePoleResolve
  })

  // DELETE

export const deletePoleMutationField = mutationField('deletePole', {
    type: Pole,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: resolvers.deletePoleResolve
  })
  
//   export const deletePolesMutationField = mutationField('deleteMaterials', {
//     type: Pole,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deletePoleResolve(...params) }
//   })
  
// INPUT

export const PoleInput = inputObjectType({
  name: 'PoleInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreatePoleInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
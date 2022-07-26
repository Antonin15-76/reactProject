
import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { objIdArg } from "schema/globalNexusTypes"
import { Race } from "schema/race/infoRace"
import { Team, TeamInput } from "schema/team"
import * as resolvers from "./resolvers"

export const Driver = objectType({
  name: 'Driver',
  definition (t) {
    t.implements('Node')
    t.string('firstName', { nullable: false, resolve: resolvers.firstNameResolve })
    t.string('lastName', { nullable: false, resolve: resolvers.lastNameResolve })
    t.string('nationality', { nullable: false, resolve: resolvers.nationalityResolve })
    t.int('number', { nullable: false, resolve: resolvers.numberResolve })
    t.objID('teamActual', { nullable: false, resolve: resolvers.teamActualResolve })
    t.date('birthDate', { nullable: false, resolve: resolvers.birthDateResolve })
    t.int('tall', { nullable: false, resolve: resolvers.tallResolve })
    t.int('numberVictory', { nullable: false, resolve: resolvers.numberVictoryResolve })
    t.int('numberPodium', { nullable: false, resolve: resolvers.numberPodiumResolve })
    t.int('numberPole', { nullable: false, resolve: resolvers.numberPoleResolve })
    t.int('numberTitlePilote', { nullable: false, resolve: resolvers.numberTitlePiloteResolve })
    t.int('numberLap', { nullable: false, resolve: resolvers.numberLapResolve })
    t.list.int('yearsTitle', { nullable: false, resolve: resolvers.yearsTitleResolve })
    t.int('startCarrer', { nullable: false, resolve: resolvers.startCarrerResolve })
    t.int('endCarrer', { nullable: false, resolve: resolvers.endCarrerResolve })
    t.list.field('otherTeam', { type: Team, nullable: false, resolve: resolvers.otherTeamResolve })
    t.boolean('isActif', { nullable: false, resolve: resolvers.isActifResolve })
  }
})

// QUERIES

export const DriverArgumentInput = inputObjectType({
  name: 'DriverArgumentInput',
  description: 'Input des arguments pour requêter les driverAttribution',
  definition (t) {
    t.int('limit', { description: 'Nombre de driver à récupérer', nullable: true })
    t.int('skip', { description: "Nombre de driver à passer avant d'appliquer la limite", nullable: true })
  }
})

export const driverQueryField = queryField('driver', {
  type: Driver,
  nullable: false,
  description: 'recupérer driver par ID',
  args: { id: objIdArg({ description: 'ID de Driver', nullable: false }) },
  resolve: resolvers.driverResolve
})

export const driversQueryField = queryField('drivers', {
  list: true,
  type: Driver,
  nullable: false,
  description: 'recupérer la liste des drivers',
  args: { input: arg({ type: DriverArgumentInput, nullable: true }) },
  resolve: resolvers.driversResolve
})

// MUTATION

export const CreateDriverInput = inputObjectType({
  name: 'CreateDriverInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.string('firstName', { nullable: false })
    t.string('lastName', { nullable: false })
    t.string('nationality', { nullable: false })
    t.int('number', { nullable: false })
    t.objID('teamActual', { nullable: false })
    t.date('birthDate', { nullable: false })
    t.int('tall', { nullable: false })
    t.int('numberVictory', { nullable: false })
    t.int('numberPodium', { nullable: false })
    t.int('numberPole', { nullable: false })
    t.int('numberTitlePilote', { nullable: false })
    t.int('numberLap', { nullable: false })
    t.list.int('yearsTitle', { nullable: false })
    t.int('startCarrer', { nullable: false })
    t.int('endCarrer', { nullable: false })
    t.list.field('otherTeam', { type: TeamInput, nullable: false })
    t.boolean('isActif', { nullable: false })
  }
})

export const createDriverMutationField = mutationField('createDriver', {
  type: Driver,
  nullable: false,
  args: { input: arg({ type: CreateDriverInput, nullable: true }) },
  resolve: resolvers.createDriverResolve
})

//UPDATE

export const UpdateDriverInput = inputObjectType({
    name: 'UpdateDriverInput',
    nullable: false,
    description: 'Input de modification de driver',
    definition (t) {
      t.string('firstName', { nullable: false })
      t.string('lastName', { nullable: false })
      t.string('nationality', { nullable: false })
      t.int('number', { nullable: false })
      t.objID('teamActual', { nullable: false })
      t.date('birthDate', { nullable: false })
      t.int('tall', { nullable: false })
      t.int('numberVictory', { nullable: false })
      t.int('numberPodium', { nullable: false })
      t.int('numberPole', { nullable: false })
      t.int('numberTitlePilote', { nullable: false })
      t.int('numberLap', { nullable: false })
      t.list.int('yearsTitle', { nullable: false })
      t.int('startCarrer', { nullable: false })
      t.int('endCarrer', { nullable: false })
      t.list.field('otherTeam', { type: TeamInput, nullable: false })
      t.boolean('isActif', { nullable: false })
    }
  })
  
  export const UpdateDriverMutationField = mutationField('updateDriver', {
    type: Driver,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdateDriverInput, nullable: false }) },
    resolve: resolvers.updateDriverResolve
  })

  // DELETE

export const deleteDriverMutationField = mutationField('deleteDriver', {
    type: Driver,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: resolvers.deleteDriverResolve
  })
  
//   export const deleteDriversMutationField = mutationField('deleteMaterials', {
//     type: Driver,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deleteDriverResolve(...params) }
//   })
  
// INPUT

export const DriverInput = inputObjectType({
  name: 'DriverInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreateDriverInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
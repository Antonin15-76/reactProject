
import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { Driver, DriverInput } from "schema/driver"
import { objIdArg } from "schema/globalNexusTypes"
import { Race } from "schema/race/infoRace"
import * as resolvers from "./resolvers"

export const Team = objectType({
  name: 'Team',
  definition (t) {
    t.implements('Node')
    t.string('name', { nullable: false, resolve: resolvers.nameResolve })
    t.string('nationality', { nullable: false, resolve: resolvers.nationalityResolve })
    t.date('start', { nullable: false, resolve: resolvers.startResolve })
    t.date('end', { nullable: true, resolve: resolvers.endResolve })
    t.list.field('drivers', { type: Driver, nullable: true, resolve: resolvers.driversResolve })
    t.int('numberTitleConstructor', { nullable: false, resolve: resolvers.numberTitleConstructorResolve })
    t.int('numberTitlePilote', { nullable: false, resolve: resolvers.numberTitlePiloteResolve })
    t.int('numberVictory', { nullable: false, resolve: resolvers.numberVictoryResolve })
    t.int('numberPodium', { nullable: false, resolve: resolvers.numberPodiumResolve })
    t.int('numberPole', { nullable: false, resolve: resolvers.numberPoleResolve })
    t.list.date('yearsTitlePilote', { nullable: true, resolve: resolvers.yearsTitlePiloteResolve })
    t.list.date('yearsTitleConstructor', { nullable: true, resolve: resolvers.yearsTitleConstructorResolve })
    t.int('numberLap', { nullable: false, resolve: resolvers.numberLapResolve })
  }
})

// QUERIES

export const TeamArgumentInput = inputObjectType({
  name: 'TeamArgumentInput',
  description: 'Input des arguments pour requêter les teamAttribution',
  definition (t) {
    t.int('limit', { description: 'Nombre de team à récupérer', nullable: true })
    t.int('skip', { description: "Nombre de team à passer avant d'appliquer la limite", nullable: true })
  }
})

export const teamQueryField = queryField('team', {
  type: Team,
  nullable: false,
  description: 'recupérer team par ID',
  args: { id: objIdArg({ description: 'ID de Team', nullable: false }) },
  resolve: resolvers.teamResolve
})

// export const teamsQueryField = queryField('teams', {
//   list: true,
//   type: Team,
//   nullable: false,
//   description: 'recupérer la liste des teams',
//   args: { input: arg({ type: TeamArgumentInput, nullable: true }) },
//   resolve: resolvers.teamsResolve
// })

// MUTATION

export const CreateTeamInput = inputObjectType({
  name: 'CreateTeamInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.string('name', { nullable: false })
    t.string('nationality', { nullable: false })
    t.date('start', { nullable: false })
    t.date('end', { nullable: true })
    t.list.field('drivers', { type: DriverInput, nullable: true })
    t.int('numberTitleConstructor', { nullable: false })
    t.int('numberTitlePilote', { nullable: false })
    t.int('numberVictory', { nullable: false })
    t.int('numberPodium', { nullable: false })
    t.int('numberPole', { nullable: false })
    t.list.date('yearsTitlePilote', { nullable: true })
    t.list.date('yearsTitleConstructor', { nullable: true })
    t.int('numberLap', { nullable: false })
  }
})

// export const createTeamMutationField = mutationField('createTeam', {
//   type: Team,
//   nullable: false,
//   args: { input: arg({ type: CreateTeamInput, nullable: true }) },
//   resolve: resolvers.createTeamResolve
// })

//UPDATE

export const UpdateTeamInput = inputObjectType({
    name: 'UpdateTeamInput',
    nullable: false,
    description: 'Input de modification de team',
    definition (t) {
      t.string('name', { nullable: false })
      t.string('nationality', { nullable: false })
      t.date('start', { nullable: false })
      t.date('end', { nullable: true })
      t.list.field('drivers', { type: DriverInput, nullable: true })
      t.int('numberTitleConstructor', { nullable: false })
      t.int('numberTitlePilote', { nullable: false })
      t.int('numberVictory', { nullable: false })
      t.int('numberPodium', { nullable: false })
      t.int('numberPole', { nullable: false })
      t.list.date('yearsTitlePilote', { nullable: true })
      t.list.date('yearsTitleConstructor', { nullable: true })
      t.int('numberLap', { nullable: false })
    }
  })
  
//   export const UpdateTeamMutationField = mutationField('updateTeam', {
//     type: Team,
//     nullable: false,
//     args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdateTeamInput, nullable: false }) },
//     resolve: resolvers.updateTeamResolve
//   })

  // DELETE

export const deleteTeamMutationField = mutationField('deleteTeam', {
    type: Team,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: resolvers.deleteTeamResolve
  })
  
//   export const deleteTeamsMutationField = mutationField('deleteMaterials', {
//     type: Team,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deleteTeamResolve(...params) }
//   })
  
// INPUT

export const TeamInput = inputObjectType({
  name: 'TeamInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreateTeamInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})

import { arg, booleanArg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { objIdArg } from "schema/globalNexusTypes"
import { Ligue, LigueInput } from "./ligue"
import * as resolvers from "./resolvers"

export const User = objectType({
  name: 'User',
  definition (t) {
    t.implements('Node')
    t.string('firstName', { nullable: false, resolve: resolvers.firstNameResolve })
    t.string('lastName', { nullable: false, resolve: resolvers.lastNameResolve })
    t.string('pseudo', { nullable: false, resolve: resolvers.pseudoResolve })
    t.string('email', { nullable: false, resolve: resolvers.emailResolve })
    t.string('password', { nullable: false, resolve: resolvers.passwordResolve })
    t.list.field('ligue', { type: Ligue, nullable: true, resolve: resolvers.ligueResolve })
  }
})

// QUERIES

export const UserArgumentInput = inputObjectType({
  name: 'UserArgumentInput',
  description: 'Input des arguments pour requêter les userAttribution',
  definition (t) {
    t.int('limit', { description: 'Nombre de user à récupérer', nullable: true })
    t.int('skip', { description: "Nombre de user à passer avant d'appliquer la limite", nullable: true })
  }
})

export const userQueryField = queryField('user', {
  type: User,
  nullable: false,
  description: 'recupérer user par ID',
  args: { id: objIdArg({ description: 'ID de User', nullable: false }) },
  resolve: resolvers.userResolve
})

export const usersQueryField = queryField('users', {
  list: true,
  type: User,
  nullable: false,
  description: 'recupérer la liste des users',
  args: { input: arg({ type: UserArgumentInput, nullable: true }) },
  resolve: resolvers.usersResolve
})

// // MUTATION

export const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  nullable: false,
  description: 'Input de creation de user',
  definition (t) {
    t.string('firstName', { nullable: false })
    t.string('lastName', { nullable: false })
    t.string('pseudo', { nullable: false })
    t.string('password', { nullable: false })
    t.string('email', { nullable: false })
    t.list.field('ligue', { type: LigueInput, nullable: true })
  }
})

export const createUserMutationField = mutationField('createUser', {
  type: User,
  nullable: false,
  args: { input: arg({ type: CreateUserInput, nullable: true }) },
  resolve: resolvers.createUserResolve
})

// //UPDATE

export const UpdateUserInput = inputObjectType({
    name: 'UpdateUserInput',
    nullable: false,
    description: 'Input de modification de user',
    definition (t) {
      t.string('firstName', { nullable: true })
      t.string('lastName', { nullable: true })
      t.string('pseudo', { nullable: true })
      t.string('password', { nullable: true })
      t.string('email', { nullable: true })
      t.list.field('ligue', { type: 'LigueInput', nullable: true })
    }
  })
  
  export const UpdateUserMutationField = mutationField('updateUser', {
    type: User,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdateUserInput, nullable: false }) },
    resolve: resolvers.updateUserResolve
  })

//   // DELETE

export const deleteUserMutationField = mutationField('deleteUser', {
    type: User,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: (...params) => { return resolvers.deleteUserResolve(...params) }
  })
  
  export const deleteUsersMutationField = mutationField('deleteMaterials', {
    type: User,
    list: true,
    nullable: false,
    args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
    resolve: (...params) => { return resolvers.deleteUserResolve(...params) }
  })
  
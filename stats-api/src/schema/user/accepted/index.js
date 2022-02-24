
import { arg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { objIdArg } from "schema/globalNexusTypes"
import * as resolvers from "./resolvers"

export const Accepted = objectType({
  name: 'Accepted',
  definition (t) {
    t.implements('Node')
    t.string('role', { nullable: false, resolve: resolvers.roleResolve })
    t.string('ligueName', { nullable: false, resolve: resolvers.ligueNameResolve })
    t.string('isAccepted', { nullable: false, resolve: resolvers.isAcceptedResolve })
    t.string('isBan', { nullable: false, resolve: resolvers.isBanResolve })
  }
})

// QUERIES

// export const UserArgumentInput = inputObjectType({
//   name: 'UserArgumentInput',
//   description: 'Input des arguments pour requêter les userAttribution',
//   definition (t) {
//     t.int('limit', { description: 'Nombre de user à récupérer', nullable: true })
//     t.int('skip', { description: "Nombre de user à passer avant d'appliquer la limite", nullable: true })
//   }
// })

// export const userQueryField = queryField('user', {
//   type: User,
//   nullable: false,
//   description: 'recupérer user par ID',
//   args: { id: objIdArg({ description: 'ID de User', nullable: false }) },
//   resolve: resolvers.userResolve
// })

// export const usersQueryField = queryField('users', {
//   list: true,
//   type: User,
//   nullable: false,
//   description: 'recupérer la liste des users',
//   args: { input: arg({ type: UserArgumentInput, nullable: true }) },
//   resolve: resolvers.usersResolve
// })

// MUTATION

export const CreateAcceptedInput = inputObjectType({
  name: 'CreateAcceptedInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.string('role', { nullable: false })
    t.string('ligueName', { nullable: false })
    t.string('isAccepted', { nullable: false })
    t.string('isBan', { nullable: false })
  }
})

export const createAcceptedMutationField = mutationField('createAccepted', {
  type: Accepted,
  nullable: false,
  args: { input: arg({ type: CreateAcceptedInput, nullable: true }) },
  resolve: resolvers.createAcceptedResolve
})

//UPDATE

export const UpdateAcceptedInput = inputObjectType({
    name: 'UpdateAcceptedInput',
    nullable: false,
    description: 'Input de modification de accepted',
    definition (t) {
      t.string('role', { nullable: true })
      t.string('ligueName', { nullable: true })
      t.string('isAccepted', { nullable: true })
      t.string('isBan', { nullable: true })
    }
  })
  
  export const UpdateAcceptedMutationField = mutationField('updateAccepted', {
    type: Accepted,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdateAcceptedInput, nullable: false }) },
    resolve: resolvers.updateAcceptedResolve
  })

  // DELETE

// export const deleteUserMutationField = mutationField('deleteUser', {
//     type: User,
//     nullable: false,
//     args: { id: objIdArg({ nullable: false }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deleteUserResolve(...params) }
//   })
  
//   export const deleteUsersMutationField = mutationField('deleteMaterials', {
//     type: User,
//     list: true,
//     nullable: false,
//     args: { ids: objIdArg({ nullable: false, list: true }), forceDelete: booleanArg({ nullable: true, default: false, description: 'Force la suppression et supprime en cascade' }) },
//     resolve: (...params) => { return resolvers.deleteUserResolve(...params) }
//   })
  
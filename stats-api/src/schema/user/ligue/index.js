
import { arg, idArg, inputObjectType, mutationField, objectType, queryField } from "nexus"
import { objIdArg } from "schema/globalNexusTypes"
import * as resolvers from "./resolvers"

export const Ligue = objectType({
  name: 'Ligue',
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

export const CreateLigueInput = inputObjectType({
  name: 'CreateLigueInput',
  nullable: false,
  description: 'Input de creation de accpted',
  definition (t) {
    t.string('role', { nullable: false })
    t.string('ligueName', { nullable: false })
    t.string('isAccepted', { nullable: false })
    t.string('isBan', { nullable: false })
  }
})

export const createLigueMutationField = mutationField('createLigue', {
  type: Ligue,
  nullable: false,
  args: { input: arg({ type: CreateLigueInput, nullable: true }) },
  resolve: resolvers.createLigueResolve
})

//UPDATE

export const UpdateLigueInput = inputObjectType({
    name: 'UpdateLigueInput',
    nullable: false,
    description: 'Input de modification de ligue',
    definition (t) {
      t.string('role', { nullable: true })
      t.string('ligueName', { nullable: true })
      t.string('isAccepted', { nullable: true })
      t.string('isBan', { nullable: true })
    }
  })
  
  export const UpdateLigueMutationField = mutationField('updateLigue', {
    type: Ligue,
    nullable: false,
    args: { id: objIdArg({ nullable: false }), input: arg({ type: UpdateLigueInput, nullable: false }) },
    resolve: resolvers.updateLigueResolve
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
  
// INPUT

export const LigueInput = inputObjectType({
  name: 'LigueInput',
  definition (t) {
    t.objID('id', {
      description: 'Id. Ne peut être utilisé conjointement avec input.',
      nullable: true,
      args: {}
    })
    t.field('input', {
      type: CreateLigueInput,
      description: 'Input. Ne peut être utilisé conjointement avec id.',
      nullable: true,
      args: {}
    })
  }
})
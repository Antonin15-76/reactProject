
import { stringArg, mutationField } from 'nexus'
import * as resolvers from './resolvers'

export const createUserMutationField = mutationField('createUser', {
  type: 'String',
  nullable: false,
  args: { username: stringArg({nullable: false}) },
  resolve: resolvers.createAppUserResolve
})

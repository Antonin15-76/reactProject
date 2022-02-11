
import { mutationField, objectType, queryField, inputObjectType, arg } from 'nexus'
import * as resolvers from './resolvers'
import { objIdArg } from 'schema/globalNexusTypes'

export const Test = objectType({
  name: 'test',
  description: 'test 1',
  definition (t) {
    t.implements('Node')
    t.string('name', { nullable: false, resolve: resolvers.nameResolve })
  }
})

// QUERIES

export const TestSearchInput = inputObjectType({
  name: 'BtpCardAttributionSearchInput',
  description: 'Arguments de recherche pour requêter les btpCardAttribution',
  definition (t) {
    t.string('name', { nullable: true, description: 'Le nom' })
  }
})

export const BtpCardAttributionArgumentInput = inputObjectType({
  name: 'BtpCardAttributionArgumentInput',
  description: 'Input des arguments pour requêter les btpCardAttribution',
  definition (t) {
    t.field('search', { type: TestSearchInput, description: 'Champs de recherche', nullable: true })
    // t.field('sort', { type: BtpCardAttributionSortInput, description: 'Champs pour ordonner les résultats', nullable: true })
    t.int('limit', { description: 'Nombre de test à récupérer', nullable: true })
    t.int('skip', { description: "Nombre de test à passer avant d'appliquer la limite", nullable: true })
  }
})

export const testQueryField = queryField('test', {
  type: Test,
  nullable: false,
  description: 'recupérer test par ID',
  args: { id: objIdArg({ description: 'ID de Test', nullable: false }) },
  resolve: resolvers.testResolve
})

// export const testsQueryField = queryField('tests', {
//   list: true,
//   type: Test,
//   nullable: false,
//   description: 'recupérer la liste des tests',
//   args: { },
//   resolve: resolvers.testsResolve
// })

// export const CreateTestInput = inputObjectType({
//   name: 'CreateTestInput',
//   nullable: false,
//   description: 'Input de creatin de test',
//   definition (t) {
//     t.string('name', { nullable: false })
//   }
// })

// export const createUserMutationField = mutationField('createUser', {
//   type: Test,
//   nullable: false,
//   args: { input: arg({ type: CreateTestInput, nullable: true }) },
//   resolve: resolvers.createTestResolve
// })

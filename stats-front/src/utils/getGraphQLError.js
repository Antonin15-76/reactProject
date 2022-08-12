export const getGraphQLError = (error) => {
  switch (error.graphQLErrors?.[0]?.extensions?.code) {
    case 'UNIQUE': {
      return "L'unicité n'est pas respectée."
    }
    case 'LOCKED': {
      return "L'élément est vérouillé"
    }
    case 'HAS_CHILDREN': {
      return "L'élément est utilisé par une autre ressource"
    }
    case 'INTERNAL_SERVER_ERROR': {
      return 'Erreur Interne'
    }
    case 'MULTIPLE_ERRORS': {
      return 'De multiples erreurs sont survenues'
    }
    default: break
  }
}

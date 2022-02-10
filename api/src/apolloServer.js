import { ApolloServer } from 'apollo-server-express'
import app from './server/expressApp'
import schema from './schema/schema.js'
// Fonction pour formatter les erreurs

const formatError = (err) => {
  // @TODO change by winston error logging
  console.error(JSON.stringify(err, null, 2))
  return err
}

// Fonction pour construire le contexte graphQL (tout ce qui est partagé enre les resolvers)
// Le contexte se construit à la requête

const getContext = async (contextParams, mongoClientPromise) => {
  const data = {
    timeZone: contextParams.req.header('TimeZone') || 'UTC',
    locale: contextParams.req.acceptsLanguages('fr') || 'en_GB',
  }

  const dbName =  process.env.MONGO_DATABASE

  const db = await mongoClientPromise.then((client) => client.db(dbName))
  return { ...data, db}
}

// Fonction pour construire le serveur graphQL

const getApolloServer = (mongoClientPromise) => {
  const server = new ApolloServer({
    tracing: true,
    cacheControl: true,
    schema,
    formatError,
    context: (...params) => getContext(...params, mongoClientPromise),
    playground: 'true',
    introspection: true
  })
  const httpServer = http.createServer(app)

  server.applyMiddleware({ app, cors: false })
  return httpServer
}

export default getApolloServer
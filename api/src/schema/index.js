/**
 * Point d'entrée du schéma graphQL. Il se charge de :
 * - Importer tous les types graphQL défini à partir du fichier "schema.js"
 */

 import { makeSchema, declarativeWrappingPlugin } from 'nexus'
 import path from 'path'
 import test from './test'

 const allTypes = require('./schema')
 
 const nexusSchema = makeSchema({
    plugins: [declarativeWrappingPlugin()],
   types: [
     ...Object.values(allTypes),
     ...test
   ],
 
   outputs: {
     schema: path.join(__dirname, '/schema.graphql'),
     typegen: path.join(__dirname, 'nexus-typegen.ts')
   }
 })
 
export default nexusSchema
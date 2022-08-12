/**
 * Point d'entrée du schéma graphQL. Il se charge de :
 * - Importer tous les types graphQL défini à partir du fichier "schema.js"
 */

import { makeSchema, declarativeWrappingPlugin } from 'nexus'
import path from 'path'
import ligue from './ligue'
import * as globalNexusTypes from './globalNexusTypes'
import * as user from './user'
import race from './race'
import * as Palmares from './ligue/classement/palmares'
import * as Team from './team'
import * as Driver from './driver'

const nexusSchema = makeSchema({
  plugins: [declarativeWrappingPlugin()],
  types: [
    ...Object.values(globalNexusTypes),
    ...Object.values(user),
    ...Object.values(Palmares),
    ...Object.values(Team),
    ...Object.values(Driver),
    ...race,
    ...ligue
  ],

  outputs: {
    schema: path.join(__dirname, 'schema.graphql'),
    typegen: path.join(__dirname, 'nexus-typegen.ts')
  }
})

export default nexusSchema
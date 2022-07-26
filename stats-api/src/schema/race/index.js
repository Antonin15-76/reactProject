import * as race from './infoRace'
import * as history from './history'

export default [
    ...Object.values(race),
    ...Object.values(history)
  ]
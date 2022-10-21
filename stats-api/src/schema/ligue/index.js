import seasons from './seasons'
import * as rediffusion from './rediffusion'
import * as infosLigue from './infosLigue'
import * as diffusionLive from './diffusionLive'
import * as classement from './classement'
import * as calendar from './calendar'
import * as number from './number'
import * as league from './league'

export default [
    ...Object.values(rediffusion),
    ...Object.values(infosLigue),
    ...Object.values(diffusionLive),
    ...Object.values(classement),
    ...Object.values(calendar),
    ...Object.values(number),
    ...Object.values(league),
    ...seasons,
  ]
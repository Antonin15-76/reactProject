import * as pilotes from './pilotes'
import * as teams from './teams'

export default [
    ...Object.values(pilotes),
    ...Object.values(teams)
  ]
// import { constructInput as constructPhoneBrandInput } from '../phoneBrand/constants'
export const pageSize = 50

export const constructVariables = (values, otherVariables) => {
  return {
    input: {
      name: values.name
    }
  }
}

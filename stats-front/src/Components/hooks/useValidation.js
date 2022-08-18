import { useState } from 'react'
import * as messages from '../../utils/joiLanguages'

const regExIsIndex = /[0-9]+/

const useValidation = (schema, context) => {
  const [errors, setErrors] = useState()
  const validate = (values, context) => {
    const { error } = schema.validate(values, { abortEarly: false, context, messages, errors: { language: 'french' } })
    if (error) {
      setErrors(formatErrors(error.details))
      return formatErrors(error.details)
    } else setErrors(null)
  }
  return {
    errors,
    validate,
    setErrors
  }
}

const formatErrors = (payload) => {
  const objError = payload.reduce((accu, x) => {
    if (x.type === 'array.unique') {
      accu[x.context.label] = x.message
      return accu
    }
    // Formate les erreurs au bon formats les tableaux sont transformés en objets
    const currentObj = formatError(accu, x.path, x.message)
    return currentObj
  }, {})
  // Format Pour avoir les tableaux
  const newObjError = formatErrorsTable(objError)
  return newObjError
}

const formatError = (obj, path, message) => {
  const currentObj = { ...obj }
  const currentPath = [...path]
  const currentField = currentPath.shift()
  if (currentPath.length === 0) {
    currentObj[currentField] = message
  } else {
    currentObj[currentField] = formatError(currentObj[currentField] || {}, currentPath, message)
  }
  return currentObj
}

const formatErrorsTable = (obj) => {
  const fields = Object.keys(obj)
  let currentResult
  const isArray = fields.reduce((acc, field) => acc && regExIsIndex.test(field), true) && fields.length > 0
  if (!isArray) {
    currentResult = {}
    for (const field of fields) {
      if (obj[field] instanceof Object) {
        currentResult[field] = formatErrorsTable(obj[field])
      } else {
        currentResult[field] = obj[field]
      }
    }
    return currentResult
  } else {
    currentResult = []
    const indexFields = fields.map(x => parseInt(x)).sort((x, y) => x <= y)
    let currentIndex = 0
    for (const index of indexFields) {
      while (index > currentIndex) {
        currentResult.push(null)
        currentIndex += 1
      }
      const stringField = `${index}`
      if (obj[stringField] instanceof Object) {
        currentResult.push(formatErrorsTable(obj[stringField]))
      } else {
        currentResult.push(obj[stringField])
      }
      currentIndex += 1
    }
  }
  return currentResult
}

export default useValidation

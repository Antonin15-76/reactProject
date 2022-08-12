import { gql } from '@apollo/client'
import { DateTime } from 'luxon'

export const deleteUpdateFunction = ({ functionBeforeUpdate = undefined, functionAfterUpdate = undefined, field1, field2 = 'delete' }, cache, result) => {
  if (functionBeforeUpdate) functionBeforeUpdate(result)
  const obj = result.data[field2]
  cache.modify({
    fields: {
      [field1]: (existingRefs, { readField }) => {
        return existingRefs.filter(
          ref => obj.id !== readField('id', ref)
        )
      }
    }
  })

  if (functionAfterUpdate) functionAfterUpdate(result)
}

export const currencyFormatter = new Intl.NumberFormat(DateTime.local().locale, { style: 'currency', currency: 'EUR' })
export const percentFormatter = new Intl.NumberFormat(DateTime.local().locale, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 2 })
export const number2FractionDigitsFormatter = new Intl.NumberFormat(DateTime.local().locale, { maximumFractionDigits: 2 })

export const userAgencySettingValueFragment = gql`fragment UserAgencySettingValueFragment on UserAgencySettingValue {
  value {
    ...on FloatBox { floatValue: value }
    ...on IntBox  { intValue: value }
    ...on StringBox { stringValue: value }
    ...on BooleanBox { booleanValue: value }
    ...on GraphQLDateBox { dateValue: value }
    ...on GraphQLDateTimeBox { dateTimeValue: value }
    ...on GraphQLTimeBox { timeValue: value }
    ...on GraphQLJSONBox { jsonValue: value }
    ...on GraphQLListBox { listValue: value {
      ...on WorkHours { day hours { id startHour endHour } }
      ...on CategoryNumber { category { id name } number }
      ...on FloatBox { floatValue: value }
      ...on IntBox  { intValue: value }
      ...on StringBox { stringValue: value }
      ...on BooleanBox { booleanValue: value }
      ...on GraphQLDateBox { dateValue: value }
      ...on GraphQLDateTimeBox { dateTimeValue: value }
      ...on GraphQLTimeBox { timeValue: value }
      ...on GraphQLJSONBox { jsonValue: value }
    } }
  }
}`

export const getValueForType = (type, subType, value) => {
  switch (type) {
    case 'FloatBox': return !value ? '' : value.floatValue
    case 'IntBox': return !value ? '' : value.intValue
    case 'StringBox': return !value ? '' : value.stringValue
    case 'BooleanBox': return !value ? '' : value.booleanValue
    case 'GraphQLDateBox': return !value ? '' : value.dateValue
    case 'GraphQLDateTimeBox': return !value ? '' : value.dateTimeValue
    case 'GraphQLJSONBox': return !value ? '' : value.jsonValue
    case 'GraphQLListBox': return !value ? '' : value.listValue.map(x => getValueForType(subType, null, x))
    default: return value
  }
}

export const removeFromArrayWithIndex = (array = [], index) => {
  return [...array.slice(0, index), ...array.slice(index + 1)]
}

export const removeIndex = (tab, index) => {
  return tab.filter((elem, idx) => idx !== index)
}

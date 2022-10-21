import BaseJoi from 'joi'
import libphonenumber from 'google-libphonenumber'
const PhoneUtil = libphonenumber.PhoneNumberUtil.getInstance()

/**
 * @param {BaseJoi} joi
 */

const phoneNumber = joi => ({
  base: joi.string(),
  type: 'string',
  messages: {
    'string.phoneNumber': '{{#label}} is invalid'
  },
  rules: {
    phoneNumber: {
      method (alpha2) {
        return this.$_addRule({ name: 'phoneNumber', args: { alpha2 } })
      },
      args: [{
        name: 'alpha2',
        ref: true,
        assert: value => typeof value === 'string',
        message: 'must be a string'
      }],
      validate (value, helpers, args, options) {
        const alpha2 = args.alpha2
        try {
          const proto = PhoneUtil.parse(value, alpha2)
          if (!PhoneUtil.isPossibleNumber(proto) || !PhoneUtil.isValidNumber(proto) || !PhoneUtil.isValidNumberForRegion(proto, alpha2)) {
            return helpers.error('string.phoneNumber', { value })
          }
          return value
        } catch (err) {
          console.error(err)
          const knownErrors = ['Invalid country calling code', 'The string supplied did not seem to be a phone number', 'Invalid phone number']
          // We ignore the next line for line coverage since we should always hit it but if we have a regression in our code we still want to surface that instead of just returning the default error
          /* istanbul ignore next */
          if (knownErrors.includes(err.message)) {
            // Generate an error, state and options need to be passed
            return helpers.error('string.phoneNumber', { value })
          }

          /* istanbul ignore next */
          throw err
        }
      }
    }
  }
})

/**
 * @type {BaseJoi}
 */
const Joi = BaseJoi.extend(phoneNumber)

export default Joi

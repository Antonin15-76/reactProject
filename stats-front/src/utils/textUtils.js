import { DateTime, Duration } from 'luxon'

const chars = [
  'AaÁáÀàÂâÄäAĄąȺⱥǍǎȦȧẠạĀāÃãå',
  'CcĆćĈĉÇçȻȼČčĊċ',
  'EeÉéÈèÊêËëȨȩĘęɆɇĚěĖėẸẹĒēẼẽ',
  'IiÍíÌìÎîÏïĮįƗɨǏǐİiỊịĪīĨĩ',
  'JjĴĵɈɉǰ',
  'LlĹĺĻļŁłȽƚĽľḶḷ',
  'NnŃńǸǹŅņꞤꞥŇňṅṆṇÑñ',
  'OoÓóÒòÔôÖöǪǫØøƟɵǑǒȮȯỌọŌōÕõ',
  'SsŚśŜŝŞşꞨꞩŠšṠṡṢṣ',
  'TtẗŢţȾⱦŦŧŤťṪṫṬṭ',
  'UuÚúÙùÛûÜüŲųɄʉǓǔỤụŪūŨũ',
  'YyÝýỲỳŶŷŸÿɎɏẎẏỴỵȲȳỸỹ',
  'ZzŹźẐẑƵƶŽžŻżẒẓ'
]

const accentChars = chars.reduce((accu, x) => `${accu}${x}`, '')

export const toStartCase = (str) => {
  const reg = new RegExp(`(\\w|[${accentChars}])+`, 'g')
  return str.replace(reg, firstLetterUppercase)
}

export const firstLetterUppercase = (s) => {
  if (!s) return ''
  if (s === 'n/a' || s === 'N/A') return 'N/A'
  return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
}

// const PhoneUtil = PhoneNumberUtil.getInstance()

export const formatDateTimeServerForm = (date, time) => {
  if (!date) return undefined
  if (!time) return DateTime.fromISO(date).setLocale('fr').toISO({ suppressMilliseconds: true, suppressSeconds: true, includeOffset: false })
  const dateText = formatDateServer(date)
  const timeText = DateTime.fromISO(time).setLocale('fr').toFormat('HH:mm')
  return `${dateText}T${timeText}`
}

export const formatDateServerForm = date => {
  if (!date) return ''
  return DateTime.fromISO(date).toISODate()
}

export const formatDateTimeServer = (date) => {
  if (!date) return null
  return DateTime.fromISO(date, { zone: DateTime.local().zone }).setLocale('fr').toISO()
}

export const formatDateTimeClient = date => date ? DateTime.fromISO(date).setLocale('fr').toFormat('dd/MM/yyyy à HH:mm') : 'N/A'
export const formatTimeClient = date => date ? DateTime.fromISO(date).setLocale('fr').toFormat('HH:mm') : 'N/A'
export const formatDateServer = date => date ? DateTime.fromISO(date).setLocale('fr').toFormat('yyyy-MM-dd') : 'N/A'
export const formatDateClient = date => date ? DateTime.fromISO(date).setLocale('fr').toFormat('dd/MM/yyyy') : 'N/A'

export const getTodayISO = (onlyDate = false) => {
  if (onlyDate) return DateTime.local().set({ second: 0, millisecond: 0 }).toISODate()
  return DateTime.local().set({ second: 0, millisecond: 0 }).toISO({ suppressMilliseconds: true, suppressSeconds: true, includeOffset: false })
}

export const formatDuration = (durationMillis, shiftTo = ['years', 'months', 'days'], floor = false) => {
  const duration = Duration.fromMillis(durationMillis, { conversionAccuracy: 'longterm' }).shiftTo(...shiftTo).toObject()
  let string = ''
  if (duration.years) {
    string = duration.years > 1 ? `${(floor ? Math.floor : Math.round)(duration.years)} Ans` : '1 An'
  }
  if (duration.months) {
    const months = (floor ? Math.floor : Math.round)(duration.months)
    string = string ? `${string}, ${months} Mois` : `${months} Mois`
  }
  if (duration.weeks) {
    const weeks = (floor ? Math.floor : Math.round)(duration.weeks)
    if (weeks > 1) string = string ? `${string}, ${weeks} Semaines` : `${weeks} Semaines`
    else string = string ? `${string}, ${weeks} Semaine` : `${weeks} Semaine`
  }
  if (duration.days) {
    const days = (floor ? Math.floor : Math.round)(duration.days)

    if (days > 1) string = string ? `${string}, ${days} Jours` : `${days} Jours`
    else string = string ? `${string}, ${days} Jour` : `${days} Jour`
  }
  if (duration.hours) {
    const hours = (floor ? Math.floor : Math.round)(duration.hours)

    if (hours > 1) string = string ? `${string}, ${hours} Heures` : `${hours} Heures`
    else string = string ? `${string}, ${hours} Heure` : `${hours} Heure`
  }
  if (duration.minutes) {
    const minutes = (floor ? Math.floor : Math.round)(duration.minutes)
    if (minutes > 1) string = string ? `${string}, ${minutes} Minutes` : `${minutes} Minutes`
    else string = string ? `${string}, ${minutes} Minute` : `${minutes} Minute`
  }
  return string || 'N/A'
}

export const formatDurationShort = (durationMillis, shiftTo = ['years', 'months', 'days'], floor = false) => {
  const duration = Duration.fromMillis(durationMillis, { conversionAccuracy: 'longterm' }).shiftTo(...shiftTo).toObject()
  let string = ''
  if (duration.years) {
    string = duration.years > 1 ? `${(floor ? Math.floor : Math.round)(duration.years)}A` : '1A'
  }
  if (duration.months) {
    const months = (floor ? Math.floor : Math.round)(duration.months)
    string = string ? `${string} ${months}M` : `${months}M`
  }
  if (duration.weeks) {
    const weeks = (floor ? Math.floor : Math.round)(duration.weeks)
    if (weeks > 1) string = string ? `${string} ${weeks}S` : `${weeks}S`
    else string = string ? `${string} ${weeks}S` : `${weeks}S`
  }
  if (duration.days) {
    const days = (floor ? Math.floor : Math.round)(duration.days)

    if (days > 1) string = string ? `${string} ${days}J` : `${days}J`
    else string = string ? `${string} ${days}J` : `${days}J`
  }
  if (duration.hours) {
    const hours = (floor ? Math.floor : Math.round)(duration.hours)

    if (hours > 1) string = string ? `${string} ${hours}H` : `${hours}H`
    else string = string ? `${string} ${hours}H` : `${hours}H`
  }
  if (duration.minutes) {
    const minutes = (floor ? Math.floor : Math.round)(duration.minutes)
    if (minutes > 1) string = string ? `${string} ${minutes}m` : `${minutes}m`
    else string = string ? `${string} ${minutes}m` : `${minutes}m`
  }
  return string || 'N/A'
}

// export const fuzzyFilterSimple = (haystack, needle, dataLabel, threshold) => {
//   if (needle) {
//     const fuse = new Fuse(haystack, {
//       shouldSort: true,
//       keys: [{ name: dataLabel, weight: 1 }],
//       threshold: threshold
//     })
//     return fuse.search(needle.toString())
//   }
//   return haystack
// }

// export const fuzzyFilterWithKeys = (haystack, needle, keys, threshold) => {
//   if (needle && needle.length > 1) {
//     const fuse = new Fuse(haystack, {
//       shouldSort: true,
//       keys,
//       threshold
//     })
//     return fuse.search(needle.toString())
//   }
//   return haystack
// }

export const testOnlyLetters = (text) => {
  return /^[a-zA-Z]+$/.test(text)
}

export const testOnlyNumbers = (text) => {
  return !Number.isNaN(text)
}

const reg = /[a-z0-9]+([_|\\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\\.|-]{1}[a-z0-9]+)*[\\.]{1}[a-z]{2,6}'/i
export const isValidEmail = (mail) => {
  return reg.test(mail)
}

// export const isValidPhoneNumber = (phoneNumber, alpha2) => {
//   try {
//     const number = PhoneUtil.parse(phoneNumber, alpha2.toUpperCase())
//     return PhoneUtil.isPossibleNumber(number) && PhoneUtil.isValidNumber(number) && PhoneUtil.isValidNumberForRegion(number, alpha2.toUpperCase())
//   } catch (err) {
//     return false
//   }
// }

export const precisionRound = (number, precision) => {
  const factor = Math.pow(10, precision)
  return Math.round(number * factor) / factor
}

export const formatAddressText = ({ country, zipCodeCity, addressSupplement, mainLine2, mainLine3, mainRoute }) => {
  const countryName = country ? country.primaryText.replace(/\[VIDE\]/gi, '').replace(/\(.*\)/, '') : ''
  const zipCodeCityName = zipCodeCity ? zipCodeCity.primaryText.replace(/\[VIDE\]/gi, '') : ''
  const mainRouteText = mainRoute ? mainRoute.text.replace(/\[VIDE\]/gi, '') : ''
  const addressSupplementName = addressSupplement ? addressSupplement.primaryText.replace(/\[VIDE\]/gi, '') : ''
  const mainLine2Text = mainLine2 ? mainLine2.primaryText.replace(/\[VIDE\]/gi, '').replace(/\[NOUVEAU\]/gi, '') : ''
  const mainLine3Text = mainLine3 ? mainLine3.primaryText.replace(/\[VIDE\]/gi, '').replace(/\[NOUVEAU\]/gi, '') : ''
  let text = `${mainLine2Text}`.trim()
  text = `${text} ${mainLine3Text}`.trim()
  text = `${text} ${mainRouteText}`.trim()
  text = `${text} ${addressSupplementName}`.trim()
  text = `${text} ${zipCodeCityName}`.trim()
  text = `${text} ${countryName}`.trim()
  return text.trim().toUpperCase()
}

export const formatAddressText2 = (country, zipCodeCity, routeValue, addressSupplement, line3, line2) => {
  const texts = [
    [line2.name.replace('[VIDE]', ''), line3.name.replace('[VIDE]', '')],
    [routeValue.routeNb.fullName.replace('[VIDE]', ''), routeValue.route.name.replace('[VIDE]', '')],
    [addressSupplement.name.replace('[VIDE]', '')],
    [zipCodeCity.label.replace('[VIDE]', '')],
    [country.name]
  ]
  const text = texts.reduce((accu, texts) => {
    return [...accu, texts.join(' ').trim()]
  }, []).filter(x => !!x).join(', ')

  return text.toUpperCase()
}

export const formatClient = (clientAccount, agency2, paying = true) => {
  if (paying) {
    if (clientAccount.clientType.clientCategory === 'INDIVIDUAL') return formatHuman(clientAccount.client)
    return agency2 ? formatAgency2(clientAccount.client) : formatAgency(clientAccount.client)
  }

  if (clientAccount.clientCategory === 'INDIVIDUAL') return formatHuman(clientAccount.client)
  return agency2 ? formatAgency2(clientAccount.client) : formatAgency(clientAccount.client)
}

export const formatClientOrder = (clientOrderAccount, agency2) => {
  const order = formatClient(clientOrderAccount, agency2, false)
  const paying = formatClient(clientOrderAccount.clientPayingAccount, agency2)

  return `${order} [Compte Client ${paying}]`
}

export const formatAgency = (agency) => {
  if (!agency) return ''
  const internalName = (agency.internalName || 'N/A').toUpperCase()
  const commercialName = (agency.commercialName || 'N/A').toUpperCase()
  const siret = agency.siret
  return `${internalName} [${commercialName} - ${siret}]`
}

export const formatAgency2 = (agency) => {
  if (!agency) return ''
  const name = (agency.internalName || agency.commercialName).toUpperCase()
  const siret = agency.siret
  return `${name} [${siret}]`
}

export const formatHuman = human => {
  return `${human.usualName.toUpperCase()} ${toStartCase(human.usualFirstName)}`
}

export const formatEmployee = employee => {
  return `${formatHuman(employee)} (${employee.employeeCode.toUpperCase()})`
}

/**
 * Renvoie vrai ou faux suivant si la première lettre du mot doit être accompagnée d'une apostrophe
 * @param s La châine de caractères à vérifier
 * @returns On doit mettre une apostrophe ou non
 */
export const putApostrophe = (s) => {
  if (typeof s !== 'string') return false
  return ['a', 'e', 'i', 'o', 'u', 'y', 'h'].includes(s.charAt(0).toLowerCase())
}

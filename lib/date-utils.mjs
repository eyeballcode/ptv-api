import { DateTime } from 'luxon'

let melbourneTime = 'Australia/Melbourne'

// Note: Need to allow for SA time as PTV does not handle cross border times well... or at all
export function parseISOTime(time) {
  return DateTime.fromISO(time, { zone: melbourneTime })
}

export function parseMSTime(time) {
  return DateTime.fromMillis(time, { zone: melbourneTime })
}

export function dateLikeToISO(date) {
  if (date instanceof Date) return date.toISOString()
  if (date instanceof DateTime) return date.toUTC().toISO()

  let parsed = parseISOTime(date)
  if (parsed.isValid) return parsed.toUTC().toISO()

  throw new RangeError(`${date} is not a valid time string!`)
}
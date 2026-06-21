/**
 * parse
 * Safe parsers for common types — always returns Result, never throws.
 *
 * Dependencies: result.js
 * Exports: parseJSON, parseNumber, parseDate, parseBoolean
 */

import { ok, err } from './result.js'

export const parseJSON = (input) => {
  if (typeof input !== 'string') return err('parseJSON: input must be a string')
  try {
    return ok(JSON.parse(input))
  } catch (e) {
    return err(`parseJSON: ${e.message}`)
  }
}

export const parseNumber = (input) => {
  const n = Number(input)
  if (Number.isNaN(n)) return err(`parseNumber: "${input}" is not a valid number`)
  return ok(n)
}

export const parseDate = (input) => {
  if (!input) return err('parseDate: input is empty')
  const d = new Date(input)
  if (isNaN(d.getTime())) return err(`parseDate: "${input}" is not a valid date`)
  return ok(d)
}

export const parseBoolean = (input) => {
  if (input === true  || input === 'true'  || input === '1') return ok(true)
  if (input === false || input === 'false' || input === '0') return ok(false)
  return err(`parseBoolean: "${input}" is not a valid boolean`)
}

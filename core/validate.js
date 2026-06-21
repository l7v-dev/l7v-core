/**
 * validate
 * Input validation primitives — returns Result, composes cleanly.
 *
 * Dependencies: result.js
 * Exports: required, minLength, maxLength, isEmail, isUrl, inRange, matches
 */

import { ok, err } from './result.js'

export const required = (value, field = 'value') => {
  if (value === null || value === undefined || value === '') {
    return err(`${field} is required`)
  }
  return ok(value)
}

export const minLength = (value, min, field = 'value') => {
  if (typeof value !== 'string') return err(`${field} must be a string`)
  if (value.length < min) return err(`${field} must be at least ${min} characters`)
  return ok(value)
}

export const maxLength = (value, max, field = 'value') => {
  if (typeof value !== 'string') return err(`${field} must be a string`)
  if (value.length > max) return err(`${field} must be at most ${max} characters`)
  return ok(value)
}

export const isEmail = (value, field = 'value') => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!pattern.test(value)) return err(`${field} must be a valid email`)
  return ok(value)
}

export const isUrl = (value, field = 'value') => {
  try {
    new URL(value)
    return ok(value)
  } catch {
    return err(`${field} must be a valid URL`)
  }
}

export const inRange = (value, min, max, field = 'value') => {
  const n = Number(value)
  if (Number.isNaN(n)) return err(`${field} must be a number`)
  if (n < min || n > max) return err(`${field} must be between ${min} and ${max}`)
  return ok(n)
}

export const matches = (value, pattern, field = 'value') => {
  if (!pattern.test(value)) return err(`${field} does not match required format`)
  return ok(value)
}

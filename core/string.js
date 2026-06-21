/**
 * string
 * String utilities — named by what they do, no bloat.
 *
 * Dependencies: none
 * Exports: slugify, truncate, capitalize, camelToKebab, kebabToCamel, padStart, padEnd, strip
 */

export const slugify = (str) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

export const truncate = (str, max, suffix = '...') => {
  if (str.length <= max) return str
  return str.slice(0, max - suffix.length) + suffix
}

export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

export const camelToKebab = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

export const kebabToCamel = (str) =>
  str.replace(/-([a-z])/g, (_, char) => char.toUpperCase())

export const strip = (str, char = ' ') => {
  const escaped = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return str.replace(new RegExp(`^${escaped}+|${escaped}+$`, 'g'), '')
}

export const padStart = (str, length, char = ' ') =>
  String(str).padStart(length, char)

export const padEnd = (str, length, char = ' ') =>
  String(str).padEnd(length, char)

/**
 * transform
 * Data transformation utilities — pure, no side effects.
 *
 * Dependencies: none
 * Exports: pick, omit, flatten, groupBy, unique, chunk, deepMerge
 */

export const pick = (obj, keys) =>
  keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key]
    return acc
  }, {})

export const omit = (obj, keys) => {
  const keySet = new Set(keys)
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !keySet.has(k)))
}

export const flatten = (arr, depth = 1) => arr.flat(depth)

export const groupBy = (arr, keyFn) =>
  arr.reduce((acc, item) => {
    const key = keyFn(item)
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

export const unique = (arr, keyFn = (x) => x) => {
  const seen = new Set()
  return arr.filter((item) => {
    const key = keyFn(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export const chunk = (arr, size) => {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export const deepMerge = (target, ...sources) => {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const val = source[key]
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        target[key] = deepMerge(target[key] ?? {}, val)
      } else {
        target[key] = val
      }
    }
  }
  return target
}

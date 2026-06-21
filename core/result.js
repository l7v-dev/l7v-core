/**
 * result
 * Explicit success/failure type — no throwing, no surprises.
 *
 * Dependencies: none
 * Exports: ok, err, isOk, isErr, unwrap, map, mapErr, chain
 */

export const ok  = (value) => ({ ok: true,  value })
export const err = (error) => ({ ok: false, error })

export const isOk  = (result) => result.ok === true
export const isErr = (result) => result.ok === false

/** Throws if result is err — use only at boundaries, never in library code */
export const unwrap = (result) => {
  if (result.ok) return result.value
  throw new Error(String(result.error))
}

/** Transform value if ok, pass error through unchanged */
export const map = (result, fn) => {
  if (!result.ok) return result
  return ok(fn(result.value))
}

/** Transform error if err, pass value through unchanged */
export const mapErr = (result, fn) => {
  if (result.ok) return result
  return err(fn(result.error))
}

/** Chain a result-returning function — flat map */
export const chain = (result, fn) => {
  if (!result.ok) return result
  return fn(result.value)
}

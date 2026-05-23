import isNonEmpty from './isNonEmpty'
import { omitMany } from './omitKey'

export default function stripEmptyFields<T extends Record<string, any>>(
  obj: T,
) {
  const fieldsTBR = Object.keys(obj).reduce(
    (acc, curr) => {
      if (!isNonEmpty(obj[curr])) {
        acc.push(curr)
      }

      return acc
    },
    [] as (keyof T)[],
  )

  return omitMany(obj, fieldsTBR)
}

export default function isNonEmpty<T>(
  data: T | undefined | null | '' | 'undefined' | 'null',
): data is T {
  if (
    data === null ||
    data === undefined ||
    data === '' ||
    data === 'undefined' ||
    data === 'null'
  ) {
    return false
  }

  return true
}
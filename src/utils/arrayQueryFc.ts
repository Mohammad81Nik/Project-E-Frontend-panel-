export default function arrayQueryFc(
  key: string,
  array: (string | number)[],
): string {
  return array
    .reduce((acc, curr) => {
      acc.push(`${key}s[]=${curr}`)

      return acc
    }, [] as string[])
    .join('&')
}

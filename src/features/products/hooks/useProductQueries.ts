import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { productQueries } from '../constants/product.queries'
import { useParams } from '@tanstack/react-router'

export function useGetAll() {
  return useQuery(productQueries.getAll())
}
export function useGetOneSuspense() {
  const search = useParams({ from: '/_authenticated/products/$productId' })

  return useSuspenseQuery(productQueries.getOne(search.productId))
}
export function useCreate() {
  return useMutation(productQueries.create())
}
export function useUpdate() {
  return useMutation(productQueries.update())
}
export function useDelete() {
  return useMutation(productQueries.delete())
}

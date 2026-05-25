import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { brandQueries } from '../constants/brand.queries'
import { useParams } from '@tanstack/react-router'
import type { SearchParamsDto } from '../schemas'

export function useGetAll(search?: SearchParamsDto) {
  return useQuery(brandQueries.getAll(search))
}

export function useGetOneSuspense() {
  const params = useParams({ from: '/_authenticated/brands/$brandId' })

  return useSuspenseQuery(brandQueries.getOne(params.brandId))
}

export function useCreate() {
  return useMutation(brandQueries.create())
}

export function useUpdate() {
  return useMutation(brandQueries.update())
}

export function useUpdateImage() {
  return useMutation(brandQueries.updateImage())
}
export function useDelete() {
  return useMutation(brandQueries.delete())
}

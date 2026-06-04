import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { attributeQueries } from '../constants/attribute.queries'
import { useParams, useSearch } from '@tanstack/react-router'

export function useGetAll() {
  const search = useSearch({ from: '/_authenticated/attributes/' })
  return useQuery(attributeQueries.getAll(search))
}

export function useGetOne(id: string) {
  return useQuery(attributeQueries.getOne(id))
}

export function useGetAllPageLess() {
  return useQuery(attributeQueries.getAllPageLess())
}

export function useGetOneSuspense() {
  const params = useParams({ from: '/_authenticated/attributes/$attributeId' })

  return useSuspenseQuery(attributeQueries.getOne(params.attributeId))
}

export function useCreate() {
  return useMutation({ ...attributeQueries.create() })
}
export function useUpdate() {
  return useMutation({ ...attributeQueries.update() })
}
export function useDelete() {
  return useMutation({ ...attributeQueries.delete() })
}

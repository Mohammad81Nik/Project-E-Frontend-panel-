import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { adminQueries } from '../constants/admin.queries'
import type { SearchParamsDto } from '../schemas'
import { useParams } from '@tanstack/react-router'

export function useGetAll(searchParams?: SearchParamsDto) {
  return useQuery(adminQueries.getAll(searchParams))
}

export function useGetOne() {
  return useQuery(adminQueries.getOne(''))
}

export function useGetOneSuspense() {
  const params = useParams({ from: '/_authenticated/admins/$adminId' })

  return useSuspenseQuery(adminQueries.getOne(params.adminId))
}

export function useCreate() {
  return useMutation({ ...adminQueries.create() })
}

export function useUpdate() {
  return useMutation({ ...adminQueries.update() })
}

export function useDelete() {
  return useMutation({ ...adminQueries.delete() })
}

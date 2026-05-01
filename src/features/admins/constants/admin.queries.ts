import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { adminServices } from '../services'
import type { SearchParamsDto } from '../schemas'

export const adminQueries = {
  getAll: (searchParams?: SearchParamsDto) =>
    queryOptions({
      queryKey: ['admins', 'list', searchParams],
      queryFn: () => adminServices.getAll(searchParams),
    }),
  getOne: (id: string) =>
    queryOptions({
      queryKey: ['admin', 'details', id],
      queryFn: () => adminServices.getOne(id),
    }),
  create: () =>
    mutationOptions({
      mutationKey: ['admin', 'create'],
      mutationFn: adminServices.create,
    }),
  update: () =>
    mutationOptions({
      mutationKey: ['admin', 'update'],
      mutationFn: adminServices.update,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: ['admin', 'delete'],
      mutationFn: adminServices.delete,
    }),
}

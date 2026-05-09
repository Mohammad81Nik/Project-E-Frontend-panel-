import { mutationOptions, queryOptions } from '@tanstack/react-query'
import type { SearchParamsDto } from '../schemas'
import { attributeServices } from '../services'

export const attributeQueries = {
  getAll: (searchParams?: SearchParamsDto) =>
    queryOptions({
      queryFn: () => attributeServices.getAll(searchParams),
      queryKey: ['attribute', 'list', searchParams],
    }),
  getOne: (id: string) =>
    queryOptions({
      queryFn: () => attributeServices.getOne(id),
      queryKey: ['attribute', id],
    }),

  create: () =>
    mutationOptions({
      mutationFn: attributeServices.create,
      mutationKey: ['attribute', 'create'],
    }),
  update: () =>
    mutationOptions({
      mutationFn: attributeServices.update,
      mutationKey: ['attribute', 'update'],
    }),
  delete: () =>
    mutationOptions({
      mutationFn: attributeServices.delete,
      mutationKey: ['attribute', 'delete'],
    }),
}

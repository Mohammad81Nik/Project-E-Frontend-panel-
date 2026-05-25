import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { brandServices } from '../services'
import type { SearchParamsDto } from '../schemas'

export const brandQueries = {
  getAll: (searchParams?: SearchParamsDto) =>
    queryOptions({
      queryKey: ['brands', 'list', searchParams],
      queryFn: () => brandServices.getAll(searchParams),
    }),
  getOne: (id: string) =>
    queryOptions({
      queryKey: ['customer', 'detail', id],
      queryFn: () => brandServices.getOne(id),
    }),
  create: () =>
    mutationOptions({
      mutationKey: ['brand', 'create'],
      mutationFn: brandServices.create,
    }),
  update: () =>
    mutationOptions({
      mutationKey: ['brand', 'update'],
      mutationFn: brandServices.update,
    }),
  updateImage: () =>
    mutationOptions({
      mutationKey: ['brand', 'update', 'image'],
      mutationFn: brandServices.updateImage,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: ['brand', 'delete'],
      mutationFn: brandServices.delete,
    }),
}

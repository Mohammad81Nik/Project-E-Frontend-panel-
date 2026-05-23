import { mutationOptions, queryOptions } from '@tanstack/react-query'
import type { SearchParamsDto } from '../schemas'
import { productServices } from '../services'

export const productQueries = {
  getAll: (searchParams?: SearchParamsDto) =>
    queryOptions({
      queryKey: ['products', 'list', searchParams],
      queryFn: () => productServices.getAll(searchParams),
    }),
  getOne: (id: string) =>
    queryOptions({
      queryKey: ['product', 'details', id],
      queryFn: () => productServices.getOne(id),
    }),
  create: () =>
    mutationOptions({
      mutationKey: ['product', 'create'],
      mutationFn: productServices.create,
    }),
  update: () =>
    mutationOptions({
      mutationKey: ['product', 'udpate'],
      mutationFn: productServices.update,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: ['produdct', 'delete'],
      mutationFn: productServices.delete,
    }),
}

import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { categoryServices } from '../services'

export const categoryQueries = {
  getAll: () =>
    queryOptions({
      queryKey: ['category', 'list'],
      queryFn: categoryServices.getAll,
    }),
  getAllPageLess: () =>
    queryOptions({
      queryKey: ['category', 'list', 'pageless'],
      queryFn: categoryServices.getAllPageLess,
    }),
  create: () =>
    mutationOptions({
      mutationKey: ['category', 'create'],
      mutationFn: categoryServices.create,
    }),
  update: () =>
    mutationOptions({
      mutationKey: ['category', 'update'],
      mutationFn: categoryServices.update,
    }),
  updateImage: () =>
    mutationOptions({
      mutationKey: ['category', 'image', 'update'],
      mutationFn: categoryServices.updateImage,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: ['category', 'delete'],
      mutationFn: categoryServices.delete,
    }),
}

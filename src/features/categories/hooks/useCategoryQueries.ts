import { useMutation, useQuery } from '@tanstack/react-query'
import { categoryQueries } from '../constants/categoryQueries'

export function useGetAllCategories() {
  return useQuery(categoryQueries.getAll())
}

export function useCreate() {
  return useMutation(categoryQueries.create())
}

export function useUpdate() {
  return useMutation(categoryQueries.update())
}

export function useUpdateImage() {
  return useMutation(categoryQueries.updateImage())
}

export function useDelete() {
  return useMutation(categoryQueries.delete())
}

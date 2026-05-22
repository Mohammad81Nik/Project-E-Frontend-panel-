import axiosInstance from '#/lib/axios'
import type { IApiRepsonse } from '#/types/api'
import type { AxiosError } from 'axios'
import type { ICategory } from '../types'
import type {
  CreateCategoryDto,
  UpdateCategoryDto,
  UpdateCategoryImageDto,
} from '../schemas'
import isNonEmpty from '#/utils/isNonEmpty'

export const categoryServices = {
  async getAll() {
    try {
      const response =
        await axiosInstance.get<IApiRepsonse<ICategory[]>>('/admin/categories')

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const formData = new FormData()
      const { title, parentId, description, image } = createCategoryDto

      formData.append('title', title)

      isNonEmpty(parentId) && formData.append('parentId', parentId)

      isNonEmpty(description) && formData.append('description', description)

      isNonEmpty(image) && formData.append('image', image)

      const response = await axiosInstance.post<IApiRepsonse<ICategory>>(
        '/admin/categories',
        formData,
        {
          headers: {
            'Content-Type': 'Multipart/form-data',
          },
        },
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },

  async update({
    id,
    updateCategoryDto,
  }: {
    id?: string
    updateCategoryDto: UpdateCategoryDto
  }) {
    try {
      const { title, description } = updateCategoryDto

      const response = await axiosInstance.put<IApiRepsonse<ICategory>>(
        `/admin/categories/${id}`,
        {
          title,
          description,
        },
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },

  async updateImage(updateCategoryImageDto: UpdateCategoryImageDto) {
    try {
      const { id, image } = updateCategoryImageDto

      const formData = new FormData()

      formData.append('id', id)
      formData.append('image', image)

      const response = await axiosInstance.post<IApiRepsonse<ICategory>>(
        '/admin/categories/update/image',
        formData,
        {
          headers: {
            'Content-Type': 'Multipart/form-data',
          },
        },
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },

  async delete(id?: string) {
    try {
      const response = await axiosInstance.delete<IApiRepsonse<null>>(
        `/admin/categories/${id}`,
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },
}

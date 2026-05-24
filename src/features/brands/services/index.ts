import axiosInstance from '#/lib/axios'
import type { IApiPaginatedResponse, IApiRepsonse } from '#/types/api'
import isNonEmpty from '#/utils/isNonEmpty'
import type {
  CreateBrandDto,
  SearchParamsDto,
  UpdateBrandDto,
  UpdateBrandImageDto,
} from '../schemas'
import type { IBrand } from '../types'

export const brandServices = {
  async getAll(searchParams?: SearchParamsDto) {
    try {
      const response = await axiosInstance.get<IApiPaginatedResponse<IBrand>>(
        '/admin/brands',
        {
          params: searchParams,
        },
      )

      return response.data
    } catch (err) {
      throw err
    }
  },
  async getOne(id: string) {
    try {
      const response = await axiosInstance.get<IApiRepsonse<IBrand>>(
        `/admin/brands/${id}`,
      )

      return response.data
    } catch (err) {
      throw err
    }
  },

  async create(createBrandSchema: CreateBrandDto) {
    try {
      const { name, description, image } = createBrandSchema

      const formData = new FormData()

      formData.append('name', name)

      isNonEmpty(image) && formData.append('image', image)

      isNonEmpty(description) && formData.append('description', description)

      const response = await axiosInstance.post<IApiRepsonse<IBrand>>(
        '/admin/brands',
        formData,
        {
          headers: {
            'Content-Type': 'Multipart/form-data',
          },
        },
      )

      return response.data
    } catch (err) {
      throw err
    }
  },
  async update({
    id,
    updateBrandDto,
  }: {
    id: string
    updateBrandDto: UpdateBrandDto
  }) {
    try {
      const response = await axiosInstance.put<IApiRepsonse<IBrand>>(
        `/admin/brands/${id}`,
        updateBrandDto,
      )

      return response.data
    } catch (err) {
      throw err
    }
  },
  async updateImage(updateBrandImageDto: UpdateBrandImageDto) {
    try {
      const { image, id } = updateBrandImageDto

      const formData = new FormData()

      formData.append('id', id)

      formData.append('image', image)

      const response = await axiosInstance.post<IApiRepsonse<IBrand>>(
        '/admin/brands',
        formData,
        {
          headers: {
            'Content-Type': 'Multipart/form-data',
          },
        },
      )

      return response.data
    } catch (err) {
      throw err
    }
  },
  async delete(id: string) {
    try {
      const response = await axiosInstance.delete<IApiRepsonse<IBrand>>(
        `/admin/brands/${id}`,
      )

      return response.data
    } catch (err) {
      throw err
    }
  },
}

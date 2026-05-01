import axiosInstance from '#/lib/axios'
import type { IApiPaginatedResponse, IApiRepsonse } from '#/types/api'
import type { AxiosError } from 'axios'
import type {
  CreateAdminDto,
  SearchParamsDto,
  UpdateAdminDto,
} from '../schemas'
import type { IAdmin } from '../types'
import arrayQueryFc from '#/utils/arrayQueryFc'

export const adminServices = {
  async getAll(searchParams?: SearchParamsDto) {
    try {
      const response = await axiosInstance.get<IApiPaginatedResponse<IAdmin>>(
        '/admin',
        {
          params: searchParams,
        },
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },

  async getOne(id: string) {
    try {
      const response = await axiosInstance.get<IApiRepsonse<IAdmin>>(
        `/admin/${id}`,
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },

  async create(createAdminDto: CreateAdminDto) {
    try {
      const response = await axiosInstance.post<IApiRepsonse<IAdmin>>(
        '/admin',
        createAdminDto,
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },

  async update({
    id,
    updateAdminDto,
  }: {
    id: string
    updateAdminDto: UpdateAdminDto
  }) {
    try {
      const response = await axiosInstance.put<IApiRepsonse<IAdmin>>(
        `/admin/${id}`,
        updateAdminDto,
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },

  async delete(ids: string[]) {
    try {
      const response = await axiosInstance.delete<IApiRepsonse<null>>(
        `/admin?${arrayQueryFc('id', ids)}`,
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },
}

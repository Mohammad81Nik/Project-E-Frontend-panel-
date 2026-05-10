import type { AxiosError } from 'axios'
import type {
  CreateAttributeDto,
  SearchParamsDto,
  UpdateAttributeDto,
} from '../schemas'
import axiosInstance from '#/lib/axios'
import type { IApiPaginatedResponse, IApiRepsonse } from '#/types/api'
import type { IAttribute } from '../types'
import arrayQueryFc from '#/utils/arrayQueryFc'

export const attributeServices = {
  async getAll(searchParams?: SearchParamsDto) {
    try {
      const response = await axiosInstance.get<
        IApiPaginatedResponse<IAttribute>
      >('/attributes', {
        params: searchParams,
      })

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },
  async getOne(id: string) {
    try {
      const response = await axiosInstance.get<IApiRepsonse<IAttribute>>(
        `/attributes/${id}`,
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },
  async create(createAttributeDto: CreateAttributeDto) {
    try {
      const response = await axiosInstance.post<IApiRepsonse<IAttribute>>(
        '/attributes',
        {
          ...createAttributeDto,
          values: createAttributeDto.values.map((item) => item.value),
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
    updateAttributeDto,
  }: {
    id: string
    updateAttributeDto: UpdateAttributeDto
  }) {
    try {
      const response = await axiosInstance.put<IApiRepsonse<IAttribute>>(
        `/attributes/${id}`,
        {
          ...updateAttributeDto,
          values: updateAttributeDto.values.map((item) => item.value),
        },
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },
  async delete(ids: string[]) {
    try {
      const response = await axiosInstance.delete<IApiRepsonse<IAttribute>>(
        `/attributes?${arrayQueryFc('id', ids)}`,
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },
}

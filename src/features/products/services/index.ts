import axiosInstance from '#/lib/axios'
import type { IApiPaginatedResponse, IApiRepsonse } from '#/types/api'
import type {
  CreateProductDto,
  SearchParamsDto,
  UpdateProductDto,
} from '../schemas'
import type { IProduct } from '../types'

export const productServices = {
  async getAll(searchParams?: SearchParamsDto) {
    try {
      const response = await axiosInstance.get<IApiPaginatedResponse<IProduct>>(
        '/products',
        { params: searchParams },
      )

      return response.data
    } catch (err) {
      throw err
    }
  },
  async getOne(id: string) {
    try {
      const response = await axiosInstance.get<IApiPaginatedResponse<IProduct>>(
        `/products/${id}`,
      )

      return response.data
    } catch (err) {
      throw err
    }
  },
  async create(createProductDto: CreateProductDto) {
    try {
      const response = await axiosInstance.post<IApiRepsonse<IProduct>>(
        '/products',
        createProductDto,
      )

      return response.data
    } catch (err) {
      throw err
    }
  },
  async update({
    id,
    updateProductDto,
  }: {
    id: string
    updateProductDto: UpdateProductDto
  }) {
    try {
      const response = await axiosInstance.put<IApiRepsonse<IProduct>>(
        `/products/${id}`,
        updateProductDto,
      )

      return response.data
    } catch (err) {
      throw err
    }
  },

  async delete(id: string) {
    try {
      const response = await axiosInstance.delete<IApiRepsonse<null>>(
        `/products/${id}`,
      )

      return response.data
    } catch (err) {
      throw err
    }
  },
}

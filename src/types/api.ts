interface IMeta {
  limit: number
  total: number
  current_page: number
  first_page: number
  last_page: number
}

interface IApiRepsonse<T> {
  data: T
  message: string
}

interface IApiPaginatedResponse<T> {
  message: string
  data: {
    list: T[]
    meta: IMeta
  }
}

interface IApiError {
  message: string
  error: string
  statusCode: number
}

export type { IApiPaginatedResponse, IApiRepsonse, IApiError, IMeta }

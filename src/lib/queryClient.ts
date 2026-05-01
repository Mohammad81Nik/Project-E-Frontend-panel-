import handleUnauthorizedError from '#/utils/handleUnauthorizedError'
import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          handleUnauthorizedError()
          return false
        }

        return failureCount < 3
      },
    },
    mutations: {
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          handleUnauthorizedError()
          return false
        }

        return failureCount < 3
      },
    },
  },
})

export default queryClient

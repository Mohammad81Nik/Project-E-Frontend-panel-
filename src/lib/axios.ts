import isNonEmpty from '#/utils/isNonEmpty'
import Cookies from 'js-cookie'
import axios, { AxiosError } from 'axios'
import { CookieKeys } from '#/constants/enums'
import { enqueueSnackbar } from 'notistack'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
})

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get()?.token

  if (isNonEmpty(token)) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const error = err as AxiosError

    if (
      error.status === 401 &&
      !['/auth/otp', '/auth/phone'].includes(window.location.pathname)
    ) {

      Cookies.remove(CookieKeys.TOKEN)

      enqueueSnackbar({
        message: 'توکن شما منقضی شده است. لطفا ورود نمایید',
        variant: 'error',
      })

      window.location.href = "/auth/phone"
    }

    return Promise.reject(error)
  },
)

export default axiosInstance

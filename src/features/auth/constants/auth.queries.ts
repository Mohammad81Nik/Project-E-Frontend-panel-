import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { authServices } from '../services'

export const authQueries = {
  sendOtp: () =>
    mutationOptions({
      mutationKey: ['auth', 'otp', 'send'],
      mutationFn: authServices.sendOtp,
    }),
  verifyOtp: () =>
    mutationOptions({
      mutationKey: ['auth', 'otp', 'verify'],
      mutationFn: authServices.verifyOtp,
    }),
  getMe: () =>
    queryOptions({
      queryKey: ['bearer', 'me'],
      queryFn: authServices.getMe,
    }),
}

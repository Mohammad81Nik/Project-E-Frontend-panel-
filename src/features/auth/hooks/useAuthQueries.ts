import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { authQueries } from '../constants/auth.queries'

export function useSendOtp() {
  return useMutation({
    ...authQueries.sendOtp(),
  })
}

export function useVerifyOtp() {
  return useMutation({
    ...authQueries.verifyOtp(),
  })
}

export function useGetMe() {
  return useSuspenseQuery(authQueries.getMe())
}

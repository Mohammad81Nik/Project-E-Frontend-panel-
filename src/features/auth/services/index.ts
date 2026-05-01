import axiosInstance from '#/lib/axios'
import type { IApiRepsonse } from '#/types/api'
import type { AxiosError } from 'axios'
import type { SendOtpDto, VerifyOtpDto } from '../schemas'
import type { ISendOtpResponse, IVerifyOtpResponse } from '../types'
import type { IAdmin } from '#/features/admins/types'

export const authServices = {
  async sendOtp(sendOtpDto: SendOtpDto) {
    try {
      const response = await axiosInstance.post<IApiRepsonse<ISendOtpResponse>>(
        '/auth/admin/otp/send',
        sendOtpDto,
      )

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    try {
      const response = await axiosInstance.post<
        IApiRepsonse<IVerifyOtpResponse>
      >('/auth/admin/otp/verify', verifyOtpDto)

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },

  async getMe() {
    try {
      const response = await axiosInstance.get<IApiRepsonse<IAdmin>>('/auth/me')

      return response.data
    } catch (err) {
      const error = err as AxiosError

      throw error
    }
  },
}

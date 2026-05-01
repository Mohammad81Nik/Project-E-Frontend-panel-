interface ISendOtpResponse {
  expires_at: number
}

interface IVerifyOtpResponse {
  token: string
}

export type { ISendOtpResponse, IVerifyOtpResponse }

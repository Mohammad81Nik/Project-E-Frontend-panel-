import z from 'zod'

const sendOtpSchema = z.object({
  phone: z.string(),
})

const verifyOtpSchema = z.object({
  code: z.string(),
  phone: z.string(),
})

type SendOtpDto = z.infer<typeof sendOtpSchema>

type VerifyOtpDto = z.infer<typeof verifyOtpSchema>

export type { SendOtpDto, VerifyOtpDto }

export { sendOtpSchema, verifyOtpSchema }

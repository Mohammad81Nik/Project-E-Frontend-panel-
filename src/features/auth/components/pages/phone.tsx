import Typography from '@mui/material/Typography'
import { Formik } from 'formik'
import PhoneForm from '../forms/phone'
import { useCallback } from 'react'
import type { TSubmitFn } from '#/types/form'
import type { SendOtpDto } from '../../schemas'
import { useSendOtp } from '../../hooks/useAuthQueries'
import { useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { useSnackbar } from 'notistack'
import type { IApiError } from '#/types/api'
import type { AxiosError } from 'axios'

export default function PhonePage() {
  const { mutate } = useSendOtp()

  const navigate = useNavigate({ from: '/auth/phone' })

  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = useCallback<TSubmitFn<SendOtpDto>>(
    (values, { setSubmitting }) => {
      mutate(values, {
        onSuccess(data) {
          Cookies.set('phone', values.phone)

          enqueueSnackbar({ message: data.message, variant: 'success' })

          navigate({ to: '/auth/otp' })

          setSubmitting(false)
        },
        onError(err) {
          const error = err as AxiosError<IApiError>

          enqueueSnackbar({
            message: error.response?.data.message,
            variant: 'error',
          })

          setSubmitting(false)
        },
      })
    },
    [],
  )

  return (
    <>
      <Typography variant="h4">ورود به پنل مدیریتی</Typography>

      <Typography variant="body1">لطفا شماره تماس خود را وارد کنید</Typography>

      <Formik
        initialValues={{
          phone: '',
        }}
        onSubmit={onSubmit}
      >
        {(conf) => <PhoneForm {...conf} />}
      </Formik>
    </>
  )
}

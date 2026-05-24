import Typography from '@mui/material/Typography'
import { Formik } from 'formik'
import OtpForm from '../forms/otp'
import { useCallback, useMemo } from 'react'
import type { TSubmitFn } from '#/types/form'
import type { VerifyOtpDto } from '../../schemas'
import Cookies from 'js-cookie'
import { Link, useNavigate } from '@tanstack/react-router'
import { useVerifyOtp } from '../../hooks/useAuthQueries'
import { useSnackbar } from 'notistack'
import type { AxiosError } from 'axios'
import type { IApiError } from '#/types/api'

export default function OtpPage() {
  const { mutate } = useVerifyOtp()

  const navigate = useNavigate({ from: '/auth/otp' })

  const { enqueueSnackbar } = useSnackbar()

  const phone = useMemo(() => {
    return Cookies.get()?.phone
  }, [])

  const onSubmit = useCallback<TSubmitFn<VerifyOtpDto>>(
    (values, { setSubmitting }) => {
      mutate(
        { code: values.code, phone },
        {
          onSuccess: (data) => {
            Cookies.set('token', data.data.token)
            enqueueSnackbar({ message: data.message, variant: 'success' })
            navigate({ to: '/admins' })
            setSubmitting(false)
          },
          onError: (err) => {
            const error = err as AxiosError<IApiError>

            enqueueSnackbar({
              message: error.response?.data.message,
              variant: 'error',
            })

            setSubmitting(false)
          },
        },
      )
    },
    [phone],
  )

  return (
    <>
      <Typography variant="h4" sx={{
        marginBottom: "96px"
      }}>احراز هویت</Typography>

      <Typography variant="body1">
        لطف کد ارسال شده به شماره{' '}
        <Link to="/auth/phone" className="text-blue-500">
          {phone}
        </Link>{' '}
        را وارد کنید.
      </Typography>

      <Formik initialValues={{ code: '', phone }} onSubmit={onSubmit}>
        {(conf) => <OtpForm {...conf} />}
      </Formik>
    </>
  )
}

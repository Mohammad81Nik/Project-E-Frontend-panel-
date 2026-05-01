import Typography from '@mui/material/Typography'
import { Formik, type FormikConfig } from 'formik'
import CreateAdminForm from '../forms/create'
import type { CreateAdminDto } from '../../schemas'
import { useCallback } from 'react'
import { useCreate } from '../../hooks/useAdminQueries'
import type { AxiosError } from 'axios'
import type { IApiError } from '#/types/api'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { adminQueries } from '../../constants/admin.queries'

export default function Create() {
  const { mutate } = useCreate()

  const navigate = useNavigate({ from: '/admins/create' })

  const queryClient = useQueryClient()

  const onSubmit = useCallback<FormikConfig<CreateAdminDto>['onSubmit']>(
    (values, { setSubmitting }) => {
      mutate(values, {
        onSuccess(data) {
          enqueueSnackbar({ message: data.message, variant: 'success' })

          queryClient.invalidateQueries(adminQueries.getAll())

          navigate({ to: '/admins' })
        },
        onError(err) {
          const error = err as AxiosError<IApiError>

          enqueueSnackbar({
            message: error.response?.data.message,
            variant: 'error',
          })
        },
        onSettled: () => {
          setSubmitting(false)
        },
      })
    },
    [],
  )
  return (
    <div className="w-full h-full flex flex-col gap-y-4">
      <Typography variant="h4">ایجاد ادمین</Typography>

      <Formik
        initialValues={{
          name: '',
          phone: '',
          description: '',
          permissions: ['products:read'],
        }}
        onSubmit={onSubmit}
      >
        {(props) => <CreateAdminForm {...props} />}
      </Formik>
    </div>
  )
}

import Typography from '@mui/material/Typography'
import { Formik } from 'formik'
import CreateBrandForm from '../forms/create'
import type { CreateBrandDto } from '../../schemas'
import { useCallback } from 'react'
import type { TSubmitFn } from '#/types/form'
import { useCreate } from '../../hooks/useBrandQueries'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { brandQueries } from '../../constants/brand.queries'
import { enqueueSnackbar } from 'notistack'

export default function Create() {
  const { mutate } = useCreate()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const onSubmit = useCallback<TSubmitFn<CreateBrandDto>>(
    (values, { setSubmitting }) => {
      mutate(values, {
        onSuccess: (data) => {
          enqueueSnackbar({ message: data.message, variant: 'success' })

          queryClient.invalidateQueries(brandQueries.getAll())

          navigate({ to: '/brands' })
        },
        onError: (err) => {
          enqueueSnackbar({ message: err.message, variant: 'error' })
        },
        onSettled: () => {
          setSubmitting(false)
        },
      })
    },
    [queryClient],
  )

  return (
    <>
      <Typography variant="h5">ایجاد برند</Typography>

      <Formik<CreateBrandDto>
        initialValues={{ name: '', description: '', image: null }}
        onSubmit={onSubmit}
      >
        {(props) => <CreateBrandForm {...props} />}
      </Formik>
    </>
  )
}

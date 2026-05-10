import Typography from '@mui/material/Typography'
import { Formik } from 'formik'
import CreateAttributeForm from '../forms/create'
import { useCallback } from 'react'
import type { TSubmitFn } from '#/types/form'
import type { CreateAttributeDto } from '../../schemas'
import { useCreate } from '../../hooks/useAttributeQueries'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'
import { attributeQueries } from '../../constants/attribute.queries'
import { useNavigate } from '@tanstack/react-router'

export default function Create() {
  const { mutate } = useCreate()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const onSubmit = useCallback<TSubmitFn<CreateAttributeDto>>(
    (values, { setSubmitting }) => {
      mutate(values, {
        onSuccess: (data) => {
          enqueueSnackbar({ variant: 'success', message: data.message })

          queryClient.invalidateQueries(attributeQueries.getAll())

          navigate({ to: '/attributes' })
        },
        onSettled: () => {
          setSubmitting(false)
        },
      })
    },
    [],
  )
  return (
    <>
      <Typography>افزودن ویژگی محصول</Typography>

      <Formik
        initialValues={{
          name: '',
          values: [
            {
              value: '',
              draft: '',
              editing: false,
            },
          ],
        }}
        onSubmit={onSubmit}
      >
        {(props) => <CreateAttributeForm {...props} />}
      </Formik>
    </>
  )
}

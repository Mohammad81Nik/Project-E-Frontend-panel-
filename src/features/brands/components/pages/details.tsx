import Typography from '@mui/material/Typography'
import { useDelete, useGetOneSuspense } from '../../hooks/useBrandQueries'
import { useCallback, useMemo } from 'react'
import { Formik } from 'formik'
import UpdateBrandForm from '../forms/update'
import type { UpdateBrandDto } from '../../schemas'
import type { TSubmitFn } from '#/types/form'
import { useUpdate } from '../../hooks/useBrandQueries'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'
import { brandQueries } from '../../constants/brand.queries'
import Button from '@mui/material/Button'
import { useNavigate } from '@tanstack/react-router'
import Can from '#/components/permission/can'

export default function Details() {
  const { data } = useGetOneSuspense()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const brand = useMemo(() => data.data, [...Object.values(data.data)])

  const { mutate: mutateUpdate } = useUpdate()

  const { mutate: mutateDelete, isPending } = useDelete()

  const initialValues = useMemo<UpdateBrandDto>(
    () => ({
      name: brand.name,
      description: brand.description,
    }),
    [brand.name, brand.description],
  )

  const onSubmit = useCallback<TSubmitFn<UpdateBrandDto>>(
    (values, { setSubmitting }) => {
      mutateUpdate(
        { id: brand.id, updateBrandDto: values },
        {
          onSuccess: (data) => {
            enqueueSnackbar({ message: data.message, variant: 'success' })

            queryClient.invalidateQueries(brandQueries.getOne(brand.id))
          },
          onError: (err) => {
            enqueueSnackbar({ message: err?.message, variant: 'error' })
          },
          onSettled: () => {
            setSubmitting(false)
          },
        },
      )
    },
    [brand.id],
  )

  const onDelete = useCallback(() => {
    mutateDelete(brand.id, {
      onSuccess: (data) => {
        enqueueSnackbar({ message: data.message, variant: 'success' })

        queryClient.invalidateQueries(brandQueries.getAll())

        navigate({ to: '/brands' })
      },
      onError: (err) => {
        enqueueSnackbar({ message: err.message, variant: 'error' })
      },
    })
  }, [brand.id])

  return (
    <>
      <div className="flex items-center justify-between">
        <Typography variant="h5">جزییات برند {brand.name}</Typography>
        <Can I="delete" a="brands">
          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
            disabled={isPending}
            loading={isPending}
          >
            حذف برند
          </Button>
        </Can>
      </div>

      <Formik<UpdateBrandDto>
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <UpdateBrandForm />
      </Formik>
    </>
  )
}

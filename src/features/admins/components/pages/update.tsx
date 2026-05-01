import Typography from '@mui/material/Typography'
import { useGetOneSuspense, useUpdate } from '../../hooks/useAdminQueries'
import { useCallback, useMemo } from 'react'
import { Formik } from 'formik'
import EditAdminForm from '../forms/update'
import type { TSubmitFn } from '#/types/form'
import type { UpdateAdminDto } from '../../schemas'
import { useNavigate } from '@tanstack/react-router'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'
import { adminQueries } from '../../constants/admin.queries'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { useModalStore } from '#/stores/useModalStore'

export default function Update() {
  const { data } = useGetOneSuspense()
  const { mutate: mutateUpdate } = useUpdate()

  const navigate = useNavigate({ from: '/admins/$adminId' })

  const queryClient = useQueryClient()

  const admin = useMemo(() => data.data, [data])

  const setModal = useModalStore((state) => state.setModal)

  const onSubmit = useCallback<TSubmitFn<UpdateAdminDto>>(
    (values, { setSubmitting }) => {
      mutateUpdate(
        { id: admin.id, updateAdminDto: values },

        {
          onSuccess: (data) => {
            enqueueSnackbar({ variant: 'success', message: data.message })

            queryClient.invalidateQueries(adminQueries.getOne(admin.id))

            navigate({ to: '/admins' })
          },
          onSettled: () => {
            setSubmitting(false)
          },
        },
      )
    },
    [admin],
  )

  const onDelete = useCallback(() => {
    setModal({
      feature: 'admins',
      path: 'delete',
      config: {
        open: true,
        props: {
          ids: [admin.id],
          adminName: admin.name,
          onFinished: () => {
            navigate({ to: '/admins' })
          },
        },
      },
    })
  }, [admin])

  return (
    <div className="flex flex-col gap-y-8 pt-4">
      <div className="flex items-center justify-between">
        <Typography variant="h5">ویرایش ادمین {admin.name}</Typography>
        <Button
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
        >
          حذف ادمین
        </Button>
      </div>

      <Formik<UpdateAdminDto>
        initialValues={{
          name: admin.name,
          phone: admin.phone,
          description: admin.description,
          permissions: admin.permissions,
        }}
        onSubmit={onSubmit}
      >
        {(props) => <EditAdminForm {...props} />}
      </Formik>
    </div>
  )
}

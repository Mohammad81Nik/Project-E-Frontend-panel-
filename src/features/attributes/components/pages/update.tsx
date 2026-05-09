import { useModalStore } from '#/stores/useModalStore'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useCallback } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Formik } from 'formik'
import UpdateAttributeForm from '../forms/update'
import type { TSubmitFn } from '#/types/form'
import type { UpdateAttributeDto } from '../../schemas'
import {
  useDelete,
  useGetOneSuspense,
  useUpdate,
} from '../../hooks/useAttributeQueries'
import { useNavigate } from '@tanstack/react-router'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'
import { attributeQueries } from '../../constants/attribute.queries'

export default function Update() {
  const { mutate: mutateUpdate } = useUpdate()
  const { mutateAsync: mutateAsyncDelete } = useDelete()

  const navigate = useNavigate()

  const { data } = useGetOneSuspense()

  const setModal = useModalStore((state) => state.setModal)

  const queryClient = useQueryClient()

  const onDelete = useCallback(() => {
    setModal({
      feature: 'global',
      path: 'delete',
      config: {
        open: true,
        props: {
          text: `آیا از حذف ویژگی ${data.data.name} اطمینان دارید`,
          onSubmit: () => {
            return mutateAsyncDelete(data.data.id, {
              onSuccess() {
                navigate({ to: '/attributes' })
              },
            })
          },
        },
      },
    })
  }, [])

  const onSubmit = useCallback<TSubmitFn<UpdateAttributeDto>>(
    (values, { setSubmitting }) => {
      mutateUpdate(
        { id: data.data.id, updateAttributeDto: values },
        {
          onSuccess(data) {
            enqueueSnackbar(data.message)

            queryClient.invalidateQueries(attributeQueries.getOne(data.data.id))

            queryClient.invalidateQueries(attributeQueries.getAll())

            navigate({ to: '/attributes' })
          },

          onSettled() {
            setSubmitting(false)
          },
        },
      )
    },
    [data],
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <Typography variant="h5">ویرایش ویژگی {data.data.name}</Typography>

        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
          startIcon={<DeleteIcon />}
        >
          حذف
        </Button>
      </div>

      <Formik
        initialValues={{
          name: data.data.name,
          values: data.data.values.map((val) => ({
            draft: val,
            value: val,
            editing: false,
          })),
        }}
        onSubmit={onSubmit}
      >
        {(props) => <UpdateAttributeForm {...props} />}
      </Formik>
    </>
  )
}

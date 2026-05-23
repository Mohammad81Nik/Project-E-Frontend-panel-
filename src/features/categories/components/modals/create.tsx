import UiModal from '#/components/ui/modal'
import { useModalStore } from '#/stores/useModalStore'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { Formik } from 'formik'
import { useCallback } from 'react'
import CreateCategoryForm from '../forms/create'
import type { CreateCategoryDto } from '../../schemas'
import type { TSubmitFn } from '#/types/form'
import { useCreate } from '../../hooks/useCategoryQueries'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'
import { categoryQueries } from '../../constants/categoryQueries'

export default function CreateCategoryModal() {
  const { open, props } = useModalStore((state) => state.categories.create)
  const setModal = useModalStore((state) => state.setModal)

  const queryClient = useQueryClient()

  const { mutate } = useCreate()

  const onClose = useCallback(() => {
    setModal({
      feature: 'categories',
      path: 'create',
      config: {
        open: false,
        props: {
          parentId: null,
        },
      },
    })
  }, [])

  const onSubmit = useCallback<TSubmitFn<CreateCategoryDto>>(
    (values, { setSubmitting, resetForm }) => {
      mutate(values, {
        onSuccess: (data) => {
          enqueueSnackbar({ message: data.message, variant: 'success' })

          queryClient.invalidateQueries(categoryQueries.getAll())

          onClose()

          resetForm()
        },
        onSettled: () => {
          setSubmitting(false)
        },
      })
    },
    [onClose],
  )

  return (
    <UiModal open={open} onClose={onClose}>
      <div className="flex flex-col gap-y-2">
        <Typography>ایجاد دسته بندی</Typography>

        <Divider />
      </div>

      <Formik<CreateCategoryDto>
        initialValues={{
          title: '',
          parentId: props?.parentId,
          description: null,
          image: null,
        }}
        onSubmit={onSubmit}
      >
        {(props) => <CreateCategoryForm {...props} />}
      </Formik>
    </UiModal>
  )
}

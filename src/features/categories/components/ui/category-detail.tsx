import Typography from '@mui/material/Typography'
import type { ICategory } from '../../types'
import isNonEmpty from '#/utils/isNonEmpty'
import type { Nullable } from '#/types/operators'
import Button from '@mui/material/Button'
import { Formik } from 'formik'
import UpdateCategoryForm from '../forms/update'
import type { UpdateCategoryDto } from '../../schemas'
import { useCallback, useMemo } from 'react'
import type { TSubmitFn } from '#/types/form'
import { useModalStore } from '#/stores/useModalStore'
import { useDelete, useUpdate } from '../../hooks/useCategoryQueries'
import { enqueueSnackbar } from 'notistack'
import { categoryQueries } from '../../constants/categoryQueries'
import { useQueryClient } from '@tanstack/react-query'

interface ICategoryDetailProps {
  category: Nullable<ICategory>
  setCategory: (category: Nullable<ICategory>) => void
}

export default function CategoryDetail({
  category,
  setCategory,
}: ICategoryDetailProps) {
  const setModal = useModalStore((state) => state.setModal)

  const { mutateAsync: mutateDelete } = useDelete()

  const { mutate: mutateUpdate } = useUpdate()

  const queryClient = useQueryClient()

  const onDelete = useCallback(() => {
    setModal({
      feature: 'global',
      path: 'delete',
      config: {
        open: true,
        props: {
          text: 'آیااز حذف دسته بندی اطمینان دارید؟',
          onSubmit: () =>
            mutateDelete(category?.id, {
              onSuccess: (data) => {
                enqueueSnackbar({ message: data.message, variant: 'success' })

                queryClient.invalidateQueries(categoryQueries.getAll())

                setCategory(null)
              },
              onError: (err) => {
                enqueueSnackbar({ message: err.message, variant: 'error' })
              },
            }),
        },
      },
    })
  }, [category])

  const onSubmit = useCallback<TSubmitFn<UpdateCategoryDto>>(
    (values, { setSubmitting }) => {
      mutateUpdate(
        { id: category?.id, updateCategoryDto: values },
        {
          onSuccess: (data) => {
            enqueueSnackbar({ message: data.message, variant: 'success' })

            queryClient.invalidateQueries(categoryQueries.getAll())

            setCategory(data.data)
          },
          onError: (err) => {
            enqueueSnackbar({ message: err.message, variant: 'error' })
          },
          onSettled: () => {
            setSubmitting(false)
          },
        },
      )
    },
    [category, queryClient],
  )

  const onCreateNewSubCategory = useCallback(() => {
    setModal({
      feature: 'categories',
      path: 'create',
      config: {
        open: true,
        props: {
          parentId: category?.id ?? '',
        },
      },
    })
  }, [category])

  const initialValues = useMemo<UpdateCategoryDto>(
    () => ({
      image: null,
      title: category?.title ?? '',
      description: category?.description ?? undefined,
    }),
    [category?.title, category?.description],
  )

  if (!isNonEmpty(category)) {
    return (
      <div className="flex items-center h-[calc(100dvh-124.5px)] justify-center">
        <Typography>دسته بندی انتخاب کنید</Typography>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100dvh-124.5px)] flex-col justify-between p-4">
      <Formik<UpdateCategoryDto>
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <UpdateCategoryForm category={category} setCategory={setCategory} />
      </Formik>

      <div className="w-full grid grid-cols-2 gap-x-2">
        <Button variant="outlined" color="error" onClick={onDelete}>
          حذف دسته بندی
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onCreateNewSubCategory}
        >
          افزودن زیر دسته بندی
        </Button>
      </div>
    </div>
  )
}

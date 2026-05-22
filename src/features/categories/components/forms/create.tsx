import { Form, type FormikProps } from 'formik'
import type { CreateCategoryDto } from '../../schemas'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useModalStore } from '#/stores/useModalStore'
import { useCallback, useState } from 'react'
import VisuallyHiddenInput from '#/components/ui/file-inputs'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import isNonEmpty from '#/utils/isNonEmpty'
import createObjUrl from '#/utils/createObjUrl'
import cn from '#/utils/cn'

export default function CreateCategoryForm({
  setFieldValue,
  values,
  isSubmitting,
}: FormikProps<CreateCategoryDto>) {
  const [preview, setPreview] = useState<string | undefined>(undefined)

  const setModal = useModalStore((state) => state.setModal)

  const onClose = useCallback(() => {
    setModal({
      feature: 'categories',
      path: 'create',
      config: {
        open: false,
      },
    })
  }, [])

  return (
    <Form className="flex flex-col gap-y-4">
      {!isNonEmpty(values.parentId) && (
        <div className="relative border border-black rounded-md h-[200px] overflow-hidden group">
          {isNonEmpty(preview) && (
            <img
              src={preview}
              alt="category image"
              className="object-contain w-full h-full"
            />
          )}
          <Button
            variant="contained"
            component="label"
            role={undefined}
            tabIndex={-1}
            className={cn({
              'opacity-0 group-hover:opacity-100': isNonEmpty(preview),
            })}
            color="secondary"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <AddPhotoAlternateIcon
              sx={{
                width: '40px',
                height: '40px',
              }}
            />
            <VisuallyHiddenInput
              type="file"
              sx={{ width: '100%', height: '100%' }}
              onChange={(e) => {
                setFieldValue('image', e.target.files?.[0])

                createObjUrl(e.target.files?.[0], setPreview)
              }}
            />
          </Button>
        </div>
      )}

      <TextField
        label="عنوان"
        value={values.title}
        onChange={(e) => setFieldValue('title', e.target.value)}
      />

      <TextField
        label="توضیحات"
        value={values.description}
        multiline
        rows={4}
        onChange={(e) => setFieldValue('description', e.target.value)}
      />

      <div className="grid grid-cols-2 gap-x-2">
        <Button
          variant="outlined"
          color="error"
          type="button"
          onClick={onClose}
        >
          انصراف
        </Button>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          ایجاد
        </Button>
      </div>
    </Form>
  )
}

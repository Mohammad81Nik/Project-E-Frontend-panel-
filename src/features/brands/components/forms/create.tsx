import { Form, type FormikProps } from 'formik'
import type { CreateBrandDto } from '../../schemas'
import TextField from '@mui/material/TextField'
import VisuallyHiddenInput from '#/components/ui/file-inputs'
import Button from '@mui/material/Button'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import createObjUrl from '#/utils/createObjUrl'
import { useState } from 'react'
import cn from '#/utils/cn'
import isNonEmpty from '#/utils/isNonEmpty'

export default function CreateBrandForm({
  values,
  setFieldValue,
  isSubmitting,
}: FormikProps<CreateBrandDto>) {
  const [preview, setPreview] = useState<string | undefined>(undefined)

  return (
    <Form className="grid grid-cols-2 gap-x-6 gap-y-4 w-full">
      <div className="border relative border-black overflow-hidden min-h-[400px] rounded-md group">
        <img
          src={preview}
          alt="brand image"
          className="object-center w-full"
        />
        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          className={cn({
            'group-hover:opacity-100 opacity-0': isNonEmpty(preview),
          })}
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
            name="image"
            multiple={false}
            onChange={(e) => {
              setFieldValue('image', e.target.files?.[0])
              createObjUrl(e.target.files?.[0], (url) => {
                setPreview(url)
              })
            }}
          />
        </Button>
      </div>

      <div className="flex flex-col gap-y-4">
        <TextField
          fullWidth
          label="عنوان"
          onChange={(e) => setFieldValue('name', e.target.value)}
          value={values.name}
        />

        <TextField
          fullWidth
          label="توضیحات"
          onChange={(e) => setFieldValue('description', e.target.value)}
          value={values.description}
          multiline
          rows={12}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          ایجاد برند
        </Button>
      </div>
    </Form>
  )
}

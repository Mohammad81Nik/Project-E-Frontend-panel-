import TextField from '@mui/material/TextField'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { useCallback, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import { useFormikContext } from 'formik'
import type { UpdateBrandDto } from '../../schemas'
import cn from '#/utils/cn'
import Can from '#/components/permission/can'

interface IBrandEditableField {
  name: keyof UpdateBrandDto
  label: string
  multiline?: boolean
}
export default function BrandEditableField({
  name,
  label,
  multiline = false,
}: IBrandEditableField) {
  const { setFieldValue, values, isSubmitting, resetForm, handleSubmit } =
    useFormikContext<UpdateBrandDto>()

  const [editing, setEditing] = useState<boolean>(false)

  const onSubmit = useCallback(() => {
    setEditing(false)

    handleSubmit()
  }, [])

  const onCancel = useCallback(() => {
    setEditing(false)
    resetForm()
  }, [resetForm, values.name, values.description])

  return (
    <div
      className={cn('flex items-center gap-x-2', {
        'items-start': multiline,
      })}
    >
      <TextField
        fullWidth
        value={values[name]}
        label={label}
        variant="standard"
        onChange={(e) => {
          setFieldValue(name, e.target.value)
        }}
        slotProps={{
          input: {
            readOnly: !editing,
          },
          inputLabel: {
            shrink: true,
          },
        }}
        multiline={multiline}
        rows={multiline ? 12 : undefined}
      />
      <Can I="update" a="brands">
        {!editing && (
          <IconButton type="button" onClick={() => setEditing(true)}>
            <EditIcon color="secondary" />
          </IconButton>
        )}

        {editing && (
          <>
            <IconButton
              type="button"
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={onSubmit}
            >
              <DoneIcon color="success" />
            </IconButton>
            <IconButton
              disabled={isSubmitting}
              type="button"
              onClick={onCancel}
            >
              <CloseIcon color="error" />
            </IconButton>
          </>
        )}
      </Can>
    </div>
  )
}

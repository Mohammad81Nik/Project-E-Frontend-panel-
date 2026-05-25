import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useFormikContext } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import Divider from '@mui/material/Divider'
import type { UpdateCategoryDto } from '../../schemas'
import Can from '#/components/permission/can'

interface IEditableCategoryFieldProps {
  title: string
  field: Exclude<keyof UpdateCategoryDto, 'image'>
}
export default function EditableCatoryField({
  title,
  field,
}: IEditableCategoryFieldProps) {
  const {
    setFieldValue,
    values,
    isSubmitting,
    handleSubmit,
    resetForm,
    dirty,
  } = useFormikContext<UpdateCategoryDto>()

  const [editing, setEditing] = useState<boolean>(false)

  const onSubmit = useCallback(() => {
    setEditing(false)

    handleSubmit()
  }, [field])

  const onCancel = useCallback(() => {
    resetForm()

    setEditing(false)
  }, [])

  const submitDisabled = useMemo(
    () => !dirty || isSubmitting,
    [dirty, isSubmitting],
  )

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-col gap-y-1">
        <Typography variant="h6">{title}</Typography>
        <Divider />
      </div>

      <div className="flex items-start gap-x-2">
        <TextField
          fullWidth
          value={values[field]}
          variant="standard"
          slotProps={{
            input: {
              readOnly: !editing,
            },
          }}
          onChange={(e) => {
            setFieldValue(field, e.target.value)
          }}
          {...(field === 'description' && {
            multiline: true,
            rows: 4,
          })}
        />

        <Can I="update" a="categories">
          {!editing && (
            <IconButton
              type="button"
              color="secondary"
              onClick={() => setEditing(true)}
            >
              <EditIcon />
            </IconButton>
          )}

          {editing && (
            <>
              <IconButton
                onClick={onSubmit}
                disabled={submitDisabled}
                color="success"
              >
                <DoneIcon />
              </IconButton>

              <IconButton
                type="button"
                color="error"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                <CloseIcon />
              </IconButton>
            </>
          )}
        </Can>
      </div>
    </div>
  )
}

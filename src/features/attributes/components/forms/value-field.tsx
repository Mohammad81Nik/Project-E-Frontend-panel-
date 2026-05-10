import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import { useCallback, useMemo, useRef } from 'react'
import type { AttributeValueDto } from '../../schemas'

interface IValueFieldProps {
  attrValue: AttributeValueDto
  onValueChange: (val: string) => void
  onDelete: () => void
  onToggleEdit: (editing: boolean) => void
  onDraftChange: (val: string) => void
  canModify: boolean
}

export default function ValueField({
  attrValue,
  onValueChange,
  onDelete,
  onToggleEdit,
  onDraftChange,
  canModify,
}: IValueFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const initialValue = useMemo(() => attrValue.value, [attrValue])

  const editing = useMemo(() => attrValue.editing, [attrValue])

  const draft = useMemo(() => attrValue.draft, [attrValue])

  const inputValue = useMemo(
    () => (editing ? draft : initialValue),
    [initialValue, editing, draft],
  )

  const onCancel = useCallback(() => {
    onValueChange(initialValue)
    onDraftChange(initialValue)

    onToggleEdit(false)
  }, [initialValue])

  const onEdit = useCallback(() => {
    onToggleEdit(true)

    inputRef.current?.focus()
  }, [editing, inputRef])

  const onConfirmEdit = useCallback(() => {
    onValueChange(draft)
    onToggleEdit(false)
  }, [draft])

  return (
    <div className="flex items-center gap-x-2">
      <TextField
        inputRef={inputRef}
        label="حالت"
        variant="filled"
        fullWidth
        slotProps={{
          input: {
            readOnly: !editing,
            endAdornment: (
              <div className="flex items-center gap-x-2">
                <IconButton
                  type="button"
                  disabled={!canModify}
                  onClick={() => {
                    editing ? onConfirmEdit() : onEdit()
                  }}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  {editing ? <DoneIcon color="success" /> : <EditIcon />}
                </IconButton>

                {!editing && (
                  <IconButton
                    type="button"
                    disabled={!canModify}
                    color="error"
                    onClick={onDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}

                {editing && (
                  <IconButton type="button" onClick={onCancel}>
                    <CloseIcon color="error" />
                  </IconButton>
                )}
              </div>
            ),
          },
        }}
        value={inputValue}
        onChange={(e) => {
          editing
            ? onDraftChange(e.target.value)
            : onValueChange(e.target.value)
        }}
      />
    </div>
  )
}

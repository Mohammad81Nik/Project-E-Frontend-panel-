import type { FieldArrayRenderProps, FormikProps } from 'formik'
import type { UpdateAttributeDto } from '../../schemas'
import TextField from '@mui/material/TextField'
import keyGenerators from '#/constants/keyGenerators'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import { useCallback, useMemo, useState } from 'react'
import ValueField from './value-field'
import isNonEmpty from '#/utils/isNonEmpty'
import { useModalStore } from '#/stores/useModalStore'

export default function UpdateAttributeFieldArray({
  values,
  setFieldValue,
  fieldArrayProps,
  isSubmitting,
}: {
  fieldArrayProps: FieldArrayRenderProps
  values: UpdateAttributeDto['values']
  setFieldValue: FormikProps<UpdateAttributeDto>['setFieldValue']
  isSubmitting: boolean
}) {
  const [newValue, setNewValue] = useState<string>('')

  const setModal = useModalStore((state) => state.setModal)

  const { insert, remove } = fieldArrayProps

  const addNewValueDisabled = useMemo(() => !isNonEmpty(newValue), [newValue])

  const onAddAttributeValue = useCallback(() => {
    setNewValue('')
    insert(values.length + 1, {
      value: newValue,
      draft: newValue,
      editing: false,
    })
  }, [newValue])

  // value field handlers:
  const onAttrValueChange = useCallback<(val: string, index: number) => void>(
    (val, index) => {
      setFieldValue(`values.${index}.value`, val)
    },
    [],
  )

  const onAttrValueEditToggle = useCallback<
    (editing: boolean, index: number) => void
  >((editing, index) => {
    setFieldValue(`values.${index}.editing`, editing)
  }, [])

  const onAttrDraftChange = useCallback<(val: string, index: number) => void>(
    (val, index) => {
      setFieldValue(`values.${index}.draft`, val)
    },
    [],
  )

  const onAttrDelete = useCallback<(index: number) => void>((index) => {
    setModal({
      feature: 'global',
      path: 'delete',
      config: {
        open: true,
        props: {
          text: 'آیا از حذف حالت ویژگی اطمینان دارید؟',
          onSubmit: () => {
            return Promise.resolve(remove(index))
          },
        },
      },
    })
  }, [])

  const canModify = useCallback<(index: number) => boolean>(
    (index) => {
      return isSubmitting
        ? false
        : values
            .map((item, idx) => ({ index: idx, editing: item.editing }))
            .filter((item) => item.editing && item.index !== index).length == 0
    },
    [values, isSubmitting],
  )

  return (
    <>
      <div className="flex items-center gap-x-2">
        <TextField
          label="نوع ویژگی را وارد کنید."
          variant="outlined"
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value)
          }}
          fullWidth
          slotProps={{
            input: {
              endAdornment: isNonEmpty(newValue) && (
                <CloseIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setNewValue('')}
                />
              ),
            },
          }}
        />
        <Button
          onClick={onAddAttributeValue}
          type="button"
          variant="contained"
          color="primary"
          sx={{ width: '56px', height: '56px' }}
          disabled={addNewValueDisabled}
        >
          <AddIcon />
        </Button>
      </div>
      <Divider sx={{ gridColumn: 'span 2 / span 2', display: 'block' }} />

      <div className="md:col-span-2 md:grid md:grid-cols-2 gap-2 flex flex-col">
        {values.map((attrVal, idx) => (
          <ValueField
            key={keyGenerators.attributeValues(idx)}
            attrValue={attrVal}
            onDelete={() => {
              onAttrDelete(idx)
            }}
            onValueChange={(val) => {
              onAttrValueChange(val, idx)
            }}
            onToggleEdit={(editing) => {
              onAttrValueEditToggle(editing, idx)
            }}
            onDraftChange={(val) => {
              onAttrDraftChange(val, idx)
            }}
            canModify={canModify(idx)}
          />
        ))}
      </div>
    </>
  )
}

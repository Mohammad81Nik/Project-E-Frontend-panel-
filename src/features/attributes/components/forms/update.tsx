import { FieldArray, Form, type FormikProps } from 'formik'
import type { UpdateAttributeDto } from '../../schemas'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import UpdateAttributeFieldArray from './update-field-array'
import { useMemo } from 'react'
import isNonEmpty from '#/utils/isNonEmpty'

export default function UpdateAttributeForm({
  setFieldValue,
  values,
  isSubmitting,
}: FormikProps<UpdateAttributeDto>) {
  const isFormValid = useMemo(
    () =>
      isNonEmpty(values.name) &&
      values.values.length > 0 &&
      values.values.every((item) => isNonEmpty(item.value)),
    [values.name, values.values],
  )

  const isArrayFieldEditPending = useMemo(
    () => values.values.some((item) => item.editing === true),
    [values.values],
  )

  return (
    <Form className="flex flex-col md:grid gap-x-2 gap-y-4 flex-wrap md:grid-cols-[30%_70%] justify">
      <TextField
        label="نام ویژگی"
        value={values.name}
        onChange={(e) => {
          setFieldValue('name', e.target.value)
        }}
      />
      <FieldArray name="values">
        {(props) => (
          <UpdateAttributeFieldArray
            values={values.values}
            fieldArrayProps={props}
            setFieldValue={setFieldValue}
            isSubmitting={isSubmitting}
          />
        )}
      </FieldArray>

      <Button
        variant="contained"
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting || !isFormValid || isArrayFieldEditPending}
      >
        ویرایش
      </Button>
    </Form>
  )
}

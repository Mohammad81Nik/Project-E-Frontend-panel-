import { FieldArray, Form, type FormikProps } from 'formik'
import type { CreateAttributeDto } from '../../schemas'
import TextField from '@mui/material/TextField'
import CreateAttributeFieldArray from './create-field-array'
import Button from '@mui/material/Button'
import { useMemo } from 'react'
import isNonEmpty from '#/utils/isNonEmpty'

export default function CreateAttributeForm({
  setFieldValue,
  values,
  isSubmitting,
}: FormikProps<CreateAttributeDto>) {
  const isFormValid = useMemo(
    () =>
      isNonEmpty(values.name) &&
      values.values.length > 0 &&
      values.values.every((item) => isNonEmpty(item.value)),
    [values],
  )

  const isFieldArrayEditPending = useMemo(
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
          <CreateAttributeFieldArray
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
        disabled={isSubmitting || !isFormValid || isFieldArrayEditPending}
      >
        ایجاد
      </Button>
    </Form>
  )
}

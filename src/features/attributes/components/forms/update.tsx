import { FieldArray, Form, type FormikProps } from 'formik'
import type { UpdateAttributeDto } from '../../schemas'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import UpdateAttributeFieldArray from './update-field-array'

export default function UpdateAttributeForm({
  setFieldValue,
  values,
  isSubmitting,
}: FormikProps<UpdateAttributeDto>) {
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
        disabled={isSubmitting}
      >
        ویرایش
      </Button>
    </Form>
  )
}

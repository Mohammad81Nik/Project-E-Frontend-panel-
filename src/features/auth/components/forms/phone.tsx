import { Form, type FormikProps } from 'formik'
import type { SendOtpDto } from '../../schemas'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function PhoneForm({
  setFieldValue,
  values,
  isSubmitting,
}: FormikProps<SendOtpDto>) {
  return (
    <Form className="w-3/4 lg:w-1/2 flex flex-col items-center gap-y-4">
      <TextField
        label="شماره تماس"
        fullWidth
        value={values.phone}
        onChange={(e) => setFieldValue('phone', e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        ارسال کد
      </Button>
    </Form>
  )
}

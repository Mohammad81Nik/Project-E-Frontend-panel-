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
    <Form className="w-full flex flex-col items-center gap-y-8">
      <TextField
        fullWidth
        label="شماره تماس"
        value={values.phone}
        onChange={(e) => setFieldValue('phone', e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
        size='large'
      >
        ارسال کد
      </Button>
    </Form>
  )
}

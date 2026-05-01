import { Form, type FormikProps } from 'formik'
import type { VerifyOtpDto } from '../../schemas'
import UiOtpInput from '../ui/OtpInput'
import Button from '@mui/material/Button'

export default function OtpForm({
  setFieldValue,
  values,
  isSubmitting,
  submitForm,
}: FormikProps<VerifyOtpDto>) {
  return (
    <Form className="flex flex-col gap-y-4 w-1/2">
      <UiOtpInput
        value={values.code}
        onChange={(otp) => {
          setFieldValue('code', otp)

          if (otp.length === 6) {
            submitForm()
          }
        }}
      />

      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        ورود
      </Button>
    </Form>
  )
}

import { Form, type FormikProps } from 'formik'
import type { CreateAdminDto } from '../../schemas'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import PermissionCheckboxGroup from '../ui/permission-checkbox-group'
import { SubjectValues } from '#/constants/enums'
import Typography from '@mui/material/Typography'
import { SubjectLabels } from '#/constants/permission-labels'

export default function CreateAdminForm({
  setFieldValue,
  values,
  isSubmitting,
}: FormikProps<CreateAdminDto>) {
  return (
    <Form className="grid grid-cols-3 gap-2">
      <TextField
        onChange={(e) => setFieldValue('name', e.target.value)}
        label="نام و نام خانوادگی"
      />

      <TextField
        onChange={(e) => setFieldValue('phone', e.target.value)}
        label="شماره تماس"
      />

      <TextField
        onChange={(e) => setFieldValue('description', e.target.value)}
        label="توضیحات (اختیاری)"
        required={false}
      />

      <div className="col-span-3 grid grid-cols-3 gap-2">
        <Typography variant="h5" className="col-span-3">
          دسترسی
        </Typography>

        {SubjectValues.filter(
          (subject) => !['all', 'admins'].includes(subject),
        ).map((subject) => (
          <PermissionCheckboxGroup
            title={SubjectLabels[subject]}
            key={subject}
            setFieldValue={setFieldValue}
            permissions={values.permissions}
            subject={subject}
          />
        ))}
      </div>

      <Button
        type="submit"
        color="primary"
        variant="contained"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        ایجاد
      </Button>
    </Form>
  )
}

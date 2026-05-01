import { Form, type FormikProps } from 'formik'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubjectValues } from '#/constants/enums'
import PermissionCheckboxGroup from '../ui/permission-checkbox-group'
import { SubjectLabels } from '#/constants/permission-labels'
import Button from '@mui/material/Button'
import type { UpdateAdminDto } from '../../schemas'

export default function UpdateAdminForm({
  setFieldValue,
  values,
  isSubmitting,
}: FormikProps<UpdateAdminDto>) {
  return (
    <Form className="grid grid-cols-3 gap-2">
      <TextField
        value={values.name}
        label="نام و نام خانوادگی"
        onChange={(e) => setFieldValue('name', e.target.value)}
      />
      <TextField
        value={values.phone}
        label="شماره تماس"
        onChange={(e) => setFieldValue('phone', e.target.value)}
      />
      <TextField
        value={values.description}
        label="توضیحات (اختیاری)"
        onChange={(e) => setFieldValue('description', e.target.value)}
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
            permissions={values.permissions ?? []}
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

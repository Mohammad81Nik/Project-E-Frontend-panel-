import { Form } from 'formik'
import UpdateBrandImage from './update-image'
import BrandEditableField from '../ui/brand-editable-field'

export default function UpdateBrandForm() {
  return (
    <Form className="grid grid-cols-2 gap-x-8 gap-y-8">
      <UpdateBrandImage />

      <div className="flex flex-col justify-between w-full">
        <BrandEditableField name="name" label="عنوان برند" />
        <BrandEditableField name="description" label="توضیحات" multiline />
      </div>
    </Form>
  )
}

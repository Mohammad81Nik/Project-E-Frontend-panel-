import CreateProductStepper from '../ui/create-stepper'
import { Formik } from 'formik'
import CreateProductForm from '../forms/create'
import { useCallback } from 'react'
import type { TSubmitFn } from '#/types/form'
import type { CreateProductDto } from '../../schemas'
import { useCreate } from '../../hooks/useProductQueries'

export default function Create() {
  const { mutate } = useCreate()

  const onSubmit = useCallback<TSubmitFn<CreateProductDto>>(
    (values, { setSubmitting }) => {},
    [],
  )
  return (
    <Formik<CreateProductDto>
      initialValues={{
        title: '',
        category_id: '',
        brand_id: '',
        details: [{ label: '', value: '' }],
        attributes: [],
        variants: [],
        images: [],
      }}
      onSubmit={onSubmit}
    >
      <div className="grid grid-cols-[280px_1fr] gap-x-2 h-full">
        <CreateProductStepper />

        <CreateProductForm />
      </div>
    </Formik>
  )
}

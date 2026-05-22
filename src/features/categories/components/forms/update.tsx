import { Form } from 'formik'
import EditableCatoryField from '../ui/category-editable-field'
import isNonEmpty from '#/utils/isNonEmpty'
import type { ICategory } from '../../types'
import cn from '#/utils/cn'
import UpdateCategoryImage from './update-image'
import type { Nullable } from '#/types/operators'

export default function UpdateCategoryForm({
  category,
  setCategory,
}: {
  category: ICategory
  setCategory: (category: Nullable<ICategory>) => void
}) {
  return (
    <Form
      className={cn('grid gap-x-4 gap-y-2', {
        'grid-cols-[300px_1fr]': !isNonEmpty(category.parent),
      })}
    >
      {/* image in the middle */}
      {isNonEmpty(category.image) && (
        <UpdateCategoryImage
          image={category.image}
          id={category.id}
          setCategory={setCategory}
        />
      )}

      <div
        className={cn('flex flex-col justify-between gap-y-2', {
          'col-span-[300px_1fr]': isNonEmpty(category.parent),
        })}
      >
        {/* name field editable */}
        <EditableCatoryField title="نام دسته بندی" field="title" />

        {/* description field editable */}
        <EditableCatoryField title="توضیحات" field="description" />
      </div>
    </Form>
  )
}

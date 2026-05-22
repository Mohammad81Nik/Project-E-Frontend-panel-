import type { TreeViewDefaultItemModelProperties } from '@mui/x-tree-view'
import type { ICategory } from '../types'
import type { Nullable } from '#/types/operators'
import isNonEmpty from '#/utils/isNonEmpty'

export function buildCategoryTree(
  categories: Nullable<ICategory[]>,
): TreeViewDefaultItemModelProperties[] {
  if (!isNonEmpty(categories) || categories.length === 0) {
    return []
  }

  return categories.map((cat) => ({
    id: cat.id,
    label: cat.title,
    children: buildCategoryTree(cat.sub_categories),
  }))
}

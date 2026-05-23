import type { Nullable } from '#/types/operators'
import type { ICategory } from '../types'

export function findCategory(
  targetId: string,
  categories: ICategory[] | undefined | null,
): Nullable<ICategory> {
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return null
  }

  for (const category of categories) {
    // Check if current category matches
    if (category.id === targetId) {
      return category
    }

    // Recursively search through sub_categories
    if (category.sub_categories && category.sub_categories.length > 0) {
      const found = findCategory(targetId, category.sub_categories)
      if (found) {
        return found
      }
    }
  }

  return null
}

import type { IAttribute } from '#/features/attributes/types'
import type { ICategory } from '#/features/categories/types'
import type { Nullable } from '#/types/operators'

interface IProduct {
  id: string
  title: string
  description: string
  details: { label: string; value: string }[]
  bought_count: number
  category: Nullable<ICategory>
  comments: Nullable<any>
  packs: Nullable<any>
  attributes: Nullable<IAttribute[]>
  created_at: string
  updated_at: string
}

export type { IProduct }

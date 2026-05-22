import type { IAttribute } from '#/features/attributes/types'
import type { Nullable } from '#/types/operators'

interface ICategory {
  id: string
  title: string
  description: Nullable<string>
  image: Nullable<string>
  has_sub_categories: boolean
  parent: ICategory
  sub_categories: ICategory[]
  products: Nullable<any>
  attributes: Nullable<IAttribute[]>
  created_at: string
  updated_at: string
}

export type { ICategory }

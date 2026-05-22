import type { Nullable } from '#/types/operators'

interface IAttribute {
  id: string
  name: string
  values: string[]
  products: Nullable<any>
  categories: Nullable<any>
  created_at: string
  updated_at: string
}

export type { IAttribute }

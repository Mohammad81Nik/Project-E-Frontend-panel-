import type { Nullable } from '#/types/operators'

interface IBrand {
  id: string
  name: string
  description?: string
  image: string
  products: Nullable<any>
  categories: Nullable<any>
  created_at: string
  updated_at: string
}

export type { IBrand }

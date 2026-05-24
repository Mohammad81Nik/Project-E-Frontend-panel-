import z from 'zod'

const searchParamsSchema = z.object({
  name: z.string().optional().nullable(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
})

const createBrandSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.file().nullable(),
})

const updateBrandSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
})

const updateBrandImageSchema = z.object({
  id: z.uuid(),
  image: z.file(),
})

type CreateBrandDto = z.infer<typeof createBrandSchema>
type UpdateBrandDto = z.infer<typeof updateBrandSchema>
type UpdateBrandImageDto = z.infer<typeof updateBrandImageSchema>
type SearchParamsDto = z.infer<typeof searchParamsSchema>

export type {
  CreateBrandDto,
  UpdateBrandDto,
  UpdateBrandImageDto,
  SearchParamsDto,
}

export {
  createBrandSchema,
  updateBrandImageSchema,
  updateBrandSchema,
  searchParamsSchema,
}

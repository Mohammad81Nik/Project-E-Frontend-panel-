import z from 'zod'

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(1),
  name: z.string().optional().nullable(),
  category_id: z.uuid().optional().nullable(),
})

const createProductSchema = z.object({})

const updateProductSchema = z.object({})

type CreateProductDto = z.infer<typeof createProductSchema>

type UpdateProductDto = z.infer<typeof updateProductSchema>

type SearchParamsDto = z.infer<typeof searchParamsSchema>

export { createProductSchema, updateProductSchema, searchParamsSchema }

export type { CreateProductDto, UpdateProductDto, SearchParamsDto }

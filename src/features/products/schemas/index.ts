import z from 'zod'

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(1),
  name: z.string().optional().nullable(),
  category_id: z.uuid().optional().nullable(),
})

const createProductSchema = z.object({
  title: z.string(),
  category_id: z.uuid(),
  brand_id: z.uuid().optional(),
  details: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  attributes: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      values: z.array(z.string()),
    }),
  ),
  description: z.string().optional(),
  variants: z.array(
    z.object({
      price: z.number().positive(),
      stock: z.number().int().positive(),
      attributeValues: z.record(z.string(), z.string()),
    }),
  ),
  images: z.array(
    z.object({
      id: z.uuid(),
      image: z.file(),
      relatedAttributeId: z.uuid().optional(),
      relatedAttributeValue: z.string().optional(),
    }),
  ),
})

const updateProductSchema = z.object({})

type CreateProductDto = z.infer<typeof createProductSchema>

type UpdateProductDto = z.infer<typeof updateProductSchema>

type SearchParamsDto = z.infer<typeof searchParamsSchema>

export { createProductSchema, updateProductSchema, searchParamsSchema }

export type { CreateProductDto, UpdateProductDto, SearchParamsDto }

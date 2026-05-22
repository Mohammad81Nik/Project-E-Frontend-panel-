import z from 'zod'

const createCategorySchema = z.object({
  image: z.string().nullable().optional(),
  title: z.string(),
  description: z.string().nullable(),
  parentId: z.uuid().nullable().optional(),
})

const updateCategorySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
})

const updateCategoryImageSchema = z.object({
  image: z.file(),
  id: z.uuid(),
})

type CreateCategoryDto = z.infer<typeof createCategorySchema>
type UpdateCategoryDto = z.infer<typeof updateCategorySchema>
type UpdateCategoryImageDto = z.infer<typeof updateCategoryImageSchema>

export { createCategorySchema, updateCategorySchema, updateCategoryImageSchema }

export type { CreateCategoryDto, UpdateCategoryDto, UpdateCategoryImageDto }

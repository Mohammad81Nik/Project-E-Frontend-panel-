import z from 'zod'

const attributeValueSchema = z.object({
  editing: z.boolean(),
  draft: z.string(),
  value: z.string(),
})

const createAttribute = z.object({
  name: z.string(),
  values: z.array(attributeValueSchema).min(1),
})

const updateAttribute = z.object({
  name: z.string().optional(),
  values: z.array(attributeValueSchema).min(1),
})

const searchParamsSchema = z.object({
  name: z.string().optional().nullable(),
  limit: z.coerce.number().int().default(10),
  page: z.coerce.number().int().default(1),
})

type CreateAttributeDto = z.infer<typeof createAttribute>
type UpdateAttributeDto = z.infer<typeof updateAttribute>
type SearchParamsDto = z.infer<typeof searchParamsSchema>
type AttributeValueDto = z.infer<typeof attributeValueSchema>

export {
  createAttribute,
  updateAttribute,
  searchParamsSchema,
  attributeValueSchema,
}

export type {
  CreateAttributeDto,
  UpdateAttributeDto,
  SearchParamsDto,
  AttributeValueDto,
}

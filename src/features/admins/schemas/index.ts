import { PermissionValues } from '#/constants/enums'
import z from 'zod'

const createAdminSchema = z.object({
  name: z.string(),
  phone: z.string(),
  description: z.string().optional(),
  permissions: z.array(z.enum(PermissionValues)),
})

const updateAdminSchema = z.object({
  name: z.string().nullable(),
  phone: z.string().nullable(),
  description: z.string().nullable(),
  permissions: z.array(z.enum(PermissionValues)).nullable(),
})

const searchParamsSchema = z.object({
  all: z.string().optional().nullable(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
})

const updateRouteParamSchema = z.object({
  adminId: z.uuid(),
})

type CreateAdminDto = z.infer<typeof createAdminSchema>
type UpdateAdminDto = z.infer<typeof updateAdminSchema>
type SearchParamsDto = z.infer<typeof searchParamsSchema>
type UpdateRouteParamDto = z.infer<typeof updateRouteParamSchema>

export {
  createAdminSchema,
  updateAdminSchema,
  searchParamsSchema,
  updateRouteParamSchema,
}

export type {
  CreateAdminDto,
  UpdateAdminDto,
  SearchParamsDto,
  UpdateRouteParamDto,
}

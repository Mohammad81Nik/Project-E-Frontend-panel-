// --------------- Panel Permission  ---------------
export const Subjects = {
  ALL: 'all',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  ORDERS: 'orders',
  PACKS: 'packs',
  ATTRIBUTES: 'attributes',
  ADMINS: 'admins',
  USERS: 'users',
  COMMENTS: 'comments',
  BANNERS: 'banners',
  BRANDS: 'brands',
} as const

export const Actions = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  manage: 'manage',
} as const

export const SubjectValues = Object.values(Subjects)
export const ActionValues = Object.values(Actions)

export type SubjectsDto = (typeof Subjects)[keyof typeof Subjects]
export type ActionsDto = (typeof Actions)[keyof typeof Actions]

export type PermissionsDto = `${SubjectsDto}:${ActionsDto}`
export const PermissionValues = SubjectValues.flatMap((subject) =>
  ActionValues.map((action) => `${subject}:${action}` as PermissionsDto),
)

// --------------- Literal Days  ---------------
export const Days = {
  SATURDAY: 'saturday',
  SUNDAY: 'sunday',
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  THURSDAY: 'thursday',
  WEDNESDAY: 'wednesday',
  FRIDAY: 'friday',
} as const
export const DayValues = Object.values(Days)
export type DaysDto = (typeof Days)[keyof typeof Days]

// --------------- Cookie Namespaces  ---------------
export const CookieKeys = {
  TOKEN: 'token',
  PHONE: 'phone',
} as const
export const CookieValues = Object.values(CookieKeys)
export type CookieKeysDto = (typeof CookieKeys)[keyof typeof CookieKeys]

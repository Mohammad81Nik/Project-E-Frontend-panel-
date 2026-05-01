import type { DaysDto, PermissionsDto } from '#/constants/enums'
import type { Nullable } from '#/types/operators'

interface IOpeningHours {
  id: string
  day: DaysDto
  opens: string
  closes: string
  isClosed: boolean
}

interface IBranch {
  id: string
  name: string
  description: Nullable<string>
  image: Nullable<string>
  telephone: string
  email: Nullable<string>
  street: string
  city: string
  province: string
  postalCode: string
  latitude: number
  longitude: number
  fullAddress: string
  openingHours: IOpeningHours[]
}

interface IStore {
  id: string
  name: string
  url: string
  logo: string
  soccialMediaLinks: string[]
  telephone: string
  email: Nullable<string>
  branches: IBranch[]
}

interface IAdmin {
  id: string
  name: string
  phone: string
  description: Nullable<string>
  role: 'admin'
  isSuper: boolean
  permissions: PermissionsDto[]
  store?: IStore
}

export type { IAdmin }

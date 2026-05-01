import type { SubjectsDto } from '#/constants/enums'
import type { OverridableComponent } from '@mui/material/OverridableComponent'
import type { SvgIconTypeMap } from '@mui/material/SvgIcon'

interface INavItem {
  text: string
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
  href: string
  exactMatch?: boolean
  subject: SubjectsDto | ''
}

type TNavigationList = INavItem[]

export type { INavItem, TNavigationList }

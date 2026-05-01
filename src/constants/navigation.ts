import type { TNavigationList } from '#/types/navigation'
import RedeemIcon from '@mui/icons-material/Redeem'

import CategoryIcon from '@mui/icons-material/Category'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import GroupIcon from '@mui/icons-material/Group'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EditAttributesIcon from '@mui/icons-material/EditAttributes'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import BackpackIcon from '@mui/icons-material/Backpack'
import AdUnitsIcon from '@mui/icons-material/AdUnits'

const navigationList: TNavigationList = [
  {
    text: 'داشبورد',
    icon: DashboardIcon,
    href: '/',
    exactMatch: true,
    subject: '',
  },
  {
    text: 'مدیریت دسته بندی',
    icon: CategoryIcon,
    href: '/categories',
    subject: 'categories',
  },
  {
    text: 'مدیریت محصولات',
    icon: RedeemIcon,
    href: '/products',
    subject: 'products',
  },
  {
    text: 'مدیریت ادمین ها',
    icon: AdminPanelSettingsIcon,
    href: '/admins',
    subject: 'admins',
  },
  {
    text: 'مدیریت مشتریان',
    icon: GroupIcon,
    href: '/customers',
    subject: 'users',
  },
  {
    text: 'مدیریت ویژگی محصولات',
    icon: EditAttributesIcon,
    href: '/attributes',
    subject: 'attributes',
  },
  {
    text: 'مدیریت سفارشات',
    icon: ShoppingCartCheckoutIcon,
    href: '/orders',
    subject: 'orders',
  },
  {
    text: 'مدیریت پک محصولات',
    icon: BackpackIcon,
    href: '/packs',
    subject: 'packs',
  },
  {
    text: 'مدیریت بنر ها و تبلیغات',
    icon: AdUnitsIcon,
    href: '/banners',
    subject: 'banners',
  },
]

export default navigationList

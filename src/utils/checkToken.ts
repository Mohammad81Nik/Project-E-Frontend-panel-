import Cookies from 'js-cookie'
import isNonEmpty from './isNonEmpty'
import { redirect } from '@tanstack/react-router'
import type { CookieKeysDto } from '#/constants/enums'

interface ICheckTokenArgs {
  key: CookieKeysDto
  fullfilled?: {
    to: string
  }
  rejected?: {
    to: string
  }
}

export default function checkCookie(args: ICheckTokenArgs) {
  const token = Cookies.get()?.[args.key]

  if (isNonEmpty(token) && isNonEmpty(args.fullfilled)) {
    throw redirect({ to: args.fullfilled.to })
  }

  if (!isNonEmpty(token) && isNonEmpty(args.rejected)) {
    throw redirect({ to: args.rejected.to })
  }
}

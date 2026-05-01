import { CookieKeys } from '#/constants/enums'
import router from '#/lib/router'
import Cookies from 'js-cookie'
import { enqueueSnackbar } from 'notistack'

export default function handleUnauthorizedError() {
  if (!['/auth/otp', '/auth/phone'].includes(router.state.location.pathname)) {
    enqueueSnackbar({
      message: 'توکن کاربر منقضی شده٫ لطفا مجددا وروود نمایید',
      variant: 'error',
    })

    setTimeout(() => {
      Cookies.remove(CookieKeys.TOKEN)

      router.navigate({ to: '/auth/phone' })
    }, 3000)
  }
}

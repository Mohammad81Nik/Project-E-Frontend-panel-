import OtpPage from '#/features/auth/components/pages/otp'
import checkCookie from '#/utils/checkToken'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/otp')({
  component: RouteComponent,
  beforeLoad: () => {
    checkCookie({
      key: 'phone',
      rejected: {
        to: '/auth/phone',
      },
    })
  },
})

function RouteComponent() {
  return <OtpPage />
}

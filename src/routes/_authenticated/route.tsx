import AuthenticatedLayout from '#/components/layouts/authenticated'
import { authQueries } from '#/features/auth/constants/auth.queries'
import checkCookie from '#/utils/checkToken'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    checkCookie({
      key: 'token',
      rejected: {
        to: '/auth/phone',
      },
    })

    context.queryClient.ensureQueryData(authQueries.getMe())
  },
})

function RouteComponent() {
  return <AuthenticatedLayout />
}

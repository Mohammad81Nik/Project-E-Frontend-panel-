import UnAuthenticatedLayout from '#/components/layouts/un-authenticated'
import checkCookie from '#/utils/checkToken'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
  beforeLoad: () => {
    checkCookie({
      key: 'token',
      fullfilled: {
        to: '/admins',
      },
    })
  },
})

function RouteComponent() {
  return <UnAuthenticatedLayout />
}

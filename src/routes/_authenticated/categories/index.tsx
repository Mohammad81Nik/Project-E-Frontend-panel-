import { authQueries } from '#/features/auth/constants/auth.queries'
import Read from '#/features/categories/components/pages/read'
import { createAbility } from '#/lib/casl/ability'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/categories/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const me = await context.queryClient.ensureQueryData(authQueries.getMe())

    const ability = createAbility(me.data.permissions)

    if (!ability.can('read', 'categories')) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return <Read />
}

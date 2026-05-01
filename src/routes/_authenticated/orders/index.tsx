import { authQueries } from '#/features/auth/constants/auth.queries'
import { createAbility } from '#/lib/casl/ability'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/orders/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const me = await context.queryClient.ensureQueryData(authQueries.getMe())

    const ability = createAbility(me.data.permissions)

    if (!ability.can('read', 'orders')) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return <div>Hello "/_authenticated/orders/"!</div>
}

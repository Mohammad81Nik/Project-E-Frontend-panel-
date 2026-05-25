import { authQueries } from '#/features/auth/constants/auth.queries'
import Create from '#/features/brands/components/pages/create'
import { createAbility } from '#/lib/casl/ability'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/brands/create')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const me = await context.queryClient.ensureQueryData(authQueries.getMe())

    const ability = createAbility(me.data.permissions)

    if (!ability.can('create', 'brands')) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return <Create />
}

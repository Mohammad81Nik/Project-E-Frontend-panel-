import { authQueries } from '#/features/auth/constants/auth.queries'
import Read from '#/features/brands/components/pages/read'
import { searchParamsSchema } from '#/features/brands/schemas'
import { createAbility } from '#/lib/casl/ability'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/brands/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const me = await context.queryClient.ensureQueryData(authQueries.getMe())

    const ability = createAbility(me.data.permissions)

    if (!ability.can('read', 'brands')) {
      throw redirect({ to: '/' })
    }
  },
  validateSearch: searchParamsSchema,
})

function RouteComponent() {
  return <Read />
}

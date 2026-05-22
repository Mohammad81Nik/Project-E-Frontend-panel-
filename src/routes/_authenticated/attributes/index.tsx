import Read from '#/features/attributes/components/pages/read'
import { searchParamsSchema } from '#/features/attributes/schemas'
import { authQueries } from '#/features/auth/constants/auth.queries'
import { createAbility } from '#/lib/casl/ability'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/attributes/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const me = await context.queryClient.ensureQueryData(authQueries.getMe())

    const ability = createAbility(me.data.permissions)

    if (!ability.can('read', 'attributes')) {
      throw redirect({ to: '/' })
    }
  },
  validateSearch: searchParamsSchema,
})

function RouteComponent() {
  return <Read />
}

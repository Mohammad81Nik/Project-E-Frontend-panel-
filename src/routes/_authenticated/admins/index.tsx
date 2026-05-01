import AdminsRead from '#/features/admins/components/pages/read'
import { searchParamsSchema } from '#/features/admins/schemas'
import { authQueries } from '#/features/auth/constants/auth.queries'
import { createAbility } from '#/lib/casl/ability'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admins/')({
  component: RouteComponent,
  validateSearch: searchParamsSchema,
  beforeLoad: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData(authQueries.getMe())

    const ability = createAbility(data.data.permissions)

    if (!ability.can('read', 'admins')) {
      throw redirect({ to: '/products', from: '/admins/' })
    }
  },
})

function RouteComponent() {
  return <AdminsRead />
}

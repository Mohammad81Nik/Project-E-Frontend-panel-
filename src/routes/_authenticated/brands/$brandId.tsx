import { authQueries } from '#/features/auth/constants/auth.queries'
import Details from '#/features/brands/components/pages/details'
import { brandQueries } from '#/features/brands/constants/brand.queries'
import { createAbility } from '#/lib/casl/ability'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/brands/$brandId')({
  component: RouteComponent,
  beforeLoad: async ({ context, params }) => {
    const me = await context.queryClient.ensureQueryData(authQueries.getMe())

    const ability = createAbility(me.data.permissions)

    if (!ability.can('read', 'brands')) {
      throw redirect({ to: '/' })
    }

    context.queryClient.ensureQueryData(brandQueries.getOne(params.brandId))
  },
})

function RouteComponent() {
  return <Details />
}

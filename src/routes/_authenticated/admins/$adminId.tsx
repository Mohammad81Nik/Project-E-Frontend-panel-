import DeleteModal from '#/features/admins/components/modals/delete'
import Update from '#/features/admins/components/pages/update'
import { adminQueries } from '#/features/admins/constants/admin.queries'
import { updateRouteParamSchema } from '#/features/admins/schemas'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admins/$adminId')({
  component: RouteComponent,
  params: updateRouteParamSchema,
  beforeLoad: ({ context, params }) => {
    context.queryClient.ensureQueryData(adminQueries.getOne(params.adminId))
  },
})

function RouteComponent() {
  return (
    <>
      <Update />
      <DeleteModal />
    </>
  )
}

import Create from '#/features/admins/components/pages/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admins/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Create />
}

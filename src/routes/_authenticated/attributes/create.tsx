import Create from '#/features/attributes/components/pages/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/attributes/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Create />
}

import Create from '#/features/brands/components/pages/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/brands/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Create />
}

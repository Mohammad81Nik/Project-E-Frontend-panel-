import Create from '#/features/products/components/pages/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/products/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Create />
}

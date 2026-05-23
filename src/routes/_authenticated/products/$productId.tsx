import Details from '#/features/products/components/pages/details'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/products/$productId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Details />
}

import Details from '#/features/brands/components/pages/details'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/brands/$brandId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Details />
}

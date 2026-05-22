import Update from '#/features/attributes/components/pages/update'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/attributes/$attributeId')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <Update />
}

import PhonePage from '#/features/auth/components/pages/phone'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/phone')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PhonePage />
}

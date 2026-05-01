import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
  beforeLoad: () => {
    throw redirect({ to: '/auth/phone' })
  },
})

function RouteComponent() {
  return null
}

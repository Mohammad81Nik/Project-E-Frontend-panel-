import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { SnackbarProvider } from 'notistack'
import appCss from '../styles.css?url'
import fontCss from '../fonts.css?url'
import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'stylesheet',
        href: fontCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument() {
  return (
    <>
      <HeadContent />
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Outlet />
      </SnackbarProvider>
    </>
  )
}

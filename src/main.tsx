import { QueryClientProvider } from '@tanstack/react-query'
import router from './lib/router'
import ReactDOM from 'react-dom/client'
import queryClient from './lib/queryClient'
import { RouterProvider } from '@tanstack/react-router'
import { rtlCache, theme } from './lib/theme'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>,
  )
}

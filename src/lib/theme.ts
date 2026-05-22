import { createTheme } from '@mui/material/styles'
import { prefixer } from 'stylis'
import rtlPlugin from '@mui/stylis-plugin-rtl'
import createCache from '@emotion/cache'

export const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

export const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: '"IranYekan", "Roboto", "Segoe UI", sans-serif',
  },
  breakpoints: {
    values: {
      xs: 375,
      sm: 768,
      md: 1440,
      lg: 1441,
      xl: 1442,
    },
  },
  components: {
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            padding: 0,

            '& .MuiSnackbarContent-message': {
              padding: 0,
              width: '100%',
            },
          },
        },
      },
    },
  },
})

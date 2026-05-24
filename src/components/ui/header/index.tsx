import Toolbar from '@mui/material/Toolbar'
import { AppBar } from './styled'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import { useLocation } from '@tanstack/react-router'
import { useMemo } from 'react'
import navigationList from '#/constants/navigation'

interface IHeaderProps {
  drawerOpen: boolean
  onDrawerOpen: () => void
}

export default function Header({ drawerOpen, onDrawerOpen }: IHeaderProps) {
  const { pathname } = useLocation()

  const pageTitle = useMemo(
    () =>
      navigationList.find(({ exactMatch = false, href }) =>
        exactMatch ? pathname === href : pathname.includes(href),
      )?.text,
    [pathname],
  )

  return (
    <AppBar
      position="fixed"
      open={drawerOpen}
      sx={{
        backgroundColor: (theme) => theme.palette.grey[700],
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            drawerOpen && { display: 'none' },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {pageTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

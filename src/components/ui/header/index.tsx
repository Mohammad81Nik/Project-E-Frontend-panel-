import Toolbar from '@mui/material/Toolbar'
import { AppBar } from './styled'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'

interface IHeaderProps {
  drawerOpen: boolean
  onDrawerOpen: () => void
}

export default function Header({ drawerOpen, onDrawerOpen }: IHeaderProps) {
  return (
    <AppBar position="fixed" open={drawerOpen}>
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
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

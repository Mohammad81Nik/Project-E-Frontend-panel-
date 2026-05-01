import IconButton from '@mui/material/IconButton'
import { DrawerHeader } from '../header/styled'
import { Drawer } from './styled'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import navigationList from '#/constants/navigation'
import { useLocation, useNavigate } from '@tanstack/react-router'
import isNonEmpty from '#/utils/isNonEmpty'
import Button from '@mui/material/Button'
import { useCallback } from 'react'
import { useAbilityStore } from '#/stores/useAbilityStore'
import Cookies from 'js-cookie'
import { CookieKeys } from '#/constants/enums'
import LogoutIcon from '@mui/icons-material/Logout'

interface IUiDrawerProps {
  open: boolean
  onClose: () => void
}

export default function UiDrawer({ open, onClose }: IUiDrawerProps) {
  const location = useLocation()

  const navigate = useNavigate()

  const ability = useAbilityStore((state) => state.ability)
  const clearAbility = useAbilityStore((state) => state.clearAbility)

  const onLogout = useCallback(() => {
    Cookies.remove(CookieKeys.TOKEN)

    clearAbility()

    navigate({ to: '/auth/phone' })
  }, [])

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        '& .MuiPaper-root': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pb: '12px',
        },
      }}
    >
      <div>
        <DrawerHeader>
          <IconButton onClick={onClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        {/* <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        <Divider />
        <List>
          {navigationList.map((navItem) => {
            if (
              isNonEmpty(navItem.subject) &&
              !ability?.can('read', navItem.subject)
            ) {
              return null
            }

            const color =
              (navItem.exactMatch === true && location.href === navItem.href) ||
              (!isNonEmpty(navItem.exactMatch) &&
                location.href.includes(navItem.href))
                ? { color: 'blue' }
                : { color: 'gray' }
            return (
              <ListItem
                key={navItem.text}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  onClick={() => {
                    navigate({ to: navItem.href })
                  }}
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                    },
                    open
                      ? {
                          justifyContent: 'initial',
                        }
                      : {
                          justifyContent: 'center',
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center',
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: 'auto',
                          },
                      color,
                    ]}
                  >
                    {<navItem.icon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={navItem.text}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                      color,
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </div>
      {open ? (
        <Button
          variant="contained"
          color="error"
          onClick={onLogout}
          sx={{ mx: '4px' }}
        >
          خروج
        </Button>
      ) : (
        <IconButton color="error">
          <LogoutIcon />
        </IconButton>
      )}
    </Drawer>
  )
}

import CssBaseline from '@mui/material/CssBaseline'
import Header from '../ui/header'
import Box from '@mui/material/Box'
import { Outlet } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import UiDrawer from '../ui/drawer'
import { useGetMe } from '#/features/auth/hooks/useAuthQueries'
import isNonEmpty from '#/utils/isNonEmpty'
import { useAbilityStore } from '#/stores/useAbilityStore'
import { createAbility } from '#/lib/casl/ability'
import DeleteModal from '../modals/delete-modal'

export default function AuthenticatedLayout() {
  const [drawerOpen, serDrawerOpen] = useState(false)

  const setAbility = useAbilityStore((state) => state.setAbility)

  const { data } = useGetMe()

  useEffect(() => {
    if (isNonEmpty(data)) {
      setAbility(createAbility(data.data.permissions))
    }
  }, [data])
  const handleDrawerOpen = () => {
    serDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    serDrawerOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', height: '100dvh' }}>
      <CssBaseline />
      <Header drawerOpen={drawerOpen} onDrawerOpen={handleDrawerOpen} />
      <UiDrawer open={drawerOpen} onClose={handleDrawerClose} />
      <Box
        sx={[
          { paddingTop: '64px', paddingInline: '16px', maxHeight: '100vh' },
          drawerOpen
            ? {
                width: 'calc(100% - 240px)',
              }
            : {
                width: 'calc(100% - 64px)',
              },
        ]}
      >
        {/* <DrawerHeader /> */}
        <div className="w-full h-[calc(100dvh-64px)] flex flex-col gap-y-4 relative py-2">
          <Outlet />
        </div>
      </Box>

      <DeleteModal />
    </Box>
  )
}

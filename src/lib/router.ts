import { routeTree } from '#/routeTree.gen'
import { createRouter } from '@tanstack/react-router'
import { queryClient } from './queryClient'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  context: {
    queryClient,
  },
})

export default router

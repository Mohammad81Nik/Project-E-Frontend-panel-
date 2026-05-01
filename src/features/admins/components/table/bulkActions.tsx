import BulkActions from '#/components/ui/bulk-actions'
import { useModalStore } from '#/stores/useModalStore'
import DeleteIcon from '@mui/icons-material/Delete'
import type { GridRowId } from '@mui/x-data-grid'
import { useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { adminQueries } from '../../constants/admin.queries'

interface IAdminBulkActionsProps {
  selectedItems: Set<GridRowId>
  onClose: () => void
}

export default function AdminBulkActions({
  selectedItems,
  onClose,
}: IAdminBulkActionsProps) {
  const setModal = useModalStore((state) => state.setModal)

  const queryClient = useQueryClient()

  const search = useSearch({ from: '/_authenticated/admins/' })

  const selectedArray = useMemo(
    () => Array.from(selectedItems.values()),
    [selectedItems],
  )

  const onBulkDelete = useCallback(() => {
    setModal({
      feature: 'admins',
      path: 'delete',
      config: {
        open: true,
        props: {
          ids: selectedArray,
          onFinished: () => {
            queryClient.invalidateQueries(adminQueries.getAll(search))
          },
        },
      },
    })
  }, [selectedItems])

  return (
    <BulkActions
      onClose={onClose}
      selectedItems={selectedItems}
      actions={[
        {
          icon: DeleteIcon,
          color: 'error',
          onClick: onBulkDelete,
          hasTooltip: false,
        },
      ]}
    />
  )
}

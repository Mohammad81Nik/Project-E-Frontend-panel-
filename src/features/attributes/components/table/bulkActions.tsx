import BulkActions from '#/components/ui/bulk-actions'
import { useModalStore } from '#/stores/useModalStore'
import type { GridRowId } from '@mui/x-data-grid'
import { useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { attributeQueries } from '../../constants/attribute.queries'

interface IBulkActionsProps {
  selected: Set<GridRowId>
  onClose: () => void
}

export default function AttributeBulkActions({
  selected,
  onClose,
}: IBulkActionsProps) {
  const setModal = useModalStore((state) => state.setModal)

  const queryClient = useQueryClient()

  const search = useSearch({ from: '/_authenticated/attributes/' })

  const selectedArray = useMemo(() => Array.from(selected.values()), [selected])

  const onBulkDelete = useCallback(() => {
    setModal({
      feature: 'attributes',
      path: 'delete',
      config: {
        open: true,
        props: {
          ids: selectedArray,
          onFinished: () => {
            queryClient.invalidateQueries(attributeQueries.getAll(search))
          },
        },
      },
    })
  }, [selectedArray])

  return (
    <BulkActions
      onClose={onClose}
      selectedItems={selected}
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

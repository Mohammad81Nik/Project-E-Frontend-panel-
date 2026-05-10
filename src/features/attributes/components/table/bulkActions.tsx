import BulkActions from '#/components/ui/bulk-actions'
import { useModalStore } from '#/stores/useModalStore'
import type { GridRowId } from '@mui/x-data-grid'
import { useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { attributeQueries } from '../../constants/attribute.queries'
import { useDelete } from '../../hooks/useAttributeQueries'
import { enqueueSnackbar } from 'notistack'

interface IBulkActionsProps {
  selected: Set<GridRowId>
  onClose: () => void
}

export default function AttributeBulkActions({
  selected,
  onClose,
}: IBulkActionsProps) {
  const setModal = useModalStore((state) => state.setModal)

  const { mutateAsync } = useDelete()

  const queryClient = useQueryClient()

  const search = useSearch({ from: '/_authenticated/attributes/' })

  const selectedArray = useMemo(() => Array.from(selected.values()), [selected])

  const onBulkDelete = useCallback(() => {
    setModal({
      feature: 'global',
      path: 'delete',
      config: {
        open: true,
        props: {
          text: `آیا از حذف ${selectedArray.length === 1 ? 'مورد' : 'موارد'} انتخاب شده اطمینان دارید؟`,
          onSubmit: () =>
            mutateAsync(selectedArray, {
              onSuccess: (data) => {
                enqueueSnackbar({ message: data.message, variant: 'success' })

                queryClient.invalidateQueries(attributeQueries.getAll(search))
              },
            }),
        },
      },
    })
  }, [selectedArray, queryClient])

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

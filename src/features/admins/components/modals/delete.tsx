import UiModal from '#/components/ui/modal'
import { useModalStore } from '#/stores/useModalStore'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useCallback, useMemo } from 'react'
import { useDelete } from '../../hooks/useAdminQueries'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'

export default function DeleteModal() {
  const { mutate, isPending } = useDelete()

  const queryClient = useQueryClient()

  const { open, props } = useModalStore((state) => state.admins.delete)

  const setModal = useModalStore((state) => state.setModal)

  const { ids, adminName, onFinished } = useMemo(
    () => ({
      ids: props?.ids ?? [],
      adminName: props?.adminName,
      onFinished: props?.onFinished,
    }),
    [props?.ids, props?.adminName],
  )

  const prompt = useMemo(() => {
    if (ids.length === 0) {
      return `آیا از حذف ادمین ${adminName} اطمینان دارید؟`
    }

    return 'آیا از حذف ادمین های انتخاب شده اطمینان دارید'
  }, [ids, adminName])

  const onClose = useCallback(() => {
    setModal({
      feature: 'admins',
      path: 'delete',
      config: {
        open: false,
      },
    })
  }, [])

  const onDelete = useCallback(() => {
    mutate(ids, {
      onSuccess: (data) => {
        enqueueSnackbar({ variant: 'success', message: data.message })

        onFinished?.()

        onClose()
      },
    })
  }, [ids, queryClient, onFinished])

  return (
    <UiModal open={open} onClose={onClose}>
      <Typography>{prompt}</Typography>

      <div className="grid grid-cols-2 gap-x-2">
        <Button
          variant="outlined"
          sx={{
            color: 'black',
            borderColor: 'black',
          }}
          disabled={isPending}
          onClick={onClose}
        >
          انصراف
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={isPending}
          loading={isPending}
          onClick={onDelete}
        >
          تایید
        </Button>
      </div>
    </UiModal>
  )
}

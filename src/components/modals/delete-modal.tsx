import { useModalStore } from '#/stores/useModalStore'
import Typography from '@mui/material/Typography'
import UiModal from '../ui/modal'
import { useCallback, useState } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

export default function DeleteModal() {
  const { open, props } = useModalStore((state) => state.global.delete)

  const setModal = useModalStore((state) => state.setModal)

  const [deletePending, setDeletePending] = useState<boolean>(false)

  const onClose = useCallback(() => {
    setModal({
      feature: 'global',
      path: 'delete',
      config: {
        open: false,
      },
    })
  }, [])

  return (
    <UiModal open={open} onClose={onClose}>
      <div className="flex flex-col gap-y-1">
        <Typography variant="h5">{props?.title ?? 'حذف'}</Typography>
        <Divider
          sx={{
            borderColor: 'black',
          }}
        />
      </div>

      <Typography>{props?.text}</Typography>

      <div className="grid grid-cols-2 gap-x-2">
        <Button variant="outlined" onClick={onClose} disabled={deletePending}>
          انصراف
        </Button>
        <Button
          variant="contained"
          color="error"
          loading={deletePending}
          disabled={deletePending}
          onClick={() => {
            setDeletePending(true)
            props?.onSubmit().finally(() => {
              setDeletePending(false)
              onClose()
            })
          }}
        >
          تایید و حذف
        </Button>
      </div>
    </UiModal>
  )
}

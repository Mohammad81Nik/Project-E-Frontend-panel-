import UiModal from '#/components/ui/modal'
import { useModalStore } from '#/stores/useModalStore'
import Typography from '@mui/material/Typography'
import { useCallback, useMemo } from 'react'

export default function DeleteModal() {
  const { open, props } = useModalStore((state) => state.attributes.delete)
  const setModal = useModalStore((state) => state.setModal)

  const { attributeName, ids, onFinished } = useMemo(
    () => ({
      attributeName: props?.attributeName,
      ids: props?.ids,
      onFinished: props?.onFinished,
    }),
    [props?.attributeName, props?.ids, props?.onFinished],
  )

  const onClose = useCallback(() => {
    setModal({
      feature: 'attributes',
      path: 'delete',
      config: {
        open: false,
      },
    })
  }, [])

  const onDelete = useCallback(() => {}, [])

  return (
    <UiModal open={open} onClose={onClose}>
      <Typography>حذف ویژگی</Typography>
    </UiModal>
  )
}

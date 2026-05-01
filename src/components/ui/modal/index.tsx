import cn from '#/utils/cn'
import Modal from '@mui/material/Modal'

interface IUiModalProps {
  open: boolean
  onClose: () => void
  styles?: {
    modal?: string
    content?: string
  }
  children?: React.ReactNode
}

export default function UiModal({
  open,
  onClose,
  styles,
  children,
}: IUiModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={styles?.modal}
    >
      <div
        className={cn(
          'bg-white p-8 rounded-md w-1/3 flex flex-col gap-y-8',
          styles?.content,
        )}
      >
        {children}
      </div>
    </Modal>
  )
}

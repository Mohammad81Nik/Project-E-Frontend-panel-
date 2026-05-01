import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import type { GridRowId } from '@mui/x-data-grid'
import { useMemo } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import IconButton, { type IconButtonProps } from '@mui/material/IconButton'
import { purple } from '@mui/material/colors'
import type { OverridableComponent } from '@mui/material/OverridableComponent'
import type { SvgIconTypeMap } from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import keyGenerators from '#/constants/keyGenerators'

interface IBulkActionProps {
  selectedItems: Set<GridRowId>
  onClose: () => void
  actions: ({
    icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string
    }
    color: IconButtonProps['color']
    onClick: () => void
  } & (
    | {
        hasTooltip: true
        title: string
      }
    | {
        hasTooltip: false
      }
  ))[]
}
export default function BulkActions({
  selectedItems,
  onClose,
  actions,
}: IBulkActionProps) {
  const open = useMemo(() => selectedItems.size > 0, [selectedItems])

  return (
    <Slide direction="up" in={open} unmountOnExit>
      <Paper
        sx={{
          background: purple[50],
          position: 'fixed',
          bottom: '20px',
          left: '42%',
          display: 'flex',
          alignItems: 'center',
          paddingBlock: '10px',
          paddingInline: '30px',
          gap: '8px',
        }}
        elevation={4}
      >
        <CloseIcon onClick={onClose} />

        <Typography>{selectedItems.size} مورد انتخاب شده.</Typography>

        {actions.map((action, idx) => {
          const Icon = action.icon

          if (action.hasTooltip) {
            return (
              <Tooltip
                key={keyGenerators.bulkActions(idx)}
                title={action.title}
              >
                <IconButton onClick={action.onClick} color={action.color}>
                  <Icon />
                </IconButton>
              </Tooltip>
            )
          }
          return (
            <IconButton
              key={keyGenerators.bulkActions(idx)}
              onClick={action.onClick}
              color={action.color}
            >
              <Icon />
            </IconButton>
          )
        })}
      </Paper>
    </Slide>
  )
}

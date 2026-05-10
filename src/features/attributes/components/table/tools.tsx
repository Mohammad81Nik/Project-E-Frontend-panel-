import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from '@tanstack/react-router'
import type {
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid'
import type { IAttribute } from '../../types'

export default function ToolsCell(
  props: GridRenderCellParams<IAttribute, any, any, GridTreeNodeWithRender>,
) {
  const navigate = useNavigate({ from: '/attributes/' })
  return (
    <IconButton
      color="secondary"
      onClick={() => {
        navigate({
          to: '/attributes/$attributeId',
          params: { attributeId: props.row.id },
        })
      }}
    >
      <EditIcon />
    </IconButton>
  )
}

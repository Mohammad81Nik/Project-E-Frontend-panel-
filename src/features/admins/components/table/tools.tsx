import type {
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid'
import type { IAdmin } from '../../types'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from '@tanstack/react-router'

export default function ToolsCell(
  props: GridRenderCellParams<IAdmin, any, any, GridTreeNodeWithRender>,
) {
  const navigate = useNavigate({ from: '/admins/' })

  return (
    <>
      <IconButton
        color="secondary"
        onClick={() => {
          navigate({
            to: '/admins/$adminId',
            params: { adminId: props.row.id },
          })
        }}
      >
        <EditIcon />
      </IconButton>
    </>
  )
}

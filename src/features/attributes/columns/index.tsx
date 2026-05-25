import type { GridColDef } from '@mui/x-data-grid'
import type { IAttribute } from '../types'
import ToolsCell from '../components/table/tools'

export const columns: (
  toolColumnPermission: boolean,
) => GridColDef<IAttribute>[] = (toolColumnPermission) => {
  const base: GridColDef<IAttribute>[] = [
    {
      resizable: false,
      field: 'name',
      headerName: 'نام ویژگی',
      headerClassName: '!w-1/4',
      cellClassName: '!w-1/4',
    },
    {
      resizable: false,
      field: 'created_at',
      headerName: 'تاریخ ایجاد',
      headerClassName: '!w-1/4',
      cellClassName: '!w-1/4',
    },
    {
      resizable: false,
      field: 'updated_at',
      headerName: 'تاریخ ویرایش',
      headerClassName: '!w-1/4',
      cellClassName: '!w-1/4',
    },
  ]

  if (toolColumnPermission) {
    base.push({
      resizable: false,
      field: 'tools',
      headerName: 'ویرایش',
      headerClassName: '!w-1/4',
      cellClassName: '!w-1/4',
      renderCell: ToolsCell,
    })
  }

  return base
}

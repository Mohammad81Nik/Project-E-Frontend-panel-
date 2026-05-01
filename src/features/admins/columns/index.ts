import type { GridColDef } from '@mui/x-data-grid'
import type { IAdmin } from '../types'
import ToolsCell from '../components/table/tools'

export const columns: GridColDef<IAdmin>[] = [
  {
    resizable: false,
    field: 'name',
    headerName: 'نام و نام خانوادگی',
    headerClassName: '!w-1/4',
    cellClassName: '!w-1/4',
  },
  {
    resizable: false,
    field: 'phone',
    headerName: 'شماره تماس',
    headerClassName: '!w-1/4',
    cellClassName: '!w-1/4',
  },
  {
    resizable: false,
    field: 'description',
    headerName: 'توضیحات',
    headerClassName: '!w-1/4',
    cellClassName: '!w-1/4',
  },
  {
    resizable: false,
    field: 'tools',
    headerName: 'ویرایش',
    renderCell: ToolsCell,
    headerClassName: '!w-1/4',
    cellClassName: '!w-1/4',
  },
]

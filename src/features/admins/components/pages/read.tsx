import { DataGrid, type GridRowId } from '@mui/x-data-grid'
import { columns } from '../../columns'
import { useGetAll } from '../../hooks/useAdminQueries'
import { useNavigate, useSearch } from '@tanstack/react-router'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import AdminBulkActions from '../table/bulkActions'
import DeleteModal from '../modals/delete'
import Searchbar from '#/components/ui/searchbar'
import Toolbar from '#/components/ui/toolbar'

export default function AdminsRead() {
  const searchParams = useSearch({ from: '/_authenticated/admins/' })

  const navigate = useNavigate({ from: '/admins/' })

  const { data, isLoading, isRefetching } = useGetAll(searchParams)

  const [selected, setSelected] = useState<Set<GridRowId>>(new Set())

  return (
    <>
      <Toolbar>
        <Searchbar
          from="/_authenticated/admins/"
          filters={[
            { label: 'شماره تماس', key: 'phone', type: 'text' },
            {
              label: 'نام و نام خانوادگی',
              key: 'name',
              type: 'text',
            },
          ]}
        />
        <Toolbar.actions className="flex items-center justify-end">
          <Button
            onClick={() => {
              navigate({ to: '/admins/create' })
            }}
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
          >
            ایجاد ادمین جدید
          </Button>
        </Toolbar.actions>
      </Toolbar>
      <DataGrid
        columns={columns}
        checkboxSelection
        rowSelectionModel={{
          ids: selected,
          type: 'include',
        }}
        onRowSelectionModelChange={(model) => {
          setSelected(model.ids)
        }}
        rows={data?.data.list ?? []}
        loading={isLoading || isRefetching}
        paginationModel={{
          page: searchParams.page - 1,
          pageSize: searchParams.limit,
        }}
        paginationMeta={{
          hasNextPage: (data?.data.meta.last_page ?? 1) > 1,
        }}
        onPaginationModelChange={({ page, pageSize }) => {
          navigate({
            to: '/admins',
            search: { page: page + 1, limit: pageSize },
            replace: true,
          })
        }}
      />
      <AdminBulkActions
        selectedItems={selected}
        onClose={() => {
          setSelected(new Set())
        }}
      />

      <DeleteModal />
    </>
  )
}

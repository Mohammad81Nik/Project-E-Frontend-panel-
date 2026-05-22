import Searchbar from '#/components/ui/searchbar'
import Toolbar from '#/components/ui/toolbar'
import Button from '@mui/material/Button'
import { DataGrid, type GridRowId } from '@mui/x-data-grid'
import { columns } from '../../columns'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import AttributeBulkActions from '../table/bulkActions'
import { useGetAll } from '../../hooks/useAttributeQueries'
import AddIcon from '@mui/icons-material/Add'

export default function Read() {
  const [selected, setSelected] = useState<Set<GridRowId>>(new Set())

  const search = useSearch({ from: '/_authenticated/attributes/' })

  const navigate = useNavigate({ from: '/attributes/' })

  const { data, isLoading, isRefetching } = useGetAll()

  return (
    <>
      <Toolbar>
        <Searchbar
          filters={[{ label: 'نام ویژگی', key: 'name', type: 'text' }]}
          from="/_authenticated/attributes/"
        />
        <Toolbar.actions className="flex items-center justify-end">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => {
              navigate({ to: '/attributes/create' })
            }}
          >
            افزودن ویژگی
          </Button>
        </Toolbar.actions>
      </Toolbar>

      <DataGrid
        loading={isLoading || isRefetching}
        rows={data?.data.list ?? []}
        columns={columns}
        checkboxSelection
        rowSelectionModel={{
          ids: selected,
          type: 'include',
        }}
        onRowSelectionModelChange={(model) => {
          setSelected(model.ids)
        }}
        paginationModel={{
          page: search.page - 1,
          pageSize: search.limit,
        }}
        paginationMeta={{
          hasNextPage: (data?.data.meta.last_page ?? 1) > 1,
        }}
        onPaginationModelChange={({ page, pageSize }) => {
          navigate({
            to: '/attributes',
            search: { page: page + 1, limit: pageSize },
          })
        }}
      />

      <AttributeBulkActions
        selected={selected}
        onClose={() => {
          setSelected(new Set())
        }}
      />
    </>
  )
}

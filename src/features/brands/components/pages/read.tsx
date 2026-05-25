import Searchbar from '#/components/ui/searchbar'
import Toolbar from '#/components/ui/toolbar'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useGetAll } from '../../hooks/useBrandQueries'
import BrandCard from '../ui/card'
import Divider from '@mui/material/Divider'
import Can from '#/components/permission/can'

export default function Read() {
  const navigate = useNavigate()

  const search = useSearch({ from: '/_authenticated/brands/' })

  const { data } = useGetAll(search)
  return (
    <>
      <Toolbar>
        <Searchbar
          filters={[{ label: 'عنوان ویژگی', key: 'name', type: 'text' }]}
          from="/_authenticated/brands/"
        />
        <Can I="create" a="brands">
          <Toolbar.actions className="flex items-center justify-end">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => {
                navigate({ to: '/brands/create' })
              }}
            >
              افزودن برند
            </Button>
          </Toolbar.actions>
        </Can>
      </Toolbar>

      <Divider />

      <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.data.list.map((brand) => (
          <BrandCard key={brand.id} {...brand} />
        ))}
      </div>
    </>
  )
}

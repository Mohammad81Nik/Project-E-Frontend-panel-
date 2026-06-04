import keyGenerators from '#/constants/keyGenerators'
import { useGetAllPageLess } from '#/features/brands/hooks/useBrandQueries'
import { useGetAllCategoriesPageLess } from '#/features/categories/hooks/useCategoryQueries'
import type { CreateProductDto } from '#/features/products/schemas'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FieldArray, useFormikContext } from 'formik'
import DeleteIcon from '@mui/icons-material/Delete'

export default function CreateProductStage1() {
  const { setFieldValue, values } = useFormikContext<CreateProductDto>()

  const { data: brandsData } = useGetAllPageLess()

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesPageLess()

  return (
    <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4">
      <TextField
        label="نام محصول"
        required
        fullWidth
        value={''}
        className="col-span-2"
        onChange={(e) => {
          setFieldValue('title', e.target.value)
        }}
      />

      <Autocomplete
        loading={isCategoriesLoading}
        disablePortal
        options={
          categoriesData?.data.map((item) => ({
            label: item.title,
            id: item.id,
          })) ?? []
        }
        renderInput={(params) => (
          <TextField {...params} required label="دسته بندی" />
        )}
        onChange={(_e, value) => {
          console.log(value)
        }}
      />

      <FormControl fullWidth>
        <InputLabel id="brand">برند</InputLabel>
        <Select
          labelId="brand"
          id="brand"
          value={values.brand_id}
          label="brand"
          onChange={(e) => {
            setFieldValue('brand_id', e.target.value)
          }}
        >
          {brandsData?.data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider className="col-span-2" />

      <div className="col-span-2">
        <FieldArray name="details">
          {({ insert, remove }) => (
            <>
              <div className="flex gap-x-2 justify-between mb-4">
                <Typography variant="h5">مشخصات محصول</Typography>

                <Button
                  onClick={() => {
                    insert(values.details.length, { label: '', value: '' })
                  }}
                >
                  افزودن مشخصه
                </Button>
              </div>

              <Stack
                spacing={2}
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Typography sx={{ width: '100%', pb: 2, textAlign: 'center' }}>
                  عنوان مشخصه
                </Typography>
                <Typography sx={{ width: '100%', pb: 2, textAlign: 'center' }}>
                  مشخصه
                </Typography>
              </Stack>

              <Divider sx={{ mb: 3 }} />

              {values.details.map((item, idx) => (
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  key={keyGenerators.productDetailsRow(idx)}
                  sx={{
                    mb: 2,
                  }}
                >
                  <TextField
                    variant="standard"
                    value={item.label}
                    fullWidth
                    sx={
                      idx > 0
                        ? {
                            '& .MuiInputBase-root': {
                              gap: '16px',
                            },
                          }
                        : undefined
                    }
                    slotProps={{
                      input: {
                        startAdornment:
                          idx > 0 ? (
                            <DeleteIcon
                              color="error"
                              className="cursor-pointer"
                              onClick={() => remove(idx)}
                            />
                          ) : null,
                      },
                    }}
                    onChange={(e) =>
                      setFieldValue(`details.${idx}.label`, e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    value={item.value}
                    onChange={(e) =>
                      setFieldValue(`details.${idx}.value`, e.target.value)
                    }
                  />
                </Stack>
              ))}
            </>
          )}
        </FieldArray>
      </div>

      <TextField
        label="توضیحات"
        value={values.description}
        onChange={(e) => setFieldValue('description', e.target.value)}
        multiline
        sx={{
          gridColumn: 'span 2 / span 2',
        }}
        rows={4}
      />
    </div>
  )
}

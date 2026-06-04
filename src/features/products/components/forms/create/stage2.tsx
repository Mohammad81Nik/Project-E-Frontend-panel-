import keyGenerators from '#/constants/keyGenerators'
import { useGetAllPageLess } from '#/features/attributes/hooks/useAttributeQueries'
import type { CreateProductDto } from '#/features/products/schemas'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FieldArray, useFormikContext } from 'formik'
import { useMemo } from 'react'

export default function CreateProductStage2() {
  const { setFieldValue, values } = useFormikContext<CreateProductDto>()

  const { data } = useGetAllPageLess()

  const options = useMemo(
    () => (values.attributes.length === 3 ? [] : (data?.data ?? [])),
    [values.attributes, data?.data],
  )
  return (
    <div className="flex flex-col gap-y-8">
      <Autocomplete
        multiple
        value={values.attributes}
        options={options}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        onChange={(_e, value) => {
          setFieldValue('attributes', value)
        }}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="خصوصیات" />
        )}
      />

      <FieldArray name="variants">
        {({ remove, insert }) => (
          <>
            <div className="flex items-center justify-between">
              <Typography variant="h5">واریان ها</Typography>

              <Button
                onClick={() => {
                  insert(values.variants.length, {
                    price: '',
                    stock: '',
                    attributeValues: {},
                  })
                }}
              >
                افزودن
              </Button>
            </div>

            {values.variants.map((variant, idx) => (
              <Box
                sx={{
                  borderRadius: 2,
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  bgcolor: ({ palette }) => palette.grey[100],
                }}
              >
                <Stack direction="row" spacing={2}>
                  {values.attributes.map((attr, idy) => (
                    <FormControl fullWidth>
                      <InputLabel
                        id={keyGenerators.productAttributeSelect(idy, attr.id)}
                      >
                        {attr.name}
                      </InputLabel>
                      <Select
                        labelId={keyGenerators.productAttributeSelect(
                          idy,
                          attr.id,
                        )}
                        id={keyGenerators.productAttributeSelect(idy, attr.id)}
                        value={values.variants[idx].attributeValues[attr.name]}
                        label={attr.name}
                        onChange={(e) => {
                          setFieldValue(`variants.${idx}.attributeValues`, {
                            ...values.variants[idx].attributeValues,
                            [attr.name]: e.target.value,
                          })
                        }}
                      >
                        {attr.values.map((val) => (
                          <MenuItem key={val} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ))}
                </Stack>

                <div className="grid grid-cols-2 gap-x-2">
                  <TextField
                    label="قیمت"
                    value={variant.price}
                    onChange={(e) =>
                      setFieldValue(`variants.${idx}.price`, e.target.value)
                    }
                  />
                  <TextField
                    label="موجودی"
                    value={variant.stock}
                    onChange={(e) =>
                      setFieldValue(`variants.${idx}.stock`, e.target.value)
                    }
                  />
                </div>

                <Button
                  onClick={() => remove(idx)}
                  fullWidth
                  color="error"
                  variant="contained"
                >
                  حذف واریان
                </Button>
              </Box>
            ))}
          </>
        )}
      </FieldArray>
    </div>
  )
}

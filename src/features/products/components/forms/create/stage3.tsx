import keyGenerators from '#/constants/keyGenerators'
import type { CreateProductDto } from '#/features/products/schemas'
import isNonEmpty from '#/utils/isNonEmpty'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useFormikContext } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import AttributeImageCard from '../../ui/attribute-image-card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CreateProductImagesSlider from '../../ui/create-product-image-slider'

export default function CreateProductStage3() {
  const { setFieldValue, values } = useFormikContext<CreateProductDto>()

  const [selectedAttributeId, setSelectedAttributeId] = useState<string>('')

  const selectedAttribute = useMemo(
    () => values.attributes.find((attr) => attr.id === selectedAttributeId),
    [values.attributes, selectedAttributeId],
  )

  const selectedAttributeValues = useMemo(() => {
    if (isNonEmpty(selectedAttribute)) {
      return values.variants.map(
        (variant) => variant.attributeValues[selectedAttribute.name],
      )
    }

    return []
  }, [selectedAttribute, values.attributes, values.variants])

  const onImageSelect = useCallback(
    (file: File, val: string) =>
      setFieldValue('images', [
        ...values.images,
        {
          image: file,
          relatedAttributeId: selectedAttribute?.id,
          relatedAttributeValue: val,
        },
      ]),
    [selectedAttribute?.id],
  )

  const getSelectedAttributeValueInitialImage = useCallback(
    (val: string) => {
      const image = values.images.find(
        ({ relatedAttributeId, relatedAttributeValue }) =>
          isNonEmpty(relatedAttributeId) &&
          relatedAttributeId === selectedAttribute?.id &&
          relatedAttributeValue === val,
      )

      if (isNonEmpty(image)) {
        return URL.createObjectURL(image.image)
      }
      return null
    },
    [...values.images, selectedAttribute?.id],
  )

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <Typography variant="h5">انتخاب عکس های کلی برای محصول</Typography>

        <CreateProductImagesSlider />
      </div>

      <Divider
        sx={{
          my: '32px',
        }}
      />

      <div className="grid grid-cols-4 gap-2">
        <Typography className="col-span-4" variant="h5">
          انتخاب عکس های برای مقادیر خاصیت
        </Typography>
        <FormControl fullWidth className="col-span-4">
          <InputLabel id="selectedAttributes">خاصیت های انتخاب شده</InputLabel>
          <Select
            labelId="selectedAttributes"
            id="selectedAttributes"
            value={selectedAttributeId}
            label="خاصیت های انتخاب شده"
            onChange={(e) => {
              setSelectedAttributeId(e.target.value)
            }}
          >
            {values.attributes.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {isNonEmpty(selectedAttribute) &&
          selectedAttributeValues.length !== 0 &&
          selectedAttributeValues.map((val, idx) => (
            <AttributeImageCard
              initialImage={getSelectedAttributeValueInitialImage(val)}
              key={keyGenerators.productAttributeValuesImage(idx, val)}
              onSelectImage={onImageSelect}
              val={val}
            />
          ))}
      </div>
    </>
  )
}

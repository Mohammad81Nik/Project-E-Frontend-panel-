import { Swiper, SwiperSlide } from 'swiper/react'
import DeleteIcon from '@mui/icons-material/Delete'

import { Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useFormikContext } from 'formik'
import type { CreateProductDto } from '../../schemas'
import { useCallback, useMemo } from 'react'
import isNonEmpty from '#/utils/isNonEmpty'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import VisuallyHiddenInput from '#/components/ui/file-inputs'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { enqueueSnackbar } from 'notistack'

export default function CreateProductImagesSlider() {
  const { values, setFieldValue } = useFormikContext<CreateProductDto>()

  const generalImages = useMemo(
    () =>
      values.images.filter((image) => !isNonEmpty(image.relatedAttributeId)),
    [values.images],
  )

  const onDelete = useCallback(
    (id: string) => {
      enqueueSnackbar({ message: 'عکس مورد نظر حذف شد.', variant: 'info' })
      setFieldValue(
        'images',
        values.images.filter((image) => image.id !== id),
      )
    },
    [values.images],
  )

  return (
    <div className="grid grid-cols-2 gap-x-2">
      <div className="flex flex-col items-start justify-between gap-y-2">
        <Typography>عکس های کلی برای محصول انتخاب کنید</Typography>

        <div className="grid grid-cols-2 gap-x-2 w-full">
          <Button
            fullWidth
            variant="outlined"
            tabIndex={-1}
            component="label"
            startIcon={
              <AddPhotoAlternateIcon
                sx={{
                  width: '24px',
                  height: '24px',
                }}
              />
            }
          >
            افزودن عکس
            <VisuallyHiddenInput
              type="file"
              name="images"
              multiple
              onChange={(e) => {
                const files = e.target.files

                if (isNonEmpty(files) && files.length >= 1) {
                  setFieldValue('images', [
                    ...generalImages,
                    ...Array.from(files).map((file) => ({
                      image: file,
                      id: crypto.randomUUID(),
                    })),
                  ])
                }
              }}
            />
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: ({ palette }) => palette.grey[800],
              color: ({ palette }) => palette.grey[800],
            }}
          >
            تنظیم ترتیب عکس ها
          </Button>
        </div>
      </div>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-full h-[220px]"
      >
        {generalImages.map((image) => (
          <SwiperSlide key={image.id} className="relative">
            <img
              className="absolute object-contain w-full h-full"
              alt="general-image"
              src={URL.createObjectURL(image.image)}
            />

            <Button
              variant="contained"
              color="error"
              className="absolute"
              onClick={() => onDelete(image.id)}
              sx={{
                backgroundColor: ({ palette }) => palette.grey[300],
                minWidth: 'fit-content !important',
                padding: '6px !important',
                top: 'calc(100% - 40px)',
                left: 'calc(100% - 88px)',
                zIndex: 1000,
              }}
            >
              <DeleteIcon color="error" />
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

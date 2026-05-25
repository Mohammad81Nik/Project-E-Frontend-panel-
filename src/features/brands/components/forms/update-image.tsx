import VisuallyHiddenInput from '#/components/ui/file-inputs'
import Button from '@mui/material/Button'
import { useGetOneSuspense, useUpdateImage } from '../../hooks/useBrandQueries'
import { useCallback, useMemo } from 'react'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'
import { brandQueries } from '../../constants/brand.queries'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Can from '#/components/permission/can'

export default function UpdateBrandImage() {
  const { data } = useGetOneSuspense()

  const brand = useMemo(() => data.data, [data])

  const { mutate, isPending } = useUpdateImage()

  const queryClient = useQueryClient()

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (!file) {
        enqueueSnackbar({
          message: 'لطفا یک عکس جایگزین انتخاب کنید',
          variant: 'info',
        })
      } else {
        mutate(
          { id: brand.id, image: file },
          {
            onSuccess: (data) => {
              enqueueSnackbar({ message: data.message, variant: 'success' })

              queryClient.invalidateQueries(brandQueries.getOne(brand.id))
            },
            onError: (err) => {
              enqueueSnackbar({ message: err?.message, variant: 'error' })
            },
          },
        )
      }
    },
    [brand.id],
  )
  return (
    <div className="relative border border-black rounded-md h-[400px] overflow-hidden">
      <img
        src={brand.image}
        alt={brand.name}
        className="object-contain w-full h-full"
      />

      <Can I="update" a="brands">
        <Button
          tabIndex={-1}
          variant="contained"
          component="label"
          disabled={isPending}
          loading={isPending}
          sx={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            backgroundColor: 'white',
          }}
        >
          <AddPhotoAlternateIcon
            sx={{
              width: '40px',
              height: '40px',
              color: 'black',
            }}
          />
          <VisuallyHiddenInput
            type="file"
            multiple={false}
            onChange={onChange}
          />
        </Button>
      </Can>
    </div>
  )
}

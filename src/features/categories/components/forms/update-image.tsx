import VisuallyHiddenInput from '#/components/ui/file-inputs'
import Button from '@mui/material/Button'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useUpdateImage } from '../../hooks/useCategoryQueries'
import React, { useCallback } from 'react'
import isNonEmpty from '#/utils/isNonEmpty'
import { enqueueSnackbar } from 'notistack'
import type { Nullable } from '#/types/operators'
import type { ICategory } from '../../types'
import queryClient from '#/lib/queryClient'
import { useQueryClient } from '@tanstack/react-query'
import { categoryQueries } from '../../constants/categoryQueries'
import IconButton from '@mui/material/IconButton'

interface IUpdateCategoryImageProps {
  id: string
  image: string
  setCategory: (category: Nullable<ICategory>) => void
}

export default function UpdateCategoryImage({
  id,
  image,
  setCategory,
}: IUpdateCategoryImageProps) {
  const { mutate } = useUpdateImage()

  const queryClient = useQueryClient()

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const image = e.target.files?.[0]

      if (isNonEmpty(image)) {
        mutate(
          { id, image },
          {
            onSuccess: (data) => {
              setCategory(data.data)

              queryClient.invalidateQueries(categoryQueries.getAll())

              enqueueSnackbar({ message: data.message, variant: 'success' })
            },
            onError: (err) => {
              enqueueSnackbar({ message: err.message, variant: 'error' })
            },
          },
        )
      } else {
        enqueueSnackbar({
          message: 'لطفا یک عکس جایگزین انتخاب کنید',
          variant: 'info',
        })
      }
    },
    [id, setCategory],
  )

  return (
    <div className="relative border border-black rounded-md w-[300px] h-[300px] overflow-hidden">
      <img
        src={image}
        alt="category image"
        className="object-center w-full h-full"
      />
      <Button
        variant="contained"
        component="label"
        tabIndex={-1}
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
          sx={{ width: '100%', height: '100%' }}
          onChange={onChange}
        />
      </Button>
    </div>
  )
}

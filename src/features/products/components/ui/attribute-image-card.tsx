import type { Nullable } from '#/types/operators'
import createObjUrl from '#/utils/createObjUrl'
import { useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import VisuallyHiddenInput from '#/components/ui/file-inputs'
import cn from '#/utils/cn'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

interface IAttributeImageCardProp {
  val: string
  onSelectImage: (file: File, val: string) => void
  initialImage: Nullable<string>
}
export default function AttributeImageCard({
  val,
  onSelectImage,
  initialImage,
}: IAttributeImageCardProp) {
  const [preview, setPreview] = useState<Nullable<string>>(initialImage)

  return (
    <div className="p-4 rounded-md transition-all duration-200 ease-in-out shadow hover:shadow-2xl flex flex-col gap-y-3">
      <Typography>{val}</Typography>
      <div className="relative h-[300px] aspect-square">
        <img
          src={preview ?? ''}
          alt="attr-value-image"
          className="object-contain w-full h-full"
        />

        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          className={cn('', {
            // 'group-hover:opacity-100 opacity-0': isNonEmpty(preview),
          })}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <AddPhotoAlternateIcon
            sx={{
              width: '40px',
              height: '40px',
            }}
          />
          <VisuallyHiddenInput
            type="file"
            name="image"
            multiple={false}
            onChange={(e) => {
              const file = e.target.files?.[0]

              if (file) {
                onSelectImage(file, val)
                createObjUrl(e.target.files?.[0], (url) => {
                  setPreview(url ?? null)
                })
              }
            }}
          />
        </Button>
      </div>
    </div>
  )
}

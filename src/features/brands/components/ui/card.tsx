import Card from '@mui/material/Card'
import type { IBrand } from '../../types'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import CardActionArea from '@mui/material/CardActionArea'

export default function BrandCard({
  id,
  name,
  created_at,
  image,
  description,
}: IBrand) {
  const navigate = useNavigate({ from: '/brands/' })

  const onClick = useCallback(() => {
    navigate({ to: '$brandId', params: { brandId: id } })
  }, [])
  return (
    <Card
      sx={{
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: (theme) => theme.palette.grey[50],
      }}
      onClick={onClick}
    >
      <CardActionArea
        sx={{
          padding: '8px',
        }}
      >
        <CardHeader title={name} />

        <div className='p-4'>
          <CardMedia
            image={image}
            component="img"
            alt="brand image"
            sx={{
              aspectRatio: '1 / 1',
              borderRadius: "4px"
            }}
          />
        </div>

        <CardContent>
          <Typography className="truncate">{description}</Typography>
        </CardContent>

        <Typography variant="caption">ایجاد شده در {created_at}</Typography>
      </CardActionArea>{' '}
    </Card>
  )
}

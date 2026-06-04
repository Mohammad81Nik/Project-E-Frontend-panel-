import { useCreateStore } from '#/features/products/store/useCreateStore'
import { Form } from 'formik'
import { useMemo } from 'react'
import CreateProductStage1 from './stage1'
import CreateProductStage2 from './stage2'
import CreateProductStage3 from './stage3'
import CreateProductStage4 from './stage4'
import { useTheme } from '@mui/material/styles'

export default function CreateProductForm() {
  const stage = useCreateStore((state) => state.stage)
  const theme = useTheme()

  const content = useMemo(() => {
    switch (stage) {
      case 0:
        return <CreateProductStage1 />
      case 1:
        return <CreateProductStage2 />
      case 2:
        return <CreateProductStage3 />
      case 3:
        return <CreateProductStage4 />
      default:
        return null
    }
  }, [stage])

  return (
    <Form
      style={{
        borderRight: '1px solid',
        borderColor: theme.palette.grey[100],
        paddingRight: '8px',
        paddingTop: '8px',
      }}
    >
      {content}
    </Form>
  )
}

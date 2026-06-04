import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import { useCreateStore } from '../../store/useCreateStore'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import { useCallback, useMemo } from 'react'

export default function CreateProductStepper() {
  const stage = useCreateStore((state) => state.stage)

  const setStage = useCreateStore((state) => state.setStage)

  const steps = useMemo<{ label: string; description: string }[]>(
    () => [
      { label: 'مرحله اول', description: '' },
      { label: 'مرحله دوم', description: '' },
      { label: 'مرحله سوم', description: '' },
    ],
    [],
  )

  const handleBack = useCallback(() => {
    setStage(stage - 1)
  }, [stage])

  const handleNext = useCallback(() => {
    setStage(stage + 1)
  }, [stage])

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Stepper
        sx={{
          '& .MuiStepConnector-line': {
            height: '100px',
          },
        }}
        activeStep={stage}
        orientation="vertical"
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? 'پایان' : 'ادامه'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  بازگشت
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

import { Button, Box } from '@mui/material';
import React from 'react';

const StepButton = (props: any) => {
  const { activeStep, steps, handleBack, disabled = false } = props;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Button
        color="inherit"
        disabled={activeStep === 0 || disabled}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      <Button type="submit" disabled={disabled}>
        {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
      </Button>
    </Box>
  )
}

export default StepButton;
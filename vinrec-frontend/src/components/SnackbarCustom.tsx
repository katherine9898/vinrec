import React from 'react';
import  { Snackbar } from '@mui/material';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarCustom = (props: { 
  open: boolean, 
  handleClose: () => void, 
  message: string,
  severity: AlertColor
}) => {
  const { open, handleClose, message, severity } = props;

  return (
    <Snackbar 
      open={open} 
      onClose={handleClose} 
      autoHideDuration={6000} 
      anchorOrigin={{vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarCustom;
import * as React from 'react';
import Snackbar from '@mui/joy/Snackbar';

interface SimpleSnackbarProps {
    msg?: string
    open: boolean
    color: 'primary' | 'neutral' | 'danger' | 'success' | 'warning'
    onClose: () => void
}

export const SimpleSnackbar: React.FC<SimpleSnackbarProps> = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={2000}
      color={props.color}
      onClose={props.onClose} 
      variant='soft'
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {props.msg}
    </Snackbar>
  );
}

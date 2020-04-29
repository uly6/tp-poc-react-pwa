import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { createContext, useState } from 'react';

export const SnackBarContext = createContext();

export function SnackBarProvider({ children }) {
  const [severity, setSeverity] = useState('info');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const addAlert = (alert, severity) => {
    setMessage(alert);
    setSeverity('success');
    setOpen(true);
  };

  const showInfoAlert = (alert) => addAlert(alert, 'info');
  const showSuccessAlert = (alert) => addAlert(alert, 'success');
  const showWarningAlert = (alert) => addAlert(alert, 'warning');
  const showErrorAlert = (alert) => addAlert(alert, 'error');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const value = {
    showInfoAlert,
    showSuccessAlert,
    showWarningAlert,
    showErrorAlert,
  };

  return (
    <>
      <SnackBarContext.Provider value={value}>
        {children}
        <Snackbar
          message={message}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={severity}
          >
            {message}
          </Alert>
        </Snackbar>
      </SnackBarContext.Provider>
    </>
  );
}

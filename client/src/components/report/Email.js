import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
} from '@mui/material';
import { sendReport } from '../../actions/TransactionsAction';
import { clearReportStatus } from '../../slices/reportSlice';

const SendReportButton = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const { loading, success, error } = useSelector((state) => state.report);

    console.log('loading', loading)
    console.log('success', success)
    console.log('error', error)
    console.log("state",useSelector((state) => state))
  
    useEffect(() => {
      if (success) {
        setOpen(false);
        setEmail('');
        // Clear the success status after 3 seconds
        setTimeout(() => {
          dispatch(clearReportStatus());
        }, 3000);
      }
    }, [success, dispatch]);
  
    const handleSendReport = () => {
      dispatch(sendReport(email));
    };
  
    return (
      <>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          Send Report
        </Button>
  
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Send Financial Report</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSendReport}
              variant="contained"
              disabled={loading || !email}
            >
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </DialogActions>
        </Dialog>
  
        <Snackbar
          open={success || !!error}
          autoHideDuration={3000}
          onClose={() => dispatch(clearReportStatus())}
        >
          <Alert
            severity={success ? 'success' : 'error'}
            onClose={() => dispatch(clearReportStatus())}
          >
            {success
              ? 'Report sent successfully!'
              : error || 'Failed to send report'}
          </Alert>
        </Snackbar>
      </>
    );
  };
  
  export default SendReportButton;
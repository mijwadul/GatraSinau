// frontend/src/components/common/ConfirmationModal.jsx
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

// Animasi masuk
const MotionDialog = motion(Dialog);

// Tombol Batal dengan hover merah
const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.error.main,
  },
}));

function ConfirmationModal({ open, onClose, onConfirm, title, message }) {
  return (
    <MotionDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontWeight: 600,
          fontSize: '1.25rem',
          color: 'text.primary',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ color: 'text.secondary', fontSize: '1rem' }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <CancelButton onClick={onClose}>Batal</CancelButton>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disableElevation
        >
          Hapus
        </Button>
      </DialogActions>
    </MotionDialog>
  );
}

export default ConfirmationModal;
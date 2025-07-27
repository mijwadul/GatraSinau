// frontend/src/components/school/SchoolFormModal.jsx
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function SchoolFormModal({ open, onClose, onSubmit, initialData = {} }) {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(initialData.name || '');
  }, [initialData, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <Dialog open={open} onClose={onClose} component="form" onSubmit={handleSubmit} fullWidth maxWidth="xs">
      <DialogTitle>{initialData.id ? 'Edit School' : 'Add New School'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="School Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">{initialData.id ? 'Save Changes' : 'Create School'}</Button>
      </DialogActions>
    </Dialog>
  );
}
export default SchoolFormModal;
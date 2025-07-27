// frontend/src/pages/DashboardPage.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

function DashboardPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Welcome to the Dashboard</Typography>
      <Typography>This is the main application area for logged-in users.</Typography>
    </Box>
  );
}

export default DashboardPage;
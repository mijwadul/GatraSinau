// frontend/src/pages/DashboardPage.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    rotateY: -90,
  },
  in: {
    opacity: 1,
    rotateY: 0,
  },
  out: {
    opacity: 0,
    rotateY: 90,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

function DashboardPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ position: 'absolute', width: '100%' }}
    >
      <Box sx={{ p: { xs: 0, sm: 2 } }}>
        <Typography variant="h4">Welcome to the Dashboard</Typography>
        <Typography>This is the main application area for logged-in users.</Typography>
      </Box>
    </motion.div>
  );
}

export default DashboardPage;
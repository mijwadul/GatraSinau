import React from 'react';
import PdfUpload from './components/PdfUpload';
import UploadStatus from './components/UploadStatus';
import AiGenerator from './components/AiGenerator'; // Import the new component
import { Container, Box, Typography, Divider } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Gatra Sinau.AI 
        </Typography>
        <PdfUpload />
        <Divider sx={{ my: 4 }} />
        <UploadStatus />
        <Divider sx={{ my: 4 }} />
        <AiGenerator /> {/* Add the AI generator component */}
      </Box>
    </Container>
  );
}

export default App;
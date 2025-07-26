import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';

function AiGenerator() {
  const [query, setQuery] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!query) {
      setError('Please enter a prompt.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setGeneratedContent('');

    try {
      const response = await axios.post('http://localhost:5000/api/generate', { query });
      setGeneratedContent(response.data.content);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Failed to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        AI Content Generator
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Enter a prompt to generate educational content (e.g., "Buatkan ringkasan tentang teknik dasar bola voli").
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Your Prompt"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
      />
      <Box sx={{ my: 2, position: 'relative' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGenerate}
          disabled={isLoading}
        >
          Generate Content
        </Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {generatedContent && (
        <Paper elevation={2} sx={{ p: 3, mt: 2, whiteSpace: 'pre-wrap', backgroundColor: 'background.default' }}>
          <Typography variant="h6" gutterBottom>Generated Content:</Typography>
          <Typography variant="body1">{generatedContent}</Typography>
        </Paper>
      )}
    </Box>
  );
}

export default AiGenerator;
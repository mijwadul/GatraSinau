import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import LoginImage from '../assets/login.png';
import LogoImage from '../assets/logo.png';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        login,
        password,
      });
      localStorage.setItem('authToken', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${LoginImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        // Note: alignItems is removed to allow the Paper to control its own height
        justifyContent: 'flex-start',
      }}
    >
      <Paper
        square // Removes border-radius
        elevation={0} // Removes shadow
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Vertically centers the content
          alignItems: 'center',
          height: '100vh', // Make the panel full height
          width: { xs: '100%', sm: 500 }, // Full width on mobile, fixed on larger screens
          // --- NEW: More transparent 'frosted glass' effect ---
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(15px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: '100%', maxWidth: 400, padding: '0 16px' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
              <img src={LogoImage} alt="Gatra Sinau.AI Logo" style={{ height: '150px' }} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography component="h1" variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
                LOGIN
              </Typography>
            </motion.div>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ width: '100%' }}>
              <motion.div variants={itemVariants}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email or Username"
                  autoComplete="email"
                  autoFocus
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </motion.div>
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  Login
                </Button>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Paper>
    </Box>
  );
}

export default LoginPage;
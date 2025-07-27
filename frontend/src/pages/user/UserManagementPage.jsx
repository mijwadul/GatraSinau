import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import AuthContext from '../../context/AuthContext';
import UserFormModal from '../../components/user/UserFormModal';
import UserImage from '../../assets/user.png';

const pageVariants = {
  initial: { opacity: 0, rotateY: -90 },
  in: { opacity: 1, rotateY: 0 },
  out: { opacity: 0, rotateY: 90 },
};
const pageTransition = { type: 'tween', ease: 'anticipate', duration: 0.5 };

const INITIAL_FORM_STATE = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'Teacher',
};

function UserManagementPage() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && (user.role === 'Developer' || user.role === 'School Admin')) {
      fetchUsers();
    } else if (user) {
      setLoading(false);
      setError('You do not have permission to view this page.');
    }
  }, [user]);

  const handleOpenModal = () => {
    setFormData(INITIAL_FORM_STATE);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddUser = async (submittedData) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:5000/api/users', submittedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      handleCloseModal();
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create user.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{ position: 'absolute', width: '100%' }}>
         <Typography color="error">{error}</Typography>
      </motion.div>
    )
  }

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} style={{ position: 'absolute', width: '100%' }}>
      <Box sx={{ p: { xs: 2, sm: 3 } }}> {/* Adjusted padding for mobile */}
        <Box sx={{
          display: 'flex',
          // --- MODIFIED SECTION START ---
          flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
          alignItems: 'center', // Center items when stacked
          textAlign: { xs: 'center', md: 'left' }, // Center text on mobile
          // --- MODIFIED SECTION END ---
          justifyContent: 'space-between',
          mb: 4
        }}>
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="h4">User Management</Typography>
            <Typography variant="body2" color="text.secondary">
              Create, view, and manage user accounts for your institution.
            </Typography>
            <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 2 }}>
              Add New User
            </Button>
          </Box>
          <Box
            component="img"
            src={UserImage}
            alt="User management illustration"
            // The image is now always visible, with a smaller height on mobile
            sx={{ height: { xs: 100, md: 120 } }} 
          />
        </Box>
        
        <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell align="right">{/* Action buttons will go here */}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Box>
      <UserFormModal 
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddUser}
        formData={formData}
        setFormData={setFormData}
      />
    </motion.div>
  );
}

export default UserManagementPage;
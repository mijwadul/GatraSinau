import React, { useContext } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout'; // Import logout icon
import { useNavigate } from 'react-router-dom';
import LogoImage from '../assets/logo.png';
import AuthContext from '../context/AuthContext'; // Import AuthContext

const SidebarContent = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Get the logout function from context

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/users' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List>
        <ListItem sx={{ height: '100px', display: 'flex', justifyContent: 'center', p: 1 }}>
          <img src={LogoImage} alt="Gatra Sinau.AI Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
        </ListItem>
        <Divider />
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ marginTop: 'auto' }}> {/* Pushes logout to the bottom */}
        <List>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SidebarContent;
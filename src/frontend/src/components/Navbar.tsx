import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUser, logoutUser } from '../services/auth.service';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login'); // Redirect to login page after logging out
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ 
            textDecoration: 'none', 
            color: 'inherit' 
          }}
        >
          Sticky Note App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {loggedInUser ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2, fontWeight: 'bold' }}>
                {loggedInUser}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

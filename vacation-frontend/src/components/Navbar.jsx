import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ role }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Vacation Management
        </Typography>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
        {role === 'Admin' && <Button color="inherit" component={Link} to="/admin">Admin Dashboard</Button>}
        {role === 'Employee' && <Button color="inherit" component={Link} to="/employee">Employee Dashboard</Button>}
        <Button color="inherit" component={Link} to="/login">Login</Button>
        {!role && <Button color="inherit" component={Link} to="/signup">Signup</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#3f51b5', color: 'white', padding: '10px' }}>
      <Typography variant="body2" align="center">© 2024 Vacation Management</Typography>
    </Box>
  );
};

export default Footer;

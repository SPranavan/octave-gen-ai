import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, Box } from '@mui/material';
import Header from './Header';
import { theme } from '../theme';

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box className="classoutlet" sx={{flex: 1, overflow: 'auto'}}>
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Layout;
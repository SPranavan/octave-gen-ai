import * as React from "react";
import { Typography, Box } from '@mui/material';
import { useState } from 'react';
import '../styles/Header.css';

function AppHeader() {
  return (
    <Box className="app-header" sx={{ backgroundColor: 'primary.main' }}>
      <Typography variant="h4" className="header-text" onClick={() => window.location.reload()}>
          Code Crashers
      </Typography>
    </Box>
  );
}

export default AppHeader;

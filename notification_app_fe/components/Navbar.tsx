'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <AppBar position="sticky" sx={{ mb: 4, backgroundColor: '#e91e63' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}
          >
            CAMPUS NOTIFICATIONS-SHRUTHIKA
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              href="/notifications"
              color="inherit"
              sx={{ 
                borderBottom: pathname === '/notifications' ? '2px solid white' : 'none',
                borderRadius: 0
              }}
            >
              All
            </Button>
            <Button
              component={Link}
              href="/priority"
              color="inherit"
              sx={{ 
                borderBottom: pathname === '/priority' ? '2px solid white' : 'none',
                borderRadius: 0
              }}
            >
              Priority
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// components/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box, Paper } from '@mui/material';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 3 
        }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to UPPA Forum
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" paragraph>
            Choose your destination to get started
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button 
              variant="contained" 
              size="large"
              color="primary" 
              onClick={() => navigate('/invite')}
            >
              Go to Invite Page
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              color="secondary" 
              onClick={() => navigate('/login')}
            >
              Admin Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default HomePage;
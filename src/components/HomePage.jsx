import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h4" gutterBottom>UPPA Forum</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/invite')}>
            Invite
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>
            Admin
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage

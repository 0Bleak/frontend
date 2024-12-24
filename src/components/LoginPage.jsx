import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Alert } from '@mui/material';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admintoken, setAdmintoken] = useState('');
  const [error, setError] = useState('');
  const [isCreateAccount, setIsCreateAccount] = useState(false);  // Toggle between login and create account
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await authService.login(email, password);
      login(token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const token = await authService.createAdmin(email, password, admintoken);
      login(token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Account creation failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h5">{isCreateAccount ? 'Create Admin Account' : 'Admin Login'}</Typography>
        <Box component="form" onSubmit={isCreateAccount ? handleCreateAccount : handleLogin} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isCreateAccount && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Admin Token"
              value={admintoken}
              onChange={(e) => setAdmintoken(e.target.value)}
            />
          )}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isCreateAccount ? 'Create Account' : 'Sign In'}
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={() => setIsCreateAccount(!isCreateAccount)}
          >
            {isCreateAccount ? 'Back to Login' : 'Create an Admin Account'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;

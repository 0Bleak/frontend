// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import theme from './theme';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import GuestPage from './components/GuestPage';
import Navigation from './components/Navigation';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/admin" 
                element={
                    <AdminPage />
                } 
              />
              <Route path="/guest" element={<GuestPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
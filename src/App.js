import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MappingForm from './components/MappingForm';
import LandingPage from './components/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';

// Create a custom theme with purple colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
      light: '#9c27b0',
      dark: '#4a148c',
    },
    secondary: {
      main: '#ff9100',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mapping" element={<MappingForm />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { TextField, Button, Typography, Container, createTheme, ThemeProvider } from '@mui/material';

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Adjust the primary color as needed
    },
  },
  // Other theme configurations...
});

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent! Please check your email.');
      setTimeout(() => navigate('/'), 5000); // Redirect to login after 5 seconds
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Forgot Password
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <form onSubmit={handleForgotPassword}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send OTP
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;

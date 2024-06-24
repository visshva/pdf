import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
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

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { oobCode } = useParams(); // Assuming oobCode is passed as a URL parameter
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess('Password has been reset successfully!');
      setTimeout(() => navigate('/'), 5000); // Redirect to login after 5 seconds
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reset Password
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <form onSubmit={handleResetPassword}>
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset Password
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPassword;

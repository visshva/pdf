import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { TextField, Button, Typography, Container } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email with domain "@ptuniv.edu.in"');
      return; // Exit registration process if email is invalid
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Set success message and redirect after successful registration
      setSuccessMessage('You have successfully registered.');
      setTimeout(() => {
        setSuccessMessage(''); // Clear success message after 2 seconds
        navigate('/login'); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const isValidEmail = (email) => {
    // Regular expression to match email with domain ".ptuniv.edu.in"
    const regex = /^[a-zA-Z0-9._%+-]+@ptuniv\.edu\.in$/;
    return regex.test(String(email).toLowerCase());
  };

  const validateEmail = () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email with domain ".ptuniv.edu.in"');
    } else {
      setError('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {successMessage && <Typography color="success">{successMessage}</Typography>} {/* Success message */}
      <form onSubmit={handleRegister}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail} // Validate email on blur
          error={error && !isValidEmail(email)} // Show error if email is invalid
          helperText={error && !isValidEmail(email) ? 'Invalid email' : ''}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;

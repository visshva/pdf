import React, { useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { TextField, Button, Typography, Container, createTheme, ThemeProvider, Grid, Link } from '@mui/material';

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Adjust the primary color as needed
    },
  },
  // Other theme configurations...
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const emailInputRef = useRef(null); // Ref to store email input reference

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = `${username}@ptuniv.edu.in`; // Append domain to username
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const isValidEmail = (email) => {
    // Regular expression to match email with domain "@ptuniv.edu.in"
    const regex = /^[a-zA-Z0-9._%+-]+@ptuniv\.edu\.in$/;
    return regex.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { value, selectionStart } = e.target;
    setUsername(value.split('@')[0]);
    // Set cursor position to previous position
    setTimeout(() => {
      if (emailInputRef.current) {
        emailInputRef.current.selectionStart = selectionStart;
        emailInputRef.current.selectionEnd = selectionStart;
      }
    }, 0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username ? `${username}@ptuniv.edu.in` : ''}
            onChange={handleChange}
            inputRef={emailInputRef}
            error={username && !isValidEmail(`${username}@ptuniv.edu.in`)}
            helperText={username && !isValidEmail(`${username}@ptuniv.edu.in`) ? 'Invalid email' : ''}
            placeholder="@ptuniv.edu.in"
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button component={RouterLink} to="/register" variant="contained" color="secondary" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default Login;

import React, { useState, useRef } from 'react';
import { AppBar, Toolbar,  Menu, MenuItem, Avatar, } from '@mui/material';
import { ContactMail, Menu as MenuIcon, Add, Remove } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import {
  TextField,
  Button,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Grid,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import backgroundImage from './images/ptu.jpg';
import logoImage from './images/ptu-logo.png';
import "./styles.css";
import "./BackgroundVideo.css"
import { Event, Home, PhotoLibrary, EmojiEvents } from '@mui/icons-material';

import { ReactTyped as Typed } from 'react-typed';
import { useFontSize } from './FontSizeContext'; // Import the context


const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#6c757d',
    },
  },
});
const TypedCarousel = ({ textArray }) => {
  return (
      <Typed
          strings={textArray}
          typeSpeed={80} // Speed of typing in milliseconds
          backSpeed={50} // Speed of deleting in milliseconds
          loop // Whether to loop through the strings
      />
  );
};





const Login = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const { fontSize, increaseFontSize, decreaseFontSize } = useFontSize(); // Use the context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = `${username}@ptuniv.edu.in`;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@ptuniv\.edu\.in$/;
    return regex.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { value, selectionStart } = e.target;
    setUsername(value.split('@')[0]);
    setTimeout(() => {
      if (emailInputRef.current) {
        emailInputRef.current.selectionStart = selectionStart;
        emailInputRef.current.selectionEnd = selectionStart;
      }
    }, 0);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
    setAnchorEl(null);
};

const handleSubmenuOpen = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
};

const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
};


const text = [
    "WELCOME TO INTERNAL QUALITY ASSURANCE CELL - PTU"
];


  return (<><AppBar position="static" color="error">
    <Toolbar>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'error.main',
                color: 'white',
                padding: 1,
                borderRadius: 1,
                width: '100%',
            }}
        >
            <TypedCarousel textArray={text} />
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto', alignItems: 'center' }}>
            
        <Button component={RouterLink} to="/Register" color="inherit" startIcon={<Home />} sx={{ fontSize: `${fontSize}px` }}>
                REGISTER
            </Button>
            <Button component={RouterLink} to="/" color="inherit" startIcon={<Home />} sx={{ fontSize: `${fontSize}px` }}>
                HOME
            </Button>
           

          
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
            <IconButton color="inherit" onClick={handleMenuOpen}>
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem component={RouterLink} to="/iqac-events" onClick={handleMenuClose}>
                    <Event sx={{ mr: 1 }} /> IQAC EVENTS
                </MenuItem>
            
                <MenuItem component={RouterLink} to="/gallery" onClick={handleMenuClose}>
                    <PhotoLibrary sx={{ mr: 1 }} /> GALLERY
                </MenuItem>
                <MenuItem component={RouterLink} to="/awards" onClick={handleMenuClose}>
                    <EmojiEvents sx={{ mr: 1 }} /> AWARDS
                </MenuItem>
                <MenuItem component={RouterLink} to="/contact" onClick={handleMenuClose}>
                    <ContactMail sx={{ mr: 1 }} /> CONTACT
                </MenuItem>
                <MenuItem component={RouterLink} to="/admin" onClick={handleMenuClose}>
                    <ContactMail sx={{ mr: 1 }} /> ADMIN
                </MenuItem>
            </Menu>
        </Box>
    </Toolbar>
</AppBar>
    <ThemeProvider theme={theme}>
      <Backdrop open={loading} style={{ zIndex: 9999 }}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(135deg, rgba(0, 123, 255, 0.2), rgba(255, 255, 255, 0.2))',
                opacity: 0.5,
                zIndex: 0,
              }}
            />
           <img
    src={logoImage}
    alt="Logo"
    style={{
      maxWidth: '200px', // Adjust the size as needed
      marginBottom: '1.5rem', // Add some bottom margin
      zIndex: 1,
      display: 'block', // Add this line to make the image a block-level element
      margin: '0 auto', // Add this line to center the image horizontally
    }}
  />
  {error && (
    <Typography
      color="error"
      align="center"
      gutterBottom
      sx={{ mb: 2, zIndex: 1 }}
    >
      {error}
    </Typography>
            )}
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
                helperText={
                  username && !isValidEmail(`${username}@ptuniv.edu.in`)
                    ? 'Invalid email'
                    : ''
                }
                placeholder="@ptuniv.edu.in"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fas fa-envelope"></i>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  zIndex: 1,
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fas fa-lock"></i>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  zIndex: 1,
                }}
              />
              <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: 50,
                      textTransform: 'none',
                      fontSize: 16,
                      fontWeight: 'bold',
                      zIndex: 1,
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="center"
                sx={{ mt: 2, position: 'relative' }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX (-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    px: 1,
    backdropFilter: 'blur(5px)',
    zIndex: 1,
  }}
>
 
</Box>
</Grid>
<Grid container justifyContent="center" sx={{ mt: 1 }}>
  <Grid item xs={12}>
   
  </Grid>
</Grid>

<Box textAlign="center" sx={{ mt: 3, zIndex: 1 }}>
  <Typography variant="body2" color="textSecondary">
    &copy; {new Date().getFullYear()} PUDUCHERRY TECHNOLOGICAL UNIVERSITY
  </Typography>
</Box>

</form>
</Paper>
</Container>
</Box>
</ThemeProvider></>
);
};

export default Login;


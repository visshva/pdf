import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { ContactMail } from '@mui/icons-material';
import { Event, Home, PhotoLibrary, EmojiEvents } from '@mui/icons-material';
import { AppBar, Toolbar,  Menu, MenuItem, Avatar, } from '@mui/material';
import { TextField, Button, Typography, Box, styled,IconButton,Menu as MenuIcon } from '@mui/material';
import logo from './images/ptu-logo.png';
import backgroundImage from './images/ptu.jpg';
import { ReactTyped as Typed } from 'react-typed';
import { useFontSize } from './FontSizeContext'; 
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink
const fontSize = 16;
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









const Background = styled(Box)({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  maxWidth: '500px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Logo = styled('img')(({ theme }) => ({
  height: '250px',
  width: '200px',
  marginBottom: theme.spacing(2),
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: '#fff',
  '&:hover': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
}));

const Register = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email with domain "@ptuniv.edu.in"');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('You have successfully registered.');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const isValidEmail = (email) => {
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
            
        <Button component={RouterLink} to="/Login" color="inherit" startIcon={<Home />} sx={{ fontSize: `${fontSize}px` }}>
              LOGIN
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
    <Background>
      <StyledCard>
        <Logo src={logo} alt="University Logo" />
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && <Typography color="success">{successMessage}</Typography>}
        <StyledForm onSubmit={handleRegister}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            error={error && !isValidEmail(email)}
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
          <StyledButton type="submit" variant="contained" fullWidth>
            Register
          </StyledButton>
        </StyledForm>
      </StyledCard>
    </Background></>
  );
};

export default Register;
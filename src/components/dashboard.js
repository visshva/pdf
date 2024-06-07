import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, Typography, Container, Grid, Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ my: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Welcome to Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Avatar sx={{ width: 100, height: 100, margin: '0 auto' }}>
            <AccountCircleIcon sx={{ width: 80, height: 80 }} />
          </Avatar>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            John Doe
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec,
            mattis ac neque.
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

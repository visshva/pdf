import React , { }from 'react';
import { Box, Typography, Container, Grid,Avatar } from '@mui/material';
import { styled } from '@mui/system';

const Alogo = styled('img')({
    width: 150, // Increased the width
    height: 200, // Increased the height
});


const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#212121',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          <Grid item>
          <a href='https://ptuniv.edu.in/' target="_blank" rel="noopener noreferrer">
                        <Avatar sx={{ width: 200, height: 200, bgcolor: 'transparent', marginRight: 2 }}>
                            <Alogo src="./ptu-logo.png" alt="logo" />
                        </Avatar>
                    </a><br/>
                  
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              © {new Date().getFullYear()} Puducherry Technological University. All rights reserved.
            </Typography>
            <Typography variant="body2" color="inherit">
              Contact us: contact@ptu.edu.in
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} textAlign="right">
            {/* Additional content can be added here */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

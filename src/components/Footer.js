import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Alogo = styled('img')({
  width: 150,
  height: 'auto',
});

const FooterLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: '#212121',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4} textAlign="center">
            <a href="https://ptuniv.edu.in/" target="_blank" rel="noopener noreferrer">
              <Alogo src="./ptu-logo.png" alt="Puducherry Technological University Logo" />
            </a>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body2">Puducherry Technological University</Typography>
            <Typography variant="body2">Puducherry, India</Typography>
            <Typography variant="body2">
              Email: <FooterLink href="mailto:contact@ptu.edu.in">contact@ptu.edu.in</FooterLink>
            </Typography>
            <Typography variant="body2">Phone: +91-1234567890</Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6">Follow Us</Typography>
            <Box>
              <IconButton href="https://facebook.com" target="_blank" sx={{ color: 'white' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" sx={{ color: 'white' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" sx={{ color: 'white' }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" sx={{ color: 'white' }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Puducherry Technological University. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

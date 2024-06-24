import React from 'react';
import { Container, Grid, Typography, Link, Box, IconButton, styled } from '@mui/material';
import { LocationOn, Email, Phone, Fax } from '@mui/icons-material';
import { ReactTyped as Typed } from 'react-typed'; // Adjusted the import statement
import './Footer.css'; // Ensure this is included to apply the styles
import InstagramIcon from './images/instagram-icon.svg.svg';
import FacebookIcon from './images/facebook-icon.svg.svg';
import YouTubeIcon from './images/youtube-icon.svg';
import XIcon from './images/x-icon.svg.png';
import LinkedInIcon from './images/linkedin-icon.svg.svg';

import { School, Business, Assessment, Verified, Star } from '@mui/icons-material';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  fontFamily: 'Poppins',
  color: theme.palette.primary.main,
}));

const Footer = () => {
  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
   
  };

  return (
    <>
      <footer className="footer-area section-gap">
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center" justifyContent="flex-start" mb={2} ml={-8}>
                <Link href="https://ptuniv.edu.in/" target="_blank" underline="none">
                  <img
                    className="img-responsive logo"
                    alt="PTU"
                    src="./ptu-logo.png"
                    width="170px"
                    height="220px"
                  />
                </Link>
              </Box>
              <Typography variant="subtitle1" className="text-white ml-2" ml={-18}>
                <Typed
                  strings={["PTU - INTERNAL QUALITY ASSURANCE CELL"]}
                  typeSpeed={80}
                  backSpeed={50}
                  loop
                />
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box mb={2}>
                <Typography variant="h6" className="footer-heading">IQAC</Typography>
                <ul className="footer-list">
                  <li>
                    <Link href="#" target="_blank" rel="noopener noreferrer" underline="none">
                      Best Innovative and Unique Practices
                    </Link>
                  </li>
                </ul>
              </Box>
              <Box className="footer-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.4524616814515!2d79.85504551412637!3d12.012340438450485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a536446022cfb0b%3A0x5c0d300c8187a76b!2sPuducherry%20Technological%20University!5e0!3m2!1sen!2sin!4v1644327742512!5m2!1sen!2sin"
                  width="400"
                  height="250"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box mb={2}>
                <Typography variant="h6" className="footer-heading">QUICK LINKS</Typography>
                <ul className="footer-list">
                  <li>
                    <School style={{ marginRight: '8px' }} />
                    <Link href="https://ptuniv.edu.in/" target="_blank" rel="noopener noreferrer" underline="none">
                      PTU
                    </Link>
                  </li>
                  <li>
                    <Business style={{ marginRight: '8px' }} />
                    <Link href="https://hrm.mhrd.gov.in/home" target="_blank" rel="noopener noreferrer" underline="none">
                      MHRD
                    </Link>
                  </li>
                  <li>
                    <Assessment style={{ marginRight: '8px' }} />
                    <Link href="https://www.nirfindia.org/Home" target="_blank" rel="noopener noreferrer" underline="none">
                      NIRF
                    </Link>
                  </li>
                  <li>
                    <Verified style={{ marginRight: '8px' }} />
                    <Link href="http://www.naac.gov.in/" target="_blank" rel="noopener noreferrer" underline="none">
                      NAAC
                    </Link>
                  </li>
                  <li>
                    <Star style={{ marginRight: '8px' }} />
                    <Link href="https://www.nbaind.org/" target="_blank" rel="noopener noreferrer" underline="none">
                      NBA
                    </Link>
                  </li>
                </ul>
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box mb={6}>
                <Typography variant="h6" className="footer-heading">CONTACT US</Typography>
                <ul className="contact_box">
                  <li className="contact-item">
                    <LocationOn className="contact-icon text-blue-500" />
                    <Typography variant="body2" className="contact-text">
                      <strong>Internal Quality Assurance Cell,</strong>
                      <br />
                      Puducherry Technological University,
                      <br />
                      East coast Road, Pillaichavady, Puducherry, 605 014.
                    </Typography>
                  </li>
                  <li className="contact-item">
                    <Email className="contact-icon text-red-500" />
                    <Typography variant="body2" className="contact-text">
                      <strong>Email:</strong> <Link href="mailto:dean.iqac@ptuniv.edu.in" underline="none" className="text-red-500">dean.iqac@ptuniv.edu.in</Link>
                    </Typography>
                  </li>
                  <li className="contact-item">
                    <Phone className="contact-icon text-green-500" />
                    <Typography variant="body2" className="contact-text">
                      <strong>Phone:</strong> 0413-2655281-288
                    </Typography>
                  </li>
                  <li className="contact-item">
                    <Fax className="contact-icon text-yellow-500" />
                    <Typography variant="body2" className="contact-text">
                      <strong>Fax:</strong> 2655101
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box display="flex" flexDirection="column" mt={2}>
                <Typography variant="h6" className="footer-heading">CONNECT WITH US</Typography>
                <Box display="flex" mt={1}>
                  <IconButton className="social-icon" onClick={() => window.open("https://www.facebook.com/PTU.Pondicherry/", "_blank")}>
                    <img src={FacebookIcon} alt="Facebook" />
                  </IconButton>
                  <IconButton className="social-icon" onClick={() => window.open("https://www.youtube.com/channel/UCf05rByI6M6mN7nEXdO4dHw/channels", "_blank")}>
                    <img src={YouTubeIcon} alt="YouTube" />
                  </IconButton>
                  <IconButton className="social-icon" onClick={() => window.open("https://twitter.com/PUDUCHERRYTECH1", "_blank")}>
                    <img src={XIcon} alt="X" />
                  </IconButton>
                  <IconButton className="social-icon" onClick={() => window.open("https://www.instagram.com/puducherry_tech_university/", "_blank")}>
                    <img src={InstagramIcon} alt="Instagram" />
                  </IconButton>
                  <IconButton className="social-icon" onClick={() => window.open("https://in.linkedin.com/school/ptu-puducherry/", "_blank")}>
                    <img src={LinkedInIcon} alt="LinkedIn" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <StyledIconButton onClick={topFunction} id="myBtn" title="Go to top">
          <i className="fa fa-chevron-up"></i>
        </StyledIconButton>
      </footer>
      <Container style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center', width: '100%', maxWidth: 'none' }}>
        <Typography variant="body1">
          Copyright © 2024 Internal Quality Assurance Cell - Puducherry Technological University
        </Typography>
      </Container>
    </>
  );
};

export default Footer;

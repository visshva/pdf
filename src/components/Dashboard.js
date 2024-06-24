// src/App.js
import React, { useState } from 'react';
import UploadPDF from './UploadPDF';
import ListPDFs from './ListPDFs';
import Sidebar from './Sidebar';
import { Box, Container, Button, IconButton, AppBar, Toolbar, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { Event, Home, PhotoLibrary, EmojiEvents, ContactMail, Menu as MenuIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { ReactTyped as Typed } from 'react-typed';
import './styles.css';
import NewsUpdates from './NewsUpdates';
import UploadNews from './UploadNews';

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

const containerStyle = {
  display: 'flex',
  width: '100%',
  boxSizing: 'border-box',
};

const contentStyle = {
  flexGrow: 1,
  padding: '20px',
};

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('upload');
  const navigate = useNavigate(); // Correctly initialize the navigate function

  const handleMenuItemClick = (menu) => {
    setSelectedMenu(menu);
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
    "CONTENT MANAGEMENT SYSTEM"
  ];

  const handleLogout = () => {
    // Perform any logout operations here, such as clearing authentication tokens
    console.log("User logged out");
    // Redirect to the home page
    navigate('/');
  };

  return (
    <>
      <AppBar position="static" color="error">
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
            <Button
              onClick={handleLogout}
              color="inherit"
              startIcon={<Home />}
              sx={{ fontSize: '16px' }}
            >
              LOGOUT
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

      <div className="App">
        <Box sx={containerStyle}>
          <Sidebar onMenuItemClick={handleMenuItemClick} />
          <Container sx={contentStyle}>
            {selectedMenu === 'upload' && <UploadPDF />}
            {selectedMenu === 'view' && <ListPDFs />}
            {selectedMenu === 'news' && < UploadNews/>}
          </Container>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  Typography,
  Drawer,
  IconButton,
  ClickAwayListener,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'white',
  color: 'black',
  boxShadow: 'none',
  borderBottom: '1px solid #ddd',
  position: 'relative',
}));

const GradientAnimation = styled('div')({
  background: 'linear-gradient(270deg, #ffffff, #f0f0f0, #e0e0e0, #f0f0f0)',
  backgroundSize: '800% 800%',
  animation: 'GradientAnimation 15s ease infinite',
  '@keyframes GradientAnimation': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'black',
  textTransform: 'none',
  fontWeight: 'bold',
  padding: '8px 16px',
  fontFamily: 'Poppins, sans-serif',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.1)',
    color: 'black',
    transform: 'scale(1.05)',
  },
  transition: 'background 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.3s ease-in-out',
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out',
  fontFamily: 'Poppins, sans-serif',
  color: 'black',
  '&:hover': {
    background: 'red',
    color: 'white',
  },
}));

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    color: 'white',
    transform: 'rotate(180deg)',
  },
  transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out',
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setOpenSubMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenSubMenuIndex(null);
  };

  const handleMouseEnter = (event, index) => {
    handleMenuOpen(event, index);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      handleMenuClose();
    }, 200); // Adjust the delay as needed
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const renderSubItems = (subItems) => {
    return (
      <Box display="flex">
        {subItems.map((subItem, subIndex) => (
          <Box key={subIndex} marginX={2}>
            <Button
              sx={{
                background: 'red',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '4px',
                marginBottom: '8px',
                '&:hover': {
                  background: 'darkred',
                },
              }}
            >
              {subItem.text}
            </Button>
            {subItem.subItems && (
              <Box display="flex" flexDirection="column">
                {subItem.subItems.map((nestedItem, nestedIndex) => (
                  <Button
                    key={nestedIndex}
                    component={nestedItem.href && nestedItem.href.startsWith('/') ? Link : 'a'}
                    to={nestedItem.href && nestedItem.href.startsWith('/') ? nestedItem.href : undefined}
                    href={nestedItem.href && !nestedItem.href.startsWith('/') ? nestedItem.href : undefined}
                    onClick={handleMenuClose}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      padding: '6px 16px',
                      color: 'black',
                      fontFamily: 'Poppins, sans-serif',
                      '&:hover': {
                        background: 'red',
                        color: 'white',
                        transform: 'scale(1.05)',
                      },
                      transition: 'background 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.3s ease-in-out',
                    }}
                  >
                    {nestedItem.text}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    );
  };

  const menuItems = [
    {
      text: 'HOME',
      href: '#home',
      subItems: [
        { text: 'About IQAC', href: '/upload' },
        { text: 'IQAC Committee', href: 'members.html' },
        { text: 'Objectives of IQAC', href: '#' },
        { text: 'Quality Assurance Initiatives', href: '#' },
        { text: 'Strategic Plan', href: '#' },
      ],
    },
    {
      text: 'ACCREDITATION & RANKING',
      href: 'javascript:void(0)',
      subItems: [
        {
          text: 'NBA',
          subItems: [
            { text: 'Accreditation documents', href: '/Nba' },
            { text: 'Self Assessment Report', href: 'acad/acadCal/academic_calander.html' },
            { text: 'Pre Qualifiers', href: '#' },
          ],
        },
        {
          text: 'NAAC',
          subItems: [
            { text: 'Self Study Report', href: '/NAAC' },
            { text: 'Students Satisfaction Survey', href: '#' },
            { text: 'Evaluative Reports', href: '#' },
          ],
        },
        {
          text: 'NIRF',
          subItems: [
            { text: 'Nirf Data', href: '/nirf' },
            { text: 'Nirf Ranking & Metrics', href: '#' },
          ],
        },
      ],
    },
    {
      text: 'DEPARTMENTAL COMMITTEES',
      subItems: [
        { text: 'Committees of the Dept', href: '/committee' },
      ],
    },
    {
      text: 'DOCUMENTS',
      href: '#',
      subItems: [
        { text: 'Annual Audit Reports', href: '#' },
        { text: 'Action Taken Reports', href: '/atr' },
        { text: 'Annual Self Appraisal Reports', href: '#' },
        { text: 'Minutes Of the Meetings', href: '#' },
      ],
    },
    {
      text: 'FEEDBACK',
      href: '#',
      subItems: [
        { text: 'PTU Feedback Policy', href: '/feedbackpolicy' },
        {
          text: 'Feedback Forms',
          subItems: [
            { text: 'Student Form', href: '#' },
            { text: 'Alumni Form', href: '#' },
            { text: 'Parent Form', href: '#' },
            { text: 'Employers Form', href: '#' },
            { text: "Faculty Form's Response", href: '#' },
          ],
        },
        { text: 'Feedback Response', href: '#' },
      ],
    },
  ];

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {menuItems.map((menu, index) => (
        <Box key={index} sx={{ padding: '10px 0' }}>
          <Typography variant="h6" sx={{ padding: '0 16px', color: 'black' }}>
            {menu.text}
          </Typography>
          {menu.subItems && menu.subItems.map((subItem, subIndex) => (
            <StyledMenuItem
              key={subIndex}
              component={subItem.href && subItem.href.startsWith('/') ? Link : 'a'}
              to={subItem.href && subItem.href.startsWith('/') ? subItem.href : undefined}
              href={subItem.href && !subItem.href.startsWith('/') ? subItem.href : undefined}
              sx={{ paddingLeft: '32px' }}
            >
              {subItem.text}
            </StyledMenuItem>
          ))}
        </Box>
      ))}
    </Box>
  );

  return (
    <GradientAnimation>
      <StyledAppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <AnimatedIconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuIcon />
            </AnimatedIconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {list()}
            </Drawer>
          </Box>
          <Box display="flex" justifyContent="center" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((menu, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                position="relative"
                onMouseEnter={(event) => handleMouseEnter(event, index)}
                onMouseLeave={handleMouseLeave}
                sx={{ padding: '0 20px' }}
              >
                <StyledButton
                  component={menu.subItems ? undefined : Link}
                  to={menu.subItems ? undefined : menu.href}
                >
                  {menu.text}
                  {menu.subItems ? <ExpandMoreIcon sx={{ ml: 1 }} /> : null}
                </StyledButton>
                {menu.subItems && openSubMenuIndex === index && (
                  <ClickAwayListener onClickAway={handleMenuClose}>
                    <StyledMenu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      sx={{
                        mt: 2,
                        '& .MuiPaper-root': {
                          background: 'white',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          width: 'auto',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        },
                      }}
                    >
                      {menu.text === 'ACCREDITATION & RANKING'
                        ? renderSubItems(menu.subItems)
                        : menu.subItems.map((subItem, subIndex) => (
                            <StyledMenuItem
                              key={subIndex}
                              component={subItem.href && subItem.href.startsWith('/') ? Link : 'a'}
                              to={subItem.href && subItem.href.startsWith('/') ? subItem.href : undefined}
                              href={subItem.href && !subItem.href.startsWith('/') ? subItem.href : undefined}
                              onClick={handleMenuClose}
                            >
                              {subItem.text}
                            </StyledMenuItem>
                          ))}
                    </StyledMenu>
                  </ClickAwayListener>
                )}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </StyledAppBar>
    </GradientAnimation>
  );
};

export default Navbar;

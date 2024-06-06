import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setOpenSubMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenSubMenuIndex(null);
  };

  const menuItems = [
    {
      text: 'Home',
      href: '#home',
      subItems: [
        { text: 'About IQAC', href: '/upload', new: true },
        { text: 'IQAC Committee', href: 'members.html', new: true },
        { text: 'Objectives of IQAC', href: '#', new: true },
        { text: 'Quality Assurance Initiatives', href: '#', new: true },
        { text: 'Strategic Plan', href: '#', new: true },
      ],
    },
    {
      text: 'Accreditation & Ranking',
      href: 'javascript:void(0)',
      subItems: [
        {
          text: 'NBA',
          href: '/nba',
          subItems: [
            { text: 'Accreditation documents', href: 'Content/PTU Accredidation (1).pdf', new: true },
            { text: 'Self Assessment Report', href: 'acad/acadCal/academic_calander.html', new: true },
            { text: 'Pre Qualifiers', href: '#', new: true },
          ],
        },
        {
          text: 'NAAC',
          href: '/naac',
          subItems: [
            { text: 'Self Study Report', href: '#' },
            { text: 'Students Satisfaction Survey', href: '#' },
            { text: 'Evaluative Reports', href: '#' },
          ],
        },
        {
          text: 'NIRF',
          href: '/nirf',
          subItems: [
            { text: 'Action Taken Reports', href: '/atr', new: true },
            { text: 'Vital Statistics', href: 'nirf1.html', new: true },
          ],
        },
      ],
    },
    {
      text: 'Departmental Committees',
     
      subItems: [
        { text: 'Committees', href: '/committee', new: true },
      ],
    },
    {
      text: 'Documents',
      href: '#',
      subItems: [
        { text: 'Annual Audit Reports', href: '#', new: true },
        { text: 'Action Taken Reports', href: '/atr', new: true },
        { text: 'Annual Self Appraisal Reports', href: '#', new: true },
        { text: 'Minutes Of the Meetings', href: '#', new: true },
      ],
    },
    {
      text: 'Feedback',
      href: '#',
      subItems: [
        { text: 'PTU Feedback Policy', href: '/feedbackpolicy', new: true },
        {
          text: 'Feedback Forms', href: '#', new: true, subItems: [
            { text: 'Student Form', href: '#', new: true },
            { text: 'Alumni Form', href: '#', new: true },
            { text: 'Parent Form', href: '#', new: true },
            { text: 'Employers Form', href: '#', new: true },
            { text: "Faculty Form's Response", href: '#', new: true },
          ]
        },
        { text: 'Feedback Response', href: '#', new: true },
      ],
    },
  ];

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'brown' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box display="flex" justifyContent="center">
          {menuItems.map((menu, index) => (
            <Box key={index} display="flex" alignItems="center" position="relative">
              <Button
                sx={{ color: 'brown' }}
                onClick={(event) => handleMenuOpen(event, index)}
                endIcon={menu.subItems ? <ExpandMoreIcon /> : null}
                component={menu.subItems ? undefined : 'a'}
                href={menu.subItems ? undefined : menu.href}
              >
                {menu.text}
              </Button>
              {menu.subItems && openSubMenuIndex === index && (
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {menu.subItems.map((subItem, subIndex) => (
                    <MenuItem
                      key={subIndex}
                      onClick={handleMenuClose}
                      component={subItem.href && subItem.href.startsWith('/') ? Link : 'a'}
                      to={subItem.href && subItem.href.startsWith('/') ? subItem.href : undefined}
                      href={subItem.href && !subItem.href.startsWith('/') ? subItem.href : undefined}
                    >
                      {subItem.text}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

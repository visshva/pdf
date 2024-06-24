// src/Sidebar.js
import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Typography, Avatar, IconButton, Collapse } from '@mui/material';
import { CloudUpload, Folder, ExpandLess, ExpandMore, Menu } from '@mui/icons-material';
import { styled } from '@mui/system';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 250,
  backgroundColor: '#2d3e50',
  color: 'white',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

const UserContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#1e2b3a',
  color: 'white',
}));

const SidebarMenu = styled(List)(({ theme }) => ({
  flexGrow: 1,
}));

const SidebarFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#1e2b3a',
  textAlign: 'center',
}));

const Sidebar = ({ onMenuItemClick }) => {
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('upload');

  const handleMenuItemClick = (menu) => {
    setActiveMenu(menu);
    onMenuItemClick(menu);
  };

  const handleCollapseToggle = () => {
    setOpen(!open);
  };

  return (
    <SidebarContainer>
      <UserContainer>
        <Avatar sx={{ bgcolor: '#3f51b5', marginRight: 2 }}>A</Avatar>
        <Box>
          <Typography variant="h6">Admin</Typography>
         
        </Box>
        <IconButton sx={{ marginLeft: 'auto' }} onClick={handleCollapseToggle}>
          {open ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
        </IconButton>
      </UserContainer>
      <Collapse in={open}>
        <SidebarMenu>
          <ListItem button onClick={() => handleMenuItemClick('upload')} selected={activeMenu === 'upload'}>
            <ListItemIcon>
              <CloudUpload sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Upload Documents" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleMenuItemClick('view')} selected={activeMenu === 'view'}>
            <ListItemIcon>
              <Folder sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="View Documents" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('news')} selected={activeMenu === 'news'}>
            <ListItemIcon>
              <Folder sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Upload News" />
          </ListItem>
        </SidebarMenu>
      </Collapse>
      <SidebarFooter>
        <Typography variant="body2">@PTU</Typography>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;

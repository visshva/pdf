import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Box, Container, Button } from '@mui/material';
import { Home, Info, ContactMail, Menu as MenuIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';
import "./styles.css";


const Alogo = styled('img')({
    width: 150, // Increased the width
    height: 200, // Increased the height
});

const TextSlider = (props) => {
    useEffect(() => {
        const createText = (text, id, duration) => {
            document.getElementById(id).innerHTML = "";
            for (let i = 0; i < text.length; i++) {
                setTimeout(() => {
                    let newText = text.substr(0, i + 1);
                    document.getElementById(id).innerHTML = newText;
                }, duration * i);
            }
        };

        const clearText = (id, duration) => {
            let text = document.getElementById(id).innerHTML;
            for (let i = text.length; i > 0; i--) {
                setTimeout(() => {
                    let newText = text.substr(0, text.length - i);
                    document.getElementById(id).innerHTML = newText;
                }, duration * i);
            }
        };

        const initSlider = (id, texts, duration, delay) => {
            let durs = [];
            for (let i = 0; i < texts.length - 1; i++) {
                let beforeDur = i === 0 ? 0 : durs[i - 1];
                durs.push(texts[i].length * duration * 2 + 2 * delay + beforeDur);
            }

            let allTime = texts.reduce((acc, text) => acc + text.length * duration * 2 + 2 * delay, 0);

            const mainSlider = () => {
                texts.forEach((text, i) => {
                    setTimeout(() => {
                        createText(text, id, duration);
                        setTimeout(() => clearText(id, duration), text.length * duration + delay);
                    }, i === 0 ? 0 : durs[i - 1]);
                });
            };

            mainSlider();
            setInterval(mainSlider, allTime);
        };

        initSlider(props.id, [...props.textArray], 100, 1000);
    }, [props.id, props.textArray]);

    return <div id={props.id} style={{ fontFamily: 'calibri', fontSize: '24px', textAlign: 'center' }}>Text slider with typing effect</div>;
};

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);

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
                            padding: 2,
                            borderRadius: 1,
                            width: '100%',
                        }}
                    >
                        <TextSlider
                            id="slider"
                            textArray={[
                                "WELCOME TO INTERNAL QUALITY ASSURANCE CELL - PTU "
                            ]}
                        />
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }}>
                        <IconButton component={RouterLink} to="/" color="inherit">
                            <Home />
                        </IconButton>
                        <IconButton component={RouterLink} to="/about" color="inherit">
                            <Info />
                        </IconButton>
                        <IconButton component={RouterLink} to="/contact" color="inherit">
                            <ContactMail />
                        </IconButton>
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
                            <MenuItem component={RouterLink} to="/" onClick={handleMenuClose}>
                                <Home sx={{ mr: 1 }} /> Home
                            </MenuItem>
                            <MenuItem component={RouterLink} to="/about" onClick={handleMenuClose}>
                                <Info sx={{ mr: 1 }} /> About
                            </MenuItem>
                            <MenuItem component={RouterLink} to="/contact" onClick={handleMenuClose}>
                                <ContactMail sx={{ mr: 1 }} /> Contact
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container
                maxWidth={false}
                sx={{
                    bgcolor: 'white',
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <a href='https://ptuniv.edu.in/' target="_blank" rel="noopener noreferrer">
                        <Avatar sx={{ width: 200, height: 200, bgcolor: 'transparent', marginRight: 2 }}>
                            <Alogo src="./ptu-logo.png" alt="logo" />
                        </Avatar>
                    </a>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 'bold', ml: 2 }}
                    >
                        Puducherry Technological University
                    </Typography>
                </Box>
            </Container>
            <Box sx={{ bgcolor: 'primary.dark', py: 2 }}>
    <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Button
                    color="inherit"
                    component={RouterLink}
                    to="/"
                    sx={{ marginRight: 2 }}
                >
                    Home
                </Button>
                <Button
                    color="inherit"
                    component={RouterLink}
                    to="/about"
                    sx={{ marginRight: 2 }}
                >
                    About
                </Button>
                <Button
                    color="inherit"
                    onClick={handleSubmenuOpen}
                    sx={{ marginRight: 2 }}
                >
                    Services
                </Button>
                <Menu
                    anchorEl={submenuAnchorEl}
                    open={Boolean(submenuAnchorEl)}
                    onClose={handleSubmenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <MenuItem
                        component={RouterLink}
                        to="/services/consulting"
                        onClick={handleSubmenuClose}
                    >
                        Consulting
                    </MenuItem>
                    <MenuItem
                        component={RouterLink}
                        to="/services/training"
                        onClick={handleSubmenuClose}
                    >
                        Training
                    </MenuItem>
                    <MenuItem
                        component={RouterLink}
                        to="/services/support"
                        onClick={handleSubmenuClose}
                    >
                        Support
                    </MenuItem>
                </Menu>
                <Button
                    color="inherit"
                    component={RouterLink}
                    to="/contact"
                >
                    Contact
                </Button>
            </Box>
          
        </Box>
    </Container>
</Box>

        </>
    );
};

export default Header;

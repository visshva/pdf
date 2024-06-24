import React, { useEffect, useState, useRef } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Box, Container, Button } from '@mui/material';
import { ContactMail, Menu as MenuIcon, Add, Remove } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';
import "./styles.css";
import { Event, LibraryBooks, PhotoLibrary, EmojiEvents } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Poppins } from '@fontsource/poppins';
import videoSource from './video/ptu.mp4';
import ImageVideoSlider from './Slider';

import Navbar from './Navbar';
import { ReactTyped as Typed } from 'react-typed';
import { useFontSize } from './FontSizeContext'; // Import the context

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

const GradientAppBar = styled(AppBar)({
    background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
});

const NavButton = styled(Button)({
    color: '',
    '&:hover': {
        backgroundColor: 'red',
    },
});

const Alogo = styled('img')({
    width: 150, // Increased the width
    height: 200, // Increased the height
});

const TextSlider = (props) => {
    const textRef = useRef(null);

    useEffect(() => {
        const createText = (text, duration) => {
            if (!textRef.current) return;
            textRef.current.innerHTML = "";
            for (let i = 0; i < text.length; i++) {
                setTimeout(() => {
                    let newText = text.substr(0, i + 1);
                    if (textRef.current) {
                        textRef.current.innerHTML = newText;
                    }
                }, duration * i);
            }
        };

        const clearText = (text, duration) => {
            if (!textRef.current) return;
            let currentText = text;
            for (let i = currentText.length; i > 0; i--) {
                setTimeout(() => {
                    currentText = currentText.substr(0, currentText.length - 1);
                    if (textRef.current) {
                        textRef.current.innerHTML = currentText;
                    }
                }, duration * (text.length - i));
            }
        };

        const initSlider = (texts, duration, delay) => {
            if (!textRef.current) return;
            let durs = [];
            for (let i = 0; i < texts.length - 1; i++) {
                let beforeDur = i === 0 ? 0 : durs[i - 1];
                durs.push(texts[i].length * duration * 2 + 2 * delay + beforeDur);
            }

            let allTime = texts.reduce((acc, text) => acc + text.length * duration * 2 + 2 * delay, 0);

            const mainSlider = () => {
                texts.forEach((text, i) => {
                    setTimeout(() => {
                        createText(text, duration);
                        setTimeout(() => clearText(text, duration), text.length * duration + delay);
                    }, i === 0 ? 0 : durs[i - 1]);
                });
            };

            mainSlider();
            setInterval(mainSlider, allTime);
        };

        initSlider([...props.textArray], 100, 1000);
    }, [props.textArray]);

    return <div ref={textRef} style={{ fontFamily: 'calibri', fontSize: '24px', textAlign: 'center' }}>Text slider with typing effect</div>;
};

const TextChanger = ({ texts, interval, color, fontFamily, fontSize }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, interval);

        return () => clearInterval(timer);
    }, [texts, interval]);

    return (
        <div style={{
            color: color,
            fontFamily: fontFamily,
            fontSize: fontSize,
            height: '100px', // Fixed height for the container
            display: 'flex',
            alignItems: 'center', // Center text vertically
            justifyContent: 'center', // Center text horizontally
            transition: 'all 0.5s ease' // Smooth transition
        }}>
            {texts[index]}
        </div>
    );
};

const menuVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const submenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
    const { fontSize, increaseFontSize, decreaseFontSize } = useFontSize(); // Use the context

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

    const texts = [
        <div style={{ fontWeight: 'bold' }}>
            <span style={{ fontSize: '40px', fontWeight: 'bold' }}>P</span>UDUCHERRY   <span style={{ fontSize: '40px', fontWeight: 'bold' }}>T</span>ECHNOLOGICAL    <span style={{ fontSize: '40px', fontWeight: 'bold' }}>U</span>NIVERSITY <br />
            <center style={{ fontSize: '20px', fontFamily: 'Poppins' }}>PUDUCHERRY </center>
        </div>,
        <div style={{ fontWeight: 'bold' }}>
            <span style={{ fontSize: '22px', fontWeight: 'bold' }}>புதுச்சேரி தொழில்நுட்பப் பல்கலைக்கழகம்</span>
            <br />
            <center style={{ fontSize: '20px', fontFamily: 'Poppins' }}>புதுச்சேரி</center>
        </div>,
        <div style={{ fontWeight: 'bold' }}>
            <span style={{ fontSize: '22px', fontWeight: 'bold' }}>पुडुचेरी प्रौद्योगिकी विश्वविद्यालय</span>
            <br />
            <center style={{ fontSize: '20px', fontFamily: 'Poppins' }}>पुडुचेरी</center>
        </div>
    ];

    const fontColor = '#69180d'; // Red color
    const fontFamily = 'Poppins';
    const fontSizeText = '20px'; // Font size

    const text = [
        "WELCOME TO INTERNAL QUALITY ASSURANCE CELL - PTU"
    ];

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
                        <IconButton color="inherit" onClick={decreaseFontSize}>
                            <Remove />
                        </IconButton>
                        <IconButton color="inherit" onClick={increaseFontSize}>
                            <Add />
                        </IconButton>

                        <Button
                            component={RouterLink}
                            to="/iqacevents"
                            color="inherit"
                            startIcon={<Event />}
                            sx={{
                                paddingRight: '0.5rem',
                                whiteSpace: 'nowrap',
                                fontSize: `${fontSize}px`,
                            }}
                        >
                            IQAC EVENTS
                        </Button>

                        <Button component={RouterLink} to="/mous" color="inherit" startIcon={<LibraryBooks />} sx={{ fontSize: `${fontSize}px` }}>
                            MoUs
                        </Button>
                        <Button component={RouterLink} to="/gallery" color="inherit" startIcon={<PhotoLibrary />} sx={{ fontSize: `${fontSize}px` }}>
                            GALLERY
                        </Button>
                        <Button component={RouterLink} to="/awards" color="inherit" startIcon={<EmojiEvents />} sx={{ fontSize: `${fontSize}px` }}>
                            AWARDS
                        </Button>
                        <Button component={RouterLink} to="/contact" color="inherit" startIcon={<ContactMail />} sx={{ fontSize: `${fontSize}px` }}>
                            CONTACT
                        </Button>

                        <Button component={RouterLink} to="/Login" color="inherit" startIcon={<AccountCircleIcon />} sx={{ fontSize: `${fontSize}px` }}>
                            ADMIN
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
                            <MenuItem component={RouterLink} to="/mous" onClick={handleMenuClose}>
                                <LibraryBooks sx={{ mr: 1 }} /> MoUs
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
            <Container
                maxWidth={false}
                sx={{
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pl: 20, pt: 2 }}>
                    <a href='https://ptuniv.edu.in/' target="_blank" rel="noopener noreferrer">
                        <img src="./ptu-logo.png" alt="Company Logo" style={{ width: 140, height: 183, bgcolor: 'transparent', marginRight: 2 }} />
                    </a>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 4 }}>
                        <Box sx={{ p: 2, pr: 0, width: '600px' }}> {/* Set fixed width for the container */}
                            <TextChanger texts={texts} interval={4000} color={fontColor} fontFamily={fontFamily} fontSize={fontSizeText} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 4 }}>
                        <Box sx={{ p: 2, pr: 0 }}>
                            <a href='https://ptuniv.edu.in/' target="_blank" rel="noopener noreferrer">
                                <img src="./iqac.png" alt="Company Logo" style={{ width: 150, height: 150 }} />
                            </a>
                        </Box>
                        <Box sx={{ p: 2, pr: 0 }}>
                            <a href='https://ptuniv.edu.in/' target="_blank" rel="noopener noreferrer">
                                <img src="./nba.png" alt="Company Logo" style={{ width: 150, height: 150 }} />
                            </a>
                        </Box>
                        <Box sx={{ p: 2, pt: 0, pb: 4 }}>
                            <a href='https://ptuniv.edu.in/' target="_blank" rel="noopener noreferrer">
                                <img src="./nirf.png" alt="Company Logo" style={{ width: 170, height: 150 }} />
                            </a>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Navbar />
           
        </>
    );
};

export default Header;

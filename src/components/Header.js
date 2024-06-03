import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Box, Container, Button, } from '@mui/material';
import { ContactMail, Menu as MenuIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';
import "./styles.css";
import { Menu as Event, LibraryBooks, PhotoLibrary, EmojiEvents } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircle from '@mui/icons-material/AccountCircle'; 
import { Poppins } from '@fontsource/poppins';
import videoSource from './video/ptu.mp4'; 
import ImageVideoSlider from './Slider';



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

const TextChanger = ({ texts, interval, color, fontFamily,fontSize }) => {
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
        <div  style={{ fontWeight: 'bold'}}>
  <span style={{ fontSize: '40px', fontWeight: 'bold' }}>P</span>UDUCHERRY   <span style={{ fontSize: '40px', fontWeight: 'bold' }}>T</span>ECHNOLOGICAL    <span style={{ fontSize: '40px', fontWeight: 'bold' }}>U</span>NIVERSITY <br/>
  <center style={{ fontSize: '20px', fontFamily: 'Poppins' }}>PUDUCHERRY </center>
</div>,   
 <div  style={{ fontWeight: 'bold'}}>
  <span style={{ fontSize: '22px', fontWeight: 'bold' }}>புதுச்சேரி தொழில்நுட்பப் பல்கலைக்கழகம்</span> 
   <br/>
  <center style={{ fontSize: '20px', fontFamily: 'Poppins' }}>புதுச்சேரி</center>
</div>,


<div  style={{ fontWeight: 'bold'}}>
  <span style={{ fontSize: '22px', fontWeight: 'bold' }}>पुडुचेरी प्रौद्योगिकी विश्वविद्यालय</span> 
   <br/>
  <center style={{ fontSize: '20px', fontFamily: 'Poppins' }}>पुडुचेरी</center>
</div> 
      ];
      const fontColor = '#69180d'; // Red color
      const fontFamily = 'Poppins';
      const fontSize = '20px'; // Font size
   


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
                            padding:1,
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
                 
                     <Box sx={{ display: { xs: 'none', md: 'flex' },   ml: 'auto', flexGrow: 1, justifyContent: 'center' }}>
                     <Button 
    component={RouterLink} 
    to="/iqac-events" 
    color="inherit" 
    startIcon={<Event />}
    sx={{ 
        paddingRight: '0.5rem', // Adjust the padding to make room for the icon
        whiteSpace: 'nowrap' // Prevent text from wrapping to the next line
    }}
>
    IQAC EVENTS
</Button>

                        <Button component={RouterLink} to="/mous" color="inherit" startIcon={<LibraryBooks />}>
                            MoUs
                        </Button>
                        <Button component={RouterLink} to="/gallery" color="inherit" startIcon={<PhotoLibrary />}>
                            GALLERY
                        </Button>
                        <Button component={RouterLink} to="/awards" color="inherit" startIcon={<EmojiEvents />}>
                            AWARDS
                        </Button>
                        <Button component={RouterLink} to="/contact" color="inherit" startIcon={<ContactMail />}>
                            CONTACT
                        </Button>
                        
                        <Button     component={RouterLink}     to="/contact"     color="inherit"     startIcon={<AccountCircleIcon  />}  >
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 ,pl:20,pt:2}}>
    <a href='https://ptuniv.edu.in/' target="_blank" rel="noopener noreferrer">
       
        <img src="./ptu-logo.png" alt="Company Logo" style={{ width: 140, height: 183, bgcolor: 'transparent', marginRight: 2  }} />
    </a>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 4 }}>
                        <Box sx={{ p: 2, pr: 0, width: '600px' }}> {/* Set fixed width for the container */}
                            <TextChanger texts={texts} interval={4000} color={fontColor} fontFamily={fontFamily} fontSize={fontSize} />
                        </Box>
                    </Box>
                          
                     
                 
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl:4  }}>
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




             <GradientAppBar position="static">
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                  <AccountCircle sx={{ mr: 1 }} /> ADMIN
                </MenuItem>
              </Menu>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <NavButton component={RouterLink} to="/" sx={{ marginRight: 2 }}>
                  Home
                </NavButton>
                <NavButton component={RouterLink} to="/about" sx={{ marginRight: 2 }}>
                  About
                </NavButton>
                <NavButton onClick={handleSubmenuOpen} sx={{ marginRight: 2 }}>
                  Services
                </NavButton>
                <Menu
                  anchorEl={submenuAnchorEl}
                  open={Boolean(submenuAnchorEl)}
                  onClose={handleSubmenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                  <MenuItem component={RouterLink} to="/services/consulting" onClick={handleSubmenuClose}>
                    Consulting
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/services/training" onClick={handleSubmenuClose}>
                    Training
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/services/support" onClick={handleSubmenuClose}>
                    Support
                  </MenuItem>
                </Menu>
                <NavButton component={RouterLink} to="/contact">
                  Contact
                </NavButton>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/contact"
                startIcon={<AccountCircle />}
                sx={{ color: '#fff' }}
              >
                ADMIN
              </Button>
            </Box>
          </Container>
          
        </Toolbar>
      </GradientAppBar>
      < ImageVideoSlider />
    
        </>
    );
};

export default Header;
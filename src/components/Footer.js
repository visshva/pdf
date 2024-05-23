import React , { useEffect, useState }from 'react';
import { Box, Typography, Container, Grid,Avatar } from '@mui/material';
import { styled } from '@mui/system';

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
                    <TextSlider
                            id="slider"
                            textArray={[
                                "WELCOME TO INTERNAL QUALITY ASSURANCE CELL - PTU "
                            ]}
                        />
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

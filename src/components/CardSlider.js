import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardSlider.css';
import { motion } from 'framer-motion';

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const cards = [
    {
      name: 'Dr.S.Mohan',
      position: 'Vice Chancellor - PTU',
      role: 'Chairperson-IQAC',
      email: 'vc@ptuniv.edu.in',
      image: require('./images/mohan.jpeg'),
    },
    {
      name: 'Dr.L.Nithyanandhan',
      position: 'Professor, ECE',
      role: 'Dean-IQAC',
      email: 'nithi@ptuniv.edu.in',
      image: require('./images/nithi1.png'),
    },
    {
      name: 'Dr.K.Ramakrishnan',
      position: 'Professor, EEE',
      role: 'Associate Dean-IQAC',
      email: 'ramakrishnan@ptuniv.edu.in',
      image: require('./images/ram.png'),
    },
    {
      name: 'Dr.K.Sathiyamurthy',
      position: 'Professor, CSE',
      role: 'Associate Dean-IQAC',
      email: 'sathiyamurthyk@ptuniv.edu.in',
      image: require('./images/sathiya1.png'),
    },
    {
      name: 'Dr.N.Sivakumar',
      position: 'Professor, CSE',
      role: 'Associate Dean-IQAC',
      email: 'sivakumar@ptuniv.edu.in',
      image: require('./images/siva.png'),
    },
  ];

  return (
    <div className="slider-container">
      <div className="overlay-contents">
                        <h1 className="main-titles">IQAC MEMBERS - PTU</h1>
                    </div>
      <Slider {...settings}>
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="card-image-container"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={card.image} alt={card.name} className="card-image" />
            </motion.div>
            <motion.div
              className="card-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="card-name">{card.name}</h3>
              <p className="card-position">{card.position}</p>
              <p className="card-role">{card.role}</p>
              <p className="card-email">
                Email: <a href={`mailto:${card.email}`}>{card.email}</a>
              </p>
            </motion.div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
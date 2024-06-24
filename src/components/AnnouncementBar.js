import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './carosol.css';

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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const cards = [
    {
      name: "Dr.S.Mohan",
      position: "Vice Chancellor - PTU",
      role: "Chairperson-IQAC",
      email: "vc@ptuniv.edu.in",
      image: "path/to/image1.jpg"
    },
    {
      name: "Dr.L.Nithyanandhan",
      position: "Professor, ECE",
      role: "Dean-IQAC",
      email: "nithi@ptuniv.edu.in",
      image: "path/to/image2.jpg"
    },
    {
      name: "Dr.K.Ramakrishnan",
      position: "Professor, EEE",
      role: "Associate Dean-IQAC",
      email: "ramakrishnan@ptuniv.edu.in",
      image: "path/to/image3.jpg"
    }
  ];

  return (
    <div className="slider-container">
      <h2>IQAC MEMBERS - PTU</h2>
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="card">
            <img src={card.image} alt={card.name} />
            <h3>{card.name}</h3>
            <p className="position">{card.position}</p>
            <p className="role">{card.role}</p>
            <p className="email">Email: <a href={`mailto:${card.email}`}>{card.email}</a></p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;

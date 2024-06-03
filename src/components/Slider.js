import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.css'; 
// Custom arrow components
const PrevArrow = (props) => (
  <div {...props} className="custom-prev-arrow">
    <i className="arrow-icon">&#8249;</i>
  </div>
);

const NextArrow = (props) => (
  <div {...props} className="custom-next-arrow">
    <i className="arrow-icon">&#8250;</i>
  </div>
);

const ImageVideoSlider = () => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      setIsLoading(true);
      const imagesRef = ref(storage, 'images');
      const videosRef = ref(storage, 'videos');

      try {
        const [imageFiles, videoFiles] = await Promise.all([listAll(imagesRef), listAll(videosRef)]);
        const imagePromises = imageFiles.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { url, type: 'image' };
        });
        const videoPromises = videoFiles.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { url, type: 'video' };
        });
        const allMedia = await Promise.all([...imagePromises, ...videoPromises]);
        setMedia(allMedia);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // Custom previous arrow component
    nextArrow: <NextArrow />, // Custom next arrow component
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="image-video-slider-container">
      {isLoading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <Slider {...settings}>
          {media.map((file, index) => (
            <div key={index} className="slide-item">
              {file.type === 'image' ? (
                <img src={file.url} alt={`slide-${index}`} style={{ width: '100%' }} />
              ) : (
                <video controls autoPlay muted style={{ width: '100%' }}>
                  <source src={file.url} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ImageVideoSlider;
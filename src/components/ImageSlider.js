import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // You can define your styles in this file

const ImageSlider = ({ images, autoplayDelay = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, autoplayDelay);

        return () => clearInterval(interval);
    }, [images, autoplayDelay]);

    const goToPrevSlide = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
    };

    const goToNextSlide = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="slider-container">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={index === currentIndex ? 'slide active' : 'slide'}
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
            ))}
            <button className="prev-button" onClick={goToPrevSlide}>
                &#10094;
            </button>
            <button className="next-button" onClick={goToNextSlide}>
                &#10095;
            </button>
        </div>
    );
};

export default ImageSlider;

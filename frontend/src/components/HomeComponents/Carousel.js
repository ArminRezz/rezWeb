import React, { useState } from 'react';
import "../../pages/styling/Home.css"
import jsLogo from "../../images/jsLogo.png"
import tsLogo from "../../images/tsLogo.png"
import htmlLogo from "../../images/htmlLogo.svg"
import reactLogo from "../../images/reactLogo.svg"
import javaLogo from "../../images/javaLogo.png"
import pythonLogo from "../../images/pythonLogo.png"
import cplusplusLogo from "../../images/cplusplusLogo.png"

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    javaLogo,
    pythonLogo,
    cplusplusLogo,
    jsLogo,
    tsLogo,
    htmlLogo,
    reactLogo,
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={prevSlide}>&#10094;</button>
      <img className="carousel-image" src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      <button className="carousel-button next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default Carousel;

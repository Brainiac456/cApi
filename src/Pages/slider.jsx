import { useState } from "react";

import "../Styles/slider.css"
import "../Styles/breed.css"


const rightArrowStyles = {
  
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {

  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  backgroundColor: 'black',
  color : '"#000000',
  display: "flex",
  justifyContent: "center",
  height:'45px',
  opacity:'0.6',
  paddingTop:'12px'
};



const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0 
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    
    <div style={sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>
  <div className="slideshow-container">
     <img src= {slides[currentIndex].url} className="image" alt="..." width="500" height="350"/>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
        
          <div className="dot"
            
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            
          </div>
         
        ))}
        </div>

  <div className="Slider-Content">
    <h5 style={{fontSize:'20px'}}>{slides[currentIndex].breeds[0].name}</h5>
    <h6 style={{fontSize:'15px'}}> id: {slides[currentIndex].breeds[0].id}</h6>
    <p className="card-text">{slides[currentIndex].breeds[0].description}</p>
    <p style={{fontStyle:"italic"}}className="card-text">{slides[currentIndex].breeds[0].temperament}</p>
    <p className="card-text">{slides[currentIndex].breeds[0].origin}</p>
    <p className="card-text">{slides[currentIndex].breeds[0].weight.metric} kgs</p>
    <p className="card-text">{slides[currentIndex].breeds[0].life_span} years average life span</p>
  </div>
      <a style={{textDecoration:"none", color:"rgb(255, 182, 36)" , marginLeft:'290px'}} href={slides[currentIndex].breeds[0].wikipedia_url} target="_blank">Wikipedia</a> 

      </div>
    </div>
  );
};

export default ImageSlider;
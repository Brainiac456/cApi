import { useState } from "react";





const rightArrowStyles = {
  position: "absolute",
  top: "25%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "25%",
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
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
  color:"grey",
  opacity: "50%"
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
  <div className="card-body mt-2">
     <img src= {slides[currentIndex].url} className="card-img-top" alt="..." height="350"/>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
        </div>

  <div className="card-body mt-2">
    <h5 className="card-title">{slides[currentIndex].breeds[0].name}</h5>
    <h6> id: {slides[currentIndex].breeds[0].id}</h6>
    <p className="card-text">{slides[currentIndex].breeds[0].description}</p>
    <p style={{fontStyle:"italic"}}className="card-text">{slides[currentIndex].breeds[0].temperament}</p>
    <p className="card-text">{slides[currentIndex].breeds[0].origin}</p>
    <p className="card-text">{slides[currentIndex].breeds[0].weight.metric} kgs</p>
    <p className="card-text">{slides[currentIndex].breeds[0].life_span} years average life span</p>
  </div>
      <a style={{textDecoration:"none", color:"rgb(255, 182, 36)"}} href={slides[currentIndex].breeds[0].wikipedia_url} target="_blank">Wikipedia</a> 

      </div>
    </div>
  );
};

export default ImageSlider;
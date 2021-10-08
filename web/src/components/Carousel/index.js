import { useEffect, useState, useRef, useCallback } from "react";
import Button from "../Button";
import Checkbox from "../Checkbox";
import "./styles.css";

function Carousel({
  photoList,
  allowAutoSlide,
  autoSlideDelay = 5,
  height = 800,
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const timer = useRef(null);
  const [isAutoSlide, setIsAutoSlide] = useState(allowAutoSlide);

  // reset currentIdx to 0 when photoList changed
  useEffect(() => {
    setCurrentIdx(0);
  }, [photoList]);

  // previous photo, if current idx is the begining, go to the end
  const prevPhoto = () => {
    setCurrentIdx((current) =>
      current === 0 ? photoList.length - 1 : current - 1
    );
  };

  // next photo, if current idx is the end, go to the begining
  const nextPhoto = useCallback(() => {
    setCurrentIdx((current) =>
      current === photoList.length - 1 ? 0 : current + 1
    );
  }, [photoList]);

  useEffect(() => {
    if (isAutoSlide) {
      timer.current = setInterval(() => nextPhoto(), autoSlideDelay * 1000);
    } else {
      clearInterval(timer.current);
    }
    return () => clearInterval(timer.current);
  }, [isAutoSlide, autoSlideDelay, nextPhoto]);

  return (
    <div>
      {photoList.length ? (
        <div>
          <div className="carousel-container">
            <Button
              variant="text"
              onClick={(_e) => {
                prevPhoto();
              }}
              style={{
                fontSize: "2rem",
                minWidth: "56px",
                height: "56px",
                borderRadius: "50%",
              }}
            >
              {"<"}
            </Button>
            <div className="img-container">
              <img
                src={photoList[currentIdx]}
                alt={"carousel"}
                className="carousel-img"
              />
            </div>
            <Button
              variant="text"
              onClick={(_e) => {
                nextPhoto();
              }}
              style={{
                fontSize: "2rem",
                minWidth: "56px",
                height: "56px",
                borderRadius: "50%",
              }}
            >
              {">"}
            </Button>
          </div>
          <div className="info-container">
            <div>
              <div className="counter">{`${currentIdx + 1} / ${
                photoList.length
              }`}</div>
              {allowAutoSlide && (
                <Checkbox
                  label={"Auto Slide"}
                  checked={isAutoSlide}
                  onChange={(e) => {
                    setIsAutoSlide(e.target.checked);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="carousel-container no-content" style={{ height }}>
          <span>No Photo</span>
        </div>
      )}
    </div>
  );
}

export default Carousel;

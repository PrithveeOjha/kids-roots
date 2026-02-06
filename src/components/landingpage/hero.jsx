import { useState, useEffect } from "react";

import ParentingGuideCard from "../carouselcards/ParentingGuideCard";
import CollaborationCard from "../carouselcards/CollaborationCard";

function Hero() {

  const slides = [
    <ParentingGuideCard />,
    <CollaborationCard />
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  /* AUTO SLIDE */
  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000); // change slide every 6 seconds

    return () => clearInterval(interval);

  }, []);

  const styles = {

    wrapper: {
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      position: "relative"
    },

    slider: {
      display: "flex",
      height: "100%",
      width: `${slides.length * 100}%`,
      transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
      transition: "transform 0.8s ease-in-out"
    },

    slide: {
      width: `${100 / slides.length}%`,
      flexShrink: 0
    }

  };

  return (

    <div style={styles.wrapper}>

      <div style={styles.slider}>

        {slides.map((Slide, index) => (

          <div key={index} style={styles.slide}>
            {Slide}
          </div>

        ))}

      </div>

    </div>
  );
}

export default Hero;

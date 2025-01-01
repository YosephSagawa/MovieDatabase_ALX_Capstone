import React, { useState, useEffect } from "react";
import arrowup from "../assets/arrow-up-circle.svg";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      style={{
        display: isVisible ? "block" : "none",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 10px",
        backgroundColor: "white",
        borderRadius: "100%",
        boxShadow: "5px",
        cursor: "pointer",
      }}
      onClick={scrollToTop}
    >
      <img src={arrowup} alt="Up arrow" />
    </button>
  );
};

export default ScrollToTopButton;

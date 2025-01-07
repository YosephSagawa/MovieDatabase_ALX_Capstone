import React, { useState, useEffect } from "react";
import arrowup from "../assets/arrow-up-circle.svg";

/**
 * The ScrollToTopButton component will render a button that allows the user to
 * scroll to the top of the page when the window is scrolled more than 200px.
 * @returns {JSX.Element} The ScrollToTopButton component
 */
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Handle the scroll event by setting the `isVisible` state variable to true
   * if the window is scrolled more than 200px.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    /**
     * Add a scroll event listener to the window to detect when the user scrolls.
     */
    window.addEventListener("scroll", handleScroll);

    /**
     * Clean up the component by removing the event listener when it is unmounted.
     */
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Scroll to the top of the page when the button is clicked.
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      style={{
        // Only show the button if the window is scrolled more than 200px
        display: isVisible ? "block" : "none",
        // Position the button at the bottom right of the page
        position: "fixed",
        bottom: "20px",
        right: "20px",
        // Add some padding to the button
        padding: "10px 10px",
        // Set the background color of the button to white
        backgroundColor: "white",
        // Add a border radius to the button
        borderRadius: "100%",
        // Add a box shadow to the button
        boxShadow: "5px",
        // Change the cursor to a pointer when hovering over the button
        cursor: "pointer",
      }}
      onClick={scrollToTop}
    >
      {/* Use an image of an up arrow for the button content */}
      <img src={arrowup} alt="Up arrow" />
    </button>
  );
};

export default ScrollToTopButton;

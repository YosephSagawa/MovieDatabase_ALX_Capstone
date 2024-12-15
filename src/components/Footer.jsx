import React from "react";
import Logo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <NavLink to="/">
        <img src={Logo} alt="The Real Deal Logo" />
        <h1>The Reel Deal</h1>
      </NavLink>
      <p>&copy; 2023 The Reel Deal. All rights reserved.</p>
    </div>
  );
};

export default Footer;

import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <l1>
          <NavLink to="/">
            <img src={Logo} alt="The Real Deal Logo" />
            <h1>The Reel Deal</h1>
          </NavLink>
        </l1>
        <l1>
          <NavLink to="favorites">Favorites</NavLink>
        </l1>
        <l1>
          <NavLink to="watchlist">Watchlist</NavLink>
        </l1>
      </ul>
    </nav>
  );
};

export default Navbar;

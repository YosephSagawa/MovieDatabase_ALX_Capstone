import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex items-center p-6">
        <l1>
          <NavLink to="/" className="flex flex-row ">
            <img src={Logo} alt="The Real Deal Logo" className="" />
            <h1 className="text-textreel font-raleway text-2xl font-light">
              TheReelDeal
            </h1>
          </NavLink>
        </l1>
        <l1 className="mx-auto">
          <div className="flex font-nunito gap-3 text-white">
            <NavLink to="/">Home</NavLink>
            <NavLink to="favorites">Favorites</NavLink>
            <NavLink to="categories">Categories</NavLink>
          </div>
        </l1>
        <l1 className="flex font-nunito gap-1 text-white ml-auto">
          <IoIosSearch />
          <IoIosNotifications />
        </l1>
      </ul>
    </nav>
  );
};

export default Navbar;

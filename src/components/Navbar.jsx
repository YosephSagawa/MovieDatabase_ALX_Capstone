import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="absolute z-50 top-0 left-0 right-0 bg-opacity-50">
      <nav>
        <ul className="flex items-center p-6">
          <li>
            <NavLink to="/" className="flex flex-row ">
              <img src={Logo} alt="The Real Deal Logo" className="" />
              <h1 className="text-textreel font-raleway text-2xl font-light hover:underline">
                TheReelDeal
              </h1>
            </NavLink>
          </li>
          <li className="mx-auto">
            <div className="flex font-nunito gap-3 text-white">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "underline font-bold"
                    : "hover:text-button transition-colors duration-300 ease-in-out"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="favorites"
                className={({ isActive }) =>
                  isActive
                    ? "underline font-bold"
                    : "hover:text-button transition-colors duration-300 ease-in-out"
                }
              >
                Favorites
              </NavLink>
              <NavLink
                to="categories"
                className={({ isActive }) =>
                  isActive
                    ? "underline font-bold"
                    : "hover:text-button transition-colors duration-300 ease-in-out"
                }
              >
                Categories
              </NavLink>
            </div>
          </li>
          <li className="text-white ml-auto">
            <NavLink
              to="/"
              className="hover:text-button transition-colors duration-300 ease-in-out"
            >
              <IoIosSearch />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

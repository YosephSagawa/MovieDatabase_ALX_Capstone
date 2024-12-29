import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { IoIosSearch } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="absolute z-50 top-0 left-0 right-0 bg-opacity-50">
      <nav className="flex items-center p-6 justify-between">
        <NavLink to="/" className="flex flex-row ">
          <img src={Logo} alt="The Real Deal Logo" />
          <h1 className="text-textreel font-raleway text-2xl font-light hover:underline">
            TheReelDeal
          </h1>
        </NavLink>
        {/*Hamburger Menu*/}
        <div className="lg:hidden">
          <button className="text-white" onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3 mx-auto text-white">
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
        <div className="hidden lg:inline-block text-white ml-auto">
          <NavLink
            to="/"
            className="hover:text-button transition-colors duration-300 ease-in-out"
          >
            <IoIosSearch />
          </NavLink>
        </div>
      </nav>
      {isOpen && (
        <div className="lg:hidden bg-primary text-white p-6 flex flex-col space-y-4">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "underline font-bold"
                : "hover:text-button transition-colors duration-300 ease-in-out"
            }
          >
            Categories
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;

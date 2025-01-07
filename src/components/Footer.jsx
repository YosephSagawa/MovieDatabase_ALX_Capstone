import React from "react";
import Logo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { TbBrandX } from "react-icons/tb";

const Footer = () => {
  return (
    <div className="flex flex-col  bg-footer text-white pb-4">
      <div className="flex flex-col sm:flex-row items-center justify-between px-16 py-8">
        <div>
          <NavLink to="/" className="flex flex-row ">
            <img src={Logo} alt="The Real Deal Logo" className="" />
            <h1 className="text-textreel font-raleway text-2xl font-light">
              TheReelDeal
            </h1>
          </NavLink>
          <p className="font-nunito font-normal text-lg w-60 mt-4">
            Discover and dive into your favorite movies, anytime, anywhere!
          </p>
        </div>
        <div className="pt-8 sm:pt-0">
          <div className="flex font-nunito gap-3">
            <NavLink to="/" className="hover:underline">
              Home
            </NavLink>
            <NavLink to="favorites" className="hover:underline">
              Favorites
            </NavLink>
            <NavLink to="categories" className="hover:underline">
              Categories
            </NavLink>
          </div>
          <div className="flex flex-row items-center gap-3 justify-center py-4">
            <a
              href="https://x.com/Yoseph_Sagawa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-blue-400 hover:scale-125 transition-colors duration-300"
            >
              <TbBrandX />
            </a>
            <a
              href="https://www.linkedin.com/in/yoseph-sagawa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-blue-700 hover:scale-125 transition-colors duration-300"
            >
              <AiFillLinkedin />
            </a>
            <a
              href="https://github.com/YosephSagawa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-gray-500 hover:scale-125 transition-colors duration-300"
            >
              <AiFillGithub />
            </a>
          </div>

          <div className="flex font-nunito justify-center gap-3">
            <a
              href="mailto:yosephsagawa0@gmail.com?subject=Get%20In%20Touch&body=Hello,%20I%20would%20like%20to%20get%20in%20touch!"
              className="hover:underline"
            >
              Get In Touch
            </a>
            <a href="" className="hover:underline">
              API
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto opacity-50 text-sm">
        TheReelDeal &copy; Made by Yoseph Sagawa
      </p>
    </div>
  );
};

export default Footer;

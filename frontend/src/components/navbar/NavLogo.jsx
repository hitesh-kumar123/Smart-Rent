import React from "react";
import { Link } from "react-router-dom";
import logoSvg from "../../../src/logo.svg";

const NavLogo = () => {
  return (
    <Link
      to="/"
      className="group flex items-center space-x-3 px-2 py-1 rounded-lg hover:bg-neutral-50 transition-all duration-300 shrink-0"
      aria-label="Smart Rent System - Home"
    >
      {/* Logo Container with Hover Effect */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-red-500/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300 ease-out" />
        <img
          src={logoSvg}
          alt="Smart Rent Logo"
          className="relative h-10 w-10 md:h-12 md:w-12 object-contain transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="relative">
          <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent transform group-hover:from-red-600 group-hover:to-red-500 transition-all duration-300">
            Smart Rent
          </span>
          {/* Animated underline effect */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300 ease-out" />
        </div>
        <span className="text-xs md:text-sm font-semibold text-red-500 tracking-wider transform group-hover:translate-x-1 transition-transform duration-300">
          SYSTEM
        </span>
      </div>
    </Link>
  );
};

export default NavLogo;

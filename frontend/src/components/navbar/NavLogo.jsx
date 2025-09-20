import React from "react";
import { Link } from "react-router-dom";
import logoSvg from "../../../src/logo.svg";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center ml-5">
      {/* Logo image (SVG) */}
      <img
        src={logoSvg}
        alt="Smart Rent System Logo"
        className="h-14 w-14 object-contain"
        style={{ maxWidth: 48 }}
      />
      {/* Logo text */}
      <div className="ml-3">
        <div className="text-xl md:text-2xl font-bold text-neutral-800 hover:text-red-500 transition-colors duration-300">
          Smart Rent
        </div>
        <div className="text-sm md:text-base font-medium text-red-500 -mt-1 tracking-wider">
          SYSTEM
        </div>
      </div>
    </Link>
  );
};

export default NavLogo;

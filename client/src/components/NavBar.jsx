import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 shadow-lg z-50">
      <nav className="flex justify-content-center align-items-center h-16 border border-b-4 border-white">
        <ul className="flex space-x-10 list-none">
          <li className="m-4">
            <Link to="/" className="text-white text-lg font-semibold hover:text-blue-300">
              Geração
            </Link>
          </li>
          <li className="m-4">
            <Link to="/analise" className="text-white text-lg font-semibold hover:text-blue-300">
              Análise
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

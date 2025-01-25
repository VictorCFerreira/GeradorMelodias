import React from "react";
import { Link } from "react-router-dom";

 export const Navbar = () => {
  return (
    <nav className="navbar border-solid p-4 text-white">
      <ul className="flex space-x-4 flex justify-content-between border-solid">
        <li>
          <Link
            to="/"
            className="hover:underline hover:text-blue-400 "
          >
            Geração
          </Link>
        </li>
        <li>
          <Link
            to="/avaliacao"
            className="hover:underline hover:text-blue-400"
          >
            Avaliação
          </Link>
        </li>
        <li>
          <Link
            to="/analise"
            className="hover:underline hover:text-blue-400"
          >
            Análise
          </Link>
        </li>
      </ul>
    </nav>
  );
};


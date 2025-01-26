import React from "react";
import { Menubar } from "primereact/menubar";
import { Link } from "react-router-dom";
import { FaMusic, FaSearch } from "react-icons/fa";

export const Navbar = () => {
  const items = [
    {
      label: (
        <div className="flex items-center ">
          <FaMusic />
          <span className="ml-2">Geração</span>
        </div>
      ),
      command: () => window.location.href = "/"
    },
    {
      label: (
        <div className="flex items-center ">
          <FaSearch />
          <span className="ml-2">Análise</span>
        </div>
      ),
      command: () => window.location.href = "/analise"
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 shadow-lg z-50">
      <Menubar
        model={items}
        className="border border-b-4 border-white flex justify-content-center align-items-center text-lg font-semibold"
      />
    </header>
  );
};

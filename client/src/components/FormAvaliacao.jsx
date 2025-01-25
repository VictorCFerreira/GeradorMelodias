import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { SENSACOES } from "../constants/constants";
import { Button } from "primereact/button";
import { Star } from "lucide-react";


export function FormAvaliacao({ onSubmit, melodiaId }) {
  const [nota, setNota] = useState(0);
  const [sensacao, setSensacao] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const avaliacao = {
        melodiaId,
      nota,
      sensacao
    };
    onSubmit(avaliacao); 
  };

  

  return (
    <form onSubmit={handleSubmit} className="p-fluid">
      <div className="p-field m-4">
        <div className="star-rating flex gap-2 items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setNota(index + 1)}
              className="group"
            >
              <Star
                size={32}
                className={`${
                  index < nota ? "text-yellow-500" : "text-gray-400"
                } group-hover:scale-110 transition-transform`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="p-field m-4">
        <label htmlFor="sensacao">Sensação causada:</label>
        <Dropdown
          id="sensacao"
          value={sensacao}
          options={SENSACOES}
          onChange={(e) => setSensacao(e.value)}
          placeholder="Selecione uma Sensação"
          className="p-dropdown"
        />
      </div>

      <div className="pt-4 m-4">
        <Button
          type="submit"
          label="Enviar"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
        />
      </div>
    </form>
  );
}

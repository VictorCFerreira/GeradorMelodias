import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import { FormParametros } from "../../components/FormParametros";
import MidiPlayer from "../../components/MidiPlayer";
import { Navbar } from "../../components/NavBar";
import { useNavigate } from "react-router-dom";

export function GeracaoPage() {
  const [midiBytes, setMidiBytes] = useState(null);

  const navigate = useNavigate();

  const handleGeracaoSuccess = (idMelodia) => {
    navigate(`/avaliacao/${idMelodia}`);
  };

  const handleGenerateMelody = async (parametros) => {
    try {
      const response = await axios.post(
        `${API_URL}/geracao`,
        JSON.stringify(parametros),
        {
          headers: { "Content-Type": "application/json" },
          responseType: "json"
        }
      );
      console.log("midi: "+ response.data.idMelodia);

      if (response.status === 200) {
        console.log("Melodia gerada com sucesso!");
        alert("Melodia gerada com sucesso!");
        setMidiBytes(response.data);
        handleGeracaoSuccess(response.data.idMelodia)
      } else {
        console.error("Erro ao gerar melodia:", response.status);
        alert("Erro ao gerar melodia. Verifique os parâmetros.");
      }
    } catch (error) {
      console.error("Erro ao gerar melodia:", error);
      alert("Erro ao gerar melodia. Verifique os parâmetros.");
    }
  };

  return (
    <div className="border-solid border-blue bg-blue-300 ">
      <h1 className="">Geração de Melodia</h1>
      <div className="form-container bg-blue-300 bg-solid">
        <FormParametros onSubmit={handleGenerateMelody} />
      </div>

      {}
      {midiBytes && (
        <div className="player-container mt-6">
          <h2>Player de Melodia</h2>
          <MidiPlayer midiBytes={midiBytes} />
        </div>
      )}
    </div>
  );
}

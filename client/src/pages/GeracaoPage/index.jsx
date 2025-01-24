import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import { FaSearch } from "react-icons/fa";
import { Button } from "primereact/button";
import { FormParametros } from "../../components/FormParametros";
import { InputText } from "primereact/inputtext";
import MidiPlayer from "../../components/MidiPlayer";
import { Navbar } from "../../components/NavBar";

export function GeracaoPage() {
  const [longInput, setLongInput] = useState("");
  const [midiBytes, setMidiBytes] = useState(null);

  const handleBuscarPorLong = () => {
    if (longInput) {
      axios
        .get(`${API_URL}/geracao/${longInput}`, { method: "GET" })
        .then((response) => {
          if (response.ok) {
            console.log("Busca realizada com sucesso!");
          }
        })
        .catch((error) => console.error("Erro na requisição:", error));
    }
  };

  const handleGenerateMelody = async (parametros) => {
    try {
      const response = await axios.post(
        `${API_URL}/geracao`,
        JSON.stringify(parametros),
        {
          headers: { "Content-Type": "application/json" },
          responseType: "arraybuffer",
        }
      );
      console.log("midi: "+ response.data);

      if (response.status === 200) {
        console.log("Melodia gerada com sucesso!");
        alert("Melodia gerada com sucesso!");
        setMidiBytes(response.data);
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
    <div className="geracao-page">
        <Navbar/>
      <h1>Geração de Melodia</h1>
      <div className="form-container">
        <FormParametros onSubmit={handleGenerateMelody} />
      </div>
      <div className="flex justify-content-center my-4">
        <label htmlFor="longInput">Digite um Long:</label>
        <InputText
          id="longInput"
          value={longInput}
          onChange={(e) => setLongInput(e.target.value)}
          className="ml-4"
        />
        <Button onClick={handleBuscarPorLong} className="p-button-outlined ml-3">
          Buscar <FaSearch className="ml-2" />
        </Button>
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

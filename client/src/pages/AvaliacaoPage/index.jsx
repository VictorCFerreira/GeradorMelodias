import { FormAvaliacao } from "../../components/FormAvaliacao";
import { Navbar } from "../../components/NavBar";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FaSearch } from "react-icons/fa";
import { API_URL } from "../../constants/constants";
import axios from "axios";
import MidiPlayer from "../../components/MidiPlayer";


export function AvaliacaoPage() {
  const { melodiaId } = useParams();
  const [longInput, setLongInput] = useState("");
  const [midiBytes, setMidiBytes] = useState("");

  useEffect(() => {
    const fetchMidi = async () => {
      try {
        const response = await axios.get(`/api/melodias/${melodiaId}`, {
          responseType: "arraybuffer",
        });
        setMidiBytes(response.data);
      } catch (err) {
        console.error("Erro ao carregar o MIDI:", err);
        setError("Erro ao carregar o MIDI.");
      }
    };

    fetchMidi();
  }, [melodiaId]);

  const handleEnviarAvaliacao = async (avaliacao) => {
    try {
      console.log("aa: " + JSON.stringify(avaliacao));

      const response = await axios.post(`${API_URL}/avaliacao`,
        JSON.stringify(avaliacao),
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.status === 200) {
        console.log("Melodia avaliada com sucesso!");
        alert("Melodia avaliada com sucesso!");
      } else {
        console.error("Erro ao avaliar melodia:", response.status);
        alert("Erro ao avaliar melodia.");
      }
    } catch (error) {
      console.error("Erro ao avaliar melodia:");
      alert("Erro ao avaliar melodia.");
    }
  };

  const handleBuscarPorLong = () => {
    if (longInput) {
      axios
        .get(`${API_URL}/geracao/play/${longInput}`, { method: "GET" })
        .then((response) => {
          if (response.ok) {
            console.log("Busca realizada com sucesso!");
          }
        })
        .catch((error) => console.error("Erro na requisição:", error));
    }
  };


  return (
    <>

      <div className="border-solid border-blue-200">
        <div>
          <div className="player-container mt-6">
            <h2>Player de Melodia</h2>
            <MidiPlayer midiBytes={midiBytes} />
          </div>
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
        <FormAvaliacao onSubmit={handleEnviarAvaliacao} melodiaId={Number(melodiaId)} />

      </div>

    </>
  )
}
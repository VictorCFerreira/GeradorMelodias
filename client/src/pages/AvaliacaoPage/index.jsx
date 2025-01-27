import { FormAvaliacao } from "../../components/FormAvaliacao";
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { API_URL } from "../../constants/constants";
import axios from "axios";
import MidiPlayer from "../../components/MidiPlayer";
import { Toast } from 'primereact/toast';
import { FaMusic } from "react-icons/fa";

export function AvaliacaoPage() {
  const { melodiaId } = useParams();
  const [midiBytes, setMidiBytes] = useState("");
  const [avaliada, setAvaliada] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const fetchMidi = async () => {
      try {
        const response = await axios.get(`${API_URL}/geracao/${melodiaId}`, {
          responseType: 'json',
        });

        setMidiBytes(response.data.midiBytes);
      } catch (err) {
        console.error("Erro ao carregar o MIDI:", err);
      }
    };

    fetchMidi();
  }, [melodiaId]);

  const handleEnviarAvaliacao = async (avaliacao) => {
    try {
      const response = await axios.post(`${API_URL}/avaliacao`,
        JSON.stringify(avaliacao),
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.status === 200) {
        setAvaliada(true);
        toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Melodia avaliada com sucesso!', life: 3000 });
      } else {
        console.error("Erro ao avaliar melodia:", response.status);
        toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao avaliar melodia.', life: 3000 });
      }
    } catch (error) {
      console.error("Erro ao avaliar melodia:", error);
      toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao avaliar melodia.', life: 3000 });
    }
  };


  return (
    <>
      <div className="border-solid border-blue bg-blue-300">
        <h1>Avaliar Melodia</h1>

        <div>
          <div className="player-container mt-6">
            <MidiPlayer midiBase64={midiBytes} />
          </div>
        </div>

        {avaliada && (
          <div className=" m-4 ">
            <h3>Esta melodia já foi avaliada. Obrigado!</h3>
              <div className="">
              <FaMusic />
              <a href="/" className="ml-2">Voltar para Geração</a>
              </div>
          </div>

        )}

        {!avaliada ? (
          <FormAvaliacao onSubmit={handleEnviarAvaliacao} melodiaId={Number(melodiaId)} />
        ) : null}
      </div>

      <Toast ref={toast} />
    </>
  );
}
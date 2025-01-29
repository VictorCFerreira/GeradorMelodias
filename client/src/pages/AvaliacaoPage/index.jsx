import { FormAvaliacao } from "../../components/FormAvaliacao";
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { API_URL } from "../../constants/constants";
import axios from "axios";
import MidiPlayer2 from '../../components/MidiPlay';  
import { Toast } from 'primereact/toast';
import { FaDownload, FaMusic } from "react-icons/fa";



export function AvaliacaoPage() {
  const { melodiaId } = useParams();
  const [midiBytes, setMidiBytes] = useState("");
  const [bpm, setbpm] = useState("");
  const [avaliada, setAvaliada] = useState(false);
  const toast = useRef(null);

  const downloadMidi = () => {
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${midiBytes}`;
    link.download = "melody.mid";
    link.click();
  };

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

        <div className="flex flex-column justify-content-center">
          
          <div className="player-container mt-6 flex justify-content-center">
                    <MidiPlayer2 base64MidiData={midiBytes}/>
          </div>
          <div className="mt-4 flex justify-content-center">
            <button
              onClick={downloadMidi}
              className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              Baixar como .mid
              <FaDownload className="text-xl ml-4 w-40" />
            </button>
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

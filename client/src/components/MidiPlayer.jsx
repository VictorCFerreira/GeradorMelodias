import React, { useState } from "react";
import MIDI from "midi.js";

const MidiPlayer = ({ midiBytes }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const convertToBase64 = (bytes) => {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(bytes)));
  };

  const handlePlayPause = () => {
    console.log("midiBytes:", midiBytes);
    console.log("Base64 MIDI:", base64Midi);
    
    // Verificar se o MIDI.js está carregado
    console.log("MIDI.Player:", MIDI.Player);
    

    if (!isPlaying) {
      // Certifique-se de que o arquivo MIDI seja convertido corretamente
      const base64Midi = `data:audio/midi;base64,${convertToBase64(midiBytes)}`;

      MIDI.Player.stop(); // Garante que nenhum player antigo esteja rodando
      MIDI.Player.loadFile(base64Midi, () => {
        MIDI.Player.start();
        setIsPlaying(true);

        // Atualiza o progresso
        MIDI.Player.setAnimation((data) => {
          setProgress(data.now / data.end);
        });
      });

      MIDI.Player.onerror = (error) => {
        console.error("Erro ao carregar o arquivo MIDI:", error);
      };
    } else {
      MIDI.Player.stop();
      setIsPlaying(false);
      setProgress(0);
    }
  };

  return (
    <div className="midi-player flex flex-col items-center p-4 border rounded shadow">
      <div className="progress-bar w-full bg-gray-200 h-2 rounded mb-4">
        <div
          className="bg-blue-500 h-full rounded"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
      <button
        onClick={handlePlayPause}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default MidiPlayer;

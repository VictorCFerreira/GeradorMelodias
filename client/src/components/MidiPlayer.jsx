import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";
import { FaPause, FaPlay, FaDownload } from "react-icons/fa";

const MidiPlayer = ({ midiBase64 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const midiDurationRef = useRef(15); // Duração fixa de 15 segundos
  const intervalRef = useRef(null);
  const synth = useRef(null);

  const base64ToArrayBuffer = (base64) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const playMidi = async () => {
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      Tone.Transport.stop();
      Tone.Transport.cancel();
      Tone.Transport.seconds = 0;

      setProgress(0);

      // Converter o MIDI base64 para ArrayBuffer
      const midiArrayBuffer = base64ToArrayBuffer(midiBase64);
      const midi = new Midi(midiArrayBuffer);

      // Criar o sintetizador
      synth.current = new Tone.PolySynth().toDestination();

      // Iniciar o sintetizador
      midi.tracks.forEach((track) => {
        track.notes.forEach((note) => {
          synth.current.triggerAttackRelease(
            note.name,
            note.duration,
            note.time,
            note.velocity
          );
        });
      });

      await Tone.start();
      Tone.Transport.start();
      setIsPlaying(true);

      // Atualização do andamento da melodia
      intervalRef.current = setInterval(() => {
        const elapsedTime = Tone.Transport.seconds;
        const progressValue = (elapsedTime / midiDurationRef.current) * 100;
        setProgress(progressValue);

        if (progressValue >= 100) {
          clearInterval(intervalRef.current);
          Tone.Transport.stop();
          setIsPlaying(false);
        }
      }, 100);
    } catch (error) {
      console.error("Erro ao processar o MIDI:", error.message);
    }
  };

  const pauseMidi = () => {
    Tone.Transport.pause();
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const downloadMidi = () => {
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${midiBase64}`;
    link.download = "melody.mid";
    link.click();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);

  return (
    <div className="p-4 w-full max-w-sm mx-auto bg-blue-300 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={isPlaying ? pauseMidi : playMidi}
            className={`py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50`}
          >
            {isPlaying ? (
              <FaPause className="text-xl" />
            ) : (
              <FaPlay className="text-xl" />
            )}
          </button>
        </div>

        <div className="flex-1 mt-4 ml-6">
          <div className="relative w-full h-2 bg-blue-100 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={downloadMidi}
          className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
        >
          Baixar como .mid
          <FaDownload className="text-xl ml-4" />
        </button>
      </div>
    </div>
  );
};

export default MidiPlayer;

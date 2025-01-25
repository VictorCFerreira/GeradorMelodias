import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";
import { ProgressBar } from "primereact/progressbar";
import { FaPause, FaPlay, FaDownload } from "react-icons/fa"; // Ícones de pause, play e download

const MidiPlayer = ({ midiBase64 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const midiDurationRef = useRef(0);
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

      // Stop previous tone transport and clear intervals
      Tone.Transport.stop();
      Tone.Transport.cancel();
      Tone.Transport.seconds = 0;

      // Reset progress bar immediately before starting playback
      setProgress(0);

      // Convert MIDI and create a new Midi instance
      const midiArrayBuffer = base64ToArrayBuffer(midiBase64);
      const midi = new Midi(midiArrayBuffer);

      midiDurationRef.current = midi.duration;

      // Initialize synth and setup for MIDI playback
      synth.current = new Tone.PolySynth().toDestination();
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

      // Start Tone.js and begin playing
      await Tone.start();
      Tone.Transport.start();
      setIsPlaying(true);

      // Update progress bar every 100ms
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
      <h1 className="text-xl font-bold text-center mb-4">MIDI Player</h1>

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
          <ProgressBar
            value={progress * 2}
            showValue={false}
            className="h-2 rounded-full bg-blue-100"
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={downloadMidi}
          className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <FaDownload className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default MidiPlayer;

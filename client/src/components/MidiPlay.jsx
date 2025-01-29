import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import Soundfont from 'soundfont-player';

const INSTRUMENT_ID = {
  0: 'acoustic_grand_piano', // Piano
  25: 'acoustic_guitar_steel', // Violão
  27: 'electric_guitar_clean', // Guitarra
  33: 'electric_bass_finger',  // Baixo
  40: 'violin',             // Violino
};


const MidiPlayer = ({ base64MidiData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [instrumentPlayers, setInstrumentPlayers] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(ctx);
    loadInstruments(ctx);
  }, []);

  const loadInstruments = async (ctx) => {
    setIsLoading(true);
    setError('');
    try {
      const players = {};
      const totalInstruments = Object.keys(INSTRUMENT_ID).length;
      let loadedCount = 0;

      for (const [, soundfontName] of Object.entries(INSTRUMENT_ID)) {
        try {
          players[soundfontName] = await Soundfont.instrument(ctx, soundfontName, {
            format: 'mp3',
            soundfont: 'MusyngKite'
          });
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalInstruments) * 100));
        } catch (err) {
          console.error(`Error loading instrument ${soundfontName}:`, err);
        }
      }
      setInstrumentPlayers(players);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading instruments:', err);
      setError('Error loading instruments');
      setIsLoading(false);
    }
  };

  const parseMidiData = (buffer) => {
    const dv = new DataView(buffer);
    let position = 0;

    const headerChunk = {
      type: String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3)),
      length: dv.getUint32(4),
      format: dv.getUint16(8),
      tracks: dv.getUint16(10),
      division: dv.getUint16(12)
    };
    
    position = 14;

    const trackChunk = {
      type: String.fromCharCode(dv.getUint8(position), dv.getUint8(position + 1), 
                               dv.getUint8(position + 2), dv.getUint8(position + 3)),
      length: dv.getUint32(position + 4),
      events: []
    };
    
    position += 8;

    let runningStatus = 0;
    const endPosition = position + trackChunk.length;

    while (position < endPosition) {
      let deltaTime = 0;
      let byte;
      do {
        byte = dv.getUint8(position++);
        deltaTime = (deltaTime << 7) | (byte & 0x7F);
      } while (byte & 0x80);

      let status = dv.getUint8(position);
      if (status & 0x80) {
        runningStatus = status;
        position++;
      } else {
        status = runningStatus;
      }

      const event = {
        deltaTime,
        type: status >> 4,
        channel: status & 0x0F
      };

      if (event.type === 0x9 || event.type === 0x8) {
        event.note = dv.getUint8(position++);
        event.velocity = dv.getUint8(position++);
        trackChunk.events.push(event);
      }
      else if (event.type === 0xC) {
        event.program = dv.getUint8(position++);
        trackChunk.events.push(event);
      }
      else {
        position += 2;
      }
    }

    return { headerChunk, trackChunk };
  };

  const playMidi = async () => {
    if (!audioContext || isLoading) return;
    
    setIsPlaying(true);
    setError('');

    try {
      const binaryString = atob(base64MidiData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const { headerChunk, trackChunk } = parseMidiData(bytes.buffer);
      
      const ticksPerBeat = headerChunk.division;
      const secondsPerTick = 0.05;

      let currentTime = audioContext.currentTime;
      let totalDeltaTime = 0;
      let currentSoundfontInstrument = 'acoustic_grand_piano';

      trackChunk.events.forEach(event => {
        totalDeltaTime += event.deltaTime;
        const eventTime = currentTime + (totalDeltaTime * secondsPerTick);

        if (event.type === 0x9 && event.velocity > 0) {
          const player = instrumentPlayers[currentSoundfontInstrument];
          if (player) {
            player.play(event.note, eventTime, { gain: event.velocity / 127 });
          }
        }
        else if (event.type === 0xC) {
          const soundfontName = INSTRUMENT_ID[event.program] || 'acoustic_grand_piano';
          currentSoundfontInstrument = soundfontName;
        }
      });

      const totalDuration = (totalDeltaTime * secondsPerTick) + 1;
      setTimeout(() => setIsPlaying(false), totalDuration * 1000);

    } catch (err) {
      console.error('Erro ao tocar MIDI:', err);
      setError('Erro ao tocar MIDI');
      setIsPlaying(false);
    }
  };


  return (
    <Card  className="w-full max-w-30rem bg-blue-600">
      {error && (
        <Message 
          severity="error" 
          text={error}
          className="mb-3"
        />
      )}
      <Button
        label={isLoading 
          ? `Carregando Instrumentos (${loadingProgress}%)` 
          : isPlaying 
            ? 'Tocando' 
            : 'Tocar Melodia'
        }
        icon={isLoading ? "pi pi-spinner" : "pi pi-play"}
        onClick={playMidi}
        disabled={isPlaying || isLoading}
        className="w-full"
      />
    </Card>
  );
};

export default MidiPlayer;
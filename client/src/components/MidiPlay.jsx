import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import Soundfont from 'soundfont-player';

// Instrument mapping for General MIDI program numbers
const INSTRUMENT_MAPPING = {
  0: 'acoustic_grand_piano', // Piano
  16: 'drawbar_organ',      // Órgão
  25: 'steel_string_guitar', // Violão
  27: 'electric_guitar_clean', // Guitarra
  33: 'electric_bass_finger',  // Baixo
  40: 'violin',             // Violino
  42: 'cello',             // Violoncelo
  56: 'trumpet',           // Trompete
  65: 'alto_sax',          // Saxofone
  73: 'flute',             // Flauta
  85: 'lead_1_square',     // Sintetizador
  68: 'oboe',              // Oboé
  8: 'celesta',            // Celesta
};

// Display names for instruments
const INSTRUMENT_NAMES = {
  'acoustic_grand_piano': 'Piano',
  'drawbar_organ': 'Órgão',
  'steel_string_guitar': 'Violão',
  'electric_guitar_clean': 'Guitarra',
  'electric_bass_finger': 'Baixo',
  'violin': 'Violino',
  'cello': 'Violoncelo',
  'trumpet': 'Trompete',
  'alto_sax': 'Saxofone',
  'flute': 'Flauta',
  'lead_1_square': 'Sintetizador',
  'oboe': 'Oboé',
  'celesta': 'Celesta'
};

const MidiPlayer = ({ base64MidiData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentInstrument, setCurrentInstrument] = useState('');
  const [audioContext, setAudioContext] = useState(null);
  const [instrumentPlayers, setInstrumentPlayers] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(ctx);
    loadInstruments(ctx);
  }, []);

  const loadInstruments = async (ctx) => {
    setIsLoading(true);
    try {
      const players = {};
      for (const [, soundfontName] of Object.entries(INSTRUMENT_MAPPING)) {
        players[soundfontName] = await Soundfont.instrument(ctx, soundfontName, {
          format: 'mp3',
          soundfont: 'MusyngKite'
        });
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

    // Parse header chunk
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
      const secondsPerTick = 0.005; // Assuming 120 BPM

      let currentTime = audioContext.currentTime;
      let totalDeltaTime = 0;
      let currentSoundfontInstrument = 'acoustic_grand_piano'; // Default to piano

      trackChunk.events.forEach(event => {
        totalDeltaTime += event.deltaTime;
        const eventTime = currentTime + (totalDeltaTime * secondsPerTick);

        if (event.type === 0x9 && event.velocity > 0) {
          // Note On
          const player = instrumentPlayers[currentSoundfontInstrument];
          if (player) {
            player.play(event.note, eventTime, { gain: event.velocity / 127 });
          }
        }
        else if (event.type === 0xC) {
          // Program Change
          const soundfontName = INSTRUMENT_MAPPING[event.program] || 'acoustic_grand_piano';
          currentSoundfontInstrument = soundfontName;
          setCurrentInstrument(INSTRUMENT_NAMES[soundfontName] || 'Unknown Instrument');
        }
      });

      const totalDuration = (totalDeltaTime * secondsPerTick) + 1;
      setTimeout(() => setIsPlaying(false), totalDuration * 1000);

    } catch (err) {
      console.error('Error playing MIDI:', err);
      setError('Error playing MIDI file');
      setIsPlaying(false);
    }
  };

  const header = (
    <div className="flex align-items-center justify-content-between">
      <h2>MIDI Player</h2>
    </div>
  );

  const footer = currentInstrument && (
    <div className="mt-3">
      <p className="font-bold mb-2">Current Instrument:</p>
      <p>{currentInstrument}</p>
    </div>
  );

  return (
    <Card header={header} footer={footer} className="w-full max-w-30rem">
      {error && (
        <Message 
          severity="error" 
          text={error}
          className="mb-3"
        />
      )}
      <Button
        label={isLoading ? 'Loading Instruments...' : isPlaying ? 'Playing...' : 'Play MIDI'}
        icon={isLoading ? "pi pi-spinner" : "pi pi-play"}
        onClick={playMidi}
        disabled={isPlaying || isLoading}
        className="w-full"
      />
    </Card>
  );
};

export default MidiPlayer;
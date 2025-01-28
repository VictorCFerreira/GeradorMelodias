import React, { useState, useEffect, useRef } from "react";
import { FaPause, FaPlay, FaDownload } from "react-icons/fa";
import axios from "axios";

const MidiPlayer = ({ midiBase64 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [midiDuration, setMidiDuration] = useState(0);
  const [player, setPlayer] = useState();
  const intervalRef = useRef(null);

  useEffect(() => {
    // Definir Base64Binary no escopo global para garantir que MIDI.js possa acessá-lo
    window.Base64Binary = {
      decodeArrayBuffer: function (base64) {
        var binary_string = atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
      },
    };

    // Carregar o MIDI.js e configurar o player
    const script = document.createElement("script");
    script.src = "/js/MIDI.js"; // Certifique-se de que midi.js está no caminho correto
    script.async = true;
    script.onload = () => {
      // Verificar se o MIDI.js foi carregado corretamente
      console.log("midi: " + typeof MIDI);

      if (typeof MIDI !== "undefined") {
        console.log("MIDI.js carregado.");

        // Usando Axios para carregar o SoundFont
        axios
          .get("/soundfonts/acoustic_grand_piano-mp3-ogg.js")
          .then((response) => {
            console.log("Resposta do SoundFont:", response);

            // Em vez de usar eval, tente usar uma abordagem de importação ou execução direta:
            // Exemplo de executar diretamente o código JavaScript retornado
            const script = document.createElement("script");
            script.innerHTML = response.data;
            document.body.appendChild(script);

            MIDI.loadPlugin({
              soundfontUrl: "/soundfonts/",
              instrument: "acoustic_grand_piano-mp3",
              onsuccess: () => {
                setPlayer(MIDI.Player);
                console.log("Plugin de som carregado com sucesso.");
              },
              onerror: (err) => {
                console.error("Erro ao carregar o plugin de som:", err);
              },
            });
          })
          .catch((err) => {
            console.error("Erro ao carregar o SoundFont:", err);
          });

      } else {
        console.error("MIDI.js não foi carregado corretamente.");
      }
    };

    script.onerror = () => {
      console.error("Erro ao carregar o script MIDI.js.");
    };
    document.body.appendChild(script);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);


  const playMidi = () => {
    try {
      // Converte o base64 em ArrayBuffer
      const midiArrayBuffer = Base64Binary.decodeArrayBuffer(midiBase64);
  
      // Verifica se MIDI.js está disponível
      // if (typeof MIDI === 'undefined') {
      //   console.error("MIDI.js não está disponível.");
      //   return;
      // }
  
      // Verifica se o MIDI.Player está disponível
      // if (!MIDI.Player) {
      //   console.error("MIDI.Player não está disponível.");
      //   return;
      // }
  
      //Verifica se o MIDI.Player foi carregado corretamente
      

      MIDI.loadPlugin({
        soundfontUrl: "/soundfonts/",
        instrument: "acoustic_grand_piano-mp3",
        onsuccess: () => {
          if (!MIDI.Player.loaded) {
            console.error("O plugin MIDI não foi carregado corretamente.");
            return;
          }

          MIDI.Player.loadFile(midiUrl, () => {
            // Verificar se o arquivo MIDI foi carregado corretamente
            if (MIDI.Player.endTime === 0) {
              console.error("O arquivo MIDI não foi carregado corretamente.");
              return;
            }

            if (!MIDI.Player.loaded) {
              console.error("O plugin MIDI não foi carregado corretamente.");
              return;
            }
      
            // Atribuir a duração do MIDI
            setMidiDuration(MIDI.Player.endTime);
      
            // Iniciar o playback do MIDI
            MIDI.Player.start();
            setIsPlaying(true);
      
            // Atualizar o progresso da música
            intervalRef.current = setInterval(() => {
              setProgress((MIDI.Player.currentTime / MIDI.Player.endTime) * 100);
            }, 100);
      
            // Parar o intervalo quando a música terminar
            const checkPlaybackEnd = setInterval(() => {
              if (MIDI.Player.currentTime >= MIDI.Player.endTime) {
                clearInterval(intervalRef.current);
                clearInterval(checkPlaybackEnd);
                setIsPlaying(false);
              }
            }, 100);
          });
          console.log("Plugin de som carregado com sucesso.");
        },
        onerror: (err) => {
          console.error("Erro ao carregar o plugin de som:", err);
        },
      });
    
  
      // Criar um Blob do ArrayBuffer e gerar um URL temporário
      const midiBlob = new Blob([midiArrayBuffer], { type: 'audio/midi' });
      const midiUrl = URL.createObjectURL(midiBlob);
  
      // Carregar o arquivo MIDI a partir da URL
      MIDI.Player.loadFile(midiUrl, () => {
        // Verificar se o arquivo MIDI foi carregado corretamente
        if (MIDI.Player.endTime === 0) {
          console.error("O arquivo MIDI não foi carregado corretamente.");
          return;
        }
  
        // Atribuir a duração do MIDI
        setMidiDuration(MIDI.Player.endTime);
  
        // Iniciar o playback do MIDI
        MIDI.Player.start();
        setIsPlaying(true);
  
        // Atualizar o progresso da música
        intervalRef.current = setInterval(() => {
          setProgress((MIDI.Player.currentTime / MIDI.Player.endTime) * 100);
        }, 100);
  
        // Parar o intervalo quando a música terminar
        const checkPlaybackEnd = setInterval(() => {
          if (MIDI.Player.currentTime >= MIDI.Player.endTime) {
            clearInterval(intervalRef.current);
            clearInterval(checkPlaybackEnd);
            setIsPlaying(false);
          }
        }, 100);
      });
    } catch (error) {
      console.error("Erro ao tocar o MIDI:", error.message);
    }
  };
  


  const pauseMidi = () => {
    MIDI.Player.pause();
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

import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/constants";

export function FormParametros() {
    const [instrumento, setInstrumento] = useState("");
    const [escala, setEscala] = useState("");
    const [oitavas, setOitavas] = useState("");
    const [bpm, setBpm] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parametros = {
            instrumento,
            escala,
            oitavas: parseInt(oitavas),
            bpm: parseInt(bpm),
        };

        try {
            const response = await axios.post(`${API_URL}/geracao`, JSON.stringify(parametros), {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Melodia gerada com sucesso:", response.data);
            alert("Melodia gerada com sucesso!");
        } catch (error) {
            console.error("Erro ao gerar melodia:", error);
            alert("Erro ao gerar melodia. Verifique os parâmetros.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Instrumento:</label>
                <input
                    type="text"
                    value={instrumento}
                    onChange={(e) => setInstrumento(e.target.value)}
                    placeholder="Ex: Piano"
                    required
                />
            </div>
            <div>
                <label>Escala:</label>
                <input
                    type="text"
                    value={escala}
                    onChange={(e) => setEscala(e.target.value)}
                    placeholder="Ex: Dó maior"
                    required
                />
            </div>
            <div>
                <label>Oitavas:</label>
                <input
                    type="number"
                    value={oitavas}
                    onChange={(e) => setOitavas(e.target.value)}
                    min="1"
                    max="8"
                    required
                />
            </div>
            <div>
                <label>BPM:</label>
                <input
                    type="number"
                    value={bpm}
                    onChange={(e) => setBpm(e.target.value)}
                    min="40"
                    max="300"
                    required
                />
            </div>
            <button type="submit">Gerar Melodia</button>
        </form>
    );
}

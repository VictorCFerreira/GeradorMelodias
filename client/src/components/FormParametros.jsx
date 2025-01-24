import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { ESCALAS } from "../constants/constants"
import { INSTRUMENTOS } from "../constants/constants"
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

export function FormParametros({onSubmit}) {
    const [instrumento, setInstrumento] = useState("");
    const [escala, setEscala] = useState("");
    const [oitavas, setOitavas] = useState("");
    const [bpm, setBpm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const parametros = {
          instrumento,
          escala,
          oitavas: parseInt(oitavas),
          bpm: parseInt(bpm),
        };
    
        onSubmit(parametros); 
      };

    return (
        <form onSubmit={handleSubmit} className="p-fluid">
            <div className="p-field m-4">
                <label htmlFor="instrumento">Instrumento</label>
                <Dropdown
                    id="instrumento"
                    value={instrumento}
                    options={INSTRUMENTOS}
                    onChange={(e) => setInstrumento(e.value)}
                    placeholder="Selecione um instrumento"
                    className="p-dropdown"
                />
            </div>

            <div className="p-field m-4">
                <label htmlFor="escala">Escala</label>
                <Dropdown
                    id="escala"
                    value={escala}
                    options={ESCALAS}
                    onChange={(e) => setEscala(e.value)}
                    placeholder="Selecione uma escala"
                    className="p-dropdown"
                />
            </div>
            <div className="flex m-4">
                <div className="p-col-6 p-field mr-2">
                    <label htmlFor="oitavas">Oitavas</label>
                    <InputNumber
                        id="oitavas"
                        value={oitavas}
                        onValueChange={(e) => setOitavas(e.value)}
                        min={1}
                        max={8}
                        showButtons
                        incrementButtonIcon="pi pi-chevron-up "
                        decrementButtonIcon="pi pi-chevron-down"
                        placeholder="Oitavas"
                        className="p-inputnumber"
                        required
                    />
                </div>
                <div className="p-col-6 p-field">
                    <label htmlFor="bpm">BPM</label>
                    <InputNumber
                        id="bpm"
                        value={bpm}
                        onValueChange={(e) => setBpm(e.value)}
                        min={40}
                        max={300}
                        showButtons
                        incrementButtonIcon="pi pi-chevron-up "
                        decrementButtonIcon="pi pi-chevron-down"
                        placeholder="BPM"
                        className="p-inputnumber "
                        required
                    />
                </div>
            </div>
            <div className="pt-4 m-4">
                <Button
                    type="submit"
                    label="Gerar Melodia"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                />
            </div>
        </form>
    );
};

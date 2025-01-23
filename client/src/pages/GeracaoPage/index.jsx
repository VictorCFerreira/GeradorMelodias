import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import { FaAccessibleIcon } from "react-icons/fa";
import { Button } from "primereact/button";
import { InputText } from "primereact/InputText";
import { FormParametros } from "../../components/FormParametros";


export function GeracaoPage() {
    const [longInput, setLongInput] = React.useState("");

    const handleBuscarPorLong = () => {
        if (longInput) {
            axios.get(`${API_URL}/geracao/${longInput}`, { method: "GET" })
                .then(response => {
                    if (response.ok) {
                        console.log("Busca realizada com sucesso!");
                    }
                })
                .catch(error => console.error("Erro na requisição:", error));
        }
    };

    return (
        <div className="geracao-page">
            <h1>Geração de Melodia</h1>
            <div className="form-container">
                <FormParametros />
            </div>
            <div className="long-input-container">
                <label htmlFor="longInput">Digite um Long:</label>
                <InputText
                    id="longInput"
                    value={longInput}
                    onChange={(e) => setLongInput(e.target.value)}
                />
                <Button onClick={handleBuscarPorLong} className="p-button-outlined">
                    Buscar <FaAccessibleIcon />
                </Button>
            </div>
        </div>
    );
}
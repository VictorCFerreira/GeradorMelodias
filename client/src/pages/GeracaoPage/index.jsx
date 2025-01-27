import React, { useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import { FormParametros } from "../../components/FormParametros";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";

export function GeracaoPage() {
  const toast = useRef(null);


  const navigate = useNavigate();

  const handleGeracaoSuccess = (idMelodia) => {
    navigate(`/avaliacao/${idMelodia}`);
  };

  const handleGenerateMelody = async (parametros) => {
    try {
      const response = await axios.post(
        `${API_URL}/geracao`,
        JSON.stringify(parametros),
        {
          headers: { "Content-Type": "application/json" },
          responseType: "json"
        }
      );
      console.log("midi: "+ response.data.idMelodia);

      if (response.status === 200) {
        console.log("Melodia gerada com sucesso!");
        toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Melodia Gerada com sucesso.', life: 3000 });
        handleGeracaoSuccess(response.data)
      } else {
        console.error("Erro ao gerar melodia:", response.status);
        toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao Gerar melodia, verifique os parâmetros', life: 3000 });
      }
    } catch (error) {
      console.error("Erro ao gerar melodia:", error);
      toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao Gerar Melodia', life: 3000 });
    }
  };

  return (
    <div className="border-solid border-blue bg-blue-300 ">
      <h1 className="">Geração de Melodia</h1>
      <div className="form-container bg-blue-300 bg-solid">
        <FormParametros onSubmit={handleGenerateMelody} />
      </div>
     <Toast ref={toast} />

    </div>
    
  );
}

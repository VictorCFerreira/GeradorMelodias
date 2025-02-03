import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SENSACOES, API_URL,INSTRUMENTOS } from '../../constants/constants';
import axios from 'axios';
import { CardAnalise } from '../../components/CardAnalise';

export const AnalisePage = () => {
  const [selectedSensacao, setSelectedSensacao] = useState(null);
  const [analiseData, setAnaliseData] = useState({
    instrumentosData: {},
    oitavasData: {},
    escalasData: {},
    bpmData: {},
    sensacaoData: {},
  });

  const fetchAnaliseData = async (parametro, notaMinima, notaMaxima, sensacao = null) => {
    try {
      const params = sensacao
        ? { parametro, sensacao }
        : { parametro, notaMinima, notaMaxima };

      const endpoint = sensacao ? 'sensacao-parametro' : 'nota-parametro';

      const response = await axios.get(`${API_URL}/analises/${endpoint}`, { params });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados de análise:', error);
      throw error;
    }
  };

  const handleSensacaoChange = (e) => {
    setSelectedSensacao(e.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataInstrumento = await fetchAnaliseData('Instrumento', 7, 10);
        const dataBPM = await fetchAnaliseData('BPM', 7, 10);
        const dataOitavas = await fetchAnaliseData('Oitavas', 7, 10);
        const dataEscala = await fetchAnaliseData('Escala', 7, 10);
        const dataSensacao = await fetchAnaliseData('Sensacao', 7, 10);

        setAnaliseData({
          instrumentosData: processarDadosGrafico(dataInstrumento, 'Instrumento'),
          bpmData: processarDadosGrafico(dataBPM, 'BPM'),
          oitavasData: processarDadosGrafico(dataOitavas, 'Oitavas'),
          escalasData: processarDadosGrafico(dataEscala, 'Escalas'),
          sensacaoData: processarDadosGrafico(dataSensacao, 'Sensacao')
        });
      } catch (error) {
        console.error('Erro ao carregar dados de análise', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSensacao) {
      const fetchDataWithSensacao = async () => {
        try {
          const dataInstrumento = await fetchAnaliseData('Instrumento', null, null, selectedSensacao);
          const dataBPM = await fetchAnaliseData('BPM', null, null, selectedSensacao);
          const dataOitavas = await fetchAnaliseData('Oitavas', null, null, selectedSensacao);
          const dataEscala = await fetchAnaliseData('Escala', null, null, selectedSensacao);

          setAnaliseData({
            instrumentosData: processarDadosGrafico(dataInstrumento, 'Instrumento'),
            bpmData: processarDadosGrafico(dataBPM, 'BPM'),
            oitavasData: processarDadosGrafico(dataOitavas, 'Oitavas'),
            escalasData: processarDadosGrafico(dataEscala, 'Escalas'),
            sensacaoData: {}
          });
        } catch (error) {
          console.error('Erro ao carregar dados de análise com sensação', error);
        }
      };

      fetchDataWithSensacao();
    }
  }, [selectedSensacao]);

  const processarDadosGrafico = (data, parametro) => {

    const instrumentosMap = INSTRUMENTOS.reduce((map, item) => {
      map[item.value] = item.label;
      return map;
    }, {});

    const processed = data.reduce((acc, curr) => {
      let label = curr.parametro;
  
      if (parametro === 'Instrumento' && instrumentosMap[label]) {
        label = instrumentosMap[label];
      }
  
      acc[label] = (acc[label] || 0) + curr.quantidadeMelodiaAval;
      return acc;
    }, {});
  
    const label = (() => {
      switch (parametro) {
        case 'BPM':
          return 'Faixas de BPM (Batidas por Minuto)';
        case 'Escalas':
          return 'Escalas Musicais';
        case 'Instrumento':
          return 'Instrumentos';
        case 'Oitavas':
          return 'Quantidade de Oitavas';
        case 'Sensacao':
          return 'Sensação';
      }
    })();
  
    const labels = Object.keys(processed);
    const values = Object.values(processed);
  
    return {
      labels,
      datasets: [
        {
          label: label,
          data: values,
          backgroundColor: '#42A5F5',
        },
      ],
    };
  };

  return (
    <div className="p-8 min-h-screen border-solid bg-blue-300">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Análise de Melodias</h2>
        <p className="text-gray-600">Visualize os dados das melodias baseados nos parâmetros e sensações</p>
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-full max-w-sm">
          <Dropdown
            value={selectedSensacao}
            options={SENSACOES}
            onChange={handleSensacaoChange}
            placeholder="Selecione uma sensação"
            className="w-full p-2 border rounded-md shadow-sm"
          />
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-700">
          {selectedSensacao
            ? `Pesquisando por sensação: ${selectedSensacao}`
            : 'Pesquisando por quantidade de avaliações altas'}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mx-auto">
        {Object.entries(analiseData).map(([key, data]) =>
          data?.labels?.length && data?.datasets?.length ? (
            <CardAnalise key={key} info={data} />
          ) : null
        )}
      </div>


    </div>
  );
};

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';

export const AnalisePage = () => {
  const [selectedSensacao, setSelectedSensacao] = useState(null);
  const sensacoes = [
    { name: 'Alegre', code: 'alegre' },
    { name: 'Triste', code: 'triste' },
    { name: 'Relaxante', code: 'relaxante' },
    { name: 'Energizante', code: 'energizante' },
  ];

  const parametrosUsadosGeralData = {
    labels: ['E_MENOR', 'DÓ', 'LÁ', 'FÁ', 'RE'],
    datasets: [
      {
        label: 'Parâmetros mais usados',
        data: [5, 2, 4, 3, 6],
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      },
    ],
  };

  const parametrosAvaliadosGeralData = {
    labels: ['Piano', 'Guitarra', 'Violino'],
    datasets: [
      {
        label: 'Instrumentos mais bem avaliados',
        data: [8, 5, 9],
        backgroundColor: '#66BB6A',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
    ],
  };

  const parametrosUsadosSensacaoData = {
    labels: ['E_MENOR', 'DÓ', 'LÁ', 'FÁ', 'RE'],
    datasets: [
      {
        label: 'Parâmetros mais usados com sensação Alegre',
        data: [3, 5, 2, 4, 7],
        backgroundColor: '#FFEB3B',
        borderColor: '#FBC02D',
        borderWidth: 1,
      },
    ],
  };

  const parametrosAvaliadosSensacaoData = {
    labels: ['Piano', 'Guitarra', 'Violino'],
    datasets: [
      {
        label: 'Instrumentos mais bem avaliados com sensação Alegre',
        data: [7, 8, 5],
        backgroundColor: '#FF7043',
        borderColor: '#D32F2F',
        borderWidth: 1,
      },
    ],
  };

  const faixaBpmData = {
    labels: ['40-50 BPM', '51-60 BPM', '61-70 BPM', '71-80 BPM'],
    datasets: [
      {
        label: 'Faixa de BPM mais bem avaliada',
        data: [9, 6, 7, 8],
        backgroundColor: '#8E24AA',
        borderColor: '#6A1B9A',
        borderWidth: 1,
      },
    ],
  };

  const handleSensacaoChange = (e) => {
    setSelectedSensacao(e.value);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div className="w-1/3">
          <h2 className="text-xl font-semibold">Análise de Melodias</h2>
        </div>
        <div className="w-1/3 flex justify-end">
          <Dropdown
            value={selectedSensacao}
            options={sensacoes}
            onChange={handleSensacaoChange}
            optionLabel="name"
            placeholder="Filtrar por Sensação"
            className="w-full sm:w-20rem"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Parâmetros Mais Usados (Geral)">
          <Chart type="bar" data={parametrosUsadosGeralData} />
        </Card>

        <Card title="Parâmetros Mais Bem Avaliados (Geral)">
          <Chart type="bar" data={parametrosAvaliadosGeralData} />
        </Card>
      </div>

      {selectedSensacao && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Análise de Sensação: {selectedSensacao.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card title={`Parâmetros Mais Usados com sensação ${selectedSensacao.name}`}>
              <Chart type="bar" data={parametrosUsadosSensacaoData} />
            </Card>

            <Card title={`Instrumentos Mais Bem Avaliados com sensação ${selectedSensacao.name}`}>
              <Chart type="bar" data={parametrosAvaliadosSensacaoData} />
            </Card>
          </div>

          <div className="mt-6">
            <Card title="Faixa de BPM mais bem avaliada">
              <Chart type="bar" data={faixaBpmData} />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};


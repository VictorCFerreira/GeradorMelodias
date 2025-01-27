import React from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";

export const CardAnalise = ({ info}) => {
  return (
    <Card className="ml-7 shadow-lg border border-gray-200">
      {/* <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Número de {info.datasets.label} Mais Utilizadas
      </h3> */}
      <Chart type="bar" data={info} />
    </Card>
  );
};

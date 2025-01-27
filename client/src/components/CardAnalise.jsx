import React from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";

export const CardAnalise = ({ info}) => {
  return (
    <Card className="ml-7 shadow-lg border border-gray-200">
      <Chart type="bar" data={info} />
    </Card>
  );
};

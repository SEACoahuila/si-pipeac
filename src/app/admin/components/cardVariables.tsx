import React from 'react';
import { FaChartLine } from 'react-icons/fa'; // Ícono más adecuado

interface Props {
  name: string;
  variables: { name: string; progress: number }[];
}

export const CardVariables = ({ name, variables }: Props) => {
  const getOverallProgress = (variables: { name: string; progress: number }[]) => {
    const total = variables.reduce((sum, v) => sum + v.progress, 0);
    return Math.round(total / variables.length);
  };

  return (
    <div className="max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Encabezado con ícono y nombre */}
      <div className="flex items-center mb-3">
        <FaChartLine size={30} className="text-cyan-600 mr-2" /> {/* Ícono más pequeño */}
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
      </div>

      {/* Avance general */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 font-semibold mb-1">Avance general:</p>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
          <div
            className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getOverallProgress(variables)}%` }}
          ></div>
        </div>
        <p className="text-base font-bold text-gray-800">
          {getOverallProgress(variables)}% Completo
        </p>
      </div>

      {/* Lista de variables */}
      <div className="space-y-2">
        {variables.map((variable, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-gray-700">{variable.name}</span>
              <span className="text-xs text-gray-700">{variable.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${variable.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
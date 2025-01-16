'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const GeneralBarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Estado para el orden actual

  const data = [
    { city: 'Abasolo', value: 50 },
    { city: 'Acuña', value: 60 },
    { city: 'Allende', value: 55 },
    { city: 'Arteaga', value: 45 },
    { city: 'Candela', value: 40 },
    { city: 'Castaños', value: 65 },
    { city: 'Cuatro Ciénegas', value: 70 },
    { city: 'Escobedo', value: 35 },
    { city: 'Francisco I. Madero', value: 50 },
    { city: 'Frontera', value: 60 },
    { city: 'General Cepeda', value: 30 },
    { city: 'Guerrero', value: 25 },
    { city: 'Hidalgo', value: 40 },
    { city: 'Jiménez', value: 45 },
    { city: 'Juárez', value: 30 },
    { city: 'Lamadrid', value: 35 },
    { city: 'Matamoros', value: 55 },
    { city: 'Monclova', value: 65 },
    { city: 'Morelos', value: 50 },
    { city: 'Múzquiz', value: 60 },
    { city: 'Nadadores', value: 45 },
    { city: 'Nava', value: 50 },
    { city: 'Ocampo', value: 40 },
    { city: 'Parras', value: 55 },
    { city: 'Piedras Negras', value: 70 },
    { city: 'Progreso', value: 25 },
    { city: 'Ramos Arizpe', value: 60 },
    { city: 'Sabinas', value: 65 },
    { city: 'Sacramento', value: 30 },
    { city: 'Saltillo', value: 85 },
    { city: 'San Buenaventura', value: 50 },
    { city: 'San Juan de Sabinas', value: 55 },
    { city: 'San Pedro', value: 45 },
    { city: 'Sierra Mojada', value: 35 },
    { city: 'Torreón', value: 90 },
    { city: 'Viesca', value: 40 },
    { city: 'Villa Unión', value: 50 },
    { city: 'Zaragoza', value: 45 },
];

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      // Ordenar datos según el estado `sortOrder`
      const sortedData = [...data].sort((a, b) =>
        sortOrder === 'asc' ? a.value - b.value : b.value - a.value
      );

      // Extraer los ejes x e y del conjunto ordenado
      const yAxisData = sortedData.map((item) => item.city);
      const seriesData = sortedData.map((item) => item.value);

      const option: echarts.EChartsOption = {
        title: { text: 'Avance por Institución' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: {},
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'value', boundaryGap: [0, 0.01] },
        yAxis: { type: 'category', data: yAxisData },
        series: [
          { name: 'Porcentaje', type: 'bar', data: seriesData, color: ["#62bc96"]},
        ],
      };

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [sortOrder]); // Volver a renderizar el gráfico cuando cambie el orden

  return (
    <div className="p-3 mt-10">
      {/* Botones para cambiar el orden */}
      <div className="flex justify-end gap-2 mb-3">
        <button
          onClick={() => setSortOrder('asc')}
          className="px-4 py-2 bg-blue-800 rounded-3xl text-white  hover:bg-blue-600"
        >
          Ordenar Ascendente
        </button>
        <button
          onClick={() => setSortOrder('desc')}
          className="px-4 py-2 bg-blue-800 rounded-3xl text-white  hover:bg-blue-600"
        >
          Ordenar Descendente
        </button>
      </div>

      {/* Contenedor del gráfico */}
      <div ref={chartRef} style={{ width: '100%', height: '1000px' }} />
    </div>
  );
};

export default GeneralBarChart;

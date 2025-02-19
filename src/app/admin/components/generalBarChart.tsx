'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { configStore } from '@/app/store/generalStore';
import { Entidad } from '@/app/interfaces/resposeAvance';

const GeneralBarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const baseApi = configStore((state) => state.baseApi);
  const token = configStore((state) => state.token);
  const trimestre = configStore((state) => state.trimestre);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [data, setData] = useState<Entidad[] | null>(null);
  const [avanceGeneral, setAvanceGeneral] = useState<number>(0);
  const [totalInstituciones, setTotalInstituciones] = useState<number>(0); // Estado para el total de instituciones
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener datos de la API
  const getDataChart = async () => {
    if (!token) {
      setError('Error: No hay un token disponible.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${baseApi}/data/progress/${trimestre}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      calcularAvanceGeneral(response.data);
      setTotalInstituciones(response.data.length); // Calcular el total de instituciones
      setError(null);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setError('Error al cargar los datos. Verifica tu conexión y vuelve a intentarlo.');
    } finally {
      setLoading(false);
    }
  };

  // Función para calcular el avance general
  const calcularAvanceGeneral = (data: Entidad[]) => {
    if (!data || data.length === 0) return;
    const totalAvance = data.reduce((sum, entidad) => sum + entidad.totales.porcentaje_avance, 0);
    const promedioAvance = totalAvance / data.length;
    setAvanceGeneral(promedioAvance);
  };

  // Función para descargar los datos en formato CSV
  const descargarDatos = () => {
    if (!data) return;
  
    // Crear el contenido del CSV
    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' + // Agregar BOM para UTF-8
      'Nombre Entidad,Total Registros,Con Cumplimiento,Sin Cumplimiento,Porcentaje Avance\n' + // Cabecera
      data
        .map(
          (entidad) =>
            `"${entidad.nombre_entidad}",${entidad.totales.total_registros},${entidad.totales.con_cumplimiento},${entidad.totales.sin_cumplimiento},${entidad.totales.porcentaje_avance}`
        )
        .join('\n');
  
    // Codificar el contenido y crear el enlace de descarga
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'avance_general.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Efecto para cargar datos cuando baseApi, token y trimestre estén listos
  useEffect(() => {
    if (baseApi && token && trimestre) {
      getDataChart();
    }
  }, [baseApi, token, trimestre]);

  // Efecto para renderizar el gráfico cuando cambian los datos o el orden
  useEffect(() => {
    if (!chartRef.current || !data) return;

    const chartInstance = echarts.init(chartRef.current);

    // Ordenar datos
    const sortedData = [...data].sort((a, b) =>
      sortOrder === 'asc'
        ? a.totales.porcentaje_avance - b.totales.porcentaje_avance
        : b.totales.porcentaje_avance - a.totales.porcentaje_avance
    );

    // Extraer datos para el gráfico
    const yAxisData = sortedData.map((item) => item.nombre_entidad);
    const seriesData = sortedData.map((item) => item.totales.porcentaje_avance);

    // Configuración del gráfico
    const option: echarts.EChartsOption = {
      title: { text: 'Avance por Institución' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: {},
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'value', boundaryGap: [0, 0.01] },
      yAxis: { type: 'category', data: yAxisData },
      series: [
        { name: 'Porcentaje', type: 'bar', data: seriesData, color: ['#62bc96'] },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [sortOrder, data]);

  // Mensaje de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Mensaje de error
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-3 mt-10">
      {/* Mostrar el avance general y el total de instituciones */}
      <div className="mb-4 ml-5  place-items-center">
      <h2 className="text-md font-bold">
          Total de Instituciones: {totalInstituciones}
        </h2>
        <h2 className="text-md font-bold">
          Avance General: {avanceGeneral.toFixed(2)}%
        </h2>
       
      </div>

      {/* Botón para descargar los datos */}
      <div className="flex justify-end gap-2 mb-3">
        <button
          onClick={descargarDatos}
          className="px-4 py-2 bg-green-600 rounded-3xl text-sm text-white hover:bg-green-800"
        >
          Descargar Datos
        </button>
        <button
          onClick={() => setSortOrder('asc')}
          className="px-4 py-2 bg-blue-800 rounded-3xl text-sm text-white hover:bg-blue-600"
        >
          Ordenar Ascendente
        </button>
        <button
          onClick={() => setSortOrder('desc')}
          className="px-4 py-2 bg-blue-800 rounded-3xl text-sm  text-white hover:bg-blue-600"
        >
          Ordenar Descendente
        </button>
      </div>

      {/* Contenedor del gráfico */}
      {data && <div ref={chartRef} style={{ width: '100%', height: '1200px' }} />}
    </div>
  );
};

export default GeneralBarChart;
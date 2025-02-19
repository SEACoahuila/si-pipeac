'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { configStore } from '@/app/store/generalStore';

interface Prioridad {
  numero_prioridad: string;
  total_lineas: number;
  lineas_cumplidas: number;
  porcentaje_avance: number;
}

const GeneralBarPrioridades: React.FC = () => {
  const baseApi = configStore((state) => state.baseApi);
  const token = configStore((state) => state.token);
  const trimestre = configStore((state) => state.trimestre);
  const [data, setData] = useState<Prioridad[] | null>(null);
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
      const response = await axios.get(`${baseApi}/data/prioridades/${trimestre}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setError('Error al cargar los datos. Verifica tu conexión y vuelve a intentarlo.');
    } finally {
      setLoading(false);
    }
  };

  // Función para descargar los datos en formato CSV
  const descargarDatos = () => {
    if (!data) return;

    // Crear el contenido del CSV
    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' + // Agregar BOM para UTF-8
      'Número de Prioridad,Total de Líneas,Líneas Cumplidas,Porcentaje de Avance\n' + // Cabecera
      data
        .map(
          (prioridad) =>
            `"${prioridad.numero_prioridad}",${prioridad.total_lineas},${prioridad.lineas_cumplidas},${prioridad.porcentaje_avance}`
        )
        .join('\n');

    // Codificar el contenido y crear el enlace de descarga
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'avance_prioridades.csv');
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

  // Mensaje de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Mensaje de error
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 justify-center overflow-x-auto">
      {/* Botón para descargar los datos */}
      <div className="flex justify-end gap-2 mb-3">
        <button
          onClick={descargarDatos}
          className="px-4 py-2 bg-green-600 rounded-3xl text-sm text-white hover:bg-green-800"
        >
          Descargar Datos
        </button>
      </div>

      {/* Tabla de datos */}
      <table className="min-w-full table-auto border border-slate-600 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="px-4 py-3 text-left">Prioridades</th>
            <th className="px-4 py-3 text-center">Avance</th>
            <th className="px-4 py-3 text-center">Total líneas</th>
            <th className="px-4 py-3 text-center">Terminadas</th>
            <th className="px-4 py-3 text-center">Por completar</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.numero_prioridad} className="border-b border-slate-600 hover:bg-slate-300 transition-colors">
              <td className="px-4 py-3 flex items-center">
                <span className="text-sm">
                  {"Prioridad Estratégica N° " + item.numero_prioridad}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center">
                  <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div
                      className="bg-cyan-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${item.porcentaje_avance}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-semibold">
                    {Number(item.porcentaje_avance).toFixed(2)}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-center text-sm">{item.total_lineas}</td>
              <td className="px-4 py-3 text-center text-sm">{item.lineas_cumplidas}</td>
              <td className="px-4 py-3 text-center text-sm">
                {item.total_lineas - item.lineas_cumplidas}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralBarPrioridades;
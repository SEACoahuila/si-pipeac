'use client';

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { configStore } from '@/app/store/generalStore';
import { Title } from './title';

interface Prioridad {
  numero_prioridad: string;
  total_lineas: number;
  lineas_cumplidas: number;
  porcentaje_avance: string;
}

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

const GeneralBarPrioridades: React.FC = () => {
  const baseApi = configStore((state) => state.baseApi);
  const token = configStore((state) => state.token);
  const trimestre = configStore((state) => state.trimestre);
  const [data, setData] = useState<Prioridad[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Columnas de la tabla
  const columns: TableColumn[] = [
    { key: 'numero_prioridad', label: 'Prioridades', sortable: true, align: 'left' },
    { key: 'porcentaje_avance', label: 'Avance', sortable: true, align: 'center' },
    { key: 'total_lineas', label: 'Total líneas', sortable: true, align: 'center' },
    { key: 'lineas_cumplidas', label: 'Terminadas', sortable: true, align: 'center' },
    { key: 'por_completar', label: 'Por completar', sortable: true, align: 'center' },
  ];

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
      const transformedData = response.data.map((item: Prioridad) => {
        const porcentaje = parseFloat(item.porcentaje_avance); // Convertir a número
        return {
          ...item,
          porcentaje_avance: isNaN(porcentaje) ? 0 : parseFloat(porcentaje.toFixed(2)), // Manejar casos no numéricos
        };
      });
      console.log('Datos obtenidos:', transformedData);
      setData(transformedData);
      setError(null);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setError('Error al cargar los datos. Verifica tu conexión y vuelve a intentarlo.');
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar datos cuando baseApi, token y trimestre estén listos
  useEffect(() => {
    if (baseApi && token && trimestre) {
      setLoading(true); // Activar el estado de carga
      setData(null); // Limpiar los datos anteriores
      getDataChart(); // Obtener los nuevos datos
    }
  }, [baseApi, token, trimestre]); // Dependencias del useEffect

  // Función para manejar el ordenamiento
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Función para ordenar los datos
  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      if (sortColumn === 'numero_prioridad') {
        return sortDirection === 'asc'
          ? a.numero_prioridad.localeCompare(b.numero_prioridad)
          : b.numero_prioridad.localeCompare(a.numero_prioridad);
      } else if (sortColumn === 'porcentaje_avance') {
        return sortDirection === 'asc'
          ? parseFloat(a.porcentaje_avance) - parseFloat(b.porcentaje_avance)
          : parseFloat(b.porcentaje_avance) - parseFloat(a.porcentaje_avance);
      } else if (sortColumn === 'total_lineas') {
        return sortDirection === 'asc'
          ? a.total_lineas - b.total_lineas
          : b.total_lineas - a.total_lineas;
      } else if (sortColumn === 'lineas_cumplidas') {
        return sortDirection === 'asc'
          ? a.lineas_cumplidas - b.lineas_cumplidas
          : b.lineas_cumplidas - a.lineas_cumplidas;
      } else if (sortColumn === 'por_completar') {
        const porCompletarA = a.total_lineas - a.lineas_cumplidas;
        const porCompletarB = b.total_lineas - b.lineas_cumplidas;
        return sortDirection === 'asc'
          ? porCompletarA - porCompletarB
          : porCompletarB - porCompletarA;
      }
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  // Función para descargar los datos en formato CSV
  const descargarDatos = () => {
    if (!data) return;

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      columns.map((col) => col.label).join(',') +
      '\n' +
      data
        .map((item) =>
          columns
            .map((col) => {
              if (col.key === 'por_completar') {
                return item.total_lineas - item.lineas_cumplidas;
              }
              return item[col.key as keyof Prioridad];
            })
            .join(',')
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'avance_prioridades.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <Title title="Avance por prioridad" />

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
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-${column.align} ${
                  column.sortable ? 'cursor-pointer' : ''
                }`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                {column.label}
                {column.sortable && sortColumn === column.key && (
                  <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item) => (
              <tr
                key={item.numero_prioridad}
                className="border-b border-slate-600 hover:bg-slate-300 transition-colors text-black"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 text-${column.align}`}
                  >
                    {column.key === 'por_completar'
                      ? item.total_lineas - item.lineas_cumplidas
                      : item[column.key as keyof Prioridad]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-3 text-center text-sm text-black">
                No hay datos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralBarPrioridades;
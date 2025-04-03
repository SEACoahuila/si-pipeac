'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { configStore } from '@/app/store/generalStore';
import { CardVariables } from '../components/cardVariables';
import { Title } from '../components/title';

interface Entidad {
  nombre_entidad: string;
  prioridades: {
    numero_prioridad: string;
    porcentaje_avance: number;
  }[];
}

interface Institucion {
  name: string;
  variables: { name: string; progress: number }[];
}

export default function InstitucionesPage() {
  const baseApi = configStore((state) => state.baseApi);
  const token = configStore((state) => state.token);
  const trimestre = configStore((state) => state.trimestre);
  // const trimestre = "general"
  const [instituciones, setInstituciones] = useState<Institucion[]>([]);
  const [filteredInstituciones, setFilteredInstituciones] = useState<Institucion[]>([]); // Instituciones filtradas
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Query de búsqueda

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
      const transformedData = transformarDatos(response.data);
      setInstituciones(transformedData);
      setFilteredInstituciones(transformedData); // Inicialmente mostrar todos los datos
      setError(null);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setError('Error al cargar los datos. Verifica tu conexión y vuelve a intentarlo.');
    } finally {
      setLoading(false);
    }
  };

  // Función para transformar los datos
  const transformarDatos = (data: Entidad[]): Institucion[] => {
    return data.map((entidad) => ({
      name: entidad.nombre_entidad,
      variables: entidad.prioridades
        .sort((a, b) => parseInt(a.numero_prioridad) - parseInt(b.numero_prioridad)) // Ordenar por número de prioridad
        .map((prioridad) => ({
          name: `Prioridad ${prioridad.numero_prioridad}`,
          progress: prioridad.porcentaje_avance,
        })),
    }));
  };

  // Función para filtrar instituciones por nombre
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = instituciones.filter((institucion) =>
      institucion.name.toLowerCase().includes(query)
    );

    setFilteredInstituciones(filtered);
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
    <div>
      <Title
        title="Instituciones"
        text="Detalles de avance"
      />

      <div className="p-5 text-center text-2xl font-bold">
        <p>Buscador</p>
        <input
          type="text"
          placeholder="Buscar institución..."
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4 p-2 border rounded-md"
        />
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4">
          {filteredInstituciones.map((institucion, index) => (
            <div key={index} className="p-6">
              <CardVariables
                name={institucion.name}
                variables={institucion.variables}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
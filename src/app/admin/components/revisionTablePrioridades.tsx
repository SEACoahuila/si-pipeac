'use client';
import { configStore } from '@/app/store/generalStore';
import axios from 'axios';
import React, { useState } from 'react';

interface Cumplimiento {
    id_cumplimiento: string;
    trimestre: number;
    year: number;
    revisado_sea: boolean;
    cumplido: boolean;
    fecha_cumplimiento: string; // o Date si lo conviertes
    usuario_creador: string;
    descripcion: string;
    url_pruebas: string;
    id_entidad: Entidad;
    id_prioridad: Prioridad;
}

interface Entidad {
  id_entidad: string;
  nombre_entidad: string;
  siglas: string;
}

export interface Prioridad {
  id_prioridad: string;
  numero_la: string;
  numero_prioridad: string;
  prioridad: string;
  objetivo: string;
  estrategia: string;
  linea_de_accion: string;
  accion_a_realizar: string;
  evidencia_necesaria: string;
}

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

const RevisionTable: React.FC = () => {
const baseApi = configStore((state) => state.baseApi);
const token = configStore((state) => state.token);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<Cumplimiento[] | []>([]);
 
  const columns: TableColumn[] = [
    { key: 'fecha_cumplimiento', label: 'Fecha', sortable: true, align: 'left' },
    { key: 'id_prioridad', label: 'Prioridad', sortable: true, align: 'center' },
    { key: 'id_entidad', label: 'Entidad', sortable: true, align: 'center' },
    { key: 'descripcion', label: 'Descripcion', sortable: true, align: 'center' },
    { key: 'usuario_creador', label: 'Usuario', sortable: true, align: 'center' },
    { key: 'url_pruebas', label: 'Pruebas', sortable: true, align: 'center' },
    // { key: 'por_completar', label: 'Por completar', sortable: true, align: 'center' },
  ];

const getData = async () => {
      if (!token) {
      setError('Error: No hay un token disponible.');
      setLoading(false);
      return;
    }

  try {
   const response = await axios.get(`${baseApi}/data/avance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
 
    const filteredData = response.data.filter((item: Cumplimiento) => {
        return item.revisado_sea === false;
      } );
    const datechange = filteredData.map((item: Cumplimiento) => {
      const fechaFormateada = new Date( item.fecha_cumplimiento).toLocaleString("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      });
      return { ...item, fecha_cumplimiento: fechaFormateada };
    } );
    setData(datechange);
    setLoading(false); // Desactivar el estado de carga
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

const handleRevision = async (id: string) => { 
  
   try {
    await axios.patch(
      `${baseApi}/data/cumplimiento/${id}`,
      {}, // body vacío si no necesitas enviar datos
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getData()
  } catch (error) {
    console.error("Error al hacer la petición:", error);
  }
}


    // Llamar a la función para obtener datos al cargar el componente
    React.useEffect(() => {

        if (baseApi && token) {
        setLoading(true); // Activar el estado de carga
        setData([]); // Limpiar los datos anteriores
        getData();
        }
      
    }, [baseApi, token]);

  // Función para manejar el ordenamiento



 if (loading) {
    return <div>Cargando...</div>;
  }
    if (error) {
        return <div>Error: {error}</div>;
    }
  return (
    <div className="p-4">
       

            {/* Tabla de datos */}
      <table className="min-w-full table-auto border border-slate-600  rounded-lg shadow-lg">
        <thead>
          <tr className="bg-slate-800 text-white ">
            {columns.map((column) => (
                
              <th
                key={column.key}
                className={`px-4 py-3 text-${column.align} `}
              >
                {column.label}
               
              </th>
          
            ))}
             <th className="px-4 py-3 text-center">
                Revisar
            </th>
          </tr>
           
        </thead>
       
        <tbody>
          {data!.length > 0 ? (
            data!.map((item) => (
              <tr
                key={item.id_cumplimiento}
                className="border-b border-slate-600 hover:bg-slate-300  transition-colors text-black"
              >
                {columns.map((column) => (
                    <td key={column.key} className={`px-4 py-3 text-${column.align} text-xs`}>
                        {column.label === 'Pruebas' ? (
                        <a href={item[column.key as keyof Cumplimiento] as string} target='_blank' >
                            <button className="px-4 py-2 bg-slate-600 rounded-3xl text-xs text-white hover:bg-blue-800 ">
                            Ver pruebas
                            </button>
                        </a>
                        ) : column.key === 'id_entidad' ? (
                        (item[column.key] as Entidad).nombre_entidad // o cualquier otro campo
                        ) :  column.key === 'id_prioridad' ? (
                        (item[column.key] as Prioridad).id_prioridad // o cualquier otro campo
                        ) : (
                        item[column.key as keyof Cumplimiento] as React.ReactNode
                        )}
                    </td>
                    ))}
                <td className="px-4 py-3 text-center">
                    <button className="px-4 py-2 bg-pink-600 rounded-3xl text-xs text-white hover:bg-blue-800"
                    onClick={() => handleRevision(item.id_cumplimiento) }
                    >
                        Aceptar revisión
                    </button>
                </td>
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

export default RevisionTable;


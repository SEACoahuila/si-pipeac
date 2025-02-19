'use client';
import { configStore } from '@/app/store/generalStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { TbTableDown } from 'react-icons/tb';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Íconos para activo/inactivo

const title = 'Mis Usuarios';

interface User {
  id_usuario: string;
  nombre: string;
  correo: string;
  password: string;
  isActive: boolean;
  entidad: Entidad;

 }
interface Entidad {
  
    id_entidad: string;
    nombre_entidad: string;
    siglas: string;
  
}
// Convertir objetos a CSV (excluyendo el campo "password")
// Convertir objetos a CSV (excluyendo el campo "password")
function convertArrayOfObjectsToCSV(array: User[]) {
  const columnDelimiter = ',';
  const lineDelimiter = '\n';

  // Transformar los datos para aplanar objetos anidados
  const transformedData = array.map((item: User) => ({
    ...item,
    entidad: item.entidad.nombre_entidad, // Extraer solo el nombre de la entidad
  }));

  const keys = Object.keys(transformedData[0]).filter((key) => key !== 'password'); // Excluir "password"

  let result = '';
  result += keys.join(columnDelimiter); // Añadir las claves como cabecera
  result += lineDelimiter;

  transformedData.forEach((item) => {
    keys.forEach((key, index) => {
      if (index > 0) result += columnDelimiter;
      result += `"${item[key]}"`; // Escapar valores con comillas para manejar comas y saltos de línea
    });
    result += lineDelimiter;
  });

  return result;
}

// Función para descargar CSV
function downloadCSV(array: object[]) {
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = 'data_export.csv';

  // Agregar BOM (Byte Order Mark) para forzar UTF-8
  const BOM = '\uFEFF';
  csv = BOM + csv;

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
  }

  link.setAttribute('href', csv);
  link.setAttribute('download', filename);
  link.click();
}
// Botón personalizado para exportar
const ExportButton = ({ onExport }: { onExport: () => void }) => (
  <button
    onClick={onExport}
    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-3xl hover:bg-blue-800 text-sm"
  >
    <TbTableDown className="mr-2" size={20} />
    Exportar a CSV
  </button>
);

// Configuración de columnas
const columnConfig = [
  { name: 'Nombre', key: 'nombre' },
  { name: 'Correo', key: 'correo' },
  { name: 'Entidad', key: 'entidad.nombre_entidad' },
  { name: 'Activo', key: 'isActive' },
];

// Crear columnas dinámicamente
// Configuración de columnas

// Crear columnas dinámicamente
const columns = columnConfig.map((col) => {
  if (col.key === 'isActive') {
    return {
      name: col.name,
      cell: (row: User) => (
        <div className="flex items-center">
          {row.isActive ? (
            <FaCheckCircle className="text-green-500" size={20} />
          ) : (
            <FaTimesCircle className="text-red-500" size={20} />
          )}
          <span className="ml-2">
            {row.isActive ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      ),
      sortable: true,
    };
  } else if (col.key === 'entidad.nombre_entidad') {
    return {
      name: col.name,
      selector: (row: User) => row.entidad.nombre_entidad, // Acceder a entidad.siglas
      sortable: true,
    };
  }
  return {
    name: col.name,
    selector: (row: any) => row[col.key],
    sortable: true,
  };
});
export const Datatable = () => {
  const baseApi = configStore((state) => state.baseApi);
  const token = configStore((state) => state.token);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  const getUsers = async () => {
    try {
      const response = await axios.get(`${baseApi}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Error al cargar los usuarios.');
        console.log(error.response?.data?.message);
      } else {
        setError('Ocurrió un error inesperado.');
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const actionsMemo = React.useMemo(
    () => <ExportButton onExport={() => downloadCSV(users)} />,
    [users]
  );

  return (
    <div className="p-5">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <DataTable
        title={title}
        columns={columns}
        data={users}
        actions={actionsMemo} // Acciones personalizadas
        pagination
      />
    </div>
  );
};
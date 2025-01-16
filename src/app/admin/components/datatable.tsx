'use client'
import React from 'react'
import DataTable from "react-data-table-component";
import { TbTableDown } from 'react-icons/tb';

const title = "Mis Usuarios"

const data = [
    { id: 1, nombre: 'Gerardo Arriaga Fdz', director: 'Christopher Nolan', year: 2010, x: 0},
    { id: 2, nombre: 'Isela Rdz', director: 'Christopher Nolan', year: 2014, x: 0 },
    { id: 3, nombre: 'Laura Daniela Espinoza', director: 'Bong Joon-ho', year: 2019, x: 0},
    { id: 4, nombre: 'Fernando de la Fe Ojuela', director: 'Christopher Nolan', year: 2008, x: 0},
    { id: 5, nombre: 'Gerardo Arriaga Fdz', director: 'Christopher Nolan', year: 2010, x: 0},
    { id: 6, nombre: 'Isela Rdz', director: 'Christopher Nolan', year: 2014, x: 0 },
    { id: 7, nombre: 'Laura Daniela Espinoza', director: 'Bong Joon-ho', year: 2019, x: 0},
    { id: 8, nombre: 'Fernando de la Fe Ojuela', director: 'Christopher Nolan', year: 2008, x: 0},
    { id: 9, nombre: 'Gerardo Arriaga Fdz', director: 'Christopher Nolan', year: 2010, x: 0},
    { id: 10, nombre: 'Isela Rdz', director: 'Christopher Nolan', year: 2014, x: 0 },
    { id: 31, nombre: 'Laura Daniela Espinoza', director: 'Bong Joon-ho', year: 2019, x: 0},
    { id: 41, nombre: 'Fernando de la Fe Ojuela', director: 'Christopher Nolan', year: 2008, x: 0},
    { id: 11, nombre: 'Gerardo Arriaga Fdz', director: 'Christopher Nolan', year: 2010, x: 0},
    { id: 21, nombre: 'Isela Rdz', director: 'Christopher Nolan', year: 2014, x: 0 },
    { id: 31, nombre: 'Laura Daniela Espinoza', director: 'Bong Joon-ho', year: 2019, x: 0},
    { id: 42, nombre: 'Fernando de la Fe Ojuela', director: 'Christopher Nolan', year: 2008, x: 0},
  ];
  const columnConfig = [
    { name: 'Nombre', key: 'nombre' },
    { name: 'Director', key: 'director' },
    { name: 'Year', key: 'year' },
    { name: 'Avance', key: 'x' },
  ];
// Convertir objetos a CSV
function convertArrayOfObjectsToCSV(array : object[]) {
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]); // Extraer las claves del primer objeto
  
    let result = '';
    result += keys.join(columnDelimiter); // Añadir las claves como cabecera
    result += lineDelimiter;
  
    array.forEach(item => {
      keys.forEach((key, index) => {
        if (index > 0) result += columnDelimiter;
        result += item[key];
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
  
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
  
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }
  
  // Botón personalizado para exportar
  const ExportButton = ({ onExport }) => (
    <button
      onClick={onExport}
      className=" flex items-center bg-blue-600 text-white px-4 py-2 rounded-3xl hover:bg-blue-800 text-sm"
    >
      <TbTableDown  className='mr-2' size={20}/>
      Exportar a CSV
    </button>
  );
  

  
  // Crear columnas dinámicamente
  const columns = columnConfig.map(col => ({
    name: col.name,
    selector: row => row[col.key],
    sortable: true,
  }));


export const Datatable = () => {
    const actionsMemo = React.useMemo(
        () => <ExportButton onExport={() => downloadCSV(data)} />,
        []
      );
  return (
    <div className='p-5'>
   
    <DataTable
      title={title}
      columns={columns}
      data={data}
      actions={actionsMemo} // Acciones personalizadas
      pagination
    />
  </div>
  )
}

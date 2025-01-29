import Link from 'next/link';
import React from 'react';

interface Progress {
  id: number;
  projectName: string;
  lineNumber: number; // Número de la Prioridad Estratégica
  progress: number;   // Porcentaje de avance (de 0 a 100)
  totalLines: number; // Total de líneas en el proyecto (entre 3 y 6)
  completedLines: number; // Líneas terminadas
  remainingLines: number; // Líneas restantes
}

const progressData = [
  {
    id: 1,
    projectName: 'Prioridad Estratégica 1',
    lineNumber: 1,
    progress: 65,
    totalLines: 5,
    completedLines: 3,
    remainingLines: 2,
  },
  {
    id: 2,
    projectName: 'Prioridad Estratégica 2',
    lineNumber: 2,
    progress: 30,
    totalLines: 6,
    completedLines: 2,
    remainingLines: 4,
  },
  {
    id: 3,
    projectName: 'Prioridad Estratégica 3',
    lineNumber: 3,
    progress: 80,
    totalLines: 4,
    completedLines: 3,
    remainingLines: 1,
  },
  {
    id: 4,
    projectName: 'Prioridad Estratégica 4',
    lineNumber: 4,
    progress: 45,
    totalLines: 5,
    completedLines: 2,
    remainingLines: 3,
  },
  {
    id: 5,
    projectName: 'Prioridad Estratégica 5',
    lineNumber: 5,
    progress: 20,
    totalLines: 3,
    completedLines: 1,
    remainingLines: 2,
  },
  {
    id: 6,
    projectName: 'Prioridad Estratégica 6',
    lineNumber: 6,
    progress: 75,
    totalLines: 6,
    completedLines: 5,
    remainingLines: 1,
  },
  {
    id: 7,
    projectName: 'Prioridad Estratégica 7',
    lineNumber: 7,
    progress: 55,
    totalLines: 5,
    completedLines: 3,
    remainingLines: 2,
  },
  {
    id: 8,
    projectName: 'Prioridad Estratégica 8',
    lineNumber: 8,
    progress: 90,
    totalLines: 6,
    completedLines: 5,
    remainingLines: 1,
  },
  {
    id: 9,
    projectName: 'Prioridad Estratégica 9',
    lineNumber: 9,
    progress: 50,
    totalLines: 4,
    completedLines: 2,
    remainingLines: 2,
  },
  {
    id: 10,
    projectName: 'Prioridad Estratégica 10',
    lineNumber: 10,
    progress: 10,
    totalLines: 6,
    completedLines: 1,
    remainingLines: 5,
  },
  {
    id: 11,
    projectName: 'Prioridad Estratégica 11',
    lineNumber: 11,
    progress: 40,
    totalLines: 3,
    completedLines: 1,
    remainingLines: 2,
  },
  {
    id: 12,
    projectName: 'Prioridad Estratégica 12',
    lineNumber: 12,
    progress: 60,
    totalLines: 5,
    completedLines: 3,
    remainingLines: 2,
  },
  {
    id: 13,
    projectName: 'Prioridad Estratégica 13',
    lineNumber: 13,
    progress: 70,
    totalLines: 4,
    completedLines: 3,
    remainingLines: 1,
  },
  {
    id: 14,
    projectName: 'Prioridad Estratégica 14',
    lineNumber: 14,
    progress: 85,
    totalLines: 5,
    completedLines: 4,
    remainingLines: 1,
  },
  {
    id: 15,
    projectName: 'Prioridad Estratégica 15',
    lineNumber: 15,
    progress: 95,
    totalLines: 6,
    completedLines: 5,
    remainingLines: 1,
  },
];

export const ProgressTable: React.FC = () => {
  return (
    <div className="p-6 justify-center overflow-x-auto">
      <table className="min-w-full table-auto border sm:table-auto sm:w-full">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="px-4 py-2 text-center">Prioridades</th>
            <th className="px-4 py-2 text-center">N° P.E.</th>
            <th className="px-4 py-2 text-center">Avance</th>
            <th className="px-4 py-2 text-center">Total líneas</th>
            <th className="px-4 py-2 text-center">Terminadas</th>
            <th className="px-4 py-2 text-center">Por completar</th>
            <th className="px-4 py-2 text-center">Revisar</th>
          </tr>
        </thead>
        <tbody>
          {progressData.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.projectName}</td>
              <td className="px-4 py-2 text-center">{item.lineNumber}</td>
              <td className="px-4 py-2 ">
                <div className='flex items-center justify-center '>
                <span className="font-semibold text-sm">{item.progress}%</span>
                  <div className="flex w-full bg-gray-200 rounded-full h-2.5 ">
                 
                    <div
                      className="bg-cyan-700 h-2.5 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 text-center">{item.totalLines}</td>
              <td className="px-4 py-2 text-center">{item.completedLines}</td>
              <td className="px-4 py-2 text-center">{item.remainingLines}</td>
              <td className="px-4 py-2 text-center">
                <Link href={`/si/${item.id}`} >
                <button className="px-4 py-1 bg-slate-700 text-white rounded-3xl hover:bg-slate-600 text-sm">
                 {/* Líneas de Acción PE# {item.lineNumber} */}
                 Líneas de Acción
                </button>
                </Link> 
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

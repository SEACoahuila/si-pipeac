import { Prioridad } from '@/app/interfaces/prioridades';
import Link from 'next/link';
import React from 'react';
import { FaBullseye, FaListAlt } from 'react-icons/fa';

interface ProgressTableProps {
  datos: Prioridad[]; // Aquí usamos la interfaz Prioridad que definimos anteriormente
}export const ProgressTable = ({datos} : ProgressTableProps) => {
  
  return (
    <div className="p-4 justify-center overflow-x-auto">
  <table className="min-w-full table-auto border border-slate-600 rounded-lg shadow-lg">
    <thead>
      <tr className="bg-slate-800 text-white">
        <th className="px-4 py-3 text-left">Prioridades</th>
        <th className="px-4 py-3 text-center">Avance</th>
        <th className="px-4 py-3 text-center">Total líneas</th>
        <th className="px-4 py-3 text-center">Terminadas</th>
        <th className="px-4 py-3 text-center">Por completar</th>
        <th className="px-4 py-3 text-center">Revisar</th>
      </tr>
    </thead>
    <tbody>
      {datos.map((item) => (
        <tr key={item.numero_prioridad} className="border-b border-slate-600 hover:bg-slate-300 transition-colors text-black">
          <td className="px-4 py-3 flex items-center">
            {item.datos.progress === 100 ? (
              <FaBullseye size={20} className="mr-3 text-green-500" /> // Ícono para tareas completadas
            ) : (
              <FaListAlt size={20} className="mr-3 text-amber-500" /> // Ícono para tareas en progreso
            )}
            <span className="text-sm">{"Prioridad Estratégica N° " + item.datos.lineNumber}</span>
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center justify-center">
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-cyan-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${item.datos.progress}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-semibold">{item.datos.progress}%</span>
            </div>
          </td>
          <td className="px-4 py-3 text-center text-sm">{item.datos.totalLines}</td>
          <td className="px-4 py-3 text-center text-sm">{item.datos.completedLines}</td>
          <td className="px-4 py-3 text-center text-sm">{item.datos.remainingLines}</td>
          <td className="px-4 py-3 text-center">
            <Link href={`/si/${item.numero_prioridad}`}>
              <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm">
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

import React from 'react'


interface Progress {
  id: number;
  projectName: string;
  progress: number;  // Porcentaje de avance (de 0 a 100)
}

const progressData: Progress[] = [
  { id: 1, projectName: 'Prioridad Estratégica 1', progress: 65 },
  { id: 2, projectName: 'Prioridad Estratégica 2', progress: 30 },
  { id: 3, projectName: 'Prioridad Estratégica 3', progress: 80 },
  { id: 4, projectName: 'Prioridad Estratégica 4', progress: 45 },
  { id: 5, projectName: 'Prioridad Estratégica 5', progress: 45 },
  { id: 6, projectName: 'Prioridad Estratégica 6', progress: 45 },
  { id: 7, projectName: 'Prioridad Estratégica 7', progress: 45 },
  { id: 8, projectName: 'Prioridad Estratégica 8', progress: 45 },
  { id: 9, projectName: 'Prioridad Estratégica 9', progress: 45 },
  { id: 10, projectName: 'Prioridad Estratégica 10', progress: 45 },
  { id: 11, projectName: 'Prioridad Estratégica 11', progress: 45 },
  { id: 12, projectName: 'Prioridad Estratégica 12', progress: 45 },
  { id: 13, projectName: 'Prioridad Estratégica 13', progress: 45 },
  { id: 14, projectName: 'Prioridad Estratégica 14', progress: 45 },
  { id: 15, projectName: 'Prioridad Estratégica 15', progress: 45 },
  { id: 16, projectName: 'Prioridad Estratégica 16', progress: 45 },
  { id: 17, projectName: 'Prioridad Estratégica 17', progress: 45 },
  { id: 18, projectName: 'Prioridad Estratégica 18', progress: 45 },
  { id: 19, projectName: 'Prioridad Estratégica 19', progress: 45 },
  { id: 20, projectName: 'Prioridad Estratégica 20', progress: 45 },
  { id: 21, projectName: 'Prioridad Estratégica 21', progress: 45 },
  { id: 22, projectName: 'Prioridad Estratégica 22', progress: 45 },
  { id: 23, projectName: 'Prioridad Estratégica 23', progress: 45 },
  { id: 23, projectName: 'Prioridad Estratégica 24', progress: 45 },
  { id: 25, projectName: 'Prioridad Estratégica 25', progress: 45 },
  { id: 26, projectName: 'Prioridad Estratégica 26', progress: 45 },
  { id: 27, projectName: 'Prioridad Estratégica 27', progress: 45 },
  { id: 28, projectName: 'Prioridad Estratégica 28', progress: 45 },
  { id: 29, projectName: 'Prioridad Estratégica 29', progress: 45 },
  { id: 30, projectName: 'Prioridad Estratégica 30', progress: 45 },
  { id: 31, projectName: 'Prioridad Estratégica 31', progress: 45 },
  { id: 32, projectName: 'Prioridad Estratégica 32', progress: 45 },
  { id: 33, projectName: 'Prioridad Estratégica 33', progress: 45 },
  { id: 34, projectName: 'Prioridad Estratégica 34', progress: 45 },
  { id: 35, projectName: 'Prioridad Estratégica 35', progress: 45 },
];

const ProgressTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Proyecto</th>
            <th className="px-4 py-2 text-left">Avance</th>
            <th className="px-4 py-2 text-left">Líneas de Acción</th>
          </tr>
        </thead>
        <tbody>
          {progressData.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.projectName}</td>
              <td className="px-4 py-2">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm">{item.progress}%</span>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">{item.progress}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressTable;

import React from 'react'
import { GiDeathStar } from 'react-icons/gi';


interface Props {
    name: string;
    variables: { name: string; progress: number }[];
}

export const CardVariables = ({ name, variables  }: Props)  => {
    const getOverallProgress = (variables: { name: string; progress: number }[]) => {
        const total = variables.reduce((sum, v) => sum + v.progress, 0);
        return Math.round(total / variables.length);
      };
  return (
    <>
    <div className="max-w-md p-6 bg-slate-100 border  border-gray-200 rounded-lg shadow-md">
   
      <h3 className="flex mb-4 text-xl font-bold text-gray-800 items-center"> <GiDeathStar size={55} className='mr-3' color='gray'/> {name}</h3>
      <div className="mb-4">
    

        <p className="text-lg text-left text-gray-600 font-semibold">Avance general:</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        

          <div
            className="dark:bg-cyan-700 h-4 rounded-full"
            style={{ width: `${getOverallProgress(variables)}%` }}
          ></div>
        </div>
        <p className=" flex text-xl font-bold text-gray-700 items-center">
          {getOverallProgress(variables)}% Completo
        </p>
      </div>
      <div className="">
        {variables.map((variable, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">{variable.name}</span>
              
              <span className="text-sm text-gray-700">{variable.progress}% </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="dark:bg-green-600 h-2 rounded-full"
                style={{ width: `${variable.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    </>
  )
}

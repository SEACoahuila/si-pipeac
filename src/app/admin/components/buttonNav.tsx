'use client'
import React, { useState } from 'react'
import { FaChartPie, FaUserCircle } from 'react-icons/fa';
import { TbBuildingPlus } from 'react-icons/tb';

import Link from 'next/link'

export const ButtonNav = () => {


    const [currentTrimester, setCurrentTrimester] = useState<string>("1");
    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTrimester = event.target.value;
        setCurrentTrimester(selectedTrimester);
    
        // Función para llamar a la API
        // await fetch("/api/update-trimester", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ trimester: selectedTrimester }),
        // });
        console.log(selectedTrimester)
        // console.log(`Trimestre cambiado a: ${selectedTrimester}`);
      };
    
  return (
    <>

    <div className="flex w-full  rounded shadow">
    <Link href="/admin" aria-current="false"
 className="w-full flex items-center gap-x-2 justify-center font-medium rounded-r px-5 py-2 border bg-white text-gray-800 border-gray-200 hover:bg-gray-100">
      <FaChartPie size={25} color='#E91E63'/>  Avance general
    </Link>

    <Link href="/admin/usuarios" aria-current="page"
 className="w-full flex items-center gap-x-2 justify-center font-medium rounded-r px-5 py-2 border bg-white text-gray-800 border-gray-200 hover:bg-gray-100">      
 <FaUserCircle  size={25} color='teal'/> 
   Usuarios
    </Link>

    <Link href="/admin/instituciones" aria-current="false"
        className="w-full flex items-center gap-x-2 justify-center font-medium rounded-r px-5 py-2 border bg-white text-gray-800 border-gray-200 hover:bg-gray-100">
       <TbBuildingPlus size={25} color='#0c6cad'/>
       Instituciones

    </Link>
    
    <select
      id="trimestres"
      className=" items-center text-left  justify-center font-medium  px-5 py-2  bg-slate-800  hover:bg-slate-700 text-white"
      value={currentTrimester}
      onChange={handleChange}
    >
      <option value="1">{`Primer Trimestre ${new Date().getFullYear()}`}</option>
      <option value="2">{`Segundo Trimestre ${new Date().getFullYear()}`}</option>
      <option value="3">{`Tercer Trimestre ${new Date().getFullYear()}`}</option>
      <option value="4">{`Cuarto Trimestre ${new Date().getFullYear()}`}</option>
    </select>

</div>
    </>
  )
}
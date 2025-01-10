
'use client'


import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";


interface Props {
  
    data: {titulo: {
        nombre: string;
        descripcion: string;
    };
    datos: {
        title: string;
        content: string;
    }[];}

}
export default function LineaAccion({data}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };



  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-gray-800 rounded-3xl">
      <div className="p-4"> <FaExclamationCircle size={45} color="orange"/></div>
    {/* <div className="p-4"> <FaCheckCircle size={45} color="green"/></div>  */}
  <div className=" p-8 rounded-lg shadow-2xl md:w-2/3 w-full">
    {/* Título */}   
    <header className="border-b border-gray-700 pb-3">
      <h3 className="text-xl font-bold text-white mb-2">{data.titulo.nombre}</h3>
      <p className="text-sm text-cyan-500 leading-relaxed">{data.titulo.descripcion}</p>
    </header>

    {/* Prioridades y Objetivos */}
    <section className="mt-3 space-y-3">
      {data.datos.map((item, index) => (
        <div key={index} className="bg-gray-700 p-2 rounded-lg shadow-md">
          <h4 className="text-md font-semibold text-amber-400">{item.title}</h4>
          <p className="text-sm text-gray-300 mt-1 leading-relaxed">{item.content}</p>
        </div>
      ))}
    </section>
  </div>

  {/* Columna derecha */}
  <div className="bg-gray-800 p-5 rounded-lg  md:w-1/3 w-full mt-6 md:mt-0 md:ml-6 ">
    {/* Descripción */}
    <section className="mt-4">
      <h4 className="text-lg font-semibold text-white">Descripción</h4>
      <textarea
        className="mt-2 w-full bg-slate-100 text-gray-500 p-4 rounded-lg border border-gray-600 focus:ring-2 focus:ring-amber-500 focus:outline-none"
        rows={4}
        placeholder="Escriba aquí la descripción de la evidencia que entregará."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </section>

    {/* Evidencia */}
    <section>
      <h4 className="text-lg font-semibold text-white">Evidencia a Entregar</h4>
      <p className="text-sm text-gray-400 mt-2">
        Por favor, entregue documentos en formato PDF. Tamaño máximo permitido: 10MB por archivo.
      </p>
      <div
        className="mt-4 p-6 border-dashed border-2 border-gray-600 rounded-lg bg-gray-700 text-gray-400 text-center hover:bg-gray-600 transition"
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="mb-2">Arrastre y suelte los archivos aquí o haga clic para seleccionar.</p>
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="cursor-pointer text-indigo-400 hover:underline">
          Seleccionar Archivos
        </label>
      </div>
      <ul className="mt-4 space-y-2">
        {files.map((file, index) => (
          <li
            key={index}
            className="text-sm text-gray-300 truncate bg-gray-700 px-3 py-1 rounded-md"
          >
            {file.name}
          </li>
        ))}
      </ul>
    </section>
      {/* Botón de Enviar */}
      <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-lg shadow-lg transition size-full">
            Enviar Evidencia
          </button>
        </div>
  </div>
</div>
  );
}

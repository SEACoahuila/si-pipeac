"use client";

import { Linea } from "@/app/interfaces/prioridades";
import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { uploadFileToFirebase } from "@/app/firestore/uploadFile"; // Asegúrate de que esta ruta sea correcta
import { configStore } from "@/app/store/generalStore";
import { TbFolderCheck } from "react-icons/tb";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


interface Props {
  linea: Linea;
}

export default function LineaAccion({ linea }: Props) {
  const user = configStore((state) => state.user);
  const trimestre = configStore((state) => state.trimestre);
  let completado = true;
  if (linea.cumplimientos.length > 0) {
    completado = false;
  }

  const datos = [
    { title: "Prioridad", content: linea.prioridad },
    { title: "Objetivo", content: linea.objetivo },
    { title: "Estrategia", content: linea.estrategia },
    { title: "Acción a Realizar", content: linea.accion_a_realizar },
    { title: "Evidencia a entregar", content: linea.evidencia_necesaria },
  ];
  const year = new Date().getFullYear()
  const entity = user?.entidad.nombre_entidad
  const folderPath = `${entity}/${year}/${trimestre}/${linea.id_prioridad}`;
  const baseApi = configStore((state) => state.baseApi);
  const token = configStore((state) => state.token);
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async () => {
    if (files.length === 0 || description.trim() === "") {
      alert("Por favor, selecciona al menos un archivo y manda una descripcion del mismo.");
      return;
    }

    setIsLoading(true);

    try {
      // Sube el primer archivo (puedes modificarlo para subir múltiples archivos)
      const fileUrl = await uploadFileToFirebase(files[0], folderPath);

      if (!fileUrl) {
        throw new Error("Error al subir el archivo.");
      }


      // Aquí puedes enviar la URL a tu API o hacer lo que necesites con ella
      

      // >4 Envio de informacion a API
      if (fileUrl) {

        const response = await axios.post(`${baseApi}/data`,
          {
            "id_entidad": user?.entidad.id_entidad,
            "id_prioridad": linea.id_prioridad,
            "trimestre": +trimestre,
            "url_pruebas": fileUrl,
            "descripcion": description
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
   
      }
      toast.success(`Se genero correctamente el registro con la prioridad id ${linea.id_prioridad} y el archivo se subio correctamente`, {
            position: 'top-right',
            autoClose: 3000, // Cerrar después de 3 segundos
          });
          setTimeout(() => {
            window.location.reload()
          }, 2000);
      

    } catch (error) {
      console.error( error);
      alert("Error al subir el archivo.");
    } finally {
      setIsLoading(false);
     
    }
  };

  return (
    
    <div className="flex flex-col md:flex-row justify-center items-center bg-gray-800 rounded-xl p-4 space-y-4 md:space-y-0 md:space-x-4">
      <ToastContainer />
      {/* Ícono de estado (completado o no) */}
      {completado ? (
        <div className="p-2">
          <FaExclamationCircle size={35} color="orange" />
        </div>
      ) : (
        <div className="p-2">
          <FaCheckCircle size={35} color="green" />
        </div>
      )}

      {/* Contenido principal */}
      <div className="p-4 rounded-lg bg-gray-700 shadow-md md:w-2/3 w-full">
        <header className="border-b border-gray-600 pb-2">
          <h3 className="text-lg font-bold text-white">{"Línea de Acción " + linea.id_prioridad}</h3>
          <p className="text-sm text-cyan-400 mt-1">{linea.linea_de_accion}</p>
        </header>

        {/* Prioridades y Objetivos */}
        <section className="mt-3 space-y-2">
          {datos.map((item, index) => (
            <div key={index} className="bg-gray-600 p-2 rounded-md">
              <h4 className="text-sm font-semibold text-amber-300">{item.title}</h4>
              <p className="text-xs text-gray-200 mt-1">{item.content}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Columna derecha (Descripción y Evidencia) */}
     { completado ? <div className="bg-gray-700 p-4 rounded-lg md:w-1/3 w-full">
        <section className="mt-2">
          <h4 className="text-md font-semibold text-white">Descripción</h4>
          <textarea
            className="mt-1 w-full bg-gray-600 text-gray-200 p-2 rounded-md border border-gray-500 focus:ring-1 focus:ring-amber-400 focus:outline-none"
            rows={3}
            placeholder="Escriba aquí la descripción de la evidencia que entregará."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </section>

        <section className="mt-4">
          <h4 className="text-md font-semibold text-white">Evidencia a Entregar</h4>
          <p className="text-xs text-gray-300 mt-1">
            Por favor, entregue documentos en formato PDF o imagen. Tamaño máximo permitido: 10MB por archivo.
          </p>
          <div
            className="mt-2 p-4 border-dashed border-2 border-gray-500 rounded-md bg-gray-600 text-gray-300 text-center hover:bg-gray-500 transition"
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <p className="text-sm">Arrastre y suelte los archivos aquí o haga clic para seleccionar.</p>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id={`file-input-${linea.id_prioridad}`} // Usa un ID único para cada input
            />
            <label
              htmlFor={`file-input-${linea.id_prioridad}`} // Usa un ID único para cada input
              className="cursor-pointer text-indigo-300 hover:underline text-sm"
            >
              Seleccionar Archivos
            </label>
          </div>
          <ul className="mt-2 space-y-1">
            {files.map((file, index) => (
              <li
                key={index}
                className="text-xs text-gray-300 truncate bg-gray-600 px-2 py-1 rounded-md"
              >
                {file.name}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 text-sm font-bold text-white rounded-md shadow-md bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!completado || isLoading}
          >
            {isLoading ? "Subiendo archivo..." : "Enviar Evidencia"}
          </button>
        </div>
      </div> : <div className=" flex bg-gray-700 p-4 rounded-lg md:w-1/3 w-full text-white text-center justify-center">
      <TbFolderCheck  size={25} color="orange" className="mr-2"/> Completado !!!!
      </div>}
    </div>
  );
}


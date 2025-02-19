'use client'
import React, { useEffect, useState } from "react";
import { GoPasskeyFill } from "react-icons/go";
import { configStore } from "../store/generalStore";
import { useRouter } from 'next/navigation'; // Importa useRouter para redireccionar
import axios from "axios";

export const Login = () => {
  const setUser = configStore((state) => state.setUser);
  const baseApi = configStore((state) => state.baseApi);
  const user = configStore((state) => state.user);
  const router = useRouter();
  // Usa useRouter para redireccionar

  const [formData, setFormData] = useState({
    correo: "",
    password: ""
  });

  const [error, setError] = useState(""); // Estado para manejar el mensaje de error

  useEffect(() => {
    if (user?.entidad.nombre_entidad === "SEA") {
      router.push('/admin'); // Redirige si ya hay sesión
    } else if (!user?.entidad) {
      return
    } else if (user.entidad.nombre_entidad !== "SEA") {
      router.push('/si'); // Redirige si ya hay sesión
    }
  }, [user, router]);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: React.FormEvent) => { 
    event.preventDefault();
    setError(""); // Limpia el mensaje de error antes de hacer la solicitud

    try {
      const loginUser = await axios.post(`${baseApi}/auth/login`, {
        "correo": formData.correo,
        "password": formData.password
      });


      // Si el login es exitoso, redirige al usuario
      if (loginUser.data) {
        setUser(loginUser.data, loginUser.data.token); // Guarda los datos del usuario en el store
        // router.push('/dashboard'); // Redirige al usuario a la página de dashboard
      }

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Ahora TypeScript sabe que `error` es de tipo AxiosError
        setError(error.response?.data?.message || "Error al registrar el usuario.");
        console.log(error.response?.data?.message);
      } else {
        // Manejar otros tipos de errores
        setError("Ocurrió un error inesperado.");
        console.log(error);
      }
    }
  }


  return (
    <div className="font-[sans-serif]">
     
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="flex max-lg:mt-8 justify-center items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/transparenciaseac.appspot.com/o/I7kmevbBVPO8yR9G0mK9%2FkyYlvOBrjgH7F3p5TbcE%2FLogo%20PIPEAC%20%20ampliado%20(2).png?alt=media&token=489a9dd1-844a-46c9-912b-099b51afcb80"
              alt="PIPEAC"
            />
          </div>
          <div className=" border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto ">
            <GoPasskeyFill size={80} color="#06949b" />
            <form className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-bold">
                <p>Base API</p>
                  Inicio de sesión
                </h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Ingresa al Sistema de Indicadores para el Programa de
                  Implementación de la Política Estatal Anticorrupción.
                </p>
              </div>

          

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Usuario
                </label>
                <div className="relative flex items-center">
                  <input
                    name="correo"
                    type="email"
                    required
                    value={formData.correo}
                    onChange={handleChange}
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter user name"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Contraseña
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-yellow-500 hover:bg-blue-700 focus:outline-none"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
                {error && ( // Muestra el mensaje de error si existe
                <div className="text-white mt-2 text-sm mb-4 bg-red-400">
                  {`Error: ${error}`}
                </div>
              )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
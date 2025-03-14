'use client';
import { Entidad } from '@/app/interfaces/user';
import { configStore } from '@/app/store/generalStore';
import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NewUserFrom = () => {
  const baseApi = configStore((state) => state.baseApi);
  const token = configStore((state) => state.token);
  const [entidades, setEntidades] = useState<Entidad[] | []>([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    entidad: '',
  });

  const getEntidades = async () => {
    try {
      const response = await axios.get(`${baseApi}/auth/entities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEntidades(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Error al cargar las entidades.');
        console.log(error.response?.data?.message);
      } else {
        setError('Ocurrió un error inesperado.');
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    getEntidades();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${baseApi}/auth/register/user`,
        {
          nombre: formData.nombre,
          correo: formData.correo,
          password: formData.password,
          entidad: formData.entidad, // Envía el id_entidad seleccionado
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Usuario registrado:', response.data);
      setError(''); // Limpiar el mensaje de error si el registro es exitoso

      // Mostrar notificación de éxito
      toast.success('Usuario registrado correctamente', {
        position: 'top-right',
        autoClose: 3000, // Cerrar después de 3 segundos
      });

      // Recargar la página después de 3 segundos
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Error al registrar el usuario.');
        console.log(error.response?.data?.message);

        // Mostrar notificación de error
        toast.error(error.response?.data?.message || 'Error al registrar el usuario', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        setError('Ocurrió un error inesperado.');
        console.log(error);

        // Mostrar notificación de error genérico
        toast.error('Ocurrió un error inesperado', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <>
      <ToastContainer /> {/* Contenedor para las notificaciones */}
      <div className="bg-gray-100 dark:bg-gray-800 transition-colors duration-300 p-5">
        <div className="container mx-auto p-4 mt-10 mb-5">
          <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
            <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Nuevo usuario
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Por favor, ingresa los datos necesarios para registrar un nuevo usuario.
            </p>
            <form onSubmit={handleSubmit} className='text-black'>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  name="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded w-full"
                />
                <input
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  placeholder="Correo Electrónico"
                  className="border p-2 rounded w-full"
                />
                <select
                  name="entidad"
                  value={formData.entidad}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      entidad: e.target.value, // Actualiza el id_entidad seleccionado
                    })
                  }
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="" >Selecciona una entidad</option>
                  {entidades.map((entidad) => (
                    <option key={entidad.id_entidad} value={entidad.id_entidad}>
                      {entidad.nombre_entidad} ({entidad.siglas})
                    </option>
                  ))}
                </select>
                <input
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  required
                  className="border p-2 rounded w-full"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
              >
                Registrar Usuario
              </button>
              {error && ( // Muestra el mensaje de error si existe
                <div className="text-white mt-2 text-sm mb-4 bg-red-400">
                  {`Error: ${error}`}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
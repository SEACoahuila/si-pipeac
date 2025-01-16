import React from 'react'

export const NewUserFrom = () => {
  return (
    <>
   <div className="bg-gray-100 dark:bg-gray-800 transition-colors duration-300 p-5">
      <div className="container mx-auto p-4 mt-10 mb-5">
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
          <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Nuevo usuario
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Por favor, ingresa los datos necesarios para registrar un nuevo usuario.
          </p>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nombre"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Primer Apellido"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Segundo Apellido"
                className="border p-2 rounded w-full"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Ciudad"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Contraseña"
                className="border p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
            >
              Registrar Usuario
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

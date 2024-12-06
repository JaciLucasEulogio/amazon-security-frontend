import React from "react";

const Navbar = () => {
  return (
    <div className="bg-green-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      {/* Primera fila: Logo y opciones */}
      <div className="flex items-center justify-between px-6 py-2 text-sm">
        {/* Logo y ubicación */}
        <div className="flex items-center space-x-4">
          <img src="" alt="Logo" className="h-6" />
          <span className="text-gray-300">
            Entrega en <strong className="text-white">New York 10013</strong>
          </span>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex-grow mx-6">
          <div className="flex items-center bg-white rounded">
            <select
              className="text-gray-700 text-sm bg-gray-100 border-r px-2 py-2 rounded-l"
              defaultValue="Todos"
            >
              <option value="Todos">Todos</option>
              <option value="Electrónica">Electrónica</option>
              <option value="Hogar">Hogar</option>
              <option value="Libros">Libros</option>
            </select>
            <input
              type="text"
              placeholder="Buscar Amazon"
              className="w-full px-4 py-2 bg-white text-gray-800 focus:outline-none"
            />
            <button className="bg-pink-600 p-2 rounded-r">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5a6 6 0 100 12 6 6 0 000-12zm0 0l6 6"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Opciones de cuenta y carrito */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-300">ES</button>
          <button className="text-gray-300">Hola, Identifícate</button>
          <span className="text-gray-300">Devoluciones y Pedidos</span>
          <div className="relative">
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full px-1">
              0
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h18l-2 14H5L3 3zm3 18a2 2 0 104 0 2 2 0 10-4 0zm10 0a2 2 0 104 0 2 2 0 10-4 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Segunda fila: Menú */}
      <div className="flex items-center justify-between overflow-x-auto px-6 py-2 text-sm bg-green-800">
        <button className="cursor-pointer hover:border hover:text-white">Todo</button>
        <button className="cursor-pointer hover:border hover:text-white">Ofertas de Cyber Monday</button>
        <button className="cursor-pointer hover:border hover:text-white">Atención médica</button>
        <button className="cursor-pointer hover:border hover:text-white">Más Vendidos</button>
        <button className="cursor-pointer hover:border hover:text-white">Prime</button>
        <button className="cursor-pointer hover:border hover:text-white">Amazon Basics</button>
        <button className="cursor-pointer hover:border hover:text-white">Nuevos lanzamientos</button>
        <button className="cursor-pointer hover:border hover:text-white">Alimentos</button>
        <button className="cursor-pointer hover:border hover:text-white">Música</button>
        <button className="cursor-pointer hover:border hover:text-white">Servicio al Cliente</button>
        <button className="cursor-pointer hover:border hover:text-white">Amazon Home</button>
        <button className="cursor-pointer hover:border hover:text-white">Listas</button>
        <button className="cursor-pointer hover:border hover:text-white">Farmacia</button>
        <span className="cursor-pointer hover:border hover:text-white">Tarjetas de Regalo</span>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';

export default function StoreHeader({
  searchTerm,
  setSearchTerm,
  showWishlistOnly,
  setShowWishlistOnly,
  wishlist = [],
}) {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-xs py-2 px-2 sm:px-4 md:px-8">
        {/* Mobile: Stack vertically */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <button onClick={() => openWhatsApp()} className="hover:underline text-white text-xs">
              Agendar consulta
            </button>
            <button
              type="button"
              className="hover:underline text-xs"
              onClick={(e) => {
                e.preventDefault();
                alert('Sistema de facturación en desarrollo');
              }}
            >
              Facturación
            </button>
            <Link href="/nosotros" className="hover:underline text-xs">
              Ortopedia Cuernavaca
            </Link>
            <Link href="/contacto" className="hover:underline text-xs">
              Contáctanos
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 font-semibold text-xs">
            <span className="hidden sm:inline">Ortopedia Cuernavaca: 777 311 2867</span>
            <span className="sm:hidden">777 311 2867</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden sm:inline">Ortochavitos: 777 311 9837</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md py-3 sm:py-4 px-3 sm:px-4 md:px-8 sticky top-0 z-50">
        <div className="max-w-[1360px] mx-auto flex justify-between items-center gap-2 sm:gap-4">
          <Link href="/tienda" className="flex items-center">
            <Image
              src="/images/banners/LogoOrtochavitos.svg"
              alt="Ortochavitos Logo"
              width={80}
              height={80}
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
            />
          </Link>
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 md:mx-8">
            <div className="relative" role="search">
              <input
                type="text"
                placeholder="Buscar productos..."
                aria-label="Buscar productos, servicios o especialidades"
                className="w-full border-2 border-gray-300 rounded-full py-2 pl-8 sm:pl-10 pr-8 sm:pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchTerm && (
                <button
                  type="button"
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Carrito oculto visualmente pero funcionalidad mantenida */}
            <Link href="/carrito" className="relative hover:text-blue-600 transition-colors hidden">
              <div className="relative">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007.53 17h10.94a1 1 0 00.88-.53L21 13M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
            </Link>
            <button
              className="relative hover:text-red-600 transition-colors"
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className="bg-gray-200 py-2 px-2 sm:px-4 md:px-8 border-t border-b border-gray-300"
        aria-label="Categorías de la tienda"
      >
        <div className="max-w-[1360px] mx-auto flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6 text-xs sm:text-sm font-semibold text-blue-900 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link
            href="/categorias"
            aria-label="Todos"
            className="hover:text-blue-600 transition-colors"
          >
            Todos
          </Link>
          <Link
            href="/categoria/plantillas"
            aria-label="Plantillas"
            className="hover:text-blue-600 transition-colors"
          >
            Plantillas
          </Link>
          <Link
            href="/categoria/fajas"
            aria-label="Fajas"
            className="hover:text-blue-600 transition-colors"
          >
            Fajas
          </Link>
          <Link
            href="/categoria/rehabilitacion"
            aria-label="Rehabilitación"
            className="hover:text-blue-600 transition-colors"
          >
            Rehabilitación
          </Link>
          <Link
            href="/servicios"
            aria-label="Servicios"
            className="hover:text-blue-600 transition-colors"
          >
            Servicios
          </Link>
          <Link
            href="/categoria/pediatria"
            aria-label="Pediatría"
            className="hover:text-blue-600 transition-colors"
          >
            Pediatría
          </Link>
          <button
            onClick={() =>
              openWhatsApp(undefined, 'Hola, me interesa agendar una consulta clínica.')
            }
            className="hover:text-blue-600 transition-colors"
          >
            Consulta clínica
          </button>
          <Link
            href="/ofertas"
            className="text-red-600 font-bold hover:text-red-700 transition-colors"
          >
            Ofertas
          </Link>
        </div>
      </nav>
    </>
  );
}

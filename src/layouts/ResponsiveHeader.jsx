import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';

/**
 * Header Responsive Optimizado
 * Proporciona navegación perfecta en todos los dispositivos
 */
export default function ResponsiveHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsStoreDropdownOpen(false);
  }, [router.pathname]);

  // Mock cart items
  useEffect(() => {
    setCartItemsCount(Math.floor(Math.random() * 5));
  }, []);

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/blog', label: 'Blog' },
    { path: '/contacto', label: 'Contacto' },
  ];

  const storeCategories = [
    { path: '/categoria/plantillas', label: 'Plantillas ortopédicas' },
    { path: '/categoria/fajas', label: 'Fajas y soporte lumbar' },
    { path: '/categoria/ortesis', label: 'Rodilleras y ortesis' },
    { path: '/categoria/calzado', label: 'Calzado ortopédico' },
    { path: '/categoria/rehabilitacion', label: 'Rehabilitación y fisioterapia' },
    { path: '/categoria/pediatria', label: 'Ortopedia pediátrica' },
  ];

  const isActive = (path) => {
    if (path === '/' && router.pathname === '/') return true;
    if (path !== '/' && router.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      id="store-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-md shadow-sm'
      }`}
    >
      {/* Main Navigation */}
      <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/banners/Ortopedia Cuernavaca Logo.png"
                alt="Ortopedia Cuernavaca Logo"
                width={600}
                height={200}
                quality={100}
                className="h-10 w-auto sm:h-12 md:h-14 lg:h-16"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-6 xl:mx-12">
            <div className="flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 text-sm xl:text-base font-medium transition-colors whitespace-nowrap ${
                    isActive(item.path)
                      ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Store Dropdown - Oculto temporalmente - en desarrollo */}
              {/* <div
                className="relative group"
                onMouseEnter={() => setIsStoreDropdownOpen(true)}
                onMouseLeave={() => setIsStoreDropdownOpen(false)}
              >
                <button
                  className={`flex items-center px-3 py-2 text-sm xl:text-base font-medium transition-colors whitespace-nowrap ${
                    isActive('/tienda') || isActive('/categoria')
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Tienda
                  <svg
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                      isStoreDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isStoreDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white shadow-xl rounded-lg w-64 p-4 z-50"
                    >
                      <Link href="/tienda" className="block py-3 px-4 hover:bg-blue-50 rounded-lg font-semibold text-blue-600 transition-colors">
                        Ver toda la tienda
                      </Link>
                      <div className="border-t border-gray-200 my-3" />
                      {storeCategories.map((category) => (
                        <Link key={category.path} href={category.path} className="block py-2 px-4 hover:bg-blue-50 rounded-lg transition-colors text-sm text-gray-700 hover:text-blue-600">
                          {category.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> */}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Buscar"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <Link
              href={isLoggedIn ? '/cuenta' : '/login'}
              className="flex items-center px-2 py-2 text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="hidden lg:inline ml-2">{isLoggedIn ? 'Cuenta' : 'Acceder'}</span>
            </Link>

            <Link
              href="/carrito"
              className="flex items-center relative px-2 py-2 text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007.53 17h10.94a1 1 0 00.88-.53L21 13M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              <span className="hidden lg:inline ml-2">Carrito</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => openWhatsApp()}
              className="hidden lg:inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm whitespace-nowrap shadow-md hover:shadow-lg"
            >
              Agendar Cita
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/carrito" className="relative p-2">
              <svg
                className="w-6 h-6 text-gray-600"
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
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menú"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pb-4"
            >
              <input
                type="text"
                placeholder="Buscar productos, servicios..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-4 py-3 rounded-lg transition-colors text-sm font-medium ${isActive(item.path) ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Categorías de Tienda - Oculto temporalmente - en desarrollo */}
                {/* <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm font-semibold text-gray-600 mb-3 px-4">Categorías de Tienda</div>
                  <div className="space-y-1">
                    {storeCategories.map((category) => (
                      <Link key={category.path} href={category.path} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                        {category.label}
                      </Link>
                    ))}
                  </div>
                </div> */}

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <Link
                    href={isLoggedIn ? '/cuenta' : '/login'}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {isLoggedIn ? 'Mi cuenta' : 'Iniciar sesión'}
                  </Link>

                  <button
                    onClick={() => {
                      openWhatsApp();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    Agendar Cita
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

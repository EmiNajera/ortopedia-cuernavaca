import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock authentication state
  const router = useRouter();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsStoreDropdownOpen(false);
  }, [router.pathname]);

  // Mock cart items count (in real app, this would come from context/state)
  useEffect(() => {
    setCartItemsCount(Math.floor(Math.random() * 5)); // Mock data
  }, []);

  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/servicios", label: "Servicios" },
    { path: "/nosotros", label: "Nosotros" },
    { path: "/blog", label: "Blog" },
    { path: "/citas", label: "Citas" },
    { path: "/contacto", label: "Contacto" },
  ];

  const storeCategories = [
    { path: "/categoria/plantillas", label: "Plantillas ortopédicas" },
    { path: "/categoria/fajas", label: "Fajas y soporte lumbar" },
    { path: "/categoria/ortesis", label: "Rodilleras y ortesis" },
    { path: "/categoria/calzado", label: "Calzado ortopédico" },
    { path: "/categoria/rehabilitacion", label: "Rehabilitación y fisioterapia" },
    { path: "/categoria/pediatria", label: "Ortopedia pediátrica" },
  ];

  const isActive = (path) => {
    if (path === "/" && router.pathname === "/") return true;
    if (path !== "/" && router.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 animate-fade-in ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-white/80 backdrop-blur-md shadow-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          {/* Logo - Left Section */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <img
                  src="/images/banners/Ortopedia Cuernavaca Logo.png"
                  alt="Ortopedia Cuernavaca Logo"
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Center Section */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                >
                                     <Link
                     href={item.path}
                     className={`relative px-3 py-1 transition-colors whitespace-nowrap text-base xl:text-lg font-medium ${
                       isActive(item.path)
                         ? "text-blue-600 font-semibold"
                         : "text-gray-700 hover:text-blue-600"
                     }`}
                   >
                    {item.label}
                    {isActive(item.path) && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      />
                    )}
                  </Link>
                </div>
              ))}

              {/* Store Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsStoreDropdownOpen(true)}
                onMouseLeave={() => setIsStoreDropdownOpen(false)}
              >
                                                 <Link
                  href="/tienda"
                  className={`flex items-center px-3 py-1 transition-colors whitespace-nowrap text-base xl:text-lg font-medium ${
                    isActive("/tienda")
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <div className="flex items-center">
                    Tienda
                    <svg
                      className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                        isStoreDropdownOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </Link>
                
                {isStoreDropdownOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 bg-white shadow-xl rounded-xl w-72 p-4 z-50 animate-fade-in"
                  >
                    <Link
                      href="/tienda"
                      className="block py-2 px-3 hover:bg-blue-50 rounded-lg font-semibold text-blue-600 transition-colors"
                    >
                      Ver toda la tienda
                    </Link>
                    <div className="border-t border-gray-200 my-3"></div>
                    <div className="grid grid-cols-1 gap-1">
                      {storeCategories.map((category) => (
                        <Link
                          key={category.path}
                          href={category.path}
                          className="block py-2 px-3 hover:bg-blue-50 rounded-lg transition-colors text-gray-700 hover:text-blue-600"
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Actions - Right Section */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {/* Search Button */}
                         <button
               onClick={() => setIsSearchOpen(!isSearchOpen)}
               className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors transform hover:scale-105 transition-transform duration-300"
             >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Account */}
                         <div className="flex-shrink-0">
               <Link href={isLoggedIn ? "/cuenta" : "/login"} className="hover:text-blue-600 transition-colors flex items-center px-2 py-1 whitespace-nowrap text-base xl:text-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden xl:inline">{isLoggedIn ? "Mi cuenta" : "Iniciar sesión"}</span>
                  <span className="xl:hidden">Cuenta</span>
                </div>
              </Link>
            </div>

            {/* Cart with Badge */}
            <div className="flex-shrink-0">
              <Link href="/carrito" className="hover:text-blue-600 transition-colors flex items-center relative px-2 py-1 whitespace-nowrap text-base xl:text-lg">
                <div className="flex items-center relative">
                  <svg className="w-5 h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007.53 17h10.94a1 1 0 00.88-.53L21 13M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  <span className="hidden xl:inline">Carrito</span>
                  {cartItemsCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-fade-in font-semibold"
                    >
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
                                           <Link
                href="/citas"
                className="bg-blue-600 text-white font-semibold py-1.5 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl whitespace-nowrap text-base xl:text-lg"
              >
                <div>
                  <span className="hidden xl:inline">Agendar Cita</span>
                  <span className="xl:hidden">Cita</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
                     <button
             className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors transform hover:scale-95 transition-transform duration-300"
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos, servicios..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 animate-fade-in">
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <div
                    key={item.path}
                    className={`animate-fade-in-delay-${index + 1}`}
                  >
                    <Link
                      href={item.path}
                      className={`block px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? "bg-blue-100 text-blue-600 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Mobile Store Categories */}
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm font-semibold text-gray-600 mb-2 px-4">Categorías de Tienda</div>
                <div className="space-y-1">
                  {storeCategories.slice(0, 6).map((category, index) => (
                    <div
                      key={category.path}
                      className={`animate-fade-in-delay-${index + 7}`}
                    >
                      <Link
                        href={category.path}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {category.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="animate-fade-in-delay-2">
                  <Link
                    href={isLoggedIn ? "/cuenta" : "/login"}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{isLoggedIn ? "Mi cuenta" : "Iniciar sesión"}</span>
                    </div>
                  </Link>
                </div>

                <div className="animate-fade-in-delay-3">
                  <Link
                    href="/carrito"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative"
                  >
                    <div className="flex items-center w-full">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007.53 17h10.94a1 1 0 00.88-.53L21 13M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z" />
                      </svg>
                      <span>Carrito</span>
                      {cartItemsCount > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartItemsCount}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>

                <div className="animate-fade-in-delay-3">
                  <Link
                    href="/citas"
                    className="block w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    Agendar Cita
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 
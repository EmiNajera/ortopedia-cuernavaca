import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';

export default function MarketingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
  }, [router.pathname]);

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/blog', label: 'Blog' },
    // { path: '/tienda', label: 'Tienda' }, // Oculto temporalmente - en desarrollo
    { path: '/contacto', label: 'Contacto' },
  ];

  const isActive = (path) => {
    if (path === '/' && router.pathname === '/') return true;
    if (path !== '/' && router.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      id="marketing-header"
      style={{ paddingTop: 'var(--sat)' }}
      className={`sticky top-0 z-50 transition-all duration-300 animate-fade-in ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-md shadow-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 sm:py-2 relative">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Left Section */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/banners/Ortopedia Cuernavaca Logo.png"
                alt="Ortopedia Cuernavaca Logo"
                width={600}
                height={200}
                quality={100}
                className="w-auto h-10 sm:h-12 lg:h-14"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center Section */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-4 lg:mx-8">
            <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <div key={item.path} className="relative">
                  <Link
                    href={item.path}
                    className={`relative px-2 py-1 transition-colors whitespace-nowrap text-sm lg:text-base xl:text-lg font-medium ${
                      isActive(item.path)
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - CTA Button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={openWhatsApp}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Agendar Consulta
            </button>

            {/* Mobile Menu Button - Optimized for Thumb Zone */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors active:bg-gray-200 touch-target"
              aria-label="Toggle mobile menu"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      openWhatsApp();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    Agendar Consulta
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

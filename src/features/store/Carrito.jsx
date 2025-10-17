import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsApp } from '../../lib/utils/whatsapp';

const initialCart = [
  {
    id: 1,
    name: 'Plantillas Ortopédicas Personalizadas',
    price: 800,
    image: 'https://placehold.co/100x100/1E40AF/FFFFFF?text=Plantilla',
    quantity: 1
  },
  {
    id: 2,
    name: 'Órtesis de Rodilla Deportiva',
    price: 1200,
    image: 'https://placehold.co/100x100/059669/FFFFFF?text=Órtesis',
    quantity: 2
  }
];

export default function Carrito() {
  const [cart, setCart] = useState(initialCart);

  const handleQuantity = (id, delta) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart(cart => cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 120 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-white font-sans">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-xs py-2 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={() => openWhatsApp()} className="hover:underline text-white">Agendar consulta</button>
          <button type="button" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Sistema de facturación en desarrollo'); }}>Facturación</button>
          <Link href="/nosotros" className="hover:underline">Ortopedia Cuernavaca</Link>
          <Link href="/contacto" className="hover:underline">Contáctanos</Link>
        </div>
        <div className="flex items-center space-x-4 font-semibold">
          <span>Ortopedia Cuernavaca: 777 311 2867</span>
          <span className="hidden md:inline">·</span>
          <span>Ortochavitos: 777 311 9837</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md py-4 px-4 md:px-8 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/tienda" className="text-2xl font-bold text-gray-900">Ortopedia Cuernavaca</Link>
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar productos, servicios o especialidades..." 
                className="w-full border-2 border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    alert('Función de búsqueda en desarrollo');
                  }
                }}
              />
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                onClick={() => alert('Función de búsqueda en desarrollo')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-6">
                         <Link href="/carrito" className="text-center hover:text-blue-600 transition-colors">
               <div className="flex flex-col items-center">
                 <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007.53 17h10.94a1 1 0 00.88-.53L21 13M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z" />
                 </svg>
                 <p className="text-xs font-medium">Carrito</p>
               </div>
             </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-200 py-2 px-4 md:px-8 border-t border-b border-gray-300">
        <div className="container mx-auto flex justify-center items-center space-x-4 md:space-x-6 text-sm font-semibold text-blue-900 overflow-x-auto whitespace-nowrap">
          <Link href="/tienda" className="hover:text-blue-600">TODO</Link>
          <Link href="/tienda?categoria=plantillas" className="hover:text-blue-600">Plantillas</Link>
          <Link href="/tienda?categoria=ferulas" className="hover:text-blue-600">Férulas</Link>
          <Link href="/tienda?categoria=protesis" className="hover:text-blue-600">Prótesis</Link>
          <Link href="/tienda?categoria=rehabilitacion" className="hover:text-blue-600">Rehabilitación</Link>
          <Link href="/tienda?categoria=calzado" className="hover:text-blue-600">Calzado ortopédico</Link>
          <button onClick={() => openWhatsApp()} className="hover:text-blue-600">Consulta clínica</button>
          <button type="button" className="text-red-600 font-bold hover:text-red-700" onClick={(e) => { e.preventDefault(); alert('Sección de ofertas en desarrollo'); }}>Ofertas</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-blue-900 mb-8 text-center"
        >
          Carrito de Compras
        </motion.h1>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="text-7xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold mb-2 text-blue-900">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Agrega productos para comenzar tu compra.</p>
            <Link href="/tienda" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Ir a la Tienda
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <AnimatePresence>
                {cart.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center bg-white rounded-xl shadow-md mb-6 p-6 gap-6 border border-gray-200"
                  >
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover border" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-gray-600 font-medium mb-2">${item.price} MXN</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantity(item.id, -1)}
                          className="bg-gray-200 px-3 py-1 rounded-full text-lg font-bold hover:bg-gray-300 transition-colors"
                        >-</button>
                        <span className="px-3 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantity(item.id, 1)}
                          className="bg-gray-200 px-3 py-1 rounded-full text-lg font-bold hover:bg-gray-300 transition-colors"
                        >+</button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-lg font-bold text-blue-600">${item.price * item.quantity} MXN</span>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-md p-8 h-fit border border-gray-200">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Resumen de Compra</h2>
              <div className="flex justify-between mb-4 text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal} MXN</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-700">
                <span>Envío</span>
                <span>{shipping > 0 ? `$${shipping} MXN` : 'Gratis'}</span>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between text-xl font-bold text-blue-900 mb-6">
                <span>Total</span>
                <span>${total} MXN</span>
              </div>
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
                onClick={() => alert('¡Gracias por tu compra! (Checkout simulado)')}
              >
                Finalizar Compra
              </button>
              <p className="text-xs text-gray-400 mt-4 text-center">* El proceso de pago es solo demostrativo.</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white pt-10">
        <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 className="font-bold text-lg mb-2 text-blue-400">¡Recibe contenido de valor!</h3>
                    <p className="text-sm mb-4">Recibe contenido sobre cuidado ortopédico y promociones.</p>
                    <div className="flex">
                        <input type="email" placeholder="tu.correo@ejemplo.com" className="w-full rounded-l-md text-gray-800 px-3 py-2 focus:outline-none" />
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
                            onClick={() => alert('Sistema de suscripción en desarrollo')}
                        >
                            Suscribir
                        </button>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2 text-blue-400">Servicio al Cliente</h3>
                    <ul className="text-sm space-y-2">
                        <li><button type="button" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Preguntas frecuentes en desarrollo'); }}>Preguntas Frecuentes</button></li>
                        <li><button type="button" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Sistema de facturación en desarrollo'); }}>Facturación</button></li>
                        <li><Link href="/contacto" className="hover:underline">Contáctanos</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2 text-blue-400">Acerca de Nosotros</h3>
                    <ul className="text-sm space-y-2">
                        <li><Link href="/nosotros" className="hover:underline">Nuestra Historia</Link></li>
                        <li><button type="button" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Información sobre nuestra filosofía de atención en desarrollo'); }}>Filosofía de Atención</button></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold text-lg mb-2 text-blue-400">Legal</h3>
                     <ul className="text-sm space-y-2">
                        <li><button type="button" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Aviso de privacidad en desarrollo'); }}>Aviso de Privacidad</button></li>
                        <li><button type="button" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Términos y Condiciones en desarrollo'); }}>Términos y Condiciones</button></li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-xs border-t border-blue-700 py-4 mt-4">
                <p>&copy; {new Date().getFullYear()} OrtoTech Solutions. Todos los derechos reservados.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

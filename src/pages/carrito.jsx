import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import StoreLayout from '@layouts/StoreLayout';

const initialCart = [
  {
    id: 1,
    name: 'Plantillas Ortopédicas Personalizadas',
    price: 800,
    image: 'https://placehold.co/100x100/1E40AF/FFFFFF?text=Plantilla',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Órtesis de Rodilla Deportiva',
    price: 1200,
    image: 'https://placehold.co/100x100/059669/FFFFFF?text=Órtesis',
    quantity: 2,
  },
];

export default function Carrito() {
  const [cart, setCart] = useState(initialCart);

  const handleQuantity = (id, delta) => {
    setCart((cart) =>
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
      ),
    );
  };

  const handleRemove = (id) => {
    setCart((cart) => cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 120 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-white font-sans">
      {/* Headers removed - now handled by StoreLayout */}

      {/* Navigation removed - now handled by StoreLayout */}

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
            <Link
              href="/tienda"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ir a la Tienda
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center bg-white rounded-xl shadow-md mb-6 p-6 gap-6 border border-gray-200"
                  >
                    <div className="w-24 h-24 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-gray-600 font-medium mb-2">${item.price} MXN</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantity(item.id, -1)}
                          className="bg-gray-200 px-3 py-1 rounded-full text-lg font-bold hover:bg-gray-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantity(item.id, 1)}
                          className="bg-gray-200 px-3 py-1 rounded-full text-lg font-bold hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-lg font-bold text-blue-600">
                        ${item.price * item.quantity} MXN
                      </span>
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
              <p className="text-xs text-gray-400 mt-4 text-center">
                * El proceso de pago es solo demostrativo.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer removed - now handled by StoreLayout */}
    </div>
  );
}

// Apply StoreLayout at page-level so store pages keep the store header/footer
Carrito.getLayout = function getLayout(page) {
  return <StoreLayout>{page}</StoreLayout>;
};

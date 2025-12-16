import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsAppCart } from '@shared/lib/utils/whatsapp';
import { useCart } from '@store/domain/cart/useCart';
import StoreLayout from '@layouts/StoreLayout';
import SEO from '@shared/components/SEO';

export default function Carrito() {
  const {
    items: cart,
    updateQuantity,
    removeItem: handleRemove,
    total,
    subtotal,
    shipping,
    isEmpty,
  } = useCart();

  const handleQuantity = (id, delta) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      updateQuantity(id, Math.max(1, item.quantity + delta));
    }
  };

  const handleCheckout = () => {
    openWhatsAppCart(cart, total + shipping);
  };

  return (
    <div className="bg-white font-sans">
      <SEO
        title="Carrito de Compras"
        description="Revisa los productos en tu carrito de compras de Ortopedia Cuernavaca."
        url="/carrito"
      />
      <main className="container mx-auto py-8 px-4 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-blue-900 mb-8 text-center"
        >
          Carrito de Compras
        </motion.h1>

        {isEmpty ? (
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
                        src={
                          item.image ||
                          item.images?.[0] ||
                          'https://placehold.co/100x100?text=Producto'
                        }
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
                <span>${total + shipping} MXN</span>
              </div>
              <button
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg flex items-center justify-center gap-2"
                onClick={handleCheckout}
              >
                <span>Completar pedido por WhatsApp</span>
              </button>
              <p className="text-xs text-gray-400 mt-4 text-center">
                * Al hacer clic, se abrirá WhatsApp con los detalles de tu pedido.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Apply StoreLayout at page-level so store pages keep the store header/footer
Carrito.getLayout = function getLayout(page) {
  return <StoreLayout>{page}</StoreLayout>;
};

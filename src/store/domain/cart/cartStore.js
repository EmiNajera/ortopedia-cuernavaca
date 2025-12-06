import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Estado global del carrito usando Zustand
 * Persiste en localStorage automáticamente
 */
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      /**
       * Agregar producto al carrito
       * Si ya existe, incrementa la cantidad
       */
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
      },

      /**
       * Remover producto del carrito
       */
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      /**
       * Actualizar cantidad de un producto
       * Si quantity <= 0, remueve el item
       */
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        });
      },

      /**
       * Limpiar carrito completamente
       */
      clearCart: () => set({ items: [] }),

      /**
       * Calcular total del carrito
       */
      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price =
            typeof item.price === 'string'
              ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) || 0
              : item.price || 0;
          return total + price * item.quantity;
        }, 0);
      },

      /**
       * Obtener subtotal (igual al total por ahora)
       */
      getSubtotal: () => get().getTotal(),

      /**
       * Calcular costo de envío
       * Ejemplo: gratis si total > 1000, sino 150
       */
      getShipping: () => {
        const total = get().getTotal();
        return total > 1000 ? 0 : 150;
      },

      /**
       * Obtener cantidad total de items en el carrito
       */
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // Nombre en localStorage
    },
  ),
);

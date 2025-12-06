import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Estado global de wishlist usando Zustand
 * Persiste en localStorage automáticamente
 */
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [], // Array de productIds

      /**
       * Agregar producto a wishlist
       */
      add: (productId) => {
        if (!get().items.includes(productId)) {
          set({ items: [...get().items, productId] });
        }
      },

      /**
       * Remover producto de wishlist
       */
      remove: (productId) => {
        set({
          items: get().items.filter((id) => id !== productId),
        });
      },

      /**
       * Toggle: agregar si no está, remover si está
       */
      toggle: (productId) => {
        if (get().items.includes(productId)) {
          get().remove(productId);
        } else {
          get().add(productId);
        }
      },

      /**
       * Verificar si un producto está en wishlist
       */
      isInWishlist: (productId) => {
        return get().items.includes(productId);
      },

      /**
       * Limpiar wishlist completamente
       */
      clear: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage', // Nombre en localStorage
    },
  ),
);

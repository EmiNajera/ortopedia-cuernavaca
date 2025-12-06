import { useCartStore } from './cartStore';

/**
 * Hook limpio que expone solo lo necesario para UI
 * Encapsula la lógica del store y proporciona una API simple
 */
export function useCart() {
  const store = useCartStore();

  return {
    // Estado
    items: store.items,
    isEmpty: store.items.length === 0,
    itemCount: store.getItemCount(),

    // Totales
    total: store.getTotal(),
    subtotal: store.getSubtotal(),
    shipping: store.getShipping(),
    totalWithShipping: store.getTotal() + store.getShipping(),

    // Acciones
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
  };
}

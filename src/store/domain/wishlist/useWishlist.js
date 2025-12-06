import { useWishlistStore } from './wishlistStore';

/**
 * Hook limpio que expone solo lo necesario para UI
 * Encapsula la lógica del store y proporciona una API simple
 */
export function useWishlist() {
  const store = useWishlistStore();

  return {
    // Estado
    items: store.items,
    count: store.items.length,
    isEmpty: store.items.length === 0,

    // Acciones
    add: store.add,
    remove: store.remove,
    toggle: store.toggle,
    isInWishlist: store.isInWishlist,
    clear: store.clear,
  };
}

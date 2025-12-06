import { useState, useMemo } from 'react';
import { useWishlist } from '../wishlist/useWishlist';

/**
 * Hook gordo que encapsula filtros + búsqueda + ordenamiento
 * ⚠️ EMPEZAR CON UN SOLO HOOK que encapsule todo
 * Partir después solo si realmente hace falta
 *
 * @param {Array} products - Array de productos a filtrar/ordenar
 * @returns {Object} - { filteredProducts, category, setCategory, searchTerm, setSearchTerm, sortBy, setSortBy, showWishlistOnly, setShowWishlistOnly }
 */
export function useProductListing(products = []) {
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  const { items: wishlistItems } = useWishlist();

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filtrar por categoría
    if (category !== 'all' && category !== 'todos') {
      filtered = filtered.filter((p) => {
        // Soporta tanto category como categoria (compatibilidad)
        const productCategory = p.category || p.categoria;
        return (
          productCategory === category || productCategory?.toLowerCase() === category.toLowerCase()
        );
      });
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((p) => {
        const title = p.title || p.name || p.description || '';
        const description = p.description || '';
        const brand = p.brand || '';
        const searchableText = `${title} ${description} ${brand}`.toLowerCase();
        return searchableText.includes(term);
      });
    }

    // Filtrar solo wishlist
    if (showWishlistOnly) {
      filtered = filtered.filter((p) => {
        const productId = p.id || p.productId || p.slug;
        return wishlistItems.includes(productId);
      });
    }

    // Ordenar
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => {
          const priceA =
            typeof a.price === 'string'
              ? parseFloat(a.price.replace(/[^0-9.-]+/g, '')) || 0
              : a.price || 0;
          const priceB =
            typeof b.price === 'string'
              ? parseFloat(b.price.replace(/[^0-9.-]+/g, '')) || 0
              : b.price || 0;
          return priceA - priceB;
        });
      case 'price-high':
        return filtered.sort((a, b) => {
          const priceA =
            typeof a.price === 'string'
              ? parseFloat(a.price.replace(/[^0-9.-]+/g, '')) || 0
              : a.price || 0;
          const priceB =
            typeof b.price === 'string'
              ? parseFloat(b.price.replace(/[^0-9.-]+/g, '')) || 0
              : b.price || 0;
          return priceB - priceA;
        });
      case 'name':
        return filtered.sort((a, b) => {
          const nameA = (a.title || a.name || '').toLowerCase();
          const nameB = (b.title || b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
      default:
        return filtered;
    }
  }, [products, category, searchTerm, sortBy, showWishlistOnly, wishlistItems]);

  return {
    filteredProducts,
    category,
    setCategory,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    showWishlistOnly,
    setShowWishlistOnly,
  };
}

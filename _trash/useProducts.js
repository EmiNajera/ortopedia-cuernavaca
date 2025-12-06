import { useState, useEffect } from 'react';

/**
 * Hook personalizado para obtener productos desde la API
 * @param {Object} filters - Filtros opcionales (category, search, minPrice, maxPrice, inStock, limit)
 * @returns {Object} - { products, loading, error, refetch }
 */
export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Construir query params
      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.inStock !== undefined) queryParams.append('inStock', filters.inStock);
      if (filters.limit) queryParams.append('limit', filters.limit);

      const queryString = queryParams.toString();
      const url = `/api/products${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener productos');
      }

      setProducts(data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    filters.category,
    filters.search,
    filters.minPrice,
    filters.maxPrice,
    filters.inStock,
    filters.limit,
  ]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}

/**
 * Hook para obtener un producto específico por ID
 * @param {string} productId - ID del producto
 * @returns {Object} - { product, loading, error, refetch }
 */
export function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    if (!productId) {
      setLoading(false);
      setProduct(null);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setProduct(null);

      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();

      if (!response.ok) {
        // Para 404, establecer error pero no lanzar excepción
        if (response.status === 404) {
          setError(data.error || 'Producto no encontrado');
          setProduct(null);
          setLoading(false);
          return;
        }
        // Para otros errores, lanzar excepción
        throw new Error(data.error || 'Error al obtener el producto');
      }

      setProduct(data.product);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message || 'Error al obtener el producto');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
}

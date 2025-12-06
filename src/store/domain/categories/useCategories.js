import { useState, useEffect } from 'react';

/**
 * Hook para obtener categorías desde la API
 * @returns {Object} - { categories, loading, error, refetch }
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener desde API
      const response = await fetch('/api/categories');

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(
          `Expected JSON but got ${contentType}. Response: ${text.substring(0, 100)}`,
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener categorías');
      }

      setCategories(data.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}

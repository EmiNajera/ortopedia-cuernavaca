import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBlogStore = create(
  persist(
    (set, get) => ({
      // Estado del blog
      posts: [],
      featuredPost: null,
      filteredPosts: [],
      
      // Filtros y búsqueda
      selectedCategory: 'todos',
      searchTerm: '',
      sortBy: 'date',
      sortOrder: 'desc',
      
      // UI State
      isLoading: false,
      viewMode: 'grid', // 'grid' | 'list'
      
      // Favoritos y likes
      favorites: [],
      likedPosts: [],
      
      // Acciones para posts
      setPosts: (posts) => {
        const featuredPost = posts.find(post => post.featured);
        set({ 
          posts, 
          featuredPost,
          filteredPosts: posts 
        });
      },
      
      // Acciones de filtrado
      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
        get().applyFilters();
      },
      
      setSearchTerm: (term) => {
        set({ searchTerm: term });
        get().applyFilters();
      },
      
      setSortBy: (sortBy) => {
        set({ sortBy });
        get().applyFilters();
      },
      
      setSortOrder: (order) => {
        set({ sortOrder: order });
        get().applyFilters();
      },
      
      // Aplicar filtros
      applyFilters: () => {
        const { posts, selectedCategory, searchTerm, sortBy, sortOrder } = get();
        
        let filtered = [...posts];
        
        // Filtrar por categoría
        if (selectedCategory !== 'todos') {
          filtered = filtered.filter(post => post.category === selectedCategory);
        }
        
        // Filtrar por búsqueda
        if (searchTerm) {
          filtered = filtered.filter(post => 
            (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
          );
        }
        
        // Ordenar
        filtered.sort((a, b) => {
          let aValue, bValue;
          
          switch (sortBy) {
            case 'title':
              aValue = a.title.toLowerCase();
              bValue = b.title.toLowerCase();
              break;
            case 'date':
              aValue = new Date(a.date);
              bValue = new Date(b.date);
              break;
            case 'author':
              aValue = a.author.toLowerCase();
              bValue = b.author.toLowerCase();
              break;
            case 'readTime':
              aValue = parseInt(a.readTime) || 0;
              bValue = parseInt(b.readTime) || 0;
              break;
            default:
              aValue = new Date(a.date);
              bValue = new Date(b.date);
          }
          
          if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
        
        set({ filteredPosts: filtered });
      },
      
      // Acciones de UI
      setViewMode: (mode) => set({ viewMode: mode }),
      setLoading: (loading) => set({ isLoading: loading }),
      
      // Acciones de favoritos
      toggleFavorite: (postSlug) => {
        const { favorites } = get();
        const newFavorites = favorites.includes(postSlug)
          ? favorites.filter(slug => slug !== postSlug)
          : [...favorites, postSlug];
        set({ favorites: newFavorites });
      },
      
      isFavorite: (postSlug) => {
        return get().favorites.includes(postSlug);
      },
      
      // Acciones de likes
      toggleLike: (postSlug) => {
        const { likedPosts } = get();
        const newLikedPosts = likedPosts.includes(postSlug)
          ? likedPosts.filter(slug => slug !== postSlug)
          : [...likedPosts, postSlug];
        set({ likedPosts: newLikedPosts });
      },
      
      isLiked: (postSlug) => {
        return get().likedPosts.includes(postSlug);
      },
      
      // Reset filtros
      resetFilters: () => {
        set({
          selectedCategory: 'todos',
          searchTerm: '',
          sortBy: 'date',
          sortOrder: 'desc'
        });
        get().applyFilters();
      },
      
      // Obtener estadísticas
      getStats: () => {
        const { posts, filteredPosts } = get();
        return {
          totalPosts: posts.length,
          filteredPosts: filteredPosts.length,
          categories: posts.reduce((acc, post) => {
            acc[post.category] = (acc[post.category] || 0) + 1;
            return acc;
          }, {}),
          featuredCount: posts.filter(post => post.featured).length
        };
      }
    }),
    {
      name: 'blog-store',
      partialize: (state) => ({
        favorites: state.favorites,
        likedPosts: state.likedPosts,
        viewMode: state.viewMode
      })
    }
  )
);

export default useBlogStore;

















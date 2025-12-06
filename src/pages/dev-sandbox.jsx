/**
 * Página de desarrollo para probar los hooks de dominio
 * NO incluir en producción - solo para testing durante refactor
 *
 * ⚠️ ESTE ARCHIVO DEBE SER ELIMINADO O BLOQUEADO EN PRODUCCIÓN
 */
import { useState } from 'react';
import { useProducts } from '@store/domain/products/useProducts';
import { useProductListing } from '@store/domain/products/useProductListing';
import { useCart } from '@store/domain/cart/useCart';
import { useWishlist } from '@store/domain/wishlist/useWishlist';
import { useCategories } from '@store/domain/categories/useCategories';

export default function DevSandbox() {
  const [testMode, setTestMode] = useState('products');

  // Hooks de dominio
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const {
    filteredProducts,
    category,
    setCategory,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    showWishlistOnly,
    setShowWishlistOnly,
  } = useProductListing(products);

  const { items: cartItems, total, itemCount, addItem, removeItem, clearCart } = useCart();

  const {
    items: wishlistItems,
    count: wishlistCount,
    toggle: toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const { categories, loading: categoriesLoading } = useCategories();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🧪 Dev Sandbox - Testing Domain Hooks</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Esta página es solo para probar los hooks de dominio durante el refactor. No incluir en
        producción.
      </p>

      {/* Selector de modo */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setTestMode('products')}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            backgroundColor: testMode === 'products' ? '#0070f3' : '#ccc',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Products
        </button>
        <button
          onClick={() => setTestMode('cart')}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            backgroundColor: testMode === 'cart' ? '#0070f3' : '#ccc',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Cart
        </button>
        <button
          onClick={() => setTestMode('wishlist')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: testMode === 'wishlist' ? '#0070f3' : '#ccc',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Wishlist
        </button>
      </div>

      {/* Products Test */}
      {testMode === 'products' && (
        <div>
          <h2>Products Hook Test</h2>
          {productsLoading && <p>Loading products...</p>}
          {productsError && <p style={{ color: 'red' }}>Error: {productsError}</p>}

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: '0.5rem', marginRight: '1rem' }}
            >
              <option value="all">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.slug}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '0.5rem' }}
            >
              <option value="default">Orden por defecto</option>
              <option value="price-low">Precio: menor a mayor</option>
              <option value="price-high">Precio: mayor a menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>

          <p>
            Total productos: {products.length} | Filtrados: {filteredProducts.length}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            {filteredProducts.slice(0, 6).map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid #ddd',
                  padding: '1rem',
                  borderRadius: '8px',
                }}
              >
                <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  {product.title || product.name}
                </h3>
                <p style={{ color: '#666', fontSize: '0.8rem' }}>${product.price}</p>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.8rem',
                    backgroundColor: isInWishlist(product.id) ? '#ff6b6b' : '#4ecdc4',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {isInWishlist(product.id) ? '❤️ En wishlist' : '🤍 Agregar'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart Test */}
      {testMode === 'cart' && (
        <div>
          <h2>Cart Hook Test</h2>
          <p>Items en carrito: {itemCount}</p>
          <p>Total: ${total.toFixed(2)}</p>
          <button
            onClick={clearCart}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            Limpiar carrito
          </button>

          <div>
            {cartItems.length === 0 ? (
              <p>Carrito vacío</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid #ddd',
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <h3>{item.title || item.name}</h3>
                    <p>
                      Cantidad: {item.quantity} | Precio: ${item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Remover
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Wishlist Test */}
      {testMode === 'wishlist' && (
        <div>
          <h2>Wishlist Hook Test</h2>
          <p>Items en wishlist: {wishlistCount}</p>
          <p>IDs: {wishlistItems.join(', ') || 'Ninguno'}</p>
        </div>
      )}
    </div>
  );
}

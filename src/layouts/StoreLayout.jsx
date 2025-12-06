import React, { useState } from 'react';
import StoreHeader from './StoreHeader';
import Footer from './Footer';

export default function StoreLayout({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  return (
    <div className="bg-white text-gray-800 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      <StoreHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showWishlistOnly={showWishlistOnly}
        setShowWishlistOnly={setShowWishlistOnly}
        wishlist={wishlist}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

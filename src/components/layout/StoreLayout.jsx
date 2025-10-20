import React from 'react';
import Footer from './Footer';

export default function StoreLayout({ children }) {
  return (
    <div className="bg-white text-gray-800 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

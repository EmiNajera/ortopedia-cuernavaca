import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="bg-white text-gray-800 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

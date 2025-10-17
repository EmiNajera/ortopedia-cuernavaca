import React from 'react';
import MarketingHeader from './MarketingHeader';
import Footer from './Footer';

export default function MarketingLayout({ children }) {
  return (
    <div className="bg-white text-gray-800 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      <MarketingHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

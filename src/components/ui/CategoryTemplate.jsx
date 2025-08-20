import React from 'react';
import { Link } from 'react-router-dom';

const CategoryTemplate = ({ 
  categoryName, 
  categorySlug, 
  description, 
  productCount, 
  imageUrl, 
  bgColor = "bg-blue-500",
  textColor = "text-white",
  icon = "🏥"
}) => {
  return (
    <Link 
      to={`/categoria/${categorySlug}`}
      className={`${bgColor} ${textColor} rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer block`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        <div className="text-right">
          <span className="text-sm opacity-80">{productCount} productos</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">{categoryName}</h3>
        <p className="text-sm opacity-90 line-clamp-2">{description}</p>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Ver productos</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};

export default CategoryTemplate; 
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CategoryTemplate = ({
  categoryName,
  categorySlug,
  description,
  imageUrl,
  variant = 'card', // 'card' (vertical) or 'row' (horizontal compact)
}) => {
  if (variant === 'row') {
    return (
      <Link
        href={`/categoria/${categorySlug}`}
        className="group bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={categoryName}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">{categoryName}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    );
  }

  // Vertical modern card
  return (
    <Link
      href={`/categoria/${categorySlug}`}
      className="group block rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[16/9] w-full bg-gray-100">
        {imageUrl ? (
          <Image src={imageUrl} alt={categoryName} fill className="object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-xl font-semibold drop-shadow-sm">{categoryName}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
            Explorar
          </span>
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default CategoryTemplate;

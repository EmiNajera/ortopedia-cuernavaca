import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 - Error del servidor | OrtoTech</title>
        <meta name="description" content="Ha ocurrido un error interno del servidor." />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">500</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Error del servidor
          </h2>
          <p className="text-gray-600 mb-8">
            Ha ocurrido un error interno. Por favor, intenta de nuevo más tarde.
          </p>
          <Link 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}

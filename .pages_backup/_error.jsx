import React from 'react';
import Head from 'next/head';

function Error({ statusCode }) {
  return (
    <>
      <Head>
        <title>Error - Ortopedia Cuernavaca</title>
        <meta name="description" content="Ha ocurrido un error en la página" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            {statusCode ? statusCode : 'Error'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {statusCode
              ? `Ha ocurrido un error ${statusCode} en el servidor`
              : 'Ha ocurrido un error en el cliente'}
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

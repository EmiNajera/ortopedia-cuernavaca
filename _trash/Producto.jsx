import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { openWhatsApp } from '../../utils/whatsapp';
import { useProduct } from '../../hooks/useProducts';

const Producto = () => {
  const router = useRouter();
  const { productId } = router.query;
  // Solo hacer la petición cuando el router esté listo y tengamos un productId
  const { product, loading, error } = useProduct(router.isReady ? productId : null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleConsult = () => {
    if (!product) return;
    const message = `Hola, me interesa obtener más información sobre: ${product.title}${product.brand && product.brand !== 'Sin marca' ? ` (Marca: ${product.brand})` : ''}${quantity > 1 ? ` (Cantidad: ${quantity})` : ''}`;
    openWhatsApp(undefined, message);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Producto no encontrado
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            {error || 'El producto que buscas no existe.'}
          </p>
          <Link
            href="/tienda"
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base min-h-[44px] inline-flex items-center"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 sm:mb-8">
        <ol className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Inicio
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/tienda" className="hover:text-blue-600 transition-colors">
              Tienda
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/tienda?categoria=${product.category}`}
              className="hover:text-blue-600 capitalize transition-colors"
            >
              {product.category}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 truncate">{product.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Galería de imágenes */}
        <div className="space-y-3 sm:space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm">
            <Image
              src={
                product.images?.[selectedImage] ||
                product.images?.[0] ||
                '/images/products/placeholder.svg'
              }
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                    selectedImage === index
                      ? 'border-blue-600 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 16vw, 13vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              {product.title}
            </h1>
            {/* Marca */}
            {product.brand && product.brand !== 'Sin marca' && (
              <div className="mb-4">
                <span className="inline-block text-sm sm:text-base font-medium text-gray-500 uppercase tracking-wide bg-gray-100 px-3 py-1.5 rounded-full">
                  {product.brand}
                </span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              Descripción
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {product.description || product.shortDescription}
            </p>
          </div>

          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Características
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-0.5 text-sm">✓</span>
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Especificaciones
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <span className="text-sm text-gray-600 capitalize">{key}:</span>
                    <span className="text-sm font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad y botones - Modo Catálogo */}
          <div className="space-y-4 sm:space-y-6">
            {product.inStock && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <label className="text-sm font-medium text-gray-700">Cantidad de interés:</label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    disabled={quantity >= (product.stock || 10)}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleConsult}
                className="flex-1 bg-blue-600 text-white py-3 sm:py-4 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold text-sm sm:text-base min-h-[48px] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982a.394.394 0 01-.38-.105l-.893-.893a.393.393 0 01-.105-.38l.982-3.741-.214-.361a9.87 9.87 0 01-1.378-5.031c0-5.45 4.436-9.884 9.884-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.001 5.444-4.437 9.878-9.885 9.878m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Consultar Disponibilidad
              </button>
              <button
                onClick={() => router.push(`/servicios/detalle/${product.category}`)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 sm:py-4 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold text-sm sm:text-base min-h-[48px] shadow-sm hover:shadow-md"
              >
                Ver Servicio Relacionado
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Este es un catálogo informativo. Para comprar, consulta disponibilidad por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Producto;

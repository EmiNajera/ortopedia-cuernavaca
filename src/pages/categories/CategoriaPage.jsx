import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

// ProductCard component (reutilizado de TiendaCompleta)
const ProductCard = ({ imgSrc, description, price, action = "Agregar al Carrito", productId = "1", onWishlistToggle, isInWishlist }) => (
  <div className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-lg shadow-md text-center p-4 m-2 transform hover:scale-105 transition-transform duration-200 relative">
    {/* Wishlist Button */}
    <button 
      className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
      onClick={(e) => {
        e.stopPropagation();
        onWishlistToggle(productId);
      }}
    >
      <svg 
        className={`w-4 h-4 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
    
    <img src={imgSrc} alt={description} className="h-32 mx-auto mb-2 object-contain cursor-pointer" onClick={() => window.location.href = `/producto/${productId}`} />
    <p className="text-sm text-gray-700 h-16 font-medium cursor-pointer hover:text-blue-600" onClick={() => window.location.href = `/producto/${productId}`}>{description}</p>
    {price && <p className="text-lg font-bold text-blue-900">{price}</p>}
    <button 
      className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      onClick={() => {
        if (action === "Agregar al Carrito") {
          alert(`Producto "${description}" agregado al carrito`);
        } else if (action === "Agendar Cita") {
          window.location.href = '/citas';
        } else {
          alert(`Función ${action} en desarrollo`);
        }
      }}
    >
      {action}
    </button>
  </div>
);

export default function CategoriaPage() {
  const { categorySlug } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Datos de categorías
  const categories = {
    plantillas: {
      name: "Plantillas Ortopédicas",
      description: "Plantillas personalizadas para diferentes tipos de pie y actividades",
      icon: "👣",
      bgColor: "bg-blue-500",
      products: [
        { id: "1", imgSrc: "https://placehold.co/150x150/3498DB/ffffff?text=Plantilla+1", description: "Plantilla para pie plano grado 1", price: "$550.00" },
        { id: "6", imgSrc: "https://placehold.co/150x150/2980B9/ffffff?text=Plantilla+2", description: "Plantilla para pie cavo", price: "$650.00" },
        { id: "7", imgSrc: "https://placehold.co/150x150/1ABC9C/ffffff?text=Plantilla+3", description: "Plantilla deportiva", price: "$450.00" },
        { id: "8", imgSrc: "https://placehold.co/150x150/16A085/ffffff?text=Plantilla+4", description: "Plantilla antifatiga", price: "$380.00" },
        { id: "9", imgSrc: "https://placehold.co/150x150/8E44AD/ffffff?text=Plantilla+5", description: "Plantilla postural", price: "$520.00" },
        { id: "10", imgSrc: "https://placehold.co/150x150/2C3E50/ffffff?text=Plantilla+6", description: "Plantilla personalizada", price: "$750.00" }
      ]
    },
    fajas: {
      name: "Fajas y Soporte",
      description: "Fajas ortopédicas para diferentes partes del cuerpo",
      icon: "🩹",
      bgColor: "bg-green-500",
      products: [
        { id: "11", imgSrc: "https://placehold.co/150x150/27AE60/ffffff?text=Faja+1", description: "Faja lumbar con soporte", price: "$750.00" },
        { id: "12", imgSrc: "https://placehold.co/150x150/00D4AA/ffffff?text=Faja+2", description: "Faja abdominal postparto", price: "$850.00" },
        { id: "13", imgSrc: "https://placehold.co/150x150/F39C12/ffffff?text=Faja+3", description: "Faja deportiva", price: "$650.00" },
        { id: "14", imgSrc: "https://placehold.co/150x150/E74C3C/ffffff?text=Faja+4", description: "Faja torácica", price: "$580.00" },
        { id: "15", imgSrc: "https://placehold.co/150x150/9B59B6/ffffff?text=Faja+5", description: "Faja pélvica", price: "$720.00" }
      ]
    },
    ortesis: {
      name: "Ortesis y Rodilleras",
      description: "Ortesis para rodillas, tobillos y otras articulaciones",
      icon: "🦴",
      bgColor: "bg-purple-500",
      products: [
        { id: "16", imgSrc: "https://placehold.co/150x150/8E44AD/ffffff?text=Rodillera+1", description: "Rodillera ortopédica", price: "$450.00" },
        { id: "17", imgSrc: "https://placehold.co/150x150/2C3E50/ffffff?text=Rodillera+2", description: "Rodillera deportiva", price: "$350.00" },
        { id: "18", imgSrc: "https://placehold.co/150x150/1ABC9C/ffffff?text=Tobillera", description: "Tobillera elástica", price: "$250.00" },
        { id: "19", imgSrc: "https://placehold.co/150x150/3498DB/ffffff?text=Codera", description: "Codera ortopédica", price: "$320.00" },
        { id: "20", imgSrc: "https://placehold.co/150x150/2980B9/ffffff?text=Muñequera", description: "Muñequera deportiva", price: "$280.00" }
      ]
    },
    calzado: {
      name: "Calzado Ortopédico",
      description: "Zapatos y calzado especializado para diferentes necesidades",
      icon: "👟",
      bgColor: "bg-orange-500",
      products: [
        { id: "21", imgSrc: "https://placehold.co/150x150/E67E22/ffffff?text=Zapato+1", description: "Calzado ortopédico infantil", price: "$890.00" },
        { id: "22", imgSrc: "https://placehold.co/150x150/D35400/ffffff?text=Zapato+2", description: "Calzado ortopédico adulto", price: "$1,200.00" },
        { id: "23", imgSrc: "https://placehold.co/150x150/F39C12/ffffff?text=Zapato+3", description: "Calzado deportivo ortopédico", price: "$950.00" },
        { id: "24", imgSrc: "https://placehold.co/150x150/E74C3C/ffffff?text=Zapato+4", description: "Zapato para diabéticos", price: "$1,350.00" },
        { id: "25", imgSrc: "https://placehold.co/150x150/C0392B/ffffff?text=Zapato+5", description: "Zapato post-operatorio", price: "$680.00" }
      ]
    },
    rehabilitacion: {
      name: "Rehabilitación y Fisioterapia",
      description: "Equipos y productos para rehabilitación y fisioterapia",
      icon: "💪",
      bgColor: "bg-red-500",
      products: [
        { id: "26", imgSrc: "https://placehold.co/150x150/E74C3C/ffffff?text=Masajeador", description: "Masajeador percutor", price: "$1,200.00" },
        { id: "27", imgSrc: "https://placehold.co/150x150/C0392B/ffffff?text=Electroestimulador", description: "Electroestimulador TENS", price: "$950.00" },
        { id: "28", imgSrc: "https://placehold.co/150x150/8E44AD/ffffff?text=Bandas", description: "Bandas de resistencia (kit)", price: "$450.00" },
        { id: "29", imgSrc: "https://placehold.co/150x150/2C3E50/ffffff?text=Aceite", description: "Aceites ortopédicos", price: "$300.00" },
        { id: "30", imgSrc: "https://placehold.co/150x150/1ABC9C/ffffff?text=Compresor", description: "Compresor de frío/calor", price: "$580.00" }
      ]
    },
    pediatria: {
      name: "Ortopedia Pediátrica",
      description: "Productos especializados para niños y adolescentes",
      icon: "👶",
      bgColor: "bg-pink-500",
      products: [
        { id: "31", imgSrc: "https://placehold.co/150x150/E91E63/ffffff?text=Zapato+Niño", description: "Zapato ortopédico infantil", price: "$980.00" },
        { id: "32", imgSrc: "https://placehold.co/150x150/AD1457/ffffff?text=Plantilla+Niño", description: "Plantilla pediátrica a medida", price: "$700.00" },
        { id: "33", imgSrc: "https://placehold.co/150x150/880E4F/ffffff?text=Férula+Niño", description: "Férula infantil para displasia", price: "$1,500.00" },
        { id: "34", imgSrc: "https://placehold.co/150x150/FF4081/ffffff?text=Rodillera+Niño", description: "Rodillera pediátrica", price: "$420.00" },
        { id: "35", imgSrc: "https://placehold.co/150x150/F50057/ffffff?text=Calzado+Niño", description: "Calzado deportivo infantil", price: "$850.00" }
      ]
    }
  };

  const currentCategory = categories[categorySlug];

  // Función para filtrar y ordenar productos
  const getFilteredAndSortedProducts = () => {
    if (!currentCategory) return [];
    
    let products = currentCategory.products;
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      products = products.filter(product => 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por wishlist
    if (showWishlistOnly) {
      products = products.filter(product => wishlist.includes(product.id));
    }
    
    // Ordenar productos
    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => parseFloat(a.price.replace('$', '').replace(',', '')) - parseFloat(b.price.replace('$', '').replace(',', '')));
      case 'price-high':
        return products.sort((a, b) => parseFloat(b.price.replace('$', '').replace(',', '')) - parseFloat(a.price.replace('$', '').replace(',', '')));
      case 'name':
        return products.sort((a, b) => a.description.localeCompare(b.description));
      default:
        return products;
    }
  };

  const handleAddToWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const productosMostrados = getFilteredAndSortedProducts();

  if (!currentCategory) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
            <p className="text-gray-600 mb-6">La categoría que buscas no existe.</p>
            <Link to="/tienda" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Header de la categoría */}
        <div className={`${currentCategory.bgColor} text-white p-8 rounded-lg mb-8`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-6xl">{currentCategory.icon}</div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{currentCategory.name}</h1>
                <p className="text-lg opacity-90">{currentCategory.description}</p>
                <p className="text-sm opacity-80 mt-2">{currentCategory.products.length} productos disponibles</p>
              </div>
            </div>
            <Link to="/tienda" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
              ← Volver a tienda
            </Link>
          </div>
        </div>

        {/* Controles de búsqueda y filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Búsqueda */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Buscar en ${currentCategory.name.toLowerCase()}...`}
                className="w-full border-2 border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Ordenamiento */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Recomendados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showWishlistOnly 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favoritos ({wishlist.length})
              </span>
            </button>
          </div>

          {/* Información de resultados */}
          <div className="mt-4 text-sm text-gray-600">
            Mostrando {productosMostrados.length} productos
            {searchTerm && ` para "${searchTerm}"`}
          </div>
        </div>

        {/* Productos */}
        {productosMostrados.length > 0 ? (
          <div className="flex overflow-x-auto pb-4 -mx-2">
            {productosMostrados.map((producto, index) => (
              <ProductCard 
                key={index}
                imgSrc={producto.imgSrc} 
                description={producto.description} 
                price={producto.price} 
                action="Agregar al Carrito"
                productId={producto.id}
                onWishlistToggle={handleAddToWishlist}
                isInWishlist={wishlist.includes(producto.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">{currentCategory.icon}</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 mb-4">Intenta con otros términos de búsqueda</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* Navegación entre categorías */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Otras categorías</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(categories).map(([slug, category]) => (
              <Link
                key={slug}
                to={`/categoria/${slug}`}
                className={`${category.bgColor} text-white p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  slug === categorySlug ? 'ring-4 ring-blue-300' : ''
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h4 className="font-medium text-sm">{category.name}</h4>
                <p className="text-xs opacity-80 mt-1">{category.products.length} productos</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 
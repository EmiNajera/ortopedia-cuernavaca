import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Card para productos con funcionalidades mejoradas
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
    
    <div className="h-32 mb-2 flex items-center justify-center cursor-pointer" onClick={() => window.location.href = `/producto/${productId}`}>
      <Image src={imgSrc} alt={description} width={150} height={150} className="object-contain" />
    </div>
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

export default function TiendaCompleta() {
  const searchParams = useSearchParams();
  const categoria = searchParams?.get('categoria');
  const [categoriaActiva, setCategoriaActiva] = useState(categoria || 'todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  useEffect(() => {
    if (searchParams) {
      const categoriaFromParams = searchParams.get('categoria');
      setCategoriaActiva(categoriaFromParams || 'todos');
    }
  }, [searchParams]);

  // Función para filtrar productos por categoría
  const productosPorCategoria = {
    todos: [
      { id: "1", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Plantilla", description: "Plantilla para pie plano grado 1", price: "$550.00" },
      { id: "2", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Zapato", description: "Calzado ortopédico infantil", price: "$890.00" },
      { id: "3", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Faja", description: "Faja lumbar con soporte", price: "$750.00" },
      { id: "4", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Muletas", description: "Muletas de aluminio", price: "$600.00" },
      { id: "5", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Silla", description: "Silla de ruedas estándar", price: "$2,500.00" }
    ],
    plantillas: [
      { id: "1", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Plantilla+1", description: "Plantilla para pie plano grado 1", price: "$550.00" },
      { id: "6", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Plantilla+2", description: "Plantilla para pie cavo", price: "$650.00" },
      { id: "7", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Plantilla+3", description: "Plantilla deportiva", price: "$450.00" }
    ],
    fajas: [
      { id: "3", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Faja+1", description: "Faja lumbar con soporte", price: "$750.00" },
      { id: "8", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Faja+2", description: "Faja abdominal postparto", price: "$850.00" },
      { id: "9", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Faja+3", description: "Faja deportiva", price: "$650.00" }
    ],
    ortesis: [
      { id: "10", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Rodillera+1", description: "Rodillera ortopédica", price: "$450.00" },
      { id: "11", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Rodillera+2", description: "Rodillera deportiva", price: "$350.00" },
      { id: "12", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Tobillera", description: "Tobillera elástica", price: "$250.00" }
    ],
    calzado: [
      { id: "2", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Zapato+1", description: "Calzado ortopédico infantil", price: "$890.00" },
      { id: "13", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Zapato+2", description: "Calzado ortopédico adulto", price: "$1,200.00" },
      { id: "14", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Zapato+3", description: "Calzado deportivo ortopédico", price: "$950.00" }
    ],
    rehabilitacion: [
      { id: "15", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Masajeador", description: "Masajeador percutor", price: "$1,200.00" },
      { id: "16", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Electroestimulador", description: "Electroestimulador TENS", price: "$950.00" },
      { id: "17", imgSrc: "https://placehold.co/150x150/eeeeee/333333?text=Bandas", description: "Bandas de resistencia (kit)", price: "$450.00" }
    ]
  };

  // Función para filtrar y ordenar productos
  const getFilteredAndSortedProducts = () => {
    let products = productosPorCategoria[categoriaActiva] || productosPorCategoria.todos;
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      products = products.filter(product => 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar solo wishlist si está activado
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

  return (
    <div className="bg-white font-sans">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-xs py-2 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/citas" className="hover:underline">Agendar consulta</Link>
          <a href="#" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Sistema de facturación en desarrollo'); }}>Facturación</a>
                      <Link href="/nosotros" className="hover:underline">Ortopedia Cuernavaca</Link>
                      <Link href="/contacto" className="hover:underline">Contáctanos</Link>
        </div>
        <div className="flex items-center space-x-4 font-semibold">
          <span>Ortopedia Cuernavaca: 777 311 2867</span>
          <span className="hidden md:inline">·</span>
          <span>Ortochavitos: 777 311 9837</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md py-4 px-4 md:px-8 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/tienda" className="flex items-center">
            <img 
              src="/images/banners/LogoOrtochavitos.svg" 
              alt="Ortochavitos Logo" 
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
            />
          </Link>
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar productos, servicios o especialidades..." 
                className="w-full border-2 border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/carrito" className="relative hover:text-blue-600 transition-colors">
              <div className="relative">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007.53 17h10.94a1 1 0 00.88-.53L21 13M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </div>
            </Link>
            <button 
              className="relative hover:text-red-600 transition-colors"
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-200 py-2 px-4 md:px-8 border-t border-b border-gray-300">
        <div className="container mx-auto flex justify-center items-center space-x-4 md:space-x-6 text-sm font-semibold text-blue-900 overflow-x-auto whitespace-nowrap">
          <Link href="/tienda" className="hover:text-blue-600">TODO</Link>
          <Link href="/tienda?categoria=plantillas" className="hover:text-blue-600">Plantillas</Link>
          <Link href="/tienda?categoria=ferulas" className="hover:text-blue-600">Férulas</Link>
          <Link href="/tienda?categoria=protesis" className="hover:text-blue-600">Prótesis</Link>
          <Link href="/tienda?categoria=rehabilitacion" className="hover:text-blue-600">Rehabilitación</Link>
          <Link href="/tienda?categoria=calzado" className="hover:text-blue-600">Calzado ortopédico</Link>
          <Link href="/citas" className="hover:text-blue-600">Consulta clínica</Link>

          <a href="#" className="text-red-600 font-bold hover:text-red-700" onClick={(e) => { e.preventDefault(); alert('Sección de ofertas en desarrollo'); }}>Ofertas</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 md:px-8">
        {/* Hero Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 rounded-lg p-4 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/800x300/e0f7fa/143d59?text=Atención+Clínica+Personalizada')"}}>
             <div className="text-center text-blue-900 bg-white/70 p-6 rounded-lg">
                <h2 className="text-3xl font-bold">Soluciones ortopédicas personalizadas desde 1995</h2>
                <p>Plantillas adaptadas a tu pie con estudio clínico</p>
             </div>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-600 rounded-lg p-2">
                <img src="https://placehold.co/400x142/1ebbd7/ffffff?text=Toma+de+Molde" alt="Toma de Molde" className="w-full h-auto rounded-lg" />
            </div>
            <div className="bg-blue-900 rounded-lg p-2">
                <img src="https://placehold.co/400x142/143d59/ffffff?text=Consulta+con+Ortesista" alt="Consulta con Ortesista" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>

        {/* Promociones Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">¡OFERTAS ESPECIALES!</h3>
                <p className="text-lg">Hasta 50% de descuento en productos seleccionados</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">🔥 HOT</div>
              <div className="text-sm">Válido hasta fin de mes</div>
            </div>
          </div>
        </div>

        {/* Countdown Banner */}
        <div className="bg-blue-600 text-white p-6 rounded-lg mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">PROXIMAMENTE: Black Friday Ortopédico</h3>
                <p className="text-sm">Del 25 al 30 de noviembre de 2024</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">05 Días</div>
              <div className="text-sm">06:15:32</div>
            </div>
          </div>
        </div>
        
        {/* Payment/Delivery Options */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex justify-around items-center text-center text-sm font-medium">
            <div className="flex items-center space-x-2">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p>Aceptamos efectivo, tarjeta y transferencia</p>
            </div>
            <div className="flex items-center space-x-2">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <p>Entrega local en Cuernavaca o recojo en sucursal</p>
            </div>
             <div className="flex items-center space-x-2">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <p>Consulta + Plantillas desde $900</p>
            </div>
        </div>

        {/* Navegación de Categorías */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-900">Explorar por Categorías</h2>
            <Link 
              to="/categorias" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2"
            >
              <span>Ver todas las categorías</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Grid de Categorías */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {[
              { name: "Plantillas", slug: "plantillas", icon: "👣", color: "bg-blue-500", count: 6 },
              { name: "Fajas", slug: "fajas", icon: "🩹", color: "bg-green-500", count: 5 },
              { name: "Ortesis", slug: "ortesis", icon: "🦴", color: "bg-purple-500", count: 5 },
              { name: "Calzado", slug: "calzado", icon: "👟", color: "bg-orange-500", count: 5 },
              { name: "Rehabilitación", slug: "rehabilitacion", icon: "💪", color: "bg-red-500", count: 5 },
              { name: "Pediatría", slug: "pediatria", icon: "👶", color: "bg-pink-500", count: 5 }
            ].map((category, index) => (
              <Link
                key={index}
                to={`/categoria/${category.slug}`}
                className={`${category.color} text-white p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  categoriaActiva === category.slug ? 'ring-4 ring-blue-300' : ''
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                <p className="text-xs opacity-80">{category.count} productos</p>
              </Link>
            ))}
          </div>

          {/* Filtro de Categorías (versión compacta) */}
          <div className="flex flex-wrap gap-2">
            <Link 
              to="/tienda" 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                categoriaActiva === 'todos' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos
            </Link>
            <Link 
              to="/categoria/plantillas" 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                categoriaActiva === 'plantillas' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Plantillas
            </Link>
            <Link 
              to="/categoria/fajas" 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                categoriaActiva === 'fajas' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fajas
            </Link>
            <Link 
              to="/categoria/ortesis" 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                categoriaActiva === 'ortesis' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ortesis
            </Link>
            <Link 
              to="/categoria/calzado" 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                categoriaActiva === 'calzado' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Calzado
            </Link>
            <Link 
              to="/categoria/rehabilitacion" 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                categoriaActiva === 'rehabilitacion' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Rehabilitación
            </Link>
            <Link 
              to="/categoria/pediatria" 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                categoriaActiva === 'pediatria' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pediatría
            </Link>
          </div>
          
          {/* Controles de Filtro y Ordenamiento */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
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
            
            <div className="flex items-center gap-4">
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
              
              <div className="text-sm text-gray-600">
                Mostrando {productosMostrados.length} productos
                {searchTerm && ` para "${searchTerm}"`}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            {categoriaActiva === 'todos' ? 'Productos Destacados' : `Productos - ${categoriaActiva.charAt(0).toUpperCase() + categoriaActiva.slice(1)}`}
          </h2>
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
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
              <p className="text-gray-600">Intenta con otros términos de búsqueda o categorías</p>
            </div>
          )}
        </section>

        {/* Ofertas Especiales */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Aprovecha estas Ofertas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { img: "https://placehold.co/150x150/FF6B6B/ffffff?text=Plantilla", name: "Plantilla Premium", originalPrice: "$800", discountPrice: "$520", discount: "35%", color: "bg-red-500" },
              { img: "https://placehold.co/150x150/4ECDC4/ffffff?text=Faja", name: "Faja Lumbar Pro", originalPrice: "$1,200", discountPrice: "$450", discount: "166%", color: "bg-teal-500" },
              { img: "https://placehold.co/150x150/45B7D1/ffffff?text=Rodillera", name: "Rodillera Deportiva", originalPrice: "$600", discountPrice: "$190", discount: "219%", color: "bg-blue-500" },
              { img: "https://placehold.co/150x150/96CEB4/ffffff?text=Calzado", name: "Calzado Ortopédico", originalPrice: "$1,500", discountPrice: "$1,125", discount: "25%", color: "bg-green-500" },
              { img: "https://placehold.co/150x150/FFEAA7/ffffff?text=Masajeador", name: "Masajeador Percutor", originalPrice: "$1,800", discountPrice: "$720", discount: "60%", color: "bg-yellow-500" },
              { img: "https://placehold.co/150x150/DDA0DD/ffffff?text=Electroestimulador", name: "Electroestimulador", originalPrice: "$950", discountPrice: "$433", discount: "119%", color: "bg-purple-500" }
            ].map((oferta, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={oferta.img} alt={oferta.name} className="w-full h-24 object-cover rounded-md mb-2" />
                  <div className={`absolute -top-2 -right-2 ${oferta.color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                    -{oferta.discount}
                  </div>
                </div>
                <h4 className="font-medium text-gray-800 text-sm mb-1">{oferta.name}</h4>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-gray-400 text-xs line-through">{oferta.originalPrice}</span>
                  <span className="text-blue-600 font-bold text-sm">{oferta.discountPrice}</span>
                </div>
                <button className="w-full mt-2 bg-orange-500 text-white py-1 px-2 rounded text-xs font-medium hover:bg-orange-600 transition-colors">
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Banner de Descuentos por Categoría */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg text-center">
            <div className="bg-white/20 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Todas las Plantillas</h3>
            <p className="text-2xl font-bold">35% de descuento</p>
            <p className="text-sm opacity-90">En productos seleccionados</p>
          </div>
          
          <div className="bg-red-500 text-white p-6 rounded-lg text-center">
            <div className="bg-white/20 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Productos Genéricos</h3>
            <p className="text-2xl font-bold">HASTA 85%</p>
            <p className="text-sm opacity-90">de descuento</p>
          </div>
          
          <div className="bg-green-500 text-white p-6 rounded-lg text-center">
            <div className="bg-white/20 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Nuevos Productos</h3>
            <p className="text-2xl font-bold">Llegada</p>
            <p className="text-sm opacity-90">Descubre lo nuevo</p>
          </div>
        </div>

        {/* Los Mejores Packs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Los Mejores Packs</h2>
          <div className="flex overflow-x-auto pb-4 -mx-2 space-x-4">
            {[
              { img: "https://placehold.co/200x150/FF6B6B/ffffff?text=Pack+1", name: "Pack Plantillas Premium", description: "2 Plantillas + Consulta", price: "$1,200", originalPrice: "$1,800", discount: "33%" },
              { img: "https://placehold.co/200x150/4ECDC4/ffffff?text=Pack+2", name: "Pack Rehabilitación", description: "Masajeador + Bandas", price: "$1,500", originalPrice: "$2,100", discount: "29%" },
              { img: "https://placehold.co/200x150/45B7D1/ffffff?text=Pack+3", name: "Pack Ortesis Completo", description: "Rodillera + Tobillera", price: "$600", originalPrice: "$900", discount: "33%" },
              { img: "https://placehold.co/200x150/96CEB4/ffffff?text=Pack+4", name: "Pack Pediátrico", description: "Calzado + Plantillas", price: "$1,800", originalPrice: "$2,400", discount: "25%" },
              { img: "https://placehold.co/200x150/FFEAA7/ffffff?text=Pack+5", name: "Pack Familiar", description: "4 Plantillas + 2 Fajas", price: "$2,500", originalPrice: "$3,600", discount: "31%" }
            ].map((pack, index) => (
              <div key={index} className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={pack.img} alt={pack.name} className="w-full h-32 object-cover rounded-md mb-3" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{pack.discount}
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">{pack.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{pack.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 text-sm line-through">{pack.originalPrice}</span>
                  <span className="text-blue-600 font-bold text-lg">{pack.price}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Agregar Pack
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Lo Más Buscado */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Lo Más Buscado</h2>
          <div className="flex overflow-x-auto pb-4 -mx-2 space-x-4">
            {[
              { img: "https://placehold.co/150x150/FF6B6B/ffffff?text=Plantilla", name: "Plantilla para Pie Plano", price: "$550", popular: true },
              { img: "https://placehold.co/150x150/4ECDC4/ffffff?text=Faja", name: "Faja Lumbar", price: "$750", popular: true },
              { img: "https://placehold.co/150x150/45B7D1/ffffff?text=Rodillera", name: "Rodillera Ortopédica", price: "$450", popular: true },
              { img: "https://placehold.co/150x150/96CEB4/ffffff?text=Calzado", name: "Calzado Ortopédico", price: "$1,200", popular: true },
              { img: "https://placehold.co/150x150/FFEAA7/ffffff?text=Masajeador", name: "Masajeador Percutor", price: "$1,200", popular: true },
              { img: "https://placehold.co/150x150/DDA0DD/ffffff?text=Electroestimulador", name: "Electroestimulador TENS", price: "$950", popular: true }
            ].map((producto, index) => (
              <div key={index} className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={producto.img} alt={producto.name} className="w-full h-24 object-cover rounded-md mb-2" />
                  {producto.popular && (
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      🔥
                    </div>
                  )}
                </div>
                <h4 className="font-medium text-gray-800 text-sm mb-1">{producto.name}</h4>
                <p className="text-blue-600 font-bold text-sm mb-2">{producto.price}</p>
                <button className="w-full bg-blue-600 text-white py-1 px-3 rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Fisioterapia Section */}
        <section className="mb-12 bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-4xl font-bold text-blue-900">Fisioterapia y Rehabilitación</h2>
                <img src="https://placehold.co/200x50/ffffff/143d59?text=Clínica" alt="Clínica Logo" className="h-12"/>
            </div>
             <div className="bg-white rounded-lg p-4 mb-8 bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/1100x200/e0f7fa/143d59?text=Paciente+en+sesión+de+rehabilitación')"}}>
            </div>
                         <div className="flex overflow-x-auto pb-4 -mx-2">
                 <ProductCard imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Masajeador" description="Masajeador percutor" price="$1,200.00" productId="15" onWishlistToggle={handleAddToWishlist} isInWishlist={wishlist.includes("15")} />
                 <ProductCard imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Electroestimulador" description="Electroestimulador TENS" price="$950.00" productId="16" onWishlistToggle={handleAddToWishlist} isInWishlist={wishlist.includes("16")} />
                 <ProductCard imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Bandas" description="Bandas de resistencia (kit)" price="$450.00" productId="17" onWishlistToggle={handleAddToWishlist} isInWishlist={wishlist.includes("17")} />
                 <ProductCard imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Aceite" description="Aceites ortopédicos" price="$300.00" productId="18" onWishlistToggle={handleAddToWishlist} isInWishlist={wishlist.includes("18")} />
             </div>
        </section>
        
        {/* Ortopedia Pediátrica */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Ortopedia Pediátrica (Ortochavitos)</h2>
                     <div className="flex overflow-x-auto pb-4 -mx-2">
             <ProductCard imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Zapato+Niño" description="Zapato ortopédico infantil" price="$980.00" productId="19" onWishlistToggle={handleAddToWishlist} isInWishlist={wishlist.includes("19")} />
             <ProductCard imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Plantilla+Niño" description="Plantilla pediátrica a medida" price="Desde $700" action="Agendar Cita" productId="20" onWishlistToggle={handleAddToWishlist} isInWishlist={wishlist.includes("20")} />
             <ProductCard imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Férula+Niño" description="Férula infantil para displasia" price="$1,500.00" productId="21" onWishlistToggle={handleAddToWishlist} isInWishlist={wishlist.includes("21")} />
           </div>
        </section>

        {/* Artículos de Salud y Bienestar */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Artículos para tu Salud y Bienestar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                img: "https://placehold.co/300x200/FF6B6B/ffffff?text=Artículo+1", 
                title: "Cómo elegir la plantilla correcta", 
                description: "Guía completa para seleccionar la plantilla ortopédica ideal para tu tipo de pie y actividad.",
                category: "Ortopedia"
              },
              { 
                img: "https://placehold.co/300x200/4ECDC4/ffffff?text=Artículo+2", 
                title: "Prevención de lesiones deportivas", 
                description: "Consejos y técnicas para prevenir lesiones durante la práctica deportiva.",
                category: "Deportes"
              },
              { 
                img: "https://placehold.co/300x200/45B7D1/ffffff?text=Artículo+3", 
                title: "Cuidado postural en el trabajo", 
                description: "Recomendaciones para mantener una postura correcta durante las horas laborales.",
                category: "Ergonomía"
              },
              { 
                img: "https://placehold.co/300x200/96CEB4/ffffff?text=Artículo+4", 
                title: "Rehabilitación en casa", 
                description: "Ejercicios y técnicas de rehabilitación que puedes realizar en la comodidad de tu hogar.",
                category: "Rehabilitación"
              }
            ].map((articulo, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img src={articulo.img} alt={articulo.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="text-xs text-blue-600 font-medium mb-2">{articulo.category}</div>
                  <h4 className="font-bold text-gray-800 mb-2">{articulo.title}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{articulo.description}</p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                    Leer el artículo
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Ver todos los artículos
            </button>
          </div>
        </section>

        {/* Nuestras Marcas */}
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Nuestras Marcas</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-around items-center flex-wrap gap-8">
                    <img src="https://placehold.co/100x50/cccccc/333333?text=DonJoy" alt="DonJoy" className="h-10"/>
                    <img src="https://placehold.co/100x50/cccccc/333333?text=Orliman" alt="Orliman" className="h-10"/>
                    <img src="https://placehold.co/100x50/cccccc/333333?text=Medi" alt="Medi" className="h-10"/>
                    <img src="https://placehold.co/100x50/cccccc/333333?text=Ottobock" alt="Ottobock" className="h-10"/>
                    <img src="https://placehold.co/100x50/143d59/ffffff?text=Ortochavitos" alt="Ortochavitos" className="h-10"/>
                </div>
            </div>
        </section>

      </main>

        {/* Servicios Adicionales */}
        <section className="mb-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Ofrecemos estos servicios para facilitarte la vida</h2>
          <div className="flex overflow-x-auto pb-4 -mx-2 space-x-6">
            {[
              { icon: "💰", name: "Financiamiento", description: "Hasta 12 MSI sin intereses" },
              { icon: "🚚", name: "Entrega a Domicilio", description: "En Cuernavaca y alrededores" },
              { icon: "🏥", name: "Consulta Domiciliaria", description: "Evaluación en tu hogar" },
              { icon: "📞", name: "Atención 24/7", description: "Soporte telefónico" },
              { icon: "🔧", name: "Mantenimiento", description: "Servicio técnico gratuito" },
              { icon: "📋", name: "Seguimiento", description: "Control post-venta" }
            ].map((servicio, index) => (
              <div key={index} className="flex-shrink-0 w-48 bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">{servicio.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{servicio.name}</h4>
                <p className="text-gray-600 text-sm">{servicio.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Conoce todos nuestros servicios
            </button>
          </div>
        </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white pt-10">
        <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 className="font-bold text-lg mb-2 text-blue-400">¡Suscríbete a nuestras mejores ofertas!</h3>
                    <p className="text-sm mb-4">Recibe contenido sobre cuidado ortopédico y promociones exclusivas.</p>
                    <div className="flex">
                        <input type="email" placeholder="tu.correo@ejemplo.com" className="w-full rounded-l-md text-gray-800 px-3 py-2 focus:outline-none" />
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
                            onClick={() => alert('Sistema de suscripción en desarrollo')}
                        >
                            Suscribir
                        </button>
                    </div>
                    <div className="mt-4 flex space-x-4">
                        <img src="https://placehold.co/40x25/1a365d/ffffff?text=Visa" alt="Visa" className="h-6" />
                        <img src="https://placehold.co/40x25/1a365d/ffffff?text=Mastercard" alt="Mastercard" className="h-6" />
                        <img src="https://placehold.co/40x25/1a365d/ffffff?text=PayPal" alt="PayPal" className="h-6" />
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2 text-blue-400">Servicio al Cliente</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Preguntas frecuentes en desarrollo'); }}>Preguntas Frecuentes</a></li>
                        <li><a href="#" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Sistema de facturación en desarrollo'); }}>Facturación</a></li>
                        <li><Link href="/contacto" className="hover:underline">Contáctanos</Link></li>
                        <li><a href="#" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('WhatsApp en desarrollo'); }}>WhatsApp</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2 text-blue-400">Acerca de Nosotros</h3>
                    <ul className="text-sm space-y-2">
                        <li><Link href="/nosotros" className="hover:underline">Nuestra Historia</Link></li>
                        <li><a href="#" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Información sobre nuestra filosofía de atención en desarrollo'); }}>Filosofía de Atención</a></li>
                        <li><a href="#" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Trabaja con nosotros en desarrollo'); }}>Trabaja con Nosotros</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold text-lg mb-2 text-blue-400">Legal</h3>
                     <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Aviso de privacidad en desarrollo'); }}>Aviso de Privacidad</a></li>
                        <li><a href="#" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Términos y condiciones en desarrollo'); }}>Términos y Condiciones</a></li>
                        <li><a href="#" className="hover:underline" onClick={(e) => { e.preventDefault(); alert('Política de devoluciones en desarrollo'); }}>Política de Devoluciones</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-xs border-t border-blue-700 py-4 mt-4">
                <p>&copy; {new Date().getFullYear()} Ortopedia Cuernavaca. Todos los derechos reservados.</p>
            </div>
        </div>
      </footer>
    </div>
  );
} 
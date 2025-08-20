import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import CategoryTemplate from '../../components/ui/CategoryTemplate';

export default function Categorias() {
  const categories = [
    {
      categoryName: "Plantillas Ortopédicas",
      categorySlug: "plantillas",
      description: "Plantillas personalizadas para diferentes tipos de pie y actividades. Incluye plantillas para pie plano, cavo, deportivas y más.",
      productCount: 6,
      bgColor: "bg-blue-500",
      textColor: "text-white",
      icon: "👣"
    },
    {
      categoryName: "Fajas y Soporte",
      categorySlug: "fajas",
      description: "Fajas ortopédicas para diferentes partes del cuerpo. Soporte lumbar, abdominal, torácico y pélvico.",
      productCount: 5,
      bgColor: "bg-green-500",
      textColor: "text-white",
      icon: "🩹"
    },
    {
      categoryName: "Ortesis y Rodilleras",
      categorySlug: "ortesis",
      description: "Ortesis para rodillas, tobillos y otras articulaciones. Rodilleras, tobilleras, coderas y muñequeras.",
      productCount: 5,
      bgColor: "bg-purple-500",
      textColor: "text-white",
      icon: "🦴"
    },
    {
      categoryName: "Calzado Ortopédico",
      categorySlug: "calzado",
      description: "Zapatos y calzado especializado para diferentes necesidades. Calzado para diabéticos, post-operatorio y deportivo.",
      productCount: 5,
      bgColor: "bg-orange-500",
      textColor: "text-white",
      icon: "👟"
    },
    {
      categoryName: "Rehabilitación y Fisioterapia",
      categorySlug: "rehabilitacion",
      description: "Equipos y productos para rehabilitación y fisioterapia. Masajeadores, electroestimuladores y equipos de terapia.",
      productCount: 5,
      bgColor: "bg-red-500",
      textColor: "text-white",
      icon: "💪"
    },
    {
      categoryName: "Ortopedia Pediátrica",
      categorySlug: "pediatria",
      description: "Productos especializados para niños y adolescentes. Calzado infantil, plantillas pediátricas y férulas.",
      productCount: 5,
      bgColor: "bg-pink-500",
      textColor: "text-white",
      icon: "👶"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Nuestras Categorías</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestra amplia gama de productos ortopédicos organizados por categorías. 
            Encuentra exactamente lo que necesitas para tu salud y bienestar.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{categories.length}</div>
            <div className="text-gray-600">Categorías</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {categories.reduce((total, cat) => total + cat.productCount, 0)}
            </div>
            <div className="text-gray-600">Productos</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
            <div className="text-gray-600">Años de Experiencia</div>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-gray-600">Garantía</div>
          </div>
        </div>

        {/* Grid de Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <CategoryTemplate
              key={index}
              categoryName={category.categoryName}
              categorySlug={category.categorySlug}
              description={category.description}
              productCount={category.productCount}
              bgColor={category.bgColor}
              textColor={category.textColor}
              icon={category.icon}
            />
          ))}
        </div>

        {/* Sección de Información */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Por qué elegir nuestros productos?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="text-green-500 mt-1">✓</div>
                  <div>
                    <strong>Calidad Garantizada:</strong> Todos nuestros productos cumplen con los más altos estándares de calidad.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="text-green-500 mt-1">✓</div>
                  <div>
                    <strong>Asesoría Especializada:</strong> Nuestro equipo de profesionales te guía en la elección correcta.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="text-green-500 mt-1">✓</div>
                  <div>
                    <strong>Productos Personalizados:</strong> Adaptamos cada producto a tus necesidades específicas.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="text-green-500 mt-1">✓</div>
                  <div>
                    <strong>Seguimiento Post-Venta:</strong> Te acompañamos durante todo el proceso de uso.
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas ayuda?</h3>
              <p className="text-gray-600 mb-6">
                Nuestro equipo de especialistas está disponible para ayudarte a encontrar el producto perfecto para tus necesidades.
              </p>
              <div className="space-y-4">
                <Link 
                  to="/contacto"
                  className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Contactar Especialista
                </Link>
                <Link 
                  to="/citas"
                  className="block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Agendar Consulta
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿No encuentras lo que buscas?</h3>
          <p className="text-gray-600 mb-6">
            Explora nuestra tienda completa o contáctanos para productos personalizados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/tienda"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver Todos los Productos
            </Link>
            <Link 
              to="/contacto"
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Solicitar Producto Especial
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
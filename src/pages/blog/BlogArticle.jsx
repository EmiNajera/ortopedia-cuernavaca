import React from 'react';
import { useParams } from 'react-router-dom';
import BlogArticleTemplate from '../../components/features/BlogArticleTemplate';

export default function BlogArticle() {
  const { id } = useParams();

  // Datos del artículo (en una aplicación real, esto vendría de una API)
  const article = {
    id: 1,
    title: 'Nuevas Tecnologías en Prótesis Mioeléctricas: Revolucionando la Rehabilitación',
    excerpt: 'Descubre cómo la tecnología mioeléctrica está transformando la vida de pacientes amputados, permitiendo movimientos más naturales y precisos.',
    category: 'tecnologia',
    author: 'Dr. Carmen Nájera',
    date: '2024-01-15',
    readTime: '8 min',
    image: 'https://placehold.co/800x400/1E40AF/FFFFFF?text=Prótesis+Mioeléctricas',
    featured: true,
    tags: ['Tecnología', 'Prótesis', 'Innovación', 'Rehabilitación']
  };

  // Información del autor
  const author = {
    name: 'Dr. Carmen Nájera',
    bio: 'Especialista en ortopedia y tecnología protésica con más de 15 años de experiencia. Doctora en Ingeniería Biomédica y pionera en la implementación de tecnologías mioeléctricas en México.',
    social: {
      twitter: 'https://twitter.com/drcarmennajera',
      linkedin: 'https://linkedin.com/in/carmen-najera'
    }
  };

  // Contenido del artículo (usando JSX para mejor estructura)
  const content = (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        La tecnología mioeléctrica ha revolucionado el campo de las prótesis, ofreciendo a los pacientes amputados una nueva esperanza para recuperar movimientos naturales y precisos. Esta innovación representa un salto significativo en la calidad de vida de miles de personas en todo el mundo.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">¿Qué son las Prótesis Mioeléctricas?</h2>
      
      <p className="text-gray-700 leading-relaxed">
        Las prótesis mioeléctricas utilizan sensores que detectan las señales eléctricas generadas por los músculos residuales del paciente. Estas señales se procesan y se convierten en movimientos específicos de la prótesis, permitiendo un control más intuitivo y natural.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
        <h3 className="text-xl font-bold text-blue-900 mb-3">💡 Punto Clave</h3>
        <p className="text-blue-800">
          Las prótesis mioeléctricas pueden detectar hasta 14 grados diferentes de movimiento, permitiendo acciones tan precisas como sostener un huevo sin romperlo o agarrar objetos pesados con firmeza.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Ventajas de la Tecnología Mioeléctrica</h2>
      
      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Control Intuitivo</h3>
          <p className="text-gray-600">Los movimientos se controlan de manera natural, como si fuera la extremidad original.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Precisión Extrema</h3>
          <p className="text-gray-600">Capacidad de realizar movimientos finos y delicados con alta precisión.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Respuesta Rápida</h3>
          <p className="text-gray-600">Tiempo de respuesta de menos de 100 milisegundos entre la intención y el movimiento.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Mejor Calidad de Vida</h3>
          <p className="text-gray-600">Mayor independencia y confianza en las actividades diarias.</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">El Proceso de Adaptación</h2>
      
      <p className="text-gray-700 leading-relaxed">
        La adaptación a una prótesis mioeléctrica requiere un proceso gradual y personalizado. Nuestro equipo de especialistas trabaja de manera integral para asegurar el éxito del tratamiento.
      </p>

      <div className="bg-gray-50 rounded-xl p-8 my-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Fases del Proceso</h3>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Evaluación Inicial</h4>
              <p className="text-gray-600">Análisis completo del paciente, incluyendo evaluación muscular y psicológica.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Entrenamiento Muscular</h4>
              <p className="text-gray-600">Fortalecimiento y control de los músculos residuales para optimizar las señales.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Prótesis Temporal</h4>
              <p className="text-gray-600">Adaptación progresiva con una prótesis de prueba para ajustar la configuración.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Prótesis Definitiva</h4>
              <p className="text-gray-600">Entrega de la prótesis personalizada con seguimiento continuo.</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Resultados y Estadísticas</h2>
      
      <p className="text-gray-700 leading-relaxed">
        Los resultados de la implementación de prótesis mioeléctricas en nuestros pacientes han sido excepcionales, con mejoras significativas en su calidad de vida y funcionalidad.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
          <div className="text-gray-600">Mejora en la precisión de movimientos</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
          <div className="text-gray-600">Pacientes reportan mayor independencia</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">92%</div>
          <div className="text-gray-600">Satisfacción general con la prótesis</div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">El Futuro de las Prótesis</h2>
      
      <p className="text-gray-700 leading-relaxed">
        La tecnología mioeléctrica continúa evolucionando, con nuevas innovaciones que prometen revolucionar aún más el campo de las prótesis. Desde la integración con inteligencia artificial hasta la conectividad con dispositivos móviles, el futuro es prometedor.
      </p>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 my-8">
        <h3 className="text-2xl font-bold mb-4">🚀 Próximas Innovaciones</h3>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Integración con sensores táctiles para retroalimentación sensorial</span>
          </li>
          <li className="flex items-center space-x-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Control mediante ondas cerebrales (BCI)</span>
          </li>
          <li className="flex items-center space-x-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Materiales más ligeros y duraderos</span>
          </li>
          <li className="flex items-center space-x-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Personalización mediante impresión 3D avanzada</span>
          </li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusión</h2>
      
      <p className="text-gray-700 leading-relaxed">
        Las prótesis mioeléctricas representan un avance significativo en la tecnología protésica, ofreciendo a los pacientes una nueva oportunidad para recuperar su independencia y calidad de vida. En Ortopedia Cuernavaca, estamos comprometidos con la innovación continua para brindar las mejores soluciones a nuestros pacientes.
      </p>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
        <h3 className="text-xl font-bold text-yellow-900 mb-3">📞 ¿Interesado en saber más?</h3>
        <p className="text-yellow-800 mb-4">
          Si estás considerando una prótesis mioeléctrica o tienes preguntas sobre esta tecnología, nuestro equipo de especialistas está disponible para ayudarte.
        </p>
        <a 
          href="/contacto" 
          className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
        >
          Agendar Consulta
        </a>
      </div>
    </div>
  );

  // Artículos relacionados (ejemplo)
  const relatedArticles = [
    {
      id: 2,
      title: 'Guía Completa: Cómo Elegir las Plantillas Ortopédicas Correctas',
      excerpt: 'Una guía paso a paso para entender qué tipo de plantillas necesitas según tu condición y estilo de vida.',
      category: 'consejos',
      author: 'Lic. María González',
      date: '2024-01-12',
      readTime: '6 min',
      image: 'https://placehold.co/800x400/059669/FFFFFF?text=Plantillas+Ortopédicas',
      tags: ['Plantillas', 'Consejos', 'Salud']
    },
    {
      id: 3,
      title: 'Historia de Éxito: Juan Carlos Recupera su Movilidad',
      excerpt: 'Conoce la increíble historia de Juan Carlos, quien después de un accidente logró recuperar su independencia gracias a una prótesis personalizada.',
      category: 'casos-exito',
      author: 'Equipo Ortopedia Cuernavaca',
      date: '2024-01-10',
      readTime: '5 min',
      image: 'https://placehold.co/800x400/DC2626/FFFFFF?text=Historia+de+Éxito',
      tags: ['Casos de Éxito', 'Prótesis', 'Rehabilitación']
    },
    {
      id: 4,
      title: 'Avances en Escaneo 3D para Plantillas Personalizadas',
      excerpt: 'Descubre cómo la tecnología de escaneo 3D está revolucionando la fabricación de plantillas ortopédicas personalizadas.',
      category: 'tecnologia',
      author: 'Ing. Roberto Silva',
      date: '2024-01-08',
      readTime: '7 min',
      image: 'https://placehold.co/800x400/7C3AED/FFFFFF?text=Escaneo+3D',
      tags: ['Tecnología', '3D', 'Plantillas']
    }
  ];

  // Artículos para navegación (ejemplo)
  const previousArticle = {
    id: 0,
    title: 'Introducción a las Prótesis Modernas'
  };

  const nextArticle = {
    id: 2,
    title: 'Guía Completa: Cómo Elegir las Plantillas Ortopédicas Correctas'
  };

  return (
    <BlogArticleTemplate
      article={article}
      content={content}
      author={author}
      relatedArticles={relatedArticles}
      previousArticle={previousArticle}
      nextArticle={nextArticle}
    />
  );
} 
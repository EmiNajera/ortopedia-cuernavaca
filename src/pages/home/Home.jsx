import React, { useState } from 'react';
import Link from 'next/link';
import Layout from "../../components/layout/Layout";

// --- Iconos SVG para una apariencia limpia y moderna ---

// Icono para características clave y botones
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

// Iconos para la sección de características clave
const InsolesIcon = () => (
    <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10s5 2 7 0l-1.657 1.657a4 4 0 01-5.656 0l-1.415-1.414m-2.828 2.828a4 4 0 010-5.656l1.415-1.414m5.656 0a8.003 8.003 0 010 11.314M9 10l.343-.343"></path></svg>
);
const ProsthesisIcon = () => (
    <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path><path d="M18 18.5a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0zM12 12v6.5"></path></svg>
);
const RehabIcon = () => (
    <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
);

// Iconos para los servicios de rehabilitación
const PediatricIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </svg>
);

const OrthesisIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
  </svg>
);

const MusculoskeletalIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
  </svg>
);

const AmputeeIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18"></path>
  </svg>
);

const PainIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
  </svg>
);

const ProductsIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
  </svg>
);

// Icono de estrella para la calificación
const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

// Icono para el acordeón de FAQ
const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);


// --- Componentes Reutilizables ---

// Componente para el Acordeón de FAQ
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-xl font-semibold text-gray-800 focus:outline-none"
      >
        <span>{question}</span>
        <PlusIcon className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen ? 'transform rotate-45' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pt-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 text-lg leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

// Tarjeta de Testimonio Rediseñada
const TestimonialCard = ({ image, text, name, title, rating }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-gray-100">
    <div className="p-8">
      <div className="flex items-center mb-6">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover mr-5 border-4 border-white shadow-md"
        />
        <div>
          <h4 className="text-xl font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className="text-gray-700 leading-relaxed text-lg">
        “{text}”
      </p>
    </div>
  </div>
);

// Tarjeta para la sección de Áreas Fundamentales
const ServiceCard = ({ title, description, link }) => (
  <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:scale-105">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">
      {title}
    </h3>
    <p className="text-gray-600 flex-grow">{description}</p>
    <Link href={link} className="text-blue-600 font-semibold mt-6 self-start hover:text-blue-800 transition-colors group">
      Ver más 
      <span className="inline-block ml-2">
        <ArrowRightIcon />
      </span>
    </Link>
  </div>
);

// Tarjeta para la sección de Tienda
const ProductCard = ({ imgSrc, name }) => ( 
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300">
        <div className="overflow-hidden">
            <img 
                src={imgSrc} 
                alt={name} 
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
            />
        </div>
        <div className="p-4">
            <h4 className="text-lg font-bold text-gray-800">{name}</h4>
        </div>
    </div>
);

// --- Componente Principal de la Aplicación ---

// Datos para la sección de servicios de rehabilitación
const categorias = [
  {
    nombre: "Rehabilitación Pediátrica",
    cita: "Acompañamos el desarrollo de niñas y niños, corrigiendo a tiempo problemas de marcha, postura o pie plano.",
    autor: "Tratamiento Especializado",
    empresa: "Ortopedia Cuernavaca",
    imagen: "/images/banners/kidsitdown.jpg",
    marcas: ["Pie Plano", "Estimulación Temprana", "Órtesis Infantiles"],
    link: "/servicios?categoria=pediatrica",
    position: 'object-center' // Centrado para enfocar en los niños
  },
  {
    nombre: "Taller de Órtesis y Prótesis",
    cita: "Fabricación, ajuste y personalización de dispositivos ortopédicos en un solo lugar.",
    autor: "Fabricación Digital",
    empresa: "Ortopedia Cuernavaca",
    imagen: "/images/banners/TallerOrt.JPG",
    marcas: ["Plantillas a Medida", "Órtesis Personalizadas", "Prótesis Avanzadas"],
    link: "/servicios?categoria=ortesis",
    position: 'object-center' // Ajustado a centrado para bajar la imagen
  },
  {
    nombre: "Rehabilitación Musculoesquelética",
    cita: "Recupera movilidad y fuerza después de lesiones, cirugías o problemas de postura.",
    autor: "Terapia Especializada",
    empresa: "Ortopedia Cuernavaca",
    imagen: "/images/banners/fracturaosea.jpg",
    marcas: ["Lesiones Deportivas", "Postoperatorio", "Corrección Postural"],
    link: "/servicios?categoria=musculoesqueletica",
    position: 'object-center' // Centrado para enfocar en la lesión
  },
  {
    nombre: "Rehabilitación en Amputados y Prótesis",
    cita: "Entrenamiento y fortalecimiento para usar tu prótesis con seguridad y confianza.",
    autor: "Entrenamiento Especializado",
    empresa: "Ortopedia Cuernavaca",
    imagen: "/images/banners/protesis.jpg",
    marcas: ["Adaptación Prótesis", "Prevención Caídas", "Atención Integral"],
    link: "/servicios?categoria=amputados",
    position: 'object-center' // Centrado para destacar la prótesis
  },
  {
    nombre: "Rehabilitación del Dolor Crónico",
    cita: "Alivio y control de molestias persistentes en espalda, cuello o articulaciones.",
    autor: "Terapia del Dolor",
    empresa: "Ortopedia Cuernavaca",
    imagen: "/images/banners/dolocroc.jpg",
    marcas: ["Dolor Espalda", "Artritis", "Ejercicio Guiado"],
    link: "/servicios?categoria=dolor",
    position: 'object-bottom' // Ajustado a bottom para mostrar la parte inferior
  },
  {
    nombre: "Área de Productos Ortopédicos",
    cita: "Soluciones de apoyo y movilidad para tu vida diaria.",
    autor: "Productos Especializados",
    empresa: "Ortopedia Cuernavaca",
    imagen: "/images/banners/Collage.png",
    marcas: ["Bastones y Muletas", "Sillas de Ruedas", "Zapatos Ortopédicos"],
    link: "/servicios?categoria=productos",
    position: 'object-center' // Por defecto
  }
];

const Home = () => {
  const [activo, setActivo] = useState(categorias[0]);
  


  return (
    <Layout>
      {/* Contenedor principal */}
      <div className="relative">
        {/* Sección 1 – Hero Principal */}
        <section 
          className="relative h-screen flex items-center justify-center text-center bg-cover bg-center overflow-hidden animate-fade-in" 
          style={{ backgroundImage: "url('/images/banners/Protesis TiE.jpg')" }}
        >
          <div className="relative z-10 p-6 animate-slide-up">
            <h1 
              className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl animate-fade-in-delay" 
              style={{ fontFamily: "'Poppins', sans-serif", textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
            >
              Rehabilitación física y ortopedia
            </h1>
            <p 
              className="text-2xl md:text-3xl mt-6 max-w-4xl mx-auto text-white drop-shadow-2xl animate-fade-in-delay-2"
              style={{ textShadow: "1px 1px 6px rgba(0,0,0,0.7)" }}
            >
              Te acompañamos con tratamientos personalizados desde el diagnóstico hasta la recuperación.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-delay-3">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <Link href="/citas" className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg inline-block shadow-2xl" style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
                  Agenda tu cita
                </Link>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <Link href="/servicios" className="bg-white/90 backdrop-blur-sm border-2 border-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-700 transition-all duration-300 text-lg inline-block shadow-2xl" style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
                  Explora nuestros servicios
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 2 – Áreas Fundamentales */}
        <section id="servicios" className="relative z-20 -mt-40">
          <div className="grid grid-cols-1 md:grid-cols-3 h-screen pt-20">
            {/* Órtesis y Prótesis */}
            <div className="relative group overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500">
              <img
                src="/images/banners/Orthesis KHAFO 2 FB.PNG"
                alt="Órtesis y Prótesis"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white p-8">
                <h3 className="text-4xl font-bold mb-4">
                  Órtesis y Prótesis
                </h3>
                <p className="text-lg max-w-md">
                  Adaptamos prótesis y órtesis con enfoque personalizado para cada paciente.
                </p>
              </div>
            </div>

            {/* Plantillas Personalizadas */}
            <div className="relative group overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500">
              <img
                src="/images/banners/Plantillas Ortopedicas A.PNG"
                alt="Plantillas Personalizadas"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white p-8">
                <h3 className="text-4xl font-bold mb-4">
                  Plantillas Personalizadas
                </h3>
                <p className="text-lg max-w-md">
                  Plantillas con análisis de marcha y fabricación digital para mejorar postura y movilidad.
                </p>
              </div>
            </div>

            {/* Fisioterapia y Rehabilitación */}
            <div className="relative group overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500">
              <img
                src="/images/banners/Fisioterapia 2.png"
                alt="Fisioterapia y Rehabilitación"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white p-8">
                <h3 className="text-4xl font-bold mb-4">
                  Fisioterapia y Rehabilitación
                </h3>
                <p className="text-lg max-w-md">
                  Recupera tu movimiento con terapias de rehabilitación física profesional.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

                    {/* Sección 3 – Características Integrales */}
        <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20 sm:py-32 font-sans relative overflow-hidden">
          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
         {/* Elementos decorativos de fondo */}
         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5"></div>
         <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
         
         <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
           <div className="text-center mb-16">
             <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-6">
               <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
               Centro Integral de Rehabilitación
             </div>
             <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
               Todo lo que tu rehabilitación necesita, 
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"> en un solo lugar</span>
             </h2>
             <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
               Beneficios de un centro integral para tu recuperación. Nuestro enfoque multidisciplinario 
               combina diagnóstico avanzado, tratamientos personalizados y seguimiento continuo para 
               garantizar tu recuperación óptima.
             </p>
           </div>
           
                       <div className="mx-auto grid max-w-lg grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
             {[
               {
                 image: "/images/banners/DedosEsqueleto2.JPG",
                 title: "Valoración",
                 subtitle: "Valoración integral personalizada",
                 description: "Recibe una valoración global y un plan adaptado a tu situación real desde tu primera visita, conectando todas las áreas necesarias para tu avance."
               },
               {
                 image: "/images/banners/Rodillera.jpg",
                 title: "Soluciones",
                 subtitle: "Tratamiento coordinado integral",
                 description: "Nuestro equipo multidisciplinario trabaja en conjunto para que tus terapias y dispositivos se ajusten y evolucionen a medida que progresas."
               },
               {
                 image: "/images/banners/Ferula.jpg",
                 title: "Tecnología",
                 subtitle: "Dispositivos de vanguardia",
                 description: "Accede a tecnologías especializadas y a la fabricación de órtesis y prótesis adaptadas, todo en el mismo centro y sin esperas innecesarias."
               },
               {
                 image: "/images/banners/mensajes.jpg",
                 title: "Seguimiento",
                 subtitle: "Monitoreo continuo del progreso",
                 description: "Tu evolución es monitoreada por el equipo, con ajustes de objetivos y una comunicación clara desde la cita inicial hasta el alta."
               }
             ].map((item, index) => (
                                               <div
                  key={index}
                  className="group cursor-pointer relative h-[320px]"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Card que se expande solo hacia arriba */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform group-hover:-translate-y-8 group-hover:z-20 absolute top-0 left-0 w-full h-full group-hover:h-[360px]">
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      {/* Contenedor que cambia entre subtítulo y descripción */}
                      <div className="relative min-h-[40px] group-hover:min-h-[140px] transition-all duration-300 ease-in-out">
                        {/* Subtítulo - visible por defecto, se oculta en hover */}
                        <p className="text-sm text-gray-600 font-medium opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                          {item.subtitle}
                        </p>
                        {/* Descripción completa - se muestra en hover */}
                        <div className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out absolute top-0 left-0 right-0">
                          <p className="leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             ))}
           </div>
           
           
         </div>
       </section>

      {/* Sección 4 – Soluciones para cada necesidad de rehabilitación */}
      <section id="rehabilitacion" className="py-24 bg-white relative overflow-hidden">
        {/* Elementos decorativos sutiles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-50 rounded-full opacity-30 blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Servicios Especializados
            </span>
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              Soluciones para cada necesidad de rehabilitación
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Selecciona el área que te interesa y descubre cómo podemos ayudarte en tu proceso de recuperación.
            </p>
          </div>
          
                      <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categorias.map((item, index) => {
              // Seleccionar el icono apropiado según el nombre del servicio
              let Icon;
              if (item.nombre === "Rehabilitación Pediátrica") Icon = PediatricIcon;
              else if (item.nombre === "Taller de Órtesis y Prótesis") Icon = OrthesisIcon;
              else if (item.nombre === "Rehabilitación Musculoesquelética") Icon = MusculoskeletalIcon;
              else if (item.nombre === "Rehabilitación en Amputados y Prótesis") Icon = AmputeeIcon;
              else if (item.nombre === "Rehabilitación del Dolor Crónico") Icon = PainIcon;
              else Icon = ProductsIcon;
              
              return (
                <button
                  key={item.nombre}
                  onClick={() => setActivo(item)}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    activo.nombre === item.nombre
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Icon />
                  <span>{item.nombre}</span>
                  {activo.nombre === item.nombre && (
                    <span className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Contenido dinámico de servicios */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-102 transition-all duration-500 bg-gradient-to-b from-gray-50 to-white">
            {/* Añadimos un overlay decorativo */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none"></div>
            
            <img
              src={activo.imagen}
              alt={activo.nombre}
              className={`w-full h-96 object-cover transition-transform duration-700 hover:scale-105 ${activo.position || 'object-center'}`}
            />
            
            
            <div className="absolute bottom-0 left-0 p-8 bg-white/95 backdrop-blur-sm rounded-tr-2xl w-full md:w-1/2 shadow-lg transform transition-all duration-500 hover:shadow-xl">
              <p className="italic text-gray-700 mb-4 text-lg leading-relaxed">"{activo.cita}"</p>
              <p className="font-bold text-gray-900">{activo.autor}</p>
              <p className="text-gray-500">{activo.empresa}</p>
            </div>

            <div className="absolute top-6 right-6 space-y-4">
              {activo.marcas.map((marca, index) => (
                <Link
                  key={index}
                  href={activo.link}
                  className="block bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-5 py-3 text-sm font-medium hover:bg-blue-50 transition-all transform hover:scale-105 hover:shadow-xl border-l-4 border-blue-500"
                >
                  {marca}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 5 – Historias de Pacientes (Rediseñada) */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-100 rounded-full opacity-15 blur-3xl"></div>
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16">
            <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Testimonios
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              La voz de nuestros pacientes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre cómo hemos ayudado a personas como tú a recuperar su calidad de vida.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {[
              {
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                text: "Gracias a sus plantillas personalizadas, mi dolor crónico de pie desapareció en cuestión de semanas. ¡Ahora puedo caminar sin molestias!",
                name: "Carlos Sánchez",
                title: "Paciente de Plantillas Ortopédicas",
                rating: 5,
              },
              {
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                text: "La prótesis que me diseñaron no solo es funcional, sino también cómoda. Me devolvió la confianza y la movilidad que había perdido.",
                name: "Laura Gómez",
                title: "Paciente de Prótesis",
                rating: 5,
              },
              {
                image: "https://randomuser.me/api/portraits/men/51.jpg",
                text: "El equipo de fisioterapia fue increíble. Su dedicación y profesionalismo aceleraron mi recuperación después de una cirugía de rodilla.",
                name: "Roberto Díaz",
                title: "Paciente de Fisioterapia",
                rating: 5,
              }
            ].map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sección 6 – FAQ */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Elementos decorativos sutiles */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-50 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-50 rounded-full opacity-15 blur-3xl"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Resolviendo tus dudas
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre nuestros servicios y tratamientos.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <FaqItem
              question="¿Necesito receta médica o referencia para acudir?"
              answer="No, puedes agendar tu consulta inicial directamente, sin necesidad de referencia médica. Si durante la revisión identificamos que requieres valoración médica adicional, te lo indicamos y orientamos."
            />
            <FaqItem
              question="¿Ofrecen atención médica o consulta con doctor?"
              answer="No somos médicos. Somos especialistas en órtesis y prótesis: evaluamos, recomendamos y adaptamos productos ortopédicos personalizados. Si necesitas consulta médica, te canalizamos con un ortopedista de confianza."
            />
            <FaqItem
              question="¿La consulta tiene costo?"
              answer="Sí, la consulta tiene un costo cuando solo se realiza la revisión y orientación. Si decides adquirir un producto ortopédico personalizado, la consulta ya va incluida como parte del servicio, sin costo adicional."
            />
            <FaqItem
              question="¿Las prótesis son a la medida? ¿Qué tipo de materiales manejan?"
              answer="Sí, todas las prótesis que adaptamos son a la medida, ajustadas a tu anatomía y necesidades. Trabajamos con materiales y tecnologías de última generación en distintos rangos de costo, para ofrecerte la mejor opción posible según tus necesidades y posibilidades."
            />
            <FaqItem
              question="¿Fabrican y adaptan órtesis personalizadas?"
              answer="No fabricamos prótesis desde cero, pero adaptamos y ajustamos órtesis y prótesis existentes para garantizar comodidad y funcionalidad en tu día a día."
            />
            <FaqItem
              question="¿Cuánto dura un tratamiento de rehabilitación?"
              answer="El tiempo varía según tu caso y objetivos. Tras la revisión inicial, te explicamos el plan recomendado y la duración estimada."
            />
            <FaqItem
              question="¿Qué tecnología utilizan en los tratamientos?"
              answer="Utilizamos análisis de marcha, escaneo digital, electroterapia y otras tecnologías especializadas para personalizar y optimizar cada dispositivo ortopédico. Siempre te explicamos cada procedimiento antes de aplicarlo."
            />
          </div>
        </div>
      </section>

      {/* Sección 7 – CTA de Alta Calidad */}
      <section className="bg-gradient-to-br from-blue-100 via-blue-50 to-white py-24 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              ¡Tu recuperación comienza hoy!
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              ¿Listo para recuperar tu 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"> calidad de vida</span>?
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Únete a cientos de pacientes que ya han transformado su movilidad y bienestar con nuestros tratamientos especializados.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <Link 
                  href="/citas" 
                  className="bg-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition-all duration-300 text-lg inline-block shadow-2xl hover:shadow-3xl"
                  style={{ boxShadow: "0 20px 40px rgba(59,130,246,0.3)" }}
                >
                  Agenda tu cita
                </Link>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <Link 
                  href="/contacto" 
                  className="bg-white border-2 border-blue-600 text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-all duration-300 text-lg inline-block shadow-lg"
                >
                  Habla con un especialista
                </Link>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                Primera consulta sin costo
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                Evaluación personalizada
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                Garantía de satisfacción
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}

export default Home; 
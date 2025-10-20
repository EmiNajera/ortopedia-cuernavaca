import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../../components/layout/Layout';
import { openWhatsApp } from '../../../utils/whatsapp';

// Contenido por servicio (puedes enriquecer cada bloque con texto único)
const SERVICE_CONTENT = {
  ortesis: {
    title: 'Taller de Prótesis y Rehabilitación en Amputados',
    description:
      'Fabricación a medida, ajuste y rehabilitación para una adaptación funcional, segura y cómoda.',
    image: '/images/banners/Técnico ajustando prótesis en tallerFD.png',
    highlights: [
      { label: 'Prótesis a medida', value: '100%' },
      { label: 'Ajustes y calibración', value: 'Precisión' },
      { label: 'Rehabilitación', value: 'Integral' },
      { label: 'Seguimiento', value: 'Continuo' },
    ],
    equipment: ['Escáner 3D', 'Software CAD/CAM', 'Sistemas modulares', 'Laboratorio propio'],
    faq: [
      {
        q: '¿Cuál es el tiempo típico de adaptación?',
        a: 'Depende del nivel de amputación y tipo de prótesis; suele ser de semanas a meses con seguimiento.',
      },
      {
        q: '¿Realizan mantenimiento?',
        a: 'Sí, contamos con mantenimiento, ajustes preventivos y correctivos.',
      },
    ],
  },
  plantillas: {
    title: 'Plantillas Ortopédicas',
    description:
      'Estudio de huella, análisis de la pisada y plantillas a medida para aliviar dolor y mejorar tu postura.',
    image: '/images/banners/plantillasortopedicasfd.png',
    highlights: [
      { label: 'A medida', value: '100%' },
      { label: 'Estudio', value: 'Huella' },
      { label: 'Postura', value: 'Mejora' },
      { label: 'Seguimiento', value: 'Incluido' },
    ],
    equipment: ['Plataforma de huella', 'Análisis de marcha', 'Materiales de grado médico'],
    faq: [
      {
        q: '¿Cada cuánto se revisan?',
        a: 'Recomendamos revisión a las 4-6 semanas y luego cada 3-6 meses.',
      },
    ],
  },
  pediatrica: {
    title: 'Rehabilitación Pediátrica',
    description:
      'Detección temprana, ejercicios lúdicos y órtesis infantiles para mejorar marcha y desarrollo motor.',
    image: '/images/banners/NiñoSillaRuedasFlatDesign.png',
    highlights: [
      { label: 'Estimulación', value: 'Temprana' },
      { label: 'Órtesis', value: 'Infantiles' },
      { label: 'Plan', value: 'Familiar' },
      { label: 'Seguimiento', value: 'Constante' },
    ],
    equipment: ['Material sensoriomotor', 'Plataformas de equilibrio', 'Órtesis pediátricas'],
    faq: [
      {
        q: '¿Desde qué edad atienden?',
        a: 'Desde primeros meses de vida, según indicación médica.',
      },
    ],
  },
  musculoesqueletica: {
    title: 'Fisioterapia',
    description:
      'Lesiones deportivas, postoperatorias, terapia manual y fortalecimiento con tecnología y seguimiento.',
    image: '/images/banners/Fisioterapiadf.png',
    highlights: [
      { label: 'Terapia', value: 'Manual' },
      { label: 'Deporte', value: 'Rendimiento' },
      { label: 'Postop', value: 'Protocolo' },
      { label: 'Fuerza', value: 'Progresiva' },
    ],
    equipment: ['Electroterapia', 'Ultrasonido', 'Plataformas', 'Bandas elásticas'],
    faq: [
      {
        q: '¿Cuántas sesiones necesito?',
        a: 'Se define tras la evaluación; típicamente 6-12 con reevaluación.',
      },
    ],
  },
  amputados: {
    title: 'Órtesis',
    description:
      'Rodilleras, férulas, soportes de columna y equipo deportivo para soporte terapéutico y prevención.',
    image: '/images/banners/Órtesis de RodillaFD.png',
    highlights: [
      { label: 'Rodilla', value: 'Soporte' },
      { label: 'Columna', value: 'Estabilidad' },
      { label: 'Férulas', value: 'A medida' },
      { label: 'Deporte', value: 'Compresión' },
    ],
    equipment: ['Termoplásticos', 'Sistemas modulares', 'Escaneo/ajuste'],
    faq: [
      {
        q: '¿Aceptan receta médica?',
        a: 'Sí, podemos trabajar con indicación médica y coordinar.',
      },
    ],
  },
  dolor: {
    title: 'Rehabilitación del Dolor Crónico',
    description:
      'Manejo integral con evaluación funcional, equipo especializado y seguimiento continuo.',
    image: '/images/banners/Rehabilitación del Dolor CrónicoFD.png',
    highlights: [
      { label: 'Dolor', value: 'Control' },
      { label: 'Función', value: 'Mejora' },
      { label: 'Plan', value: 'Integrado' },
      { label: 'Recaídas', value: 'Prevención' },
    ],
    equipment: ['TENS', 'Ultrasonido', 'Plataformas de equilibrio'],
    faq: [
      {
        q: '¿Es doloroso el tratamiento?',
        a: 'Buscamos siempre tolerancia adecuada y seguridad; se ajusta a tu respuesta.',
      },
    ],
  },
  productos: {
    title: 'Área de Productos Ortopédicos',
    description: 'Asesoría experta en bastones, muletas, sillas de ruedas, calzado y soportes.',
    image: '/images/banners/Área de Productos OrtopédicosFD.png',
    highlights: [
      { label: 'Variedad', value: 'Amplia' },
      { label: 'Asesoría', value: 'Profesional' },
      { label: 'Calidad', value: 'Alta' },
      { label: 'Garantía', value: 'Soporte' },
    ],
    equipment: ['Sillas, bastones, fajas, calzado terapéutico'],
    faq: [{ q: '¿Hacen envíos?', a: 'Sí, contáctanos para conocer zonas y costos.' }],
  },
};

export default function ServicioDetalle() {
  const router = useRouter();
  const { service } = router.query || {};
  const meta = SERVICE_CONTENT[service] || {
    title: 'Servicio',
    description: 'Información detallada del servicio.',
    image: '/images/banners/Collage.png',
    highlights: [],
    equipment: [],
    faq: [],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `Ortopedia Cuernavaca - ${meta.title}`,
    description: meta.description,
    image: meta.image,
    areaServed: 'Cuernavaca, Morelos',
    url: 'https://ortopediacuernavaca.mx',
    medicalSpecialty: 'Orthopedics',
  };

  return (
    <Layout>
      <Head>
        <title>{meta.title} | Ortopedia Cuernavaca</title>
        <meta name="description" content={meta.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero */}
        <section className="relative">
          <div className="relative w-full aspect-[16/6] sm:aspect-[16/6] md:aspect-[16/5] lg:aspect-[16/4] overflow-hidden">
            <Image src={meta.image} alt={meta.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                {meta.title}
              </h1>
              <p className="text-white/90 mt-2 max-w-3xl text-sm md:text-base">
                {meta.description}
              </p>
            </div>
          </div>
        </section>

        {/* Highlights */}
        {meta.highlights?.length > 0 && (
          <section className="container mx-auto px-6 -mt-6 sm:-mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {meta.highlights.map((h) => (
                <div
                  key={h.label}
                  className="bg-white/90 backdrop-blur rounded-xl p-4 text-center shadow-md border border-gray-100"
                >
                  <div className="text-xl font-extrabold text-gray-900">{h.value}</div>
                  <div className="text-xs uppercase tracking-wide text-gray-600">{h.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Content */}
        <section className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Descripción Detallada
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>
                  Diseñamos un plan personalizado a partir de una evaluación clínica y funcional,
                  con metas medibles y un cronograma claro. Combinamos técnicas basadas en evidencia
                  con tecnología cuando aporta beneficios reales para tu caso.
                </p>
                <p>
                  Monitorizamos tu progreso periódicamente y ajustamos el tratamiento para asegurar
                  mejoras sostenidas y prevenir recaídas. Nuestro objetivo es siempre tu
                  funcionalidad y calidad de vida.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                Proceso de Atención
              </h3>
              <ol className="grid sm:grid-cols-2 gap-4">
                {[
                  'Evaluación inicial',
                  'Plan personalizado',
                  'Intervención/Tratamiento',
                  'Seguimiento y ajustes',
                ].map((step) => (
                  <li key={step} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <span className="font-medium text-gray-900">{step}</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Metas claras, revisión constante y seguridad.
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {meta.equipment?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  Equipamiento y Tecnología
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  {meta.equipment.map((e) => (
                    <li key={e} className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {meta.faq?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  Preguntas Frecuentes
                </h3>
                <div className="space-y-4">
                  {meta.faq.map((f) => (
                    <div key={f.q} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                      <div className="font-semibold text-gray-900">{f.q}</div>
                      <div className="text-sm text-gray-700 mt-1">{f.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900">Agenda tu cita</h4>
              <p className="text-sm text-gray-600 mt-2">
                ¿Listo para comenzar? Contáctanos por WhatsApp y recibe asesoría personalizada.
              </p>
              <button
                onClick={() =>
                  openWhatsApp(undefined, `Hola, quiero más información sobre: ${meta.title}.`)
                }
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-colors"
              >
                Consultar por WhatsApp
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900">Incluye</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>Evaluación integral</li>
                <li>Plan de tratamiento personalizado</li>
                <li>Sesiones guiadas por especialistas</li>
                <li>Seguimiento y ajustes</li>
              </ul>
            </div>
          </aside>
        </section>

        {/* CTA final */}
        <section className="px-6 pb-12">
          <div className="container mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 md:p-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              ¿Listo para dar el siguiente paso?
            </h3>
            <p className="text-sm md:text-base text-gray-700 mt-2">
              Agenda tu valoración y comienza tu proceso de recuperación.
            </p>
            <button
              onClick={() =>
                openWhatsApp(
                  undefined,
                  `Hola, me interesa agendar una valoración para: ${meta.title}.`,
                )
              }
              className="mt-4 inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg transition-colors"
            >
              Agendar por WhatsApp
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
}

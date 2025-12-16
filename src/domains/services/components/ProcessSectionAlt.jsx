import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList,
  ClipboardCheck,
  Stethoscope,
  LineChart,
  Play,
  Info,
  Calendar,
  ChevronRight,
  PhoneCall,
  FileText,
} from 'lucide-react';

/**
 * Sección Alterna para "Nuestro Proceso de Atención Integral"
 * - Diseño con Tabs + Timeline lateral y Panel de detalle.
 * - Mobile: acordeón vertical; Desktop: layout en 2 columnas.
 * - Adaptado al diseño general del sitio.
 */

const STEPS = [
  {
    key: 'canalizacion',
    title: 'Contacto y Canalización',
    blurb:
      'Te canalizamos desde tu llamada o mensaje al área correcta. Confirmamos disponibilidad y, si hay urgencia, priorizamos tu atención.',
    points: [
      'Recepción por WhatsApp o llamada',
      'Filtro rápido del motivo de consulta',
      'Asignación de especialista y sede',
      'Confirmación de cita y requisitos',
    ],
    icon: PhoneCall,
    ctaPrimary: 'Escríbenos ahora',
    ctaSecondary: 'Más información',
  },
  {
    key: 'valoracion',
    title: 'Valoración del Caso',
    blurb:
      'Revisamos tus antecedentes y realizamos una valoración amable con pruebas sencillas para definir objetivos claros.',
    points: [
      'Historia clínica y síntomas',
      'Valoración personalizada con pruebas suaves',
      'Hipótesis clínica y objetivos',
      'Solicitud de estudios (si aplica)',
    ],
    icon: ClipboardList,
    ctaPrimary: 'Agendar valoración',
    ctaSecondary: 'Qué incluye',
  },
  {
    key: 'plan',
    title: 'Plan de Tratamiento',
    blurb:
      'Analizamos tu caso y te explicamos las opciones disponibles, frecuencia sugerida y metas esperadas según tus necesidades específicas.',
    points: [
      'Análisis de tu diagnóstico',
      'Opciones de tratamiento disponibles',
      'Frecuencia y duración sugerida',
      'Expectativas y resultados esperados',
    ],
    icon: ClipboardCheck,
    ctaPrimary: 'Iniciar tratamiento',
    ctaSecondary: 'Más información',
  },
  {
    key: 'tratamiento',
    title: 'Tratamiento Especializado',
    blurb:
      'Aplicamos el plan: ortesis y plantillas cuando se requieren, ejercicios terapéuticos guiados y educación para el autocuidado.',
    points: [
      'Sesiones guiadas + programa en casa',
      'Adaptación de ortesis/plantillas',
      'Educación y hábitos de protección',
      'Reevaluaciones periódicas',
    ],
    icon: Stethoscope,
    ctaPrimary: 'Iniciar tratamiento',
    ctaSecondary: 'Ver casos',
  },
  {
    key: 'seguimiento',
    title: 'Seguimiento Activo',
    blurb:
      'Monitoreamos tu progreso y ajustamos el plan para consolidar resultados y prevenir recaídas.',
    points: [
      'Controles programados',
      'Indicadores de adherencia y dolor',
      'Ajustes de ortesis y ejercicios',
      'Alta con plan de mantenimiento',
    ],
    icon: LineChart,
    ctaPrimary: 'Programar control',
    ctaSecondary: 'Cómo medimos',
  },
];

export default function ProcessSectionAlt() {
  const [active, setActive] = useState('canalizacion');
  const current = STEPS.find((s) => s.key === active) ?? STEPS[0];
  const ActiveIcon = current.icon;

  return (
    <motion.section
      id="proceso-atencion"
      aria-labelledby="proceso-atencion-heading"
      className="relative bg-gradient-to-br from-white to-slate-50 py-16 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gray-50 rounded-full opacity-15 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* ENCABEZADO */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Nuestro Proceso
          </motion.span>
          <motion.h2
            id="proceso-atencion-heading"
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Atención Integral en 5 Pasos
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Te guiamos desde el primer contacto hasta tu seguimiento, con un plan que entiendes y
            puedes consultar en todo momento.
          </motion.p>
        </motion.div>

        {/* VISTA MÓVIL: ACORDEÓN VERTICAL */}
        <div className="lg:hidden space-y-4">
          {STEPS.map((step, idx) => {
            const isActive = active === step.key;
            const StepIcon = step.icon;

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'border-blue-600 bg-white shadow-lg ring-1 ring-blue-100'
                    : 'border-gray-200 bg-white/80'
                }`}
              >
                <button
                  onClick={() => setActive(isActive ? null : step.key)}
                  className="w-full flex items-center gap-4 p-4 text-left focus:outline-none"
                >
                  <div
                    className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                      isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
                      Paso {idx + 1}
                    </span>
                    <span
                      className={`font-semibold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}
                    >
                      {step.title}
                    </span>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      isActive ? 'rotate-90 text-blue-600' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-4 pb-6 pt-0 border-t border-gray-100/50">
                        <p className="text-gray-600 mt-4 mb-4 leading-relaxed">{step.blurb}</p>
                        <ul className="space-y-3 mb-6">
                          {step.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-3">
                          <button className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition-colors">
                            {step.ctaPrimary}
                          </button>
                          <button className="flex-1 border border-blue-200 text-blue-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                            {step.ctaSecondary}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* VISTA DESKTOP: TIMELINE + PANEL (Igual que antes, pero sin los tabs de arriba) */}
        <motion.div
          className="hidden lg:grid grid-cols-12 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* TIMELINE LATERAL */}
          <ol className="col-span-4 space-y-4">
            {STEPS.map(({ key, title }, idx) => {
              const selected = active === key;
              return (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                >
                  <motion.button
                    onClick={() => setActive(key)}
                    className={
                      'w-full rounded-xl border p-4 text-left transition-all duration-300 ' +
                      (selected
                        ? 'border-blue-600 bg-white shadow-lg ring-1 ring-blue-100'
                        : 'border-gray-200 bg-white/80 hover:bg-white hover:border-blue-300')
                    }
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={
                          'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold transition-colors ' +
                          (selected
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 border border-gray-200')
                        }
                      >
                        {idx + 1}
                      </div>
                      <span
                        className={
                          'font-medium transition-colors ' +
                          (selected ? 'text-gray-900' : 'text-gray-700')
                        }
                      >
                        {title}
                      </span>
                      {selected && <ChevronRight className="ml-auto h-5 w-5 text-blue-600" />}
                    </div>
                  </motion.button>
                </motion.li>
              );
            })}
          </ol>

          {/* PANEL DE DETALLE */}
          <div className="col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Elementos decorativos */}
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-50 opacity-50" />
                <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gray-50 opacity-50" />

                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <ActiveIcon className="h-8 w-8" />
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{current.title}</h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">{current.blurb}</p>

                    <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {current.points.map((p, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl font-medium">
                        <Calendar className="h-5 w-5" /> {current.ctaPrimary}
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-xl border border-blue-200 text-blue-700 px-6 py-3 hover:bg-blue-50 transition-colors font-medium">
                        {current.ctaSecondary}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

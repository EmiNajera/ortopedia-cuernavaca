import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import { BentoCard, BentoGrid } from '@/registry/magicui/bento-grid';
import Marquee from '@/registry/magicui/marquee';

// SVG Icons inline
export const ChevronRightIcon = (props) => (
  <svg
    {...props}
    className={`w-5 h-5 ${props.className || ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const XIcon = (props) => (
  <svg
    {...props}
    className={`w-5 h-5 ${props.className || ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function InteractiveServices() {
  const [activeTab, setActiveTab] = useState('plantillas');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const router = useRouter();

  // Handle modal open/close with proper scroll management
  React.useEffect(() => {
    if (!selectedFeature || typeof window === 'undefined') return;

    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    if (document?.body) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = `-${scrollX}px`;
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedFeature(null);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);

      if (document?.body) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.left = '';
      }

      if (typeof window !== 'undefined') {
        window.scrollTo({
          top: scrollY,
          left: scrollX,
          behavior: 'instant',
        });
      }
    };
  }, [selectedFeature]);

  const tabs = [
    { id: 'ortesis', label: 'Taller de Prótesis y Rehabilitación en Amputados' },
    { id: 'plantillas', label: 'Plantillas Ortopédicas' },
    { id: 'pediatrica', label: 'Rehabilitación Pediátrica' },
    { id: 'musculoesqueletica', label: 'Fisioterapia' },
    { id: 'amputados', label: 'Órtesis' },
    { id: 'dolor', label: 'Dolor Crónico' },
    { id: 'productos', label: 'Productos Ortopédicos' },
  ];

  const content = {
    plantillas: {
      title: 'Plantillas Ortopédicas',
      description:
        'Diseñamos y fabricamos plantillas ortopédicas a medida para corregir problemas de pisada, aliviar dolores y mejorar tu calidad de vida.',
      image: '/images/banners/plantillasortopedicasfd.png',
      features: [
        {
          title: 'Plantillas Ortopédicas Personalizadas',
          description:
            'Diseño personalizado para cada pie con tecnología avanzada y materiales de alta calidad.',
          longDescription:
            'Cada plantilla se fabrica completamente a medida, considerando la forma única de tus pies, tu tipo de pisada, actividades diarias y objetivos de tratamiento. No usamos plantillas genéricas.',
          img: '/images/banners/plantillas-personalizadas-fd.png',
        },
        {
          title: 'Estudio de Huella',
          description:
            'Análisis biomecánico detallado de tu pisada y postura para diseñar la solución perfecta.',
          longDescription:
            'Realizamos una evaluación completa que incluye análisis de la marcha, estudio de la pisada, evaluación postural y revisión de tu historial médico. Usamos tecnología avanzada para obtener mediciones precisas.',
          img: '/images/banners/EstudioHuellaFD.png',
        },
        {
          title: 'Corrección Postural',
          description: 'Mejora de la alineación corporal y prevención de problemas de postura.',
          longDescription:
            'Nuestras plantillas no solo corrigen la pisada, sino que también ayudan a mejorar la postura general, alineando correctamente la columna y las articulaciones.',
          img: '/images/banners/cambioposturalconplantillasfd.png',
        },
        {
          title: 'Revisión y Seguimiento',
          description:
            'Acompañamiento durante todo el proceso con ajustes y revisiones periódicas.',
          longDescription:
            'Te damos seguimiento completo: revisamos periódicamente cómo te sientes, ajustamos las plantillas si es necesario y te asesoramos sobre el cuidado y mantenimiento para obtener los mejores resultados.',
          img: '/images/banners/revisionypseguimientoyajustesfd.png',
        },
      ],
    },
    pediatrica: {
      title: 'Rehabilitación Pediátrica',
      description: 'Corrige a tiempo problemas de marcha, postura o pie plano en niñas y niños.',
      image: '/images/banners/NiñoSillaRuedasFlatDesign.png',
      features: [
        {
          title: 'Pie Plano',
          description:
            'Detectamos pie plano en niños, analizamos cómo caminan y corregimos su pisada con plantillas ortopédicas personalizadas y ejercicios, ayudando a prevenir molestias y mejorar su postura.',
          longDescription:
            '¿Notas que tu hijo(a) camina de puntitas, se tropieza mucho o sus zapatos se desgastan raro? El pie plano en niños puede causar cansancio, dolor o problemas en rodillas y columna a largo plazo.\n\nEn Ortopedia Cuernavaca, evaluamos cuidadosamente la marcha y postura de cada pequeño(a) usando pruebas clínicas y observación experta. Si es necesario, diseñamos plantillas ortopédicas a medida, hechas especialmente para sus pies, que ayudan a alinear correctamente la pisada y a repartir el peso de manera equilibrada.\n\nAdemás, te enseñamos ejercicios sencillos para hacer en casa que fortalecen sus pies y tobillos, acelerando la mejora. Hacemos revisiones periódicas para ajustar el tratamiento y ver avances, acompañándolos hasta que caminen con seguridad y sin dolor. Nuestro objetivo es que cada niño/a disfrute moverse y juegue sin limitaciones.',
          img: '/images/banners/NiñoPiePlanoFlatDesign.png',
        },
        {
          title: 'Estimulación Temprana',
          description:
            'Impulsamos el desarrollo físico y motriz de bebés y niños pequeños con juegos, ejercicios y rutinas personalizadas para cada etapa, detectando y corrigiendo retrasos a tiempo.',
          longDescription:
            '¿Tu bebé tarda en sostener la cabeza, sentarse o dar sus primeros pasos? La estimulación temprana puede ser clave para detectar y corregir cualquier retraso en el desarrollo motor.\n\nNuestro programa se basa en actividades lúdicas y ejercicios adaptados a la edad y necesidades de cada niño(a), usando tapetes sensoriales, pelotas, rampas y juegos que promueven el movimiento, la coordinación y el equilibrio.\n\nGuiamos a papás y mamás en el proceso, enseñándoles cómo apoyar a sus hijos en casa con actividades sencillas y seguras. Realizamos evaluaciones frecuentes para ver su progreso y ajustamos la rutina cuando lo necesita. Nuestro compromiso es acompañar a cada familia para que sus hijos/as alcancen su máximo potencial, con alegría y confianza.',
          img: '/images/banners/NiñaAprendiendoaCaminarAFD.png',
        },
        {
          title: 'Órtesis Infantiles',
          description:
            'Diseñamos y adaptamos férulas, soportes y órtesis especiales para niños con pie zambo, debilidad muscular o parálisis, permitiendo mayor movilidad y confianza al caminar o moverse.',
          longDescription:
            'Cuando un niño/a necesita soporte extra para caminar o mantenerse en pie, las órtesis infantiles pueden ser la solución.\n\nEn nuestro taller, fabricamos férulas y órtesis a la medida, ajustadas a las necesidades y crecimiento de cada pequeño(a). Usamos materiales ligeros y cómodos que permiten que los niños jueguen y se desplacen sin molestias.\n\nRealizamos un proceso de adaptación gradual y, con el tiempo, revisamos y ajustamos cada dispositivo para asegurar que siga funcionando perfectamente. Acompañamos a la familia en el proceso de adaptación, enseñando a colocar y cuidar las órtesis, y resolviendo cualquier duda.\n\nEsto ayuda a prevenir deformidades, mejorar la marcha y darles a los niños la independencia para moverse y explorar su mundo.',
          img: '/images/banners/NiñaOrtesisRodillaBFD.png',
        },
        {
          title: 'Seguimiento Continuo',
          description:
            'Acompañamos de cerca a cada paciente con revisiones periódicas, ajustes y asesoría continua para asegurar que cada tratamiento logre los mejores resultados a largo plazo.',
          longDescription:
            'El éxito de un tratamiento infantil no solo depende de la primera consulta, sino del acompañamiento constante.\n\nEn Ortopedia Cuernavaca damos seguimiento personalizado: revisamos periódicamente a cada niño(a) para ver cómo ha avanzado, si necesita cambiar la plantilla, ajustar una férula o modificar los ejercicios recomendados.\n\nNos comunicamos siempre con los padres, resolviendo dudas y dando orientación clara sobre el proceso. Si detectamos cualquier cambio en la marcha, postura o movilidad, intervenimos de inmediato para corregir el rumbo del tratamiento.\n\nEste enfoque cercano permite resultados más rápidos y duraderos, y da confianza a las familias de que nunca estarán solas en el proceso de recuperación y desarrollo de sus hijos.',
          img: '/images/banners/TerapeutasReuFD.png',
        },
      ],
    },
    ortesis: {
      title: 'Taller de Prótesis y Rehabilitación en Amputados',
      description:
        'Fabricación, ajuste y personalización de dispositivos ortopédicos con tecnología digital y materiales de alta calidad.',
      image: '/images/banners/atleta-cruzando-meta-fd.png',
      features: [
        {
          title: 'Prótesis',
          description:
            'Fabricación y adaptación de prótesis personalizadas con tecnología avanzada.',
          longDescription:
            'Nuestras prótesis están diseñadas para restaurar la funcionalidad y mejorar la calidad de vida de pacientes con amputaciones. Utilizamos tecnología de vanguardia y materiales de alta calidad para crear dispositivos que se adapten perfectamente a cada paciente.\n\nCada prótesis se fabrica completamente a medida, considerando la anatomía única del paciente, su nivel de amputación, actividades diarias y objetivos de rehabilitación. Los materiales utilizados garantizan durabilidad, ligereza y confort durante el uso prolongado.\n\nEl proceso incluye una evaluación exhaustiva, diseño personalizado, fabricación en nuestro taller especializado, pruebas de ajuste y un programa de rehabilitación integral. Acompañamos al paciente durante todo el proceso de adaptación, realizando ajustes periódicos para optimizar la funcionalidad.',
          img: '/images/banners/tecnico-ajustando-protesis-fd.png',
        },
        {
          title: 'Rehabilitación en Amputados',
          description: 'Programa integral de rehabilitación para pacientes con amputaciones.',
          longDescription:
            'Nuestro programa de rehabilitación para amputados está diseñado para maximizar la independencia y calidad de vida de cada paciente. Comenzamos con una evaluación completa que incluye el estado físico, psicológico y social del paciente.\n\nEl programa incluye ejercicios de fortalecimiento muscular, entrenamiento de equilibrio, práctica de actividades de la vida diaria y adaptación psicológica. Utilizamos equipos especializados y técnicas de rehabilitación avanzadas para acelerar la recuperación.\n\nAcompañamos al paciente durante todo el proceso, desde la fase preprotésica hasta la adaptación completa a su nueva prótesis. Realizamos evaluaciones periódicas para medir el progreso y ajustar el programa según las necesidades cambiantes.',
          img: '/images/banners/rehabilitacion-amputados-fd.png',
        },
        {
          title: 'Entrenamiento Funcional con Prótesis',
          description:
            'Programa especializado de entrenamiento para maximizar el uso funcional de la prótesis.',
          longDescription:
            'Nuestro programa de entrenamiento funcional está diseñado para ayudar a los pacientes a desarrollar las habilidades necesarias para utilizar su prótesis de manera efectiva en actividades de la vida diaria. Incluye ejercicios específicos para mejorar la coordinación, equilibrio, fuerza y resistencia.\n\nEl entrenamiento se adapta a las necesidades individuales de cada paciente, considerando su nivel de amputación, tipo de prótesis y objetivos personales. Utilizamos equipos especializados y técnicas de rehabilitación avanzadas para acelerar el proceso de adaptación.\n\nRealizamos sesiones progresivas que van desde ejercicios básicos de control hasta actividades complejas como subir escaleras, caminar en terrenos irregulares y realizar tareas específicas. Nuestro objetivo es que cada paciente logre la máxima independencia y confianza en el uso de su prótesis.',
          img: '/images/banners/entrenamiento-funcional-protesis-fd.png',
        },
        {
          title: 'Ajuste y Calibración Especializada',
          description: 'Perfeccionamiento continuo del dispositivo con tecnología de precisión.',
          longDescription:
            'El ajuste y calibración de dispositivos ortopédicos es un proceso continuo que requiere experiencia técnica y tecnología de precisión. Nuestro equipo de técnicos especializados utiliza equipos de última generación para realizar ajustes milimétricos que optimizan la funcionalidad y confort.\n\nEl proceso de ajuste incluye evaluación del paciente, análisis de la marcha, pruebas de funcionalidad y calibración de componentes electrónicos cuando sea necesario. Utilizamos software especializado para analizar datos biomecánicos y realizar ajustes precisos.\n\nRealizamos seguimiento continuo del paciente, programando revisiones periódicas para evaluar el funcionamiento del dispositivo y realizar ajustes preventivos. Nuestro objetivo es garantizar que cada dispositivo mantenga su funcionalidad óptima a lo largo del tiempo.',
          img: '/images/banners/AjusteProtesisFD.png',
        },
      ],
    },
    musculoesqueletica: {
      title: 'Fisioterapia',
      description: 'Recupera movilidad y fuerza tras lesiones deportivas, cirugías o fracturas.',
      image: '/images/banners/Fisioterapiadf.png',
      features: [
        {
          title: 'Rehabilitación de Lesiones Deportivas',
          description:
            'Recuperación específica para deportistas de alto rendimiento con técnicas avanzadas.',
          longDescription:
            'Nuestro programa de rehabilitación deportiva está diseñado específicamente para atletas y deportistas que buscan recuperar su rendimiento óptimo después de una lesión. Utilizamos técnicas de fisioterapia avanzada combinadas con tecnología de vanguardia para acelerar la recuperación.\n\nEl tratamiento incluye evaluación biomecánica completa, análisis del gesto deportivo específico, programa de rehabilitación personalizado y prevención de recidivas. Trabajamos con equipos de última generación como ultrasonido terapéutico, electroestimulación y plataformas de equilibrio.\n\nNuestro equipo de fisioterapeutas especializados en deporte desarrolla protocolos específicos para cada tipo de lesión y deporte, garantizando una recuperación segura y efectiva. Realizamos seguimiento continuo del progreso y ajustamos el tratamiento según la evolución del paciente.',
          img: '/images/banners/lesiones-deportivas-fd.png',
        },
        {
          title: 'Rehabilitación Postoperatoria Integral',
          description: 'Recuperación completa después de cirugías con protocolos especializados.',
          longDescription:
            'La rehabilitación postoperatoria es fundamental para el éxito de cualquier intervención quirúrgica. Nuestro programa integral incluye evaluación preoperatoria, planificación del tratamiento postoperatorio y seguimiento continuo durante todo el proceso de recuperación.\n\nUtilizamos técnicas de fisioterapia especializadas como movilización precoz, ejercicios de fortalecimiento progresivo, control del dolor y prevención de complicaciones. Cada protocolo se adapta a la cirugía específica, la condición del paciente y sus objetivos de recuperación.\n\nNuestro equipo trabaja en coordinación con los cirujanos para garantizar que el tratamiento de rehabilitación complemente perfectamente la intervención quirúrgica. Realizamos evaluaciones periódicas para medir el progreso y ajustar el tratamiento según sea necesario.',
          img: '/images/banners/rehabilitacion-postoperatoria-fd.png',
        },
        {
          title: 'Terapia Manual Especializada',
          description:
            'Técnicas manuales avanzadas para alivio del dolor y mejora de la movilidad.',
          longDescription:
            'Nuestra terapia manual especializada combina técnicas tradicionales con enfoques modernos para proporcionar alivio efectivo del dolor y mejora de la movilidad. Utilizamos técnicas como masaje terapéutico, movilización articular, técnicas de liberación miofascial y estiramientos específicos.\n\nEl tratamiento se basa en evaluación manual completa, identificación de puntos gatillo y áreas de tensión, aplicación de técnicas específicas y educación del paciente sobre autocuidado. Cada sesión se adapta a las necesidades específicas del paciente y su respuesta al tratamiento.\n\nRealizamos seguimiento continuo del paciente, ajustando las técnicas según su evolución y necesidades cambiantes. Nuestro objetivo es proporcionar alivio inmediato del dolor mientras trabajamos en la mejora a largo plazo de la movilidad y funcionalidad.',
          img: '/images/banners/Fisioterapia2fd.png',
        },
        {
          title: 'Fortalecimiento Muscular Especializado',
          description:
            'Programas personalizados de fortalecimiento con equipos de última generación.',
          longDescription:
            'Nuestros programas de fortalecimiento muscular están diseñados específicamente para cada paciente, considerando su condición física, objetivos y limitaciones. Utilizamos equipos de última generación como máquinas isocinéticas, plataformas vibratorias y sistemas de resistencia variable.\n\nEl programa incluye evaluación inicial de fuerza y resistencia, diseño de rutinas personalizadas, supervisión durante las sesiones y seguimiento del progreso. Trabajamos con diferentes modalidades de entrenamiento como entrenamiento excéntrico, pliométrico y funcional.\n\nNuestro equipo de fisioterapeutas especializados en ejercicio terapéutico garantiza que cada programa sea seguro, efectivo y adaptado a las necesidades específicas del paciente. Realizamos evaluaciones periódicas para medir el progreso y ajustar la intensidad del entrenamiento.',
          img: '/images/banners/fortalecimientomuscularfd.png',
        },
      ],
    },
    amputados: {
      title: 'Órtesis',
      description:
        'Fabricación, ajuste y personalización de dispositivos ortopédicos con tecnología digital y materiales de alta calidad.',
      image: '/images/banners/ortesis-cafeteria.png',
      features: [
        {
          title: 'Órtesis de rodilla (Rodilleras)',
          description: 'Dispositivos para estabilización y protección articular.',
          longDescription:
            'Nuestras órtesis de rodilla están diseñadas específicamente para cada paciente, considerando su patología, nivel de actividad y objetivos de tratamiento. Utilizamos materiales de última generación que combinan ligereza, durabilidad y confort.\n\nEl proceso incluye evaluación biomecánica completa, análisis de la marcha, diseño personalizado y fabricación en nuestro taller especializado. Cada órtesis se ajusta perfectamente a la anatomía del paciente, proporcionando el soporte necesario sin limitar la movilidad.\n\nRealizamos seguimiento continuo del paciente, ajustando la órtesis según su evolución y necesidades cambiantes. Nuestro objetivo es proporcionar estabilidad y protección articular mientras mantenemos la máxima funcionalidad posible.',
          img: '/images/banners/ortesis-rodilla-fd.png',
        },
        {
          title: 'Férulas y Soportes',
          description: 'Inmovilización y soporte terapéutico adaptado a cada necesidad específica.',
          longDescription:
            'Nuestras férulas y soportes personalizados están diseñados para proporcionar inmovilización terapéutica y soporte específico según la patología del paciente. Utilizamos termoplásticos de alta calidad que se moldean perfectamente a la anatomía del paciente.\n\nEl proceso de fabricación incluye evaluación clínica, diseño personalizado, moldeado a medida y pruebas de ajuste. Cada dispositivo se fabrica considerando factores como la duración del tratamiento, nivel de actividad y comodidad del paciente.\n\nRealizamos revisiones periódicas para evaluar la efectividad del tratamiento y realizar ajustes cuando sea necesario. Nuestro equipo de técnicos especializados garantiza que cada dispositivo cumpla con los más altos estándares de calidad y funcionalidad.',
          img: '/images/banners/ferulas-soportes-fd.png',
        },
        {
          title: 'Órtesis de Columna',
          description: 'Sistemas de soporte especializados para problemas de columna y postura.',
          longDescription:
            'Nuestras órtesis de columna están diseñadas para proporcionar soporte y corrección postural específica según la patología del paciente. Utilizamos sistemas modulares que permiten ajustes precisos y personalización completa.\n\nEl proceso incluye evaluación postural completa, análisis de la marcha, diseño personalizado y fabricación en nuestro taller especializado. Cada órtesis se ajusta perfectamente al paciente, proporcionando el soporte necesario sin comprometer la movilidad.\n\nRealizamos seguimiento continuo del paciente, ajustando la órtesis según su evolución y respuesta al tratamiento. Nuestro objetivo es mejorar la postura, reducir el dolor y prevenir futuras complicaciones.',
          img: '/images/banners/ortesis-columna-fd.png',
        },
        {
          title: 'Mangas y equipo deportivo',
          description: 'Compresión, soporte y accesorios para actividad física y deporte.',
          longDescription:
            'Nuestras órtesis deportivas están diseñadas específicamente para deportistas y personas activas que requieren soporte articular durante actividades físicas. Utilizamos materiales ligeros y resistentes que permiten libertad de movimiento sin comprometer la protección.\n\nEl proceso incluye evaluación biomecánica deportiva, análisis del gesto deportivo específico, diseño personalizado y fabricación en nuestro taller especializado. Cada órtesis se adapta perfectamente al deporte y nivel de actividad del paciente.\n\nRealizamos pruebas de funcionalidad deportiva y seguimiento continuo del paciente para garantizar que la órtesis cumpla con sus necesidades específicas. Nuestro objetivo es permitir que el deportista mantenga su rendimiento mientras protege sus articulaciones.',
          img: '/images/banners/mangas-equipo-deportivo-fd.png',
        },
      ],
    },
    dolor: {
      title: 'Rehabilitación del Dolor Crónico',
      description:
        'Manejo integral de dolor persistente, artritis y fibromialgia con técnicas especializadas.',
      image: '/images/banners/rehabilitacion-dolor-cronico-fd.png',
      features: [
        {
          title: 'Manejo Integral del Dolor de Espalda',
          description:
            'Terapias especializadas para aliviar el dolor crónico de espalda con enfoque multidisciplinario.',
          longDescription:
            'Nuestro programa de manejo del dolor de espalda crónico combina técnicas de fisioterapia avanzada con enfoques multidisciplinarios para abordar las causas raíz del dolor. Utilizamos evaluación biomecánica completa, análisis postural y diagnóstico funcional para desarrollar un plan de tratamiento personalizado.\n\nEl tratamiento incluye terapia manual especializada, ejercicios de estabilización lumbar, técnicas de relajación muscular y educación del paciente sobre ergonomía y prevención. Trabajamos con equipos de última generación como ultrasonido terapéutico, electroestimulación y sistemas de tracción.\n\nRealizamos seguimiento continuo del paciente, ajustando el tratamiento según su evolución y respuesta. Nuestro objetivo es no solo aliviar el dolor, sino también mejorar la funcionalidad y prevenir futuras recidivas.',
          img: '/images/banners/manejo-integral-dolor-espalda-fd.png',
        },
        {
          title: 'Tratamiento de Artritis y Fibromialgia',
          description:
            'Manejo integral de la inflamación y dolor con técnicas especializadas y tecnología avanzada.',
          longDescription:
            'Nuestro programa para artritis y fibromialgia está diseñado para mejorar la calidad de vida de pacientes con estas condiciones crónicas. Utilizamos un enfoque integral que combina fisioterapia especializada, ejercicio terapéutico y técnicas de manejo del dolor.\n\nEl tratamiento incluye evaluación funcional completa, programa de ejercicio adaptado, técnicas de relajación muscular, educación sobre manejo del dolor y asesoría sobre modificaciones del estilo de vida. Trabajamos con equipos especializados como baños de parafina, ultrasonido terapéutico y sistemas de estimulación eléctrica.\n\nRealizamos seguimiento continuo del paciente, ajustando el tratamiento según la evolución de la enfermedad y las necesidades cambiantes. Nuestro objetivo es mejorar la movilidad, reducir el dolor y mantener la independencia funcional.',
          img: '/images/banners/tratamiento-artritis-fd.png',
        },
        {
          title: 'Terapia con equipo especializado',
          description:
            'Rehabilitación con dispositivos y tecnología específica para cada fase del tratamiento.',
          longDescription:
            'Contamos con equipo especializado para rehabilitación que nos permite adaptar la terapia a tus necesidades: electroestimulación, ultrasonido terapéutico, plataformas de equilibrio, bandas elásticas, poleas y sistemas de resistencia progresiva.\n\nIniciamos con una evaluación funcional para definir objetivos claros y asignar el equipo adecuado a cada etapa (control del dolor, movilidad, fuerza y estabilidad). Las sesiones son guiadas y progresivas, priorizando seguridad y eficacia.\n\nMedimos resultados periódicamente y ajustamos parámetros e intensidad según tu respuesta clínica, asegurando avances sostenidos y una recuperación más rápida y segura.',
          img: '/images/banners/ejercicio-terapeutico-fd.png',
        },
        {
          title: 'Seguimiento Continuo',
          description:
            'Revisiones periódicas, ajustes y acompañamiento para un control duradero del dolor.',
          longDescription:
            'El seguimiento continuo es clave en el manejo del dolor crónico. Programamos revisiones periódicas para evaluar tu evolución, ajustar el plan terapéutico y reforzar estrategias de autocuidado.\n\nIntegramos medición de progreso, ajuste de ejercicios, educación postural, hábitos saludables y, cuando corresponde, coordinación con otros especialistas. Este enfoque iterativo permite prevenir recaídas, mantener logros y mejorar tu calidad de vida a largo plazo.\n\nNos enfocamos en objetivos realistas y medibles, optimizando la frecuencia de sesiones y la combinación de terapias según tu respuesta clínica.',
          img: '/images/banners/seguimiento-continuo-fd.png',
        },
      ],
    },
    productos: {
      title: 'Área de Productos Ortopédicos',
      description:
        'Asesoría especializada y venta de productos ortopédicos de alta calidad: bastones, muletas, sillas de ruedas y más.',
      image: '/images/banners/area-productos-ortopedicos-fd.png',
      features: [
        {
          title: 'Bastones y Muletas',
          description:
            'Soporte especializado para mejorar la movilidad con productos de alta calidad.',
          longDescription:
            'Nuestro catálogo de bastones y muletas incluye productos de la más alta calidad, diseñados para proporcionar soporte y estabilidad según las necesidades específicas de cada paciente. Ofrecemos asesoría especializada para seleccionar el producto más adecuado.\n\nNuestros productos incluyen bastones ajustables, muletas de axila y antebrazo, bastones con base amplia para mayor estabilidad y productos especializados para diferentes condiciones. Cada producto se selecciona considerando factores como el nivel de movilidad del paciente, su condición física y estilo de vida.\n\nRealizamos evaluación funcional para determinar el producto más adecuado, asesoría sobre uso correcto y seguimiento para garantizar que el producto cumpla con las necesidades del paciente. Nuestro objetivo es mejorar la movilidad y seguridad del paciente.',
          img: '/images/banners/bastones-muletas.png',
        },
        {
          title: 'Sillas de Ruedas',
          description: 'Modelos manuales y eléctricos de alta calidad con tecnología avanzada.',
          longDescription:
            'Nuestras sillas de ruedas representan la vanguardia en tecnología de movilidad, ofreciendo comodidad, funcionalidad y seguridad. Incluimos modelos manuales ligeros, sillas eléctricas de alta tecnología y productos especializados para diferentes necesidades.\n\nCada silla se selecciona considerando factores como el nivel de movilidad del usuario, su entorno de uso, necesidades de transporte y estilo de vida. Nuestros productos incluyen sillas con sistemas de propulsión asistida, asientos especializados para prevención de úlceras por presión y sistemas de posicionamiento avanzados.\n\nRealizamos evaluación funcional completa, asesoría sobre selección del producto, entrenamiento en uso y seguimiento continuo. Nuestro objetivo es proporcionar independencia y calidad de vida a nuestros usuarios.',
          img: '/images/banners/sillas-ruedas-fd.png',
        },
        {
          title: 'Calzado Ortopédico',
          description: 'Zapatos especializados diseñados para diferentes necesidades ortopédicas.',
          longDescription:
            'Nuestro calzado ortopédico está diseñado específicamente para personas con necesidades especiales, combinando funcionalidad terapéutica con comodidad y estilo. Ofrecemos zapatos con características especiales como suelas antideslizantes, plantillas removibles y ajustes personalizados.\n\nNuestros productos incluyen calzado para pie diabético, zapatos con soporte para arco alto o bajo, calzado postoperatorio y zapatos especializados para diferentes actividades. Cada producto se selecciona considerando la condición específica del paciente, su nivel de actividad y preferencias de estilo.\n\nRealizamos evaluación del pie, asesoría sobre selección del calzado, pruebas de ajuste y seguimiento para garantizar que el producto cumpla con las necesidades del paciente. Nuestro objetivo es proporcionar comodidad y soporte mientras mantenemos la movilidad.',
          img: '/images/banners/calzado-ortopedico-fd.png',
        },
        {
          title: 'Fajas y Soportes',
          description:
            'Apoyo especializado para la columna y articulaciones con productos de alta calidad.',
          longDescription:
            'Nuestras fajas y soportes están diseñados para proporcionar soporte terapéutico específico según las necesidades de cada paciente. Utilizamos materiales de alta calidad que combinan soporte efectivo con comodidad y durabilidad.\n\nNuestros productos incluyen fajas lumbares, soportes para rodilla, tobilleras, muñequeras y productos especializados para diferentes condiciones. Cada producto se selecciona considerando la patología específica, nivel de actividad y objetivos de tratamiento del paciente.\n\nRealizamos evaluación funcional, asesoría sobre selección del producto, instrucciones de uso y seguimiento para garantizar efectividad. Nuestro objetivo es proporcionar soporte terapéutico efectivo mientras mantenemos la movilidad y comodidad del paciente.',
          img: '/images/banners/fajas-soportes-fd.png',
        },
      ],
    },
  };

  const paginate = (newDirection) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const newIndex = (currentIndex + newDirection + tabs.length) % tabs.length;
    setActiveTab(tabs[newIndex].id);
  };

  return (
    <section
      id="interactive-services"
      aria-labelledby="interactive-services-heading"
      className="bg-white py-16 relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-1/3 w-72 h-72 bg-gray-50 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-50 rounded-full opacity-15 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
            <span
              className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"
              style={{ transform: 'translateY(1px)' }}
            ></span>
            Servicios Especializados
          </span>
          <h2
            id="interactive-services-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Ofrecemos soluciones de Rehabilitación y ortopedia completas con tecnología avanzada
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo nuestra tecnología de vanguardia y atención personalizada pueden
            transformar tu calidad de vida.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10 sm:mb-12 relative">
          <div
            className="
              flex gap-2 
              overflow-x-auto whitespace-nowrap no-scrollbar 
              -mx-4 px-6 
              sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center
              scroll-smooth
              pb-2
            "
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-full border text-sm sm:text-base transition-all duration-300 text-center shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105 font-semibold'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout - Desktop */}
        <div className="hidden md:block relative">
          {/* Contenedor principal Desktop con imagen y contenido */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {/* Left side - Image */}
            <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={content[activeTab].image}
                alt={content[activeTab].title}
                fill
                className="object-cover"
                quality={95}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Right side - Content */}
            <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900 p-8 rounded-2xl shadow-xl border border-white/20">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">{content[activeTab].title}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{content[activeTab].description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                {activeTab && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const path = `/servicios/detalle/${activeTab}`;
                      // Usar window.location para asegurar navegación correcta
                      if (typeof window !== 'undefined') {
                        window.location.href = path;
                      }
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-center inline-flex items-center justify-center"
                  >
                    MÁS INFORMACIÓN
                  </button>
                )}
                <button
                  onClick={() => openWhatsApp()}
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors shadow-lg hover:shadow-xl"
                >
                  AGENDAR CONSULTA
                </button>
              </div>
            </div>
          </motion.div>

          {/* Flecha izquierda - Desktop */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 cursor-pointer z-20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Pestaña anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Flecha derecha - Desktop */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 cursor-pointer z-20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Pestaña siguiente"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Feature Cards en una fila horizontal - Desktop ONLY */}
          <motion.div
            key={`${activeTab}-features-desktop`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8"
          >
            <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {content[activeTab].features.map((feature, index) => {
                // Crear elementos para el Marquee (imágenes de otras features)
                const otherFeatures = content[activeTab].features.filter((f, i) => i !== index);
                const marqueeItems = otherFeatures.slice(0, 3);

                return (
                  <BentoCard
                    key={feature.title}
                    className="bg-white text-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105 hover:border-blue-200 shadow-lg flex flex-col h-full group"
                    rowSpan={1}
                    colSpan={1}
                  >
                    {/* Background con imagen y Marquee */}
                    <div className="absolute inset-0 z-0">
                      {/* Imagen principal */}
                      <div className="relative w-full aspect-[3/2]">
                        <Image
                          src={feature.img}
                          alt={feature.title}
                          fill
                          className="object-cover"
                          quality={95}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          priority={index < 2}
                        />
                      </div>
                      {/* Marquee animado - visible en hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-[120px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Marquee
                          pauseOnHover
                          className="absolute top-0 w-full [mask-image:linear-gradient(to_top,transparent_30%,#000_70%,#000_100%)] [--duration:25s]"
                        >
                          {marqueeItems.map((f, idx) => (
                            <figure
                              key={idx}
                              className="relative w-28 cursor-pointer overflow-hidden rounded-lg border p-2 border-gray-200 bg-white/90 hover:bg-white transform-gpu blur-[0.5px] transition-all duration-300 ease-out hover:blur-none mx-2 shadow-sm"
                            >
                              <div className="relative w-full h-20 mb-1.5">
                                <Image
                                  src={f.img}
                                  alt={f.title}
                                  fill
                                  className="object-cover rounded"
                                  quality={75}
                                />
                              </div>
                              <figcaption className="text-xs font-medium text-gray-700 truncate px-1">
                                {f.title}
                              </figcaption>
                            </figure>
                          ))}
                        </Marquee>
                      </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Imagen visible siempre */}
                      <div className="relative w-full aspect-[3/2] flex-shrink-0">
                        <Image
                          src={feature.img}
                          alt={feature.title}
                          fill
                          className="object-cover"
                          quality={95}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          priority={index < 2}
                        />
                      </div>
                      {/* Contenido de texto */}
                      <div className="p-5 flex flex-col flex-grow bg-white">
                        <h4 className="font-bold text-gray-900 mb-3 text-lg leading-tight">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                          {feature.description}
                        </p>
                        <button
                          onClick={() => setSelectedFeature(feature)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors flex items-center mt-auto"
                        >
                          Ver más
                          <ChevronRightIcon className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </BentoCard>
                );
              })}
            </BentoGrid>
          </motion.div>
        </div>

        {/* Versión Móvil */}
        <div className="md:hidden space-y-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;

              if (swipe < -50) {
                paginate(1);
              } else if (swipe > 50) {
                paginate(-1);
              }
            }}
          >
            {/* Card Principal */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={content[activeTab].image}
                  alt={content[activeTab].title}
                  fill
                  className="object-cover"
                  quality={95}
                  sizes="100vw"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">{content[activeTab].title}</h3>
                <p className="text-gray-700 leading-relaxed">{content[activeTab].description}</p>
                <div className="flex flex-col gap-3 pt-2">
                  {activeTab && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const path = `/servicios/detalle/${activeTab}`;
                        // Usar window.location para asegurar navegación correcta
                        if (typeof window !== 'undefined') {
                          window.location.href = path;
                        }
                      }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg text-center inline-flex items-center justify-center"
                    >
                      MÁS INFORMACIÓN
                    </button>
                  )}
                  <button
                    onClick={() => openWhatsApp()}
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    AGENDAR CONSULTA
                  </button>
                </div>
              </div>
            </div>

            {/* Grid 2x2 de Features - Móvil */}
            <div className="grid grid-cols-2 gap-3">
              {content[activeTab].features.map((feature, index) => {
                const otherFeatures = content[activeTab].features.filter((f, i) => i !== index);
                const marqueeItems = otherFeatures.slice(0, 3);

                return (
                  <div
                    key={feature.title}
                    className="bg-white text-gray-900 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 hover:border-blue-200 shadow-lg flex flex-col h-full group relative"
                  >
                    <div className="absolute inset-0 z-0">
                      <div className="relative w-full aspect-[3/2]">
                        <Image
                          src={feature.img}
                          alt={feature.title}
                          fill
                          className="object-cover"
                          quality={95}
                          sizes="50vw"
                          priority={index < 2}
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-[100px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Marquee
                          pauseOnHover
                          className="absolute top-0 w-full [mask-image:linear-gradient(to_top,transparent_30%,#000_70%,#000_100%)] [--duration:25s]"
                        >
                          {marqueeItems.map((f, idx) => (
                            <figure
                              key={idx}
                              className="relative w-24 cursor-pointer overflow-hidden rounded-lg border p-1.5 border-gray-200 bg-white/90 hover:bg-white transform-gpu blur-[0.5px] transition-all duration-300 ease-out hover:blur-none mx-2 shadow-sm"
                            >
                              <div className="relative w-full h-16 mb-1">
                                <Image
                                  src={f.img}
                                  alt={f.title}
                                  fill
                                  className="object-cover rounded"
                                  quality={75}
                                />
                              </div>
                              <figcaption className="text-xs font-medium text-gray-700 truncate px-1">
                                {f.title}
                              </figcaption>
                            </figure>
                          ))}
                        </Marquee>
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="relative w-full aspect-[3/2] flex-shrink-0">
                        <Image
                          src={feature.img}
                          alt={feature.title}
                          fill
                          className="object-cover"
                          quality={95}
                          sizes="50vw"
                          priority={index < 2}
                        />
                      </div>
                      <div className="p-3 flex flex-col flex-grow bg-white">
                        <h4 className="font-bold text-gray-900 mb-2 text-sm leading-tight">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 text-xs leading-relaxed mb-2 flex-grow line-clamp-2">
                          {feature.description}
                        </p>
                        <button
                          onClick={() => setSelectedFeature(feature)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-xs transition-colors flex items-center mt-auto"
                        >
                          Ver más
                          <ChevronRightIcon className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Modal/Slide-over Panel */}
        {typeof window !== 'undefined'
          ? createPortal(
              <AnimatePresence>
                {selectedFeature && selectedFeature.title && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
                      style={{ zIndex: 9990 }}
                      onClick={() => setSelectedFeature(null)}
                      aria-hidden="true"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      className="fixed inset-0 flex items-start justify-center p-4 pt-8 sm:pt-12 md:pt-16 pointer-events-none font-sans"
                      style={{ zIndex: 9991, fontFamily: "'Inter', sans-serif" }}
                    >
                      <div
                        className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col border border-gray-100 pointer-events-auto relative font-sans"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Header mejorado con mejor gradiente y tipografía */}
                        <div className="relative h-56 sm:h-64 md:h-80 flex-shrink-0 overflow-hidden">
                          <Image
                            src={
                              selectedFeature?.img || '/images/banners/plantillasortopedicasfd.png'
                            }
                            alt={selectedFeature?.title || 'Servicio'}
                            fill
                            className="object-cover scale-105 transition-transform duration-700 hover:scale-100"
                            priority
                          />
                          {/* Gradiente mejorado para mejor legibilidad */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/60 to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-transparent"></div>

                          {/* Contenido del header con mejor espaciado */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                            >
                              <h2
                                id="modal-title"
                                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-2xl"
                                style={{
                                  letterSpacing: '-0.02em',
                                  textShadow: '0 4px 20px rgba(0,0,0,0.4)',
                                }}
                              >
                                {selectedFeature?.title || 'Servicio'}
                              </h2>
                              <p className="text-base md:text-lg text-white/95 max-w-3xl leading-relaxed drop-shadow-lg">
                                {selectedFeature?.description || ''}
                              </p>
                            </motion.div>
                          </div>

                          {/* Botón de cerrar mejorado */}
                          <motion.button
                            onClick={() => setSelectedFeature(null)}
                            className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-white/95 backdrop-blur-md border border-gray-200/50 text-gray-700 hover:bg-white hover:border-gray-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
                            aria-label="Cerrar modal"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <XIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:text-gray-900 transition-colors" />
                          </motion.button>
                        </div>

                        {/* Content con mejor fondo y espaciado */}
                        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50/50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
                            {/* Descripción Principal mejorada */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
                            >
                              <div className="flex items-center mb-6">
                                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                  Descripción del Servicio
                                </h3>
                              </div>
                              <div className="space-y-4">
                                {selectedFeature?.longDescription ? (
                                  selectedFeature.longDescription
                                    .split('\n\n')
                                    .map((paragraph, index) => (
                                      <motion.p
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.06 }}
                                        className="text-base md:text-lg text-gray-700 leading-relaxed"
                                        style={{ letterSpacing: '-0.01em' }}
                                      >
                                        {paragraph}
                                      </motion.p>
                                    ))
                                ) : (
                                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                    {selectedFeature?.description || 'Información no disponible'}
                                  </p>
                                )}
                              </div>
                            </motion.div>

                            {/* Proceso de Tratamiento mejorado */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.35 }}
                            >
                              <div className="flex items-center mb-6">
                                <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full mr-4"></div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                  Proceso de Tratamiento
                                </h3>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {[
                                  {
                                    step: '1',
                                    title: 'Evaluación Inicial',
                                    desc: 'Análisis completo de tu condición y necesidades específicas',
                                    icon: '🔍',
                                  },
                                  {
                                    step: '2',
                                    title: 'Diseño Personalizado',
                                    desc: 'Creación de un plan de tratamiento adaptado a ti',
                                    icon: '✏️',
                                  },
                                  {
                                    step: '3',
                                    title: 'Aplicación del Tratamiento',
                                    desc: 'Implementación del protocolo con supervisión especializada',
                                    icon: '⚡',
                                  },
                                  {
                                    step: '4',
                                    title: 'Seguimiento Continuo',
                                    desc: 'Monitoreo del progreso y ajustes según sea necesario',
                                    icon: '📊',
                                  },
                                ].map((item, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.45 + index * 0.08 }}
                                    className="group relative bg-white rounded-2xl p-5 md:p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                                  >
                                    {/* Efecto de fondo sutil */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div className="relative flex items-start space-x-4">
                                      <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                                          <span className="text-2xl">{item.icon}</span>
                                        </div>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center mb-2">
                                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full mr-2">
                                            PASO {item.step}
                                          </span>
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2 text-base md:text-lg">
                                          {item.title}
                                        </h4>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                          {item.desc}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>

                            {/* Especificaciones Técnicas mejoradas */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.5 }}
                            >
                              <div className="flex items-center mb-6">
                                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full mr-4"></div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                  Especificaciones Técnicas
                                </h3>
                              </div>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                                {/* Características del Servicio */}
                                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                                  <div className="flex items-center mb-5">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mr-3">
                                      <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900">
                                      Características del Servicio
                                    </h4>
                                  </div>
                                  <div className="space-y-3">
                                    {[
                                      {
                                        label: 'Duración del Tratamiento',
                                        value: 'Varía según la condición',
                                      },
                                      {
                                        label: 'Sesiones Requeridas',
                                        value: 'Personalizadas según necesidades',
                                      },
                                      { label: 'Garantía', value: 'Seguimiento continuo incluido' },
                                      {
                                        label: 'Certificaciones',
                                        value: 'Profesionales certificados',
                                      },
                                    ].map((spec, index) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                                        className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                                      >
                                        <span className="text-sm font-medium text-gray-700">
                                          {spec.label}
                                        </span>
                                        <span className="text-sm text-purple-600 font-semibold">
                                          {spec.value}
                                        </span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>

                                {/* Equipamiento Utilizado */}
                                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                                  <div className="flex items-center mb-5">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                                      <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                      </svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900">
                                      Equipamiento Utilizado
                                    </h4>
                                  </div>
                                  <div className="space-y-3">
                                    {[
                                      'Tecnología 3D avanzada',
                                      'Software biomecánico especializado',
                                      'Materiales de grado médico',
                                      'Equipos de rehabilitación modernos',
                                    ].map((equipment, index) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.65 + index * 0.05 }}
                                        className="flex items-center space-x-3 py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                                      >
                                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                        <span className="text-sm text-gray-700 font-medium">
                                          {equipment}
                                        </span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>

                            {/* Información de Contacto mejorada */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.6 }}
                            >
                              <div className="flex items-center mb-6">
                                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-4"></div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                  Información de Contacto
                                </h3>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                  {
                                    icon: '📞',
                                    title: 'Teléfono',
                                    info: '+52 777 215 0982',
                                    color: 'from-blue-500 to-blue-600',
                                  },
                                  {
                                    icon: '📍',
                                    title: 'Ubicación',
                                    info: 'Cuernavaca, Morelos',
                                    color: 'from-green-500 to-green-600',
                                  },
                                  {
                                    icon: '🕒',
                                    title: 'Horarios',
                                    info: 'Lun-Vie: 9:00 - 18:00',
                                    color: 'from-orange-500 to-orange-600',
                                  },
                                ].map((contact, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.75 + index * 0.08 }}
                                    className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-gray-300 text-center hover:shadow-lg transition-all duration-300"
                                  >
                                    <div
                                      className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                    >
                                      {contact.icon}
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2 text-base">
                                      {contact.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 font-medium">
                                      {contact.info}
                                    </p>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>

                            {/* CTA mejorado al final */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.8 }}
                              className="pt-4 border-t border-gray-200"
                            >
                              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 text-center border border-green-100">
                                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                  ¿Listo para comenzar?
                                </h4>
                                <p className="text-base text-gray-600 mb-6 max-w-md mx-auto">
                                  Agenda tu cita y recibe atención personalizada de nuestros
                                  especialistas
                                </p>
                                <motion.button
                                  onClick={() => {
                                    const title = selectedFeature?.title || 'este servicio';
                                    setSelectedFeature(null);
                                    openWhatsApp(
                                      `Hola, me gustaría obtener más información sobre el servicio: "${title}".`,
                                    );
                                  }}
                                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-base md:text-lg"
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <svg
                                    className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                  </svg>
                                  Agendar cita por WhatsApp
                                  <svg
                                    className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                  </svg>
                                </motion.button>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>,
              document.body,
            )
          : null}
      </div>
    </section>
  );
}

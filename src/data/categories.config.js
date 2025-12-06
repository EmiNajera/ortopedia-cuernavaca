/**
 * Configuración de categorías normalizadas
 *
 * Este archivo es la FUENTE DE VERDAD para:
 * - Nombres de categorías
 * - Descripciones
 * - Imágenes
 * - Meta tags (títulos y descripciones SEO)
 *
 * La base de datos solo proporciona:
 * - ID de categoría
 * - Slug (para validación)
 * - Conteo de productos (total_productos)
 *
 * Esto evita problemas de codificación UTF-8 y permite control total sobre el contenido.
 */

export const categoriesConfig = [
  {
    slug: 'rodilleras',
    name: 'Rodilleras Ortopédicas',
    description:
      'Rodilleras ortopédicas profesionales para alivio del dolor de rodilla, rehabilitación y soporte deportivo. Rodilleras mecánicas, elásticas y especializadas. Envío gratis en Cuernavaca.',
    image: '/images/banners/Rodillera categorias.png',
    metaTitle: 'Rodilleras Ortopédicas | Alivio del Dolor de Rodilla | Ortopedia Cuernavaca',
    metaDescription:
      'Rodilleras ortopédicas profesionales para alivio del dolor, rehabilitación y deporte. Rodilleras mecánicas, elásticas y especializadas. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'tobilleras',
    name: 'Tobilleras Ortopédicas',
    description:
      'Tobilleras ortopédicas profesionales para estabilización del tobillo, prevención de lesiones y recuperación rápida. Tobilleras elásticas, de neopreno y especializadas. Envío gratis en Cuernavaca.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Tobilleras Ortopédicas | Estabilización y Recuperación | Ortopedia Cuernavaca',
    metaDescription:
      'Tobilleras ortopédicas profesionales para estabilización del tobillo, prevención de lesiones y recuperación. Tobilleras elásticas, de neopreno y especializadas. Envío gratis.',
  },
  {
    slug: 'muniqueras',
    name: 'Muñequeras Ortopédicas',
    description:
      'Muñequeras ortopédicas profesionales para protección de muñeca, alivio del síndrome del túnel carpiano y soporte durante actividades diarias. Muñequeras básicas, con refuerzo y férulas especializadas. Envío gratis en Cuernavaca.',
    image: '/images/banners/Fajas Categoria.png',
    metaTitle: 'Muñequeras Ortopédicas | Protección y Alivio | Ortopedia Cuernavaca',
    metaDescription:
      'Muñequeras ortopédicas profesionales para protección de muñeca, alivio del túnel carpiano y soporte. Muñequeras básicas, con refuerzo y férulas especializadas. Envío gratis.',
  },
  {
    slug: 'coderas',
    name: 'Coderas Ortopédicas',
    description:
      'Coderas ortopédicas profesionales para alivio del dolor de codo, tratamiento de epicondilitis (codo de tenista) y soporte durante actividades deportivas. Coderas elásticas, con anillo y deportivas. Envío gratis en Cuernavaca.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Coderas Ortopédicas | Tratamiento Epicondilitis | Ortopedia Cuernavaca',
    metaDescription:
      'Coderas ortopédicas profesionales para alivio del dolor de codo y tratamiento de epicondilitis. Coderas elásticas, con anillo y deportivas. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'fajas',
    name: 'Fajas Ortopédicas',
    description:
      'Fajas ortopédicas profesionales para alivio del dolor lumbar, soporte postural y recuperación. Fajas lumbosacras, para hernias, maternidad y correctores de postura. Envío gratis en Cuernavaca.',
    image: '/images/banners/Fajas Categoria.png',
    metaTitle: 'Fajas Ortopédicas | Alivio del Dolor Lumbar | Ortopedia Cuernavaca',
    metaDescription:
      'Fajas ortopédicas profesionales para alivio del dolor lumbar, soporte postural y recuperación. Fajas lumbosacras, para hernias, maternidad y correctores de postura. Envío gratis.',
  },
  {
    slug: 'collares-cervicales',
    name: 'Collares y Ortesis Cervicales',
    description:
      'Collares cervicales profesionales para alivio del dolor de cuello, inmovilización post-traumática y recuperación de lesiones cervicales. Collares blandos, rígidos y ajustables. Envío gratis en Cuernavaca.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Collares Cervicales | Alivio del Dolor de Cuello | Ortopedia Cuernavaca',
    metaDescription:
      'Collares cervicales profesionales para alivio del dolor de cuello, inmovilización y recuperación. Collares blandos, rígidos y ajustables. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'ferulas',
    name: 'Férulas Ortopédicas',
    description:
      'Férulas ortopédicas profesionales para inmovilización, corrección y protección de lesiones. Férulas para mano, dedos, muñeca, antebrazo y pie. Férulas estándar y dinámicas. Envío gratis en Cuernavaca.',
    image: '/images/banners/Fajas Categoria.png',
    metaTitle: 'Férulas Ortopédicas | Inmovilización y Corrección | Ortopedia Cuernavaca',
    metaDescription:
      'Férulas ortopédicas profesionales para inmovilización, corrección y protección. Férulas para mano, dedos, muñeca, antebrazo y pie. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'inmovilizadores',
    name: 'Inmovilizadores Ortopédicos',
    description:
      'Inmovilizadores ortopédicos profesionales para inmovilización completa y recuperación segura. Inmovilizadores para rodilla, hombro, pulgar y dedos. Protección durante la rehabilitación. Envío gratis en Cuernavaca.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Inmovilizadores Ortopédicos | Inmovilización Profesional | Ortopedia Cuernavaca',
    metaDescription:
      'Inmovilizadores ortopédicos profesionales para inmovilización completa y recuperación. Para rodilla, hombro, pulgar y dedos. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'cabestrillos',
    name: 'Cabestrillos y Soportes de Hombro',
    description:
      'Cabestrillos ortopédicos profesionales para inmovilización del brazo, alivio del dolor de hombro y recuperación de lesiones. Cabestrillos e inmovilizadores de hombro ajustables. Envío gratis en Cuernavaca.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Cabestrillos Ortopédicos | Inmovilización de Brazo | Ortopedia Cuernavaca',
    metaDescription:
      'Cabestrillos ortopédicos profesionales para inmovilización del brazo y alivio del dolor de hombro. Cabestrillos e inmovilizadores ajustables. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'zapatos-ortopedicos',
    name: 'Zapatos Ortopédicos',
    description:
      'Zapatos ortopédicos especializados para corrección postural, alineación del pie y comodidad diaria. Zapatos para adultos e infantes con horma estándar e inversa. Envío gratis en Cuernavaca.',
    image: '/images/banners/Calzado categoria.png',
    metaTitle: 'Zapatos Ortopédicos | Corrección Postural | Ortopedia Cuernavaca',
    metaDescription:
      'Zapatos ortopédicos especializados para corrección postural y alineación del pie. Para adultos e infantes con horma estándar e inversa. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'tenis-ortopedicos',
    name: 'Tenis y Calzado Deportivo Ortopédico',
    description:
      'Tenis y calzado deportivo ortopédico para máximo rendimiento y protección. Calzado especializado para pie plano, pronación, supinación y actividades deportivas. Envío gratis en Cuernavaca.',
    image: '/images/banners/Calzado categoria.png',
    metaTitle: 'Tenis Ortopédicos | Calzado Deportivo Especializado | Ortopedia Cuernavaca',
    metaDescription:
      'Tenis y calzado deportivo ortopédico para máximo rendimiento. Especializado para pie plano, pronación y supinación. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'plantillas-ortopedicas',
    name: 'Plantillas Ortopédicas',
    description:
      'Plantillas ortopédicas profesionales para alivio del dolor de pie, corrección postural y máximo confort. Plantillas de gel, deportivas y personalizadas para pie plano, fascitis plantar y diabetes. Envío gratis en Cuernavaca.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Plantillas Ortopédicas | Alivio del Dolor de Pie | Ortopedia Cuernavaca',
    metaDescription:
      'Plantillas ortopédicas profesionales para alivio del dolor de pie y corrección postural. Plantillas de gel, deportivas y personalizadas. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'taloneras',
    name: 'Taloneras Ortopédicas',
    description:
      'Taloneras ortopédicas profesionales para alivio inmediato del dolor de talón, fascitis plantar y espolón calcáneo. Taloneras de gel y terapéuticas con máxima amortiguación. Envío gratis en Cuernavaca.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Taloneras Ortopédicas | Alivio del Dolor de Talón | Ortopedia Cuernavaca',
    metaDescription:
      'Taloneras ortopédicas profesionales para alivio del dolor de talón y fascitis plantar. Taloneras de gel y terapéuticas. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'bastones',
    name: 'Bastones Ortopédicos',
    description:
      'Bastones ortopédicos profesionales para mayor estabilidad, seguridad al caminar y apoyo durante la recuperación. Bastones estándar, plegables, de 4 puntos y especializados. Envío gratis en Cuernavaca.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Bastones Ortopédicos | Estabilidad y Seguridad | Ortopedia Cuernavaca',
    metaDescription:
      'Bastones ortopédicos profesionales para mayor estabilidad y seguridad al caminar. Bastones estándar, plegables, de 4 puntos y especializados. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'muletas',
    name: 'Muletas Ortopédicas',
    description:
      'Muletas ortopédicas profesionales para movilidad segura durante la recuperación de lesiones. Muletas estándar, canadienses y ajustables con máxima comodidad. Envío gratis en Cuernavaca.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Muletas Ortopédicas | Movilidad Segura | Ortopedia Cuernavaca',
    metaDescription:
      'Muletas ortopédicas profesionales para movilidad segura durante la recuperación. Muletas estándar, canadienses y ajustables. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'sillas-de-ruedas',
    name: 'Sillas de Ruedas',
    description:
      'Sillas de ruedas profesionales para máxima movilidad e independencia. Sillas de ruedas manuales, eléctricas, deportivas y pediátricas. Accesorios y repuestos disponibles. Envío gratis en Cuernavaca.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Sillas de Ruedas | Movilidad e Independencia | Ortopedia Cuernavaca',
    metaDescription:
      'Sillas de ruedas profesionales para máxima movilidad e independencia. Manuales, eléctricas, deportivas y pediátricas. Accesorios disponibles. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'andadores',
    name: 'Andadores',
    description:
      'Andadores profesionales para mayor estabilidad, seguridad y confianza al caminar. Andadores estándar, con ruedas, plegables y con asiento para descanso. Envío gratis en Cuernavaca.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Andadores | Estabilidad y Seguridad | Ortopedia Cuernavaca',
    metaDescription:
      'Andadores profesionales para mayor estabilidad y seguridad al caminar. Andadores estándar, con ruedas, plegables y con asiento. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'medias-compresion',
    name: 'Medias y Calcetines de Compresión',
    description:
      'Medias y calcetines de compresión profesionales para mejorar la circulación, reducir hinchazón y prevenir problemas venosos. Para caballero, dama y diabéticos. Medias antiembólicas y deportivas. Envío gratis en Cuernavaca.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Medias de Compresión | Mejora la Circulación | Ortopedia Cuernavaca',
    metaDescription:
      'Medias y calcetines de compresión profesionales para mejorar la circulación y reducir hinchazón. Para caballero, dama y diabéticos. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'productos-pediatricos',
    name: 'Productos Pediátricos',
    description:
      'Productos ortopédicos especializados para el cuidado y desarrollo saludable de niños. Soporte pediátrico, tratamiento de hernias, displasia de cadera y corrección postural infantil. Envío gratis en Cuernavaca.',
    image: '/images/banners/Pediatria categoria.png',
    metaTitle: 'Productos Ortopédicos Pediátricos | Cuidado Infantil | Ortopedia Cuernavaca',
    metaDescription:
      'Productos ortopédicos especializados para el cuidado y desarrollo saludable de niños. Tratamiento de hernias, displasia de cadera y corrección postural. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'terapia-rehabilitacion',
    name: 'Terapia y Rehabilitación',
    description:
      'Productos profesionales de terapia y rehabilitación para recuperación efectiva y alivio del dolor. Compresas de gel, ejercitadores, correctores y alineadores para rehabilitación completa. Envío gratis en Cuernavaca.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Terapia y Rehabilitación | Recuperación Efectiva | Ortopedia Cuernavaca',
    metaDescription:
      'Productos profesionales de terapia y rehabilitación para recuperación efectiva. Compresas de gel, ejercitadores y correctores. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'cojines-almohadas',
    name: 'Cojines y Almohadas Terapéuticas',
    description:
      'Cojines y almohadas terapéuticas profesionales para alivio de presión, soporte postural y descanso reparador. Cojines tipo dona y almohadas cervicales para máximo confort. Envío gratis en Cuernavaca.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Cojines y Almohadas Terapéuticas | Alivio de Presión | Ortopedia Cuernavaca',
    metaDescription:
      'Cojines y almohadas terapéuticas profesionales para alivio de presión y soporte postural. Cojines tipo dona y almohadas cervicales. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'equipos-medicos',
    name: 'Equipos Médicos',
    description:
      'Equipos de monitoreo médico profesionales para cuidado de la salud en casa. Baumanómetros digitales, oxímetros de pulso, termómetros y espirómetros de precisión. Envío gratis en Cuernavaca.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Equipos Médicos | Monitoreo de Salud | Ortopedia Cuernavaca',
    metaDescription:
      'Equipos de monitoreo médico profesionales para cuidado de la salud en casa. Baumanómetros, oxímetros, termómetros y espirómetros. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'mobiliario-medico',
    name: 'Mobiliario Médico',
    description:
      'Mobiliario médico especializado para máximo confort y cuidado del paciente. Colchones de presión alterna, elevadores para baño, camas hospitalarias y mobiliario de apoyo profesional. Envío gratis en Cuernavaca.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Mobiliario Médico | Confort y Cuidado | Ortopedia Cuernavaca',
    metaDescription:
      'Mobiliario médico especializado para máximo confort y cuidado del paciente. Colchones de presión alterna, elevadores para baño y mobiliario de apoyo. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'accesorios-bano',
    name: 'Accesorios de Baño',
    description:
      'Accesorios de baño profesionales para seguridad, independencia y prevención de accidentes. Barras de agarre, protectores de yeso, elevadores para inodoro y accesorios de seguridad. Envío gratis en Cuernavaca.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Accesorios de Baño | Seguridad e Independencia | Ortopedia Cuernavaca',
    metaDescription:
      'Accesorios de baño profesionales para seguridad e independencia. Barras de agarre, protectores de yeso, elevadores para inodoro. Envío gratis en Cuernavaca.',
  },
  {
    slug: 'separadores-alineadores',
    name: 'Separadores y Alineadores de Pie',
    description:
      'Separadores y alineadores de dedos profesionales para corrección de deformidades, alineación correcta y alivio del dolor. Productos especializados para juanetes, dedos en garra y deformidades del pie. Envío gratis en Cuernavaca.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle:
      'Separadores y Alineadores de Pie | Corrección de Deformidades | Ortopedia Cuernavaca',
    metaDescription:
      'Separadores y alineadores de dedos profesionales para corrección de deformidades y alineación correcta. Para juanetes, dedos en garra y deformidades del pie. Envío gratis en Cuernavaca.',
  },
];

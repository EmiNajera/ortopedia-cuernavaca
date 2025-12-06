/**
 * Configuración completa y centralizada de todas las categorías
 * Uso único: Importar en rutas dinámicas src/pages/categoria/[slug].jsx
 */

export const categoriesFullConfig = {
  fajas: {
    slug: 'fajas',
    name: 'Fajas y Soporte Lumbar',
    icon: '🩹',
    pillText: 'Soporte ortopédico especializado',
    lead: 'Fajas ortopédicas diseñadas para brindar soporte, estabilización y alivio del dolor en diferentes zonas del cuerpo.',
    description:
      'Descubre nuestra completa línea de fajas ortopédicas: desde fajas lumbares para dolor de espalda, hasta fajas abdominal postparto, torácicas, pélvicas y de compresión. Cada una diseñada con materiales médicos de alta calidad para máximo soporte y confort.',
    heroImage: '/images/banners/Fajas Categoria.png',
    heroHighlights: [
      'Materiales médicos transpirables y resistentes',
      'Diseño ergonómico para máximo soporte',
      'Asesoría personalizada de ortesistas certificados',
      'Garantía de calidad y durabilidad',
    ],
    stats: [
      { value: '8+', label: 'Tipos de fajas' },
      { value: '95%', label: 'Satisfacción' },
      { value: '24h', label: 'Entrega en Cuernavaca' },
    ],
    benefits: [
      {
        icon: '🛡️',
        title: 'Protección y Estabilización',
        description:
          'Protegen y estabilizan la zona afectada, reduciendo movimientos innecesarios y facilitando la recuperación.',
      },
      {
        icon: '🎯',
        title: 'Diseño Especializado',
        description:
          'Cada faja está diseñada para necesidades clínicas específicas: lumbar, abdominal, torácica, pélvica y más.',
      },
      {
        icon: '😌',
        title: 'Confort Máximo',
        description:
          'Materiales suaves, transpirables y ajustables para usar durante el día sin molestias.',
      },
      {
        icon: '💪',
        title: 'Soporte Activo',
        description:
          'Proporciona compresión gradual que mejora la postura y reduce el dolor de espalda.',
      },
      {
        icon: '⏱️',
        title: 'Uso Prolongado',
        description:
          'Diseñadas para usar varias horas al día, ideales para rehabilitación, trabajo y actividades cotidianas.',
      },
      {
        icon: '🏥',
        title: 'Recomendación Médica',
        description:
          'Recomendadas por fisioterapeutas y ortopedistas para tratamientos post-operatorios.',
      },
    ],
    products: [
      {
        id: '101',
        name: 'Faja Lumbar Premium',
        shortDescription: 'Soporte lumbar ajustable con refuerzos',
        image: 'https://placehold.co/400x300/27AE60/ffffff?text=Faja+Lumbar',
        price: 750,
        originalPrice: 950,
        rating: 4.8,
        reviews: 124,
        sku: 'FAJA-LUM-001',
        tags: ['Lumbar', 'Soporte', 'Neopreno'],
      },
      {
        id: '102',
        name: 'Faja Abdominal Postparto',
        shortDescription: 'Compresión progresiva para recuperación postparto',
        image: 'https://placehold.co/400x300/00D4AA/ffffff?text=Faja+Postparto',
        price: 850,
        originalPrice: 1100,
        rating: 4.9,
        reviews: 87,
        sku: 'FAJA-POST-002',
        tags: ['Postparto', 'Compresión', 'Mujer'],
      },
      {
        id: '103',
        name: 'Faja Deportiva Transpirable',
        shortDescription: 'Soporte para actividades físicas y deportes',
        image: 'https://placehold.co/400x300/F39C12/ffffff?text=Faja+Deportiva',
        price: 650,
        originalPrice: 850,
        rating: 4.7,
        reviews: 65,
        sku: 'FAJA-DEP-003',
        tags: ['Deportiva', 'Transpirable', 'Activo'],
      },
      {
        id: '104',
        name: 'Faja Torácica Ajustable',
        shortDescription: 'Soporte para zona torácica y costillas',
        image: 'https://placehold.co/400x300/E74C3C/ffffff?text=Faja+Toracica',
        price: 580,
        originalPrice: 750,
        rating: 4.6,
        reviews: 42,
        sku: 'FAJA-TOR-004',
        tags: ['Torácica', 'Costillas', 'Médica'],
      },
      {
        id: '105',
        name: 'Faja Pélvica Ortopédica',
        shortDescription: 'Estabilización pélvica para dolor de cadera',
        image: 'https://placehold.co/400x300/9B59B6/ffffff?text=Faja+Pelvica',
        price: 720,
        originalPrice: 920,
        rating: 4.7,
        reviews: 38,
        sku: 'FAJA-PEL-005',
        tags: ['Pélvica', 'Cadera', 'Compresión'],
      },
      {
        id: '106',
        name: 'Faja para Hernia Discal',
        shortDescription: 'Soporte especializado para hernias de disco',
        image: 'https://placehold.co/400x300/2ECC71/ffffff?text=Faja+Hernia',
        price: 680,
        originalPrice: 880,
        rating: 4.8,
        reviews: 56,
        sku: 'FAJA-HER-006',
        tags: ['Hernia', 'Disco', 'Médica'],
      },
      {
        id: '107',
        name: 'Faja Postoperatoria Premium',
        shortDescription: 'Recuperación post-quirúrgica con máximo soporte',
        image: 'https://placehold.co/400x300/3498DB/ffffff?text=Faja+Postquirurica',
        price: 920,
        originalPrice: 1200,
        rating: 4.9,
        reviews: 71,
        sku: 'FAJA-POSQ-007',
        tags: ['Post-quirúrgica', 'Recuperación', 'Médica'],
      },
      {
        id: '108',
        name: 'Faja de Compresión Leve',
        shortDescription: 'Compresión gradual para uso diario',
        image: 'https://placehold.co/400x300/8E44AD/ffffff?text=Faja+Compresion',
        price: 550,
        originalPrice: 700,
        rating: 4.5,
        reviews: 93,
        sku: 'FAJA-COMP-008',
        tags: ['Compresión', 'Diaria', 'Soporte'],
      },
    ],
    relatedCategories: ['ortesis', 'plantillas', 'rehabilitacion', 'pediatria'],
    faqs: [
      {
        question: '¿Cuál es la diferencia entre faja lumbar y faja sacrolumbar?',
        answer:
          'La faja lumbar proporciona soporte en la zona baja de la espalda, mientras que la faja sacrolumbar ofrece soporte desde el sacro hasta la zona lumbar, brindando mayor estabilidad general de la columna.',
      },
      {
        question: '¿Puedo usar la faja todo el día?',
        answer:
          'Sí, nuestras fajas están diseñadas para uso prolongado. Sin embargo, es recomendable usarlas máximo 8-10 horas al día y seguir las indicaciones de tu ortopedista. Las pausas regulares ayudan a fortalecer los músculos.',
      },
      {
        question: '¿Qué talla debo elegir?',
        answer:
          'Ofrecemos asesoría personalizada para seleccionar la talla correcta. Generalmente se mide la circunferencia de la cintura o cadera según el tipo de faja. Te recomendamos contactarnos vía WhatsApp para una medición precisa.',
      },
      {
        question: '¿Las fajas se pueden lavar?',
        answer:
          'Sí, la mayoría de nuestras fajas se pueden lavar a mano con agua tibia y jabón neutro. Se deben secar al aire libre. Consulta las instrucciones específicas de cada producto.',
      },
      {
        question: '¿Cuánto tiempo dura una faja?',
        answer:
          'Con uso adecuado y mantenimiento, una faja de calidad puede durar de 6 a 12 meses. La duración depende de la frecuencia de uso, el lavado y el cuidado.',
      },
      {
        question: '¿Puedo usar faja si estoy embarazada?',
        answer:
          'Existen fajas especiales diseñadas para embarazo que brindan soporte sin comprimir el abdomen. Te recomendamos consultar con tu médico y contactarnos para recomendaciones específicas.',
      },
    ],
    seo: {
      title: 'Fajas Ortopédicas | Soporte Lumbar, Postparto y Compresión | Ortopedia Cuernavaca',
      description:
        'Descubre fajas ortopédicas de calidad médica: lumbares, postparto, torácicas, pélvicas y de compresión. Asesoría personalizada de ortesistas certificados en Cuernavaca.',
      canonical: 'https://ortopediacuernavaca.com/categoria/fajas',
      image: '/images/banners/Fajas Categoria.png',
    },
  },
  plantillas: {
    slug: 'plantillas',
    name: 'Plantillas Ortopédicas',
    icon: '👣',
    pillText: 'Corrección de pisada y postura',
    lead: 'Plantillas personalizadas que corrigen problemas de pisada y mejoran la postura.',
    description:
      'Nuestras plantillas ortopédicas personalizadas están diseñadas por ortopedistas para corregir problemas de pisada, aliviar el dolor de pies y mejorar tu postura general.',
    heroImage: '/images/banners/Plantillas categoria.png',
    heroHighlights: [
      'Personalizadas según tu huella',
      'Materiales de alta densidad',
      'Corrección de pisada',
      'Comodidad garantizada',
    ],
    stats: [
      { value: '8+', label: 'Tipos de plantillas' },
      { value: '98%', label: 'Satisfacción' },
      { value: '48h', label: 'Entrega personalizada' },
    ],
    benefits: [
      {
        icon: '🦶',
        title: 'Corrección de Pisada',
        description: 'Corrige pronación, supinación y otros problemas de pisada.',
      },
      {
        icon: '📐',
        title: 'Personalizadas',
        description: 'Diseñadas específicamente para tus necesidades ortopédicas.',
      },
      {
        icon: '😌',
        title: 'Confort Todo el Día',
        description: 'Úsalas en cualquier tipo de calzado sin molestias.',
      },
      {
        icon: '🏃',
        title: 'Para Todas las Actividades',
        description: 'Disponibles para deportes, trabajo y uso diario.',
      },
      {
        icon: '👟',
        title: 'Compatibilidad Total',
        description: 'Se adaptan a la mayoría de tipos y estilos de zapatos.',
      },
      {
        icon: '🔬',
        title: 'Tecnología Médica',
        description: 'Fabricadas con materiales y técnicas aprobadas por ortopedistas.',
      },
    ],
    products: [
      {
        id: '201',
        name: 'Plantilla Personalizada Premium',
        shortDescription: 'Moldeadas según tu huella',
        image: 'https://placehold.co/400x300/3498DB/ffffff?text=Plantilla+Premium',
        price: 1200,
        originalPrice: 1500,
        rating: 4.9,
        reviews: 156,
        sku: 'PLANT-PREM-001',
        tags: ['Personalizada', 'Premium', 'Médica'],
      },
      {
        id: '202',
        name: 'Plantilla para Pie Plano',
        shortDescription: 'Soporte específico para pie plano',
        image: 'https://placehold.co/400x300/27AE60/ffffff?text=Pie+Plano',
        price: 950,
        originalPrice: 1200,
        rating: 4.7,
        reviews: 89,
        sku: 'PLANT-PLANO-002',
        tags: ['Pie Plano', 'Soporte', 'Médica'],
      },
      {
        id: '203',
        name: 'Plantilla Deportiva',
        shortDescription: 'Para corredores y atletas',
        image: 'https://placehold.co/400x300/E67E22/ffffff?text=Deportiva',
        price: 850,
        originalPrice: 1100,
        rating: 4.8,
        reviews: 124,
        sku: 'PLANT-DEP-003',
        tags: ['Deportiva', 'Activo', 'Rendimiento'],
      },
      {
        id: '204',
        name: 'Plantilla para Fascitis Plantar',
        shortDescription: 'Alivio del dolor de talón',
        image: 'https://placehold.co/400x300/9B59B6/ffffff?text=Fascitis',
        price: 880,
        originalPrice: 1100,
        rating: 4.9,
        reviews: 98,
        sku: 'PLANT-FASC-004',
        tags: ['Fascitis', 'Talón', 'Dolor'],
      },
      {
        id: '205',
        name: 'Plantilla Diabética',
        shortDescription: 'Cuidado especial para pies diabéticos',
        image: 'https://placehold.co/400x300/E74C3C/ffffff?text=Diabetica',
        price: 920,
        originalPrice: 1200,
        rating: 4.8,
        reviews: 67,
        sku: 'PLANT-DIAB-005',
        tags: ['Diabética', 'Médica', 'Especial'],
      },
      {
        id: '206',
        name: 'Plantilla para Niños',
        shortDescription: 'Desarrollo correcto del pie en niños',
        image: 'https://placehold.co/400x300/2ECC71/ffffff?text=Infantil',
        price: 750,
        originalPrice: 950,
        rating: 4.7,
        reviews: 102,
        sku: 'PLANT-INF-006',
        tags: ['Infantil', 'Desarrollo', 'Crecimiento'],
      },
      {
        id: '207',
        name: 'Plantilla para Trabajo',
        shortDescription: 'Comodidad para jornadas largas de pie',
        image: 'https://placehold.co/400x300/F39C12/ffffff?text=Trabajo',
        price: 800,
        originalPrice: 1000,
        rating: 4.6,
        reviews: 76,
        sku: 'PLANT-TRAB-007',
        tags: ['Trabajo', 'Confort', 'Diaria'],
      },
      {
        id: '208',
        name: 'Plantilla Gel Amortiguadora',
        shortDescription: 'Máxima amortiguación y confort',
        image: 'https://placehold.co/400x300/16A085/ffffff?text=Gel',
        price: 650,
        originalPrice: 850,
        rating: 4.5,
        reviews: 145,
        sku: 'PLANT-GEL-008',
        tags: ['Gel', 'Amortiguación', 'Confort'],
      },
    ],
    relatedCategories: ['fajas', 'ortesis', 'calzado', 'rehabilitacion'],
    faqs: [
      {
        question: '¿Cómo se hacen las plantillas personalizadas?',
        answer:
          'Realizamos un estudio de tu huella con tecnología de escaneado 3D, analizamos tu pisada y diseñamos plantillas personalizadas según tus necesidades específicas.',
      },
      {
        question: '¿Cuánto tiempo duran las plantillas?',
        answer:
          'Las plantillas de calidad médica duran de 12 a 18 meses con uso regular. El tiempo depende de tu actividad física y del cuidado que les des.',
      },
      {
        question: '¿Puedo usar las plantillas en todos mis zapatos?',
        answer:
          'Sí, nuestras plantillas se adaptan a la mayoría de zapatos. Ofrecemos diferentes tamaños y estilos para garantizar compatibilidad.',
      },
      {
        question: '¿Las plantillas sirven para el dolor de espalda?',
        answer:
          'Sí, muchas personas experimentan alivio del dolor de espalda al corregir problemas de pisada con plantillas personalizadas.',
      },
      {
        question: '¿Hay período de adaptación?',
        answer:
          'Sí, generalmente necesitas 1-2 semanas para acostumbrarte. Te recomendamos usarlas gradualmente al principio.',
      },
      {
        question: '¿Se pueden lavar las plantillas?',
        answer:
          'Sí, se pueden limpiar con agua tibia y jabón suave. Déjalas secar completamente antes de usarlas de nuevo.',
      },
    ],
    seo: {
      title: 'Plantillas Ortopédicas Personalizadas | Corrección de Pisada | Ortopedia Cuernavaca',
      description:
        'Plantillas ortopédicas personalizadas para corregir problemas de pisada, aliviar dolor de pies y mejorar postura. Asesoría gratuita de ortopedistas.',
      canonical: 'https://ortopediacuernavaca.com/categoria/plantillas',
      image: '/images/banners/Plantillas categoria.png',
    },
  },
  ortesis: {
    slug: 'ortesis',
    name: 'Ortesis y Soportes',
    icon: '🦴',
    pillText: 'Dispositivos de soporte especializado',
    lead: 'Ortesis diseñadas para estabilizar y proteger articulaciones y extremidades.',
    description:
      'Amplio catálogo de ortesis para rodilla, tobillo, muñeca, codo y hombro. Desde modelos simples hasta ortesis personalizadas de alta complejidad.',
    heroImage: '/images/banners/Rodillera categorias.png',
    heroHighlights: [
      'Modelos simples a personalizados',
      'Materiales biomecánicos avanzados',
      'Soporte ajustable según necesidad',
      'Certificación médica',
    ],
    stats: [
      { value: '50+', label: 'Tipos de ortesis' },
      { value: '96%', label: 'Satisfacción' },
      { value: '24h', label: 'Disponibilidad' },
    ],
    benefits: [
      {
        icon: '🎯',
        title: 'Precisión Biomecánica',
        description: 'Diseñadas para máxima efectividad en estabilización.',
      },
      {
        icon: '⚙️',
        title: 'Ajustables',
        description: 'Se adaptan perfectamente a tu cuerpo.',
      },
      {
        icon: '🏥',
        title: 'Médicamente Aprobadas',
        description: 'Recomendadas por ortopedistas y fisioterapeutas.',
      },
      {
        icon: '👕',
        title: 'Discreta',
        description: 'Se usan bajo la ropa sin molestias.',
      },
      {
        icon: '⚡',
        title: 'Recuperación Activa',
        description: 'Permite movimiento controlado durante rehabilitación.',
      },
      {
        icon: '🔄',
        title: 'Reutilizable',
        description: 'Duradera y fácil de mantener.',
      },
    ],
    products: [
      {
        id: '301',
        name: 'Rodillera Deportiva Neopreno',
        shortDescription: 'Soporte deportivo para rodilla',
        image: 'https://placehold.co/400x300/E74C3C/ffffff?text=Rodillera+Sport',
        price: 450,
        originalPrice: 600,
        rating: 4.7,
        reviews: 178,
        sku: 'ORTE-ROD-001',
        tags: ['Rodilla', 'Deportiva', 'Neopreno'],
      },
      {
        id: '302',
        name: 'Tobillera Tipo 8',
        shortDescription: 'Estabilización de tobillo',
        image: 'https://placehold.co/400x300/3498DB/ffffff?text=Tobillera+8',
        price: 380,
        originalPrice: 500,
        rating: 4.6,
        reviews: 134,
        sku: 'ORTE-TOB-002',
        tags: ['Tobillo', 'Tipo 8', 'Estabilidad'],
      },
      {
        id: '303',
        name: 'Muñequera Túnel Carpiano',
        shortDescription: 'Alivio del síndrome del túnel carpiano',
        image: 'https://placehold.co/400x300/9B59B6/ffffff?text=Munequera',
        price: 320,
        originalPrice: 420,
        rating: 4.8,
        reviews: 87,
        sku: 'ORTE-MUN-003',
        tags: ['Muñeca', 'Túnel Carpiano', 'Médica'],
      },
      {
        id: '304',
        name: 'Codera Acolchada',
        shortDescription: 'Protección para codo',
        image: 'https://placehold.co/400x300/27AE60/ffffff?text=Codera',
        price: 280,
        originalPrice: 380,
        rating: 4.5,
        reviews: 65,
        sku: 'ORTE-COD-004',
        tags: ['Codo', 'Acolchada', 'Protección'],
      },
      {
        id: '305',
        name: 'Hombrera Estabilizadora',
        shortDescription: 'Soporte completo de hombro',
        image: 'https://placehold.co/400x300/F39C12/ffffff?text=Hombrera',
        price: 580,
        originalPrice: 750,
        rating: 4.7,
        reviews: 98,
        sku: 'ORTE-HOM-005',
        tags: ['Hombro', 'Estabilización', 'Premium'],
      },
      {
        id: '306',
        name: 'Rodillera Articulada',
        shortDescription: 'Soporte avanzado con articulaciones',
        image: 'https://placehold.co/400x300/2ECC71/ffffff?text=Rodillera+Articulada',
        price: 850,
        originalPrice: 1100,
        rating: 4.9,
        reviews: 112,
        sku: 'ORTE-ROD-006',
        tags: ['Rodilla', 'Articulada', 'Avanzada'],
      },
      {
        id: '307',
        name: 'Thumb Spica (Pulgar)',
        shortDescription: 'Soporte para pulgar y muñeca',
        image: 'https://placehold.co/400x300/16A085/ffffff?text=Thumb+Spica',
        price: 320,
        originalPrice: 420,
        rating: 4.6,
        reviews: 54,
        sku: 'ORTE-THUMB-007',
        tags: ['Pulgar', 'Muñeca', 'Soporte'],
      },
      {
        id: '308',
        name: 'Tobillera de Gel',
        shortDescription: 'Tobillera con gel envolvente',
        image: 'https://placehold.co/400x300/E67E22/ffffff?text=Tobillera+Gel',
        price: 420,
        originalPrice: 550,
        rating: 4.7,
        reviews: 89,
        sku: 'ORTE-TOB-008',
        tags: ['Tobillo', 'Gel', 'Confort'],
      },
    ],
    relatedCategories: ['fajas', 'plantillas', 'rehabilitacion'],
    faqs: [
      {
        question: '¿Cuál es la diferencia entre ortesis simple y personalizada?',
        answer:
          'Las ortesis simples son prefabricadas y sirven para la mayoría de casos. Las personalizadas se moldean específicamente para tu anatomía y patología.',
      },
      {
        question: '¿Puedo hacer deporte con ortesis?',
        answer:
          'Sí, existen ortesis específicamente diseñadas para deportes que permiten movimiento controlado mientras brindan estabilidad.',
      },
      {
        question: '¿Cuánto tiempo necesito usar la ortesis?',
        answer:
          'Depende de tu diagnóstico. Algunos casos necesitan 4-6 semanas, otros meses. Tu fisioterapeuta te dará el período específico.',
      },
      {
        question: '¿Las ortesis interfieren con actividades diarias?',
        answer:
          'Están diseñadas para ser discretas y no interferir. Al inicio puede haber un período de adaptación.',
      },
      {
        question: '¿Se pueden lavar las ortesis?',
        answer:
          'Sí, generalmente se limpian con agua y jabón suave. Consulta las instrucciones del fabricante.',
      },
      {
        question: '¿Es necesaria prescripción médica?',
        answer:
          'Para ortesis personalizadas, sí. Para modelos estándar, recomendamos consulta con un ortopedista.',
      },
    ],
    seo: {
      title:
        'Ortesis y Soportes Ortopédicos | Rodilleras, Tobilleras, Muñequeras | Ortopedia Cuernavaca',
      description:
        'Amplio catálogo de ortesis para rodilla, tobillo, muñeca, codo y hombro. Desde modelos simples hasta personalizados. Asesoría de ortopedistas.',
      canonical: 'https://ortopediacuernavaca.com/categoria/ortesis',
      image: '/images/banners/Rodillera categorias.png',
    },
  },
  calzado: {
    slug: 'calzado',
    name: 'Calzado Ortopédico',
    icon: '👟',
    pillText: 'Comodidad y salud para tus pies',
    lead: 'Zapatos y calzado ortopédico diseñado para comodidad máxima y corrección de pisada.',
    description:
      'Catálogo completo de calzado ortopédico: zapatos de trabajo, deportivos, casuales y terapéuticos. Todos con soporte biomecánico certificado.',
    heroImage: '/images/banners/Calzado categoria.png',
    heroHighlights: [
      'Diseño ergonómico certificado',
      'Variedad de estilos y colores',
      'Transpirabilidad garantizada',
      'Garantía de durabilidad',
    ],
    stats: [
      { value: '40+', label: 'Modelos disponibles' },
      { value: '97%', label: 'Satisfacción' },
      { value: '48h', label: 'Entrega' },
    ],
    benefits: [
      {
        icon: '👟',
        title: 'Confort Total',
        description: 'Diseñados para máxima comodidad todo el día.',
      },
      {
        icon: '🦶',
        title: 'Corrección de Pisada',
        description: 'Corrige problemas de pisada mientras usas los zapatos.',
      },
      {
        icon: '🎨',
        title: 'Estilos Variados',
        description: 'Disponibles en múltiples colores y diseños modernos.',
      },
      {
        icon: '💨',
        title: 'Transpirable',
        description: 'Materiales que permiten circulación de aire.',
      },
      {
        icon: '⚖️',
        title: 'Peso Ligero',
        description: 'Zapatos livianos que no cansan los pies.',
      },
      {
        icon: '🏥',
        title: 'Médicamente Aprobado',
        description: 'Diseñados con criterios ortopédicos strictos.',
      },
    ],
    products: [
      {
        id: '401',
        name: 'Zapato de Trabajo Ortopédico',
        shortDescription: 'Para jornadas largas de pie',
        image: 'https://placehold.co/400x300/34495E/ffffff?text=Trabajo',
        price: 750,
        originalPrice: 950,
        rating: 4.7,
        reviews: 145,
        sku: 'CALZ-TRAB-001',
        tags: ['Trabajo', 'Confort', 'Soporte'],
      },
      {
        id: '402',
        name: 'Zapato Casual Cómodo',
        shortDescription: 'Para uso diario con estilo',
        image: 'https://placehold.co/400x300/E67E22/ffffff?text=Casual',
        price: 650,
        originalPrice: 850,
        rating: 4.6,
        reviews: 98,
        sku: 'CALZ-CASU-002',
        tags: ['Casual', 'Diario', 'Moderno'],
      },
      {
        id: '403',
        name: 'Zapatilla Deportiva Especial',
        shortDescription: 'Para actividades deportivas',
        image: 'https://placehold.co/400x300/27AE60/ffffff?text=Deportiva',
        price: 800,
        originalPrice: 1000,
        rating: 4.8,
        reviews: 112,
        sku: 'CALZ-DEP-003',
        tags: ['Deportiva', 'Activo', 'Rendimiento'],
      },
      {
        id: '404',
        name: 'Zapato Diabético Especial',
        shortDescription: 'Cuidado especial para pies diabéticos',
        image: 'https://placehold.co/400x300/9B59B6/ffffff?text=Diabetico',
        price: 920,
        originalPrice: 1200,
        rating: 4.9,
        reviews: 76,
        sku: 'CALZ-DIAB-004',
        tags: ['Diabético', 'Médico', 'Especial'],
      },
      {
        id: '405',
        name: 'Sandalia Ortopédica',
        shortDescription: 'Sandalia cómoda con soporte',
        image: 'https://placehold.co/400x300/16A085/ffffff?text=Sandalia',
        price: 580,
        originalPrice: 750,
        rating: 4.5,
        reviews: 67,
        sku: 'CALZ-SAND-005',
        tags: ['Sandalia', 'Verano', 'Confort'],
      },
      {
        id: '406',
        name: 'Zapato Postquirúrgico',
        shortDescription: 'Para recuperación post-operatoria',
        image: 'https://placehold.co/400x300/E74C3C/ffffff?text=Postquirurico',
        price: 650,
        originalPrice: 850,
        rating: 4.7,
        reviews: 54,
        sku: 'CALZ-POSTQ-006',
        tags: ['Post-operatorio', 'Recuperación', 'Médico'],
      },
      {
        id: '407',
        name: 'Bota Ortopédica Alta',
        shortDescription: 'Soporte completo de tobillo',
        image: 'https://placehold.co/400x300/2ECC71/ffffff?text=Bota',
        price: 950,
        originalPrice: 1200,
        rating: 4.8,
        reviews: 89,
        sku: 'CALZ-BOTA-007',
        tags: ['Bota', 'Tobillo', 'Soporte'],
      },
      {
        id: '408',
        name: 'Pantufla Terapéutica',
        shortDescription: 'Para uso en casa con máximo confort',
        image: 'https://placehold.co/400x300/3498DB/ffffff?text=Pantufla',
        price: 420,
        originalPrice: 550,
        rating: 4.6,
        reviews: 123,
        sku: 'CALZ-PANT-008',
        tags: ['Casa', 'Terapéutica', 'Confort'],
      },
    ],
    relatedCategories: ['plantillas', 'fajas', 'ortesis'],
    faqs: [
      {
        question: '¿Cómo sé qué tamaño de zapato necesito?',
        answer:
          'Ofrecemos tabla de talles completa. Recomendamos medir tu pie y consultar con nuestro personal para la medida exacta.',
      },
      {
        question: '¿Cuánto tiempo duran los zapatos ortopédicos?',
        answer:
          'Con uso regular, duran de 12 a 18 meses. Esto depende de la intensidad de uso y del cuidado que le des.',
      },
      {
        question: '¿Puedo usar los zapatos en diferentes terrenos?',
        answer:
          'Sí, están diseñados para uso en diversos terrenos. Algunos modelos tienen mayor adherencia para terrenos irregulares.',
      },
      {
        question: '¿Los zapatos son impermeables?',
        answer:
          'Algunos modelos sí. Consulta características específicas de cada zapato para saber nivel de impermeabilidad.',
      },
      {
        question: '¿Cómo debo limpiar y mantener los zapatos?',
        answer:
          'Limpia con agua y jabón suave. Déjalos secar al aire. Algunos pueden entrar en lavadora a ciclo delicado.',
      },
      {
        question: '¿Ofrecen zapatos en anchos especiales?',
        answer:
          'Sí, tenemos opciones para pies anchos y estrechos. Consulta disponibilidad de tu talla en el ancho deseado.',
      },
    ],
    seo: {
      title: 'Calzado Ortopédico | Zapatos Cómodos y Correctivos | Ortopedia Cuernavaca',
      description:
        'Amplio catálogo de zapatos y calzado ortopédico: de trabajo, deportivos, casuales y terapéuticos. Confort y corrección garantizados.',
      canonical: 'https://ortopediacuernavaca.com/categoria/calzado',
      image: '/images/banners/Calzado categoria.png',
    },
  },
  rehabilitacion: {
    slug: 'rehabilitacion',
    name: 'Equipos de Rehabilitación',
    icon: '💪',
    pillText: 'Equipos para terapia física y recuperación',
    lead: 'Equipos especializados para terapia física, rehabilitación y fortalecimiento muscular.',
    description:
      'Amplio catálogo de equipos para rehabilitación y terapia física: desde muletas y bastones hasta equipos avanzados de ejercicio.',
    heroImage: '/images/banners/Movilidad categoria.png',
    heroHighlights: [
      'Equipos de marcas certificadas',
      'Para profesionales y uso casero',
      'Fáciles de usar y mantener',
      'Asesoría de fisioterapeutas',
    ],
    stats: [
      { value: '60+', label: 'Equipos disponibles' },
      { value: '95%', label: 'Satisfacción' },
      { value: '48h', label: 'Entrega' },
    ],
    benefits: [
      {
        icon: '🏥',
        title: 'Profesionales',
        description: 'Recomendados por fisioterapeutas y ortopedistas.',
      },
      {
        icon: '💪',
        title: 'Fortalecimiento',
        description: 'Perfectos para fortalecer músculos durante recuperación.',
      },
      {
        icon: '🎯',
        title: 'Precisión',
        description: 'Equipos con alta precisión biomecánica.',
      },
      {
        icon: '🏡',
        title: 'Uso Casero',
        description: 'Perfectos para rehabilitación en el hogar.',
      },
      {
        icon: '⚡',
        title: 'Efectividad',
        description: 'Comprobada efectividad en procesos de recuperación.',
      },
      {
        icon: '🔧',
        title: 'Mantenimiento',
        description: 'Fácil de mantener y usar a largo plazo.',
      },
    ],
    products: [
      {
        id: '501',
        name: 'Muletas Ajustables',
        shortDescription: 'Altura regulable, apoyo cómodo',
        image: 'https://placehold.co/400x300/E74C3C/ffffff?text=Muletas',
        price: 600,
        originalPrice: 750,
        rating: 4.7,
        reviews: 134,
        sku: 'REHAB-MUL-001',
        tags: ['Muletas', 'Movilidad', 'Soporte'],
      },
      {
        id: '502',
        name: 'Bastón Anatómico',
        shortDescription: 'Bastón con empuñadura anatómica',
        image: 'https://placehold.co/400x300/27AE60/ffffff?text=Baston',
        price: 320,
        originalPrice: 420,
        rating: 4.6,
        reviews: 98,
        sku: 'REHAB-BAST-002',
        tags: ['Bastón', 'Movilidad', 'Anatomía'],
      },
      {
        id: '503',
        name: 'Caminador Moderno',
        shortDescription: 'Caminador estable y seguro',
        image: 'https://placehold.co/400x300/3498DB/ffffff?text=Caminador',
        price: 950,
        originalPrice: 1200,
        rating: 4.8,
        reviews: 112,
        sku: 'REHAB-CAM-003',
        tags: ['Caminador', 'Estabilidad', 'Seguridad'],
      },
      {
        id: '504',
        name: 'Banda Elástica de Resistencia',
        shortDescription: 'Para ejercicios de fortalecimiento',
        image: 'https://placehold.co/400x300/9B59B6/ffffff?text=Banda',
        price: 180,
        originalPrice: 250,
        rating: 4.7,
        reviews: 245,
        sku: 'REHAB-BAND-004',
        tags: ['Banda', 'Ejercicio', 'Fortalecimiento'],
      },
      {
        id: '505',
        name: 'Bola de Estabilidad',
        shortDescription: 'Para ejercicios core y equilibrio',
        image: 'https://placehold.co/400x300/2ECC71/ffffff?text=Bola',
        price: 420,
        originalPrice: 550,
        rating: 4.6,
        reviews: 167,
        sku: 'REHAB-BOLA-005',
        tags: ['Bola', 'Equilibrio', 'Core'],
      },
      {
        id: '506',
        name: 'Escalerilla de Coordinación',
        shortDescription: 'Para mejorar coordinación y agilidad',
        image: 'https://placehold.co/400x300/E67E22/ffffff?text=Escalerilla',
        price: 380,
        originalPrice: 500,
        rating: 4.5,
        reviews: 76,
        sku: 'REHAB-ESC-006',
        tags: ['Coordinación', 'Agilidad', 'Entrenamiento'],
      },
      {
        id: '507',
        name: 'Rodillo de Masaje',
        shortDescription: 'Para automasaje y recuperación',
        image: 'https://placehold.co/400x300/16A085/ffffff?text=Rodillo',
        price: 280,
        originalPrice: 380,
        rating: 4.8,
        reviews: 198,
        sku: 'REHAB-ROD-007',
        tags: ['Masaje', 'Recuperación', 'Relajación'],
      },
      {
        id: '508',
        name: 'Barras Paralelas Portátiles',
        shortDescription: 'Para apoyo durante ejercicios',
        image: 'https://placehold.co/400x300/F39C12/ffffff?text=Barras',
        price: 850,
        originalPrice: 1100,
        rating: 4.7,
        reviews: 89,
        sku: 'REHAB-BARR-008',
        tags: ['Barras', 'Apoyo', 'Estabilidad'],
      },
    ],
    relatedCategories: ['fajas', 'ortesis', 'plantillas'],
    faqs: [
      {
        question: '¿Cuál es la diferencia entre muleta y bastón?',
        answer:
          'Las muletas distribuyen peso en brazos y axilas, ideales para no poder apoyar una pierna. El bastón solo ayuda con el equilibrio.',
      },
      {
        question: '¿Puedo usar los equipos en casa sin supervisión?',
        answer:
          'Sí, pero recomendamos instrucciones de un fisioterapeuta la primera vez. Después puedes usarlos de forma independiente.',
      },
      {
        question: '¿Cuánto tiempo necesito estar en rehabilitación?',
        answer:
          'Depende de tu condición. Desde 4 semanas a varios meses. Tu médico establecerá el plan específico.',
      },
      {
        question: '¿Los equipos de rehabilitación son seguros?',
        answer:
          'Sí, todos nuestros equipos están certificados. Sigue instrucciones de uso para máxima seguridad.',
      },
      {
        question: '¿Cuál es la diferencia entre caminador y bastón?',
        answer:
          'El caminador brinda más estabilidad y soporte, ideal para pérdida importante de equilibrio. El bastón es para apoyo complementario.',
      },
      {
        question: '¿Cómo debo limpiar los equipos?',
        answer:
          'Limpia con agua y jabón suave. Seca bien antes de guardar. Revisa regularmente tornillos y ajustes de seguridad.',
      },
    ],
    seo: {
      title: 'Equipos de Rehabilitación | Terapia Física | Ortopedia Cuernavaca',
      description:
        'Amplio catálogo de equipos para rehabilitación, terapia física y fortalecimiento. Muletas, bastones, caminadores y más. Asesoría profesional.',
      canonical: 'https://ortopediacuernavaca.com/categoria/rehabilitacion',
      image: '/images/banners/Movilidad categoria.png',
    },
  },
  pediatria: {
    slug: 'pediatria',
    name: 'Pediatría Ortopédica',
    icon: '👶',
    pillText: 'Soluciones para la salud ortopédica de niños',
    lead: 'Productos ortopédicos diseñados específicamente para el desarrollo saludable de los niños.',
    description:
      'Categoría especializada en ortopedia infantil: desde plantillas para desarrollo del pie, hasta ortesis correctivas pediátricas.',
    heroImage: '/images/banners/Pediatria categoria.png',
    heroHighlights: [
      'Diseños seguros y divertidos',
      'Materiales hipoalergénicos',
      'Adaptados a crecimiento infantil',
      'Aprobado por pediatras',
    ],
    stats: [
      { value: '30+', label: 'Productos infantiles' },
      { value: '98%', label: 'Satisfacción' },
      { value: '48h', label: 'Entrega' },
    ],
    benefits: [
      {
        icon: '👶',
        title: 'Desarrollo Saludable',
        description: 'Favorecen el desarrollo correcto de pies y postura.',
      },
      {
        icon: '🎨',
        title: 'Diseños Divertidos',
        description: 'Colores y diseños que los niños aman.',
      },
      {
        icon: '🛡️',
        title: 'Seguridad',
        description: 'Materiales seguros y no tóxicos.',
      },
      {
        icon: '📏',
        title: 'Ajustables',
        description: 'Se adaptan al crecimiento del niño.',
      },
      {
        icon: '⚡',
        title: 'Comodidad',
        description: 'Ligeros y cómodos para el movimiento libre.',
      },
      {
        icon: '🏥',
        title: 'Recomendación Médica',
        description: 'Diseñados bajo criterios pediátricos.',
      },
    ],
    products: [
      {
        id: '601',
        name: 'Plantilla Infantil Correctiva',
        shortDescription: 'Para desarrollo correcto del pie',
        image: 'https://placehold.co/400x300/FF69B4/ffffff?text=Plantilla+Infantil',
        price: 580,
        originalPrice: 750,
        rating: 4.9,
        reviews: 145,
        sku: 'PED-PLANT-001',
        tags: ['Plantilla', 'Infantil', 'Correctiva'],
      },
      {
        id: '602',
        name: 'Zapato Ortopédico Infantil',
        shortDescription: 'Zapato cómodo con soporte',
        image: 'https://placehold.co/400x300/FF1493/ffffff?text=Zapato+Nino',
        price: 650,
        originalPrice: 850,
        rating: 4.8,
        reviews: 98,
        sku: 'PED-ZAPA-002',
        tags: ['Zapato', 'Infantil', 'Soporte'],
      },
      {
        id: '603',
        name: 'Ortesis Pie Plano Infantil',
        shortDescription: 'Corrección de pie plano en niños',
        image: 'https://placehold.co/400x300/DA70D6/ffffff?text=Ortesis+Pie',
        price: 720,
        originalPrice: 950,
        rating: 4.7,
        reviews: 76,
        sku: 'PED-ORTE-003',
        tags: ['Ortesis', 'Pie Plano', 'Infantil'],
      },
      {
        id: '604',
        name: 'Chaleco Postural Infantil',
        shortDescription: 'Corrector de postura para niños',
        image: 'https://placehold.co/400x300/DDA0DD/ffffff?text=Chaleco',
        price: 420,
        originalPrice: 550,
        rating: 4.6,
        reviews: 54,
        sku: 'PED-CHAL-004',
        tags: ['Postura', 'Corrector', 'Infantil'],
      },
      {
        id: '605',
        name: 'Rodillera Niño Activo',
        shortDescription: 'Protección para actividades de niño',
        image: 'https://placehold.co/400x300/EE82EE/ffffff?text=Rodillera+Nino',
        price: 380,
        originalPrice: 500,
        rating: 4.5,
        reviews: 87,
        sku: 'PED-ROD-005',
        tags: ['Rodillera', 'Protección', 'Activo'],
      },
      {
        id: '606',
        name: 'Tobillera Pediátrica',
        shortDescription: 'Para estabilización de tobillo',
        image: 'https://placehold.co/400x300/BA55D3/ffffff?text=Tobillera',
        price: 320,
        originalPrice: 420,
        rating: 4.7,
        reviews: 62,
        sku: 'PED-TOB-006',
        tags: ['Tobillera', 'Pediátrica', 'Estabilidad'],
      },
      {
        id: '607',
        name: 'Faja Correctora Infantil',
        shortDescription: 'Para problemas de postura',
        image: 'https://placehold.co/400x300/9932CC/ffffff?text=Faja+Infantil',
        price: 480,
        originalPrice: 650,
        rating: 4.8,
        reviews: 71,
        sku: 'PED-FAJA-007',
        tags: ['Faja', 'Postura', 'Infantil'],
      },
      {
        id: '608',
        name: 'Kit Completo Desarrollo Pediátrico',
        shortDescription: 'Pack con plantilla, zapato y accesos',
        image: 'https://placehold.co/400x300/8B008B/ffffff?text=Kit+Completo',
        price: 1450,
        originalPrice: 1850,
        rating: 4.9,
        reviews: 103,
        sku: 'PED-KIT-008',
        tags: ['Kit', 'Completo', 'Desarrollo'],
      },
    ],
    relatedCategories: ['plantillas', 'calzado', 'fajas'],
    faqs: [
      {
        question: '¿A qué edad puedo empezar con correcciones ortopédicas?',
        answer:
          'Desde los 2-3 años si hay diagnóstico de problema. Idealmente, evaluar entre 3-5 años para correcciones preventivas.',
      },
      {
        question: '¿Las plantillas infantiles afectan el juego o la actividad?',
        answer:
          'No, están diseñadas para permitir movimiento libre. Es importante que el niño sea activo para desarrollo saludable.',
      },
      {
        question: '¿Cuánto tiempo necesita usar los correctores?',
        answer:
          'Depende del problema. Algunos casos necesitan 1-2 años, otros solo períodos cortos. Tu pediatra evaluará.',
      },
      {
        question: '¿Los productos son seguros para bebés?',
        answer:
          'Sí, todos están diseñados con criterios pediátricos. Algunos productos son para niños mayores, consulta edad recomendada.',
      },
      {
        question: '¿Cómo sé si mi hijo necesita ortopedia?',
        answer:
          'Signos incluyen: caminar mal, problemas de postura, caídas frecuentes, dolor. Consulta a tu pediatra u ortopedista.',
      },
      {
        question: '¿Los productos siguen siendo efectivos si crece el niño?',
        answer:
          'Es importante cambiar según crecimiento. Ofrecemos seguimiento para ajustar o cambiar productos según desarrollo del niño.',
      },
    ],
    seo: {
      title: 'Productos Ortopédicos Infantiles | Pediatría | Ortopedia Cuernavaca',
      description:
        'Soluciones ortopédicas para niños: plantillas, zapatos, ortesis y correctores. Desarrollo saludable y seguro de los pies infantiles.',
      canonical: 'https://ortopediacuernavaca.com/categoria/pediatria',
      image: '/images/banners/Pediatria categoria.png',
    },
  },
};

/**
 * Obtener configuración de una categoría por slug
 */
export function getCategoryBySlug(slug) {
  return categoriesFullConfig[slug] || null;
}

/**
 * Obtener lista de todos los slugs de categorías
 */
export function getAllCategorySlugs() {
  return Object.keys(categoriesFullConfig);
}

/**
 * Obtener todas las categorías relacionadas basado en slugs
 */
export function getRelatedCategories(relatedSlugs) {
  if (!Array.isArray(relatedSlugs)) return [];
  return relatedSlugs
    .map((slug) => {
      const cat = categoriesFullConfig[slug];
      return cat
        ? {
            slug: cat.slug,
            name: cat.name,
            description: cat.description,
            icon: cat.icon,
          }
        : null;
    })
    .filter(Boolean);
}

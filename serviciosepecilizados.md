# Extracción Completa: Sección "Servicios Especializados" en /servicios

## 📋 Índice
1. [Estructura General](#estructura-general)
2. [Configuración y Datos](#configuración-y-datos)
3. [Código Completo](#código-completo)
4. [Imágenes Utilizadas](#imágenes-utilizadas)
5. [Componentes y Dependencias](#componentes-y-dependencias)

---

## Estructura General

### Ubicación del Archivo
- **Página principal**: `src/pages/servicios.jsx`
- **Componente principal**: `src/domains/services/components/Servicios.jsx`
- **Función específica**: `InteractiveServices()` (líneas 1067-1951)

### Estructura del Componente
La sección "Servicios Especializados" está implementada en la función `InteractiveServices()` que incluye:

1. **Header con Badge y Título**
2. **Sistema de Tabs (Pestañas)** - 7 categorías de servicios
3. **Contenido Principal** - Imagen + Descripción + Botones CTA
4. **Navegación con Flechas** - Para cambiar entre tabs
5. **Feature Cards (BentoGrid)** - 4 cards por categoría con imágenes
6. **Modal/Slide-over Panel** - Detalle expandido de cada feature

---

## Configuración y Datos

### Tabs (Pestañas de Categorías)

```javascript
const tabs = [
  { id: 'ortesis', label: 'Taller de Prótesis y Rehabilitación en Amputados' },
  { id: 'plantillas', label: 'Plantillas Ortopédicas' },
  { id: 'pediatrica', label: 'Rehabilitación Pediátrica' },
  { id: 'musculoesqueletica', label: 'Fisioterapia' },
  { id: 'amputados', label: 'Órtesis' },
  { id: 'dolor', label: 'Dolor Crónico' },
  { id: 'productos', label: 'Productos Ortopédicos' },
];
```

### Estructura de Contenido por Categoría

Cada categoría tiene la siguiente estructura:

```javascript
{
  title: 'Título del Servicio',
  description: 'Descripción corta',
  image: '/ruta/a/imagen/principal.png',
  features: [
    {
      title: 'Título del Feature',
      description: 'Descripción corta',
      longDescription: 'Descripción larga con múltiples párrafos',
      img: '/ruta/a/imagen/feature.png'
    },
    // ... 3 features más
  ]
}
```

---

## Código Completo

### Función InteractiveServices (Extracto Principal)

```jsx
function InteractiveServices() {
  const [activeTab, setActiveTab] = useState('plantillas');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const router = useRouter();

  // Gestión de scroll cuando se abre el modal
  React.useEffect(() => {
    if (!selectedFeature) return;
    // ... código de gestión de scroll
  }, [selectedFeature]);

  // Definición de tabs
  const tabs = [
    { id: 'ortesis', label: 'Taller de Prótesis y Rehabilitación en Amputados' },
    { id: 'plantillas', label: 'Plantillas Ortopédicas' },
    { id: 'pediatrica', label: 'Rehabilitación Pediátrica' },
    { id: 'musculoesqueletica', label: 'Fisioterapia' },
    { id: 'amputados', label: 'Órtesis' },
    { id: 'dolor', label: 'Dolor Crónico' },
    { id: 'productos', label: 'Productos Ortopédicos' },
  ];

  // Objeto content con todas las categorías y sus features
  const content = {
    // ... ver sección completa más abajo
  };

  const paginate = (newDirection) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const newIndex = (currentIndex + newDirection + tabs.length) % tabs.length;
    setActiveTab(tabs[newIndex].id);
  };

  return (
    <section id="interactive-services" className="bg-white py-16 relative overflow-hidden">
      {/* Renderizado del componente */}
    </section>
  );
}
```

### Contenido Completo por Categoría

#### 1. Plantillas Ortopédicas (`plantillas`)

```javascript
plantillas: {
  title: 'Plantillas Ortopédicas',
  description: 'Diseñamos y fabricamos plantillas ortopédicas a medida para corregir problemas de pisada, aliviar dolores y mejorar tu calidad de vida.',
  image: '/images/banners/plantillasortopedicasfd.png',
  features: [
    {
      title: 'Plantillas Ortopédicas Personalizadas',
      description: 'Diseño personalizado para cada pie con tecnología avanzada y materiales de alta calidad.',
      longDescription: 'Cada plantilla se fabrica completamente a medida, considerando la forma única de tus pies, tu tipo de pisada, actividades diarias y objetivos de tratamiento. No usamos plantillas genéricas.',
      img: '/images/banners/Plantillas PersonalizadasFD.png',
    },
    {
      title: 'Estudio de Huella',
      description: 'Análisis biomecánico detallado de tu pisada y postura para diseñar la solución perfecta.',
      longDescription: 'Realizamos una evaluación completa que incluye análisis de la marcha, estudio de la pisada, evaluación postural y revisión de tu historial médico. Usamos tecnología avanzada para obtener mediciones precisas.',
      img: '/images/banners/EstudioHuellaFD.png',
    },
    {
      title: 'Corrección Postural',
      description: 'Mejora de la alineación corporal y prevención de problemas de postura.',
      longDescription: 'Nuestras plantillas no solo corrigen la pisada, sino que también ayudan a mejorar la postura general, alineando correctamente la columna y las articulaciones.',
      img: '/images/banners/cambioposturalconplantillasfd.png',
    },
    {
      title: 'Revisión y Seguimiento',
      description: 'Acompañamiento durante todo el proceso con ajustes y revisiones periódicas.',
      longDescription: 'Te damos seguimiento completo: revisamos periódicamente cómo te sientes, ajustamos las plantillas si es necesario y te asesoramos sobre el cuidado y mantenimiento para obtener los mejores resultados.',
      img: '/images/banners/revisionypseguimientoyajustesfd.png',
    },
  ],
},
```

#### 2. Rehabilitación Pediátrica (`pediatrica`)

```javascript
pediatrica: {
  title: 'Rehabilitación Pediátrica',
  description: 'Corrige a tiempo problemas de marcha, postura o pie plano en niñas y niños.',
  image: '/images/banners/NiñoSillaRuedasFlatDesign.png',
  features: [
    {
      title: 'Pie Plano',
      description: 'Detectamos pie plano en niños, analizamos cómo caminan y corregimos su pisada con plantillas ortopédicas personalizadas y ejercicios, ayudando a prevenir molestias y mejorar su postura.',
      longDescription: '¿Notas que tu hijo(a) camina de puntitas, se tropieza mucho o sus zapatos se desgastan raro? El pie plano en niños puede causar cansancio, dolor o problemas en rodillas y columna a largo plazo.\n\nEn Ortopedia Cuernavaca, evaluamos cuidadosamente la marcha y postura de cada pequeño(a) usando pruebas clínicas y observación experta. Si es necesario, diseñamos plantillas ortopédicas a medida, hechas especialmente para sus pies, que ayudan a alinear correctamente la pisada y a repartir el peso de manera equilibrada.\n\nAdemás, te enseñamos ejercicios sencillos para hacer en casa que fortalecen sus pies y tobillos, acelerando la mejora. Hacemos revisiones periódicas para ajustar el tratamiento y ver avances, acompañándolos hasta que caminen con seguridad y sin dolor. Nuestro objetivo es que cada niño/a disfrute moverse y juegue sin limitaciones.',
      img: '/images/banners/NiñoPiePlanoFlatDesign.png',
    },
    {
      title: 'Estimulación Temprana',
      description: 'Impulsamos el desarrollo físico y motriz de bebés y niños pequeños con juegos, ejercicios y rutinas personalizadas para cada etapa, detectando y corrigiendo retrasos a tiempo.',
      longDescription: '¿Tu bebé tarda en sostener la cabeza, sentarse o dar sus primeros pasos? La estimulación temprana puede ser clave para detectar y corregir cualquier retraso en el desarrollo motor.\n\nNuestro programa se basa en actividades lúdicas y ejercicios adaptados a la edad y necesidades de cada niño(a), usando tapetes sensoriales, pelotas, rampas y juegos que promueven el movimiento, la coordinación y el equilibrio.\n\nGuiamos a papás y mamás en el proceso, enseñándoles cómo apoyar a sus hijos en casa con actividades sencillas y seguras. Realizamos evaluaciones frecuentes para ver su progreso y ajustamos la rutina cuando lo necesita. Nuestro compromiso es acompañar a cada familia para que sus hijos/as alcancen su máximo potencial, con alegría y confianza.',
      img: '/images/banners/NiñaAprendiendoaCaminarAFD.png',
    },
    {
      title: 'Órtesis Infantiles',
      description: 'Diseñamos y adaptamos férulas, soportes y órtesis especiales para niños con pie zambo, debilidad muscular o parálisis, permitiendo mayor movilidad y confianza al caminar o moverse.',
      longDescription: 'Cuando un niño/a necesita soporte extra para caminar o mantenerse en pie, las órtesis infantiles pueden ser la solución.\n\nEn nuestro taller, fabricamos férulas y órtesis a la medida, ajustadas a las necesidades y crecimiento de cada pequeño(a). Usamos materiales ligeros y cómodos que permiten que los niños jueguen y se desplacen sin molestias.\n\nRealizamos un proceso de adaptación gradual y, con el tiempo, revisamos y ajustamos cada dispositivo para asegurar que siga funcionando perfectamente. Acompañamos a la familia en el proceso de adaptación, enseñando a colocar y cuidar las órtesis, y resolviendo cualquier duda.\n\nEsto ayuda a prevenir deformidades, mejorar la marcha y darles a los niños la independencia para moverse y explorar su mundo.',
      img: '/images/banners/NiñaOrtesisRodillaBFD.png',
    },
    {
      title: 'Seguimiento Continuo',
      description: 'Acompañamos de cerca a cada paciente con revisiones periódicas, ajustes y asesoría continua para asegurar que cada tratamiento logre los mejores resultados a largo plazo.',
      longDescription: 'El éxito de un tratamiento infantil no solo depende de la primera consulta, sino del acompañamiento constante.\n\nEn Ortopedia Cuernavaca damos seguimiento personalizado: revisamos periódicamente a cada niño(a) para ver cómo ha avanzado, si necesita cambiar la plantilla, ajustar una férula o modificar los ejercicios recomendados.\n\nNos comunicamos siempre con los padres, resolviendo dudas y dando orientación clara sobre el proceso. Si detectamos cualquier cambio en la marcha, postura o movilidad, intervenimos de inmediato para corregir el rumbo del tratamiento.\n\nEste enfoque cercano permite resultados más rápidos y duraderos, y da confianza a las familias de que nunca estarán solas en el proceso de recuperación y desarrollo de sus hijos.',
      img: '/images/banners/TerapeutasReuFD.png',
    },
  ],
},
```

#### 3. Taller de Prótesis y Rehabilitación en Amputados (`ortesis`)

```javascript
ortesis: {
  title: 'Taller de Prótesis y Rehabilitación en Amputados',
  description: 'Fabricación, ajuste y personalización de dispositivos ortopédicos con tecnología digital y materiales de alta calidad.',
  image: '/images/banners/Atleta cruzando la meta con alegría FD.png',
  features: [
    {
      title: 'Prótesis',
      description: 'Fabricación y adaptación de prótesis personalizadas con tecnología avanzada.',
      longDescription: 'Nuestras prótesis están diseñadas para restaurar la funcionalidad y mejorar la calidad de vida de pacientes con amputaciones. Utilizamos tecnología de vanguardia y materiales de alta calidad para crear dispositivos que se adapten perfectamente a cada paciente.\n\nCada prótesis se fabrica completamente a medida, considerando la anatomía única del paciente, su nivel de amputación, actividades diarias y objetivos de rehabilitación. Los materiales utilizados garantizan durabilidad, ligereza y confort durante el uso prolongado.\n\nEl proceso incluye una evaluación exhaustiva, diseño personalizado, fabricación en nuestro taller especializado, pruebas de ajuste y un programa de rehabilitación integral. Acompañamos al paciente durante todo el proceso de adaptación, realizando ajustes periódicos para optimizar la funcionalidad.',
      img: '/images/banners/Técnico ajustando prótesis en tallerFD.png',
    },
    {
      title: 'Rehabilitación en Amputados',
      description: 'Programa integral de rehabilitación para pacientes con amputaciones.',
      longDescription: 'Nuestro programa de rehabilitación para amputados está diseñado para maximizar la independencia y calidad de vida de cada paciente. Comenzamos con una evaluación completa que incluye el estado físico, psicológico y social del paciente.\n\nEl programa incluye ejercicios de fortalecimiento muscular, entrenamiento de equilibrio, práctica de actividades de la vida diaria y adaptación psicológica. Utilizamos equipos especializados y técnicas de rehabilitación avanzadas para acelerar la recuperación.\n\nAcompañamos al paciente durante todo el proceso, desde la fase preprotésica hasta la adaptación completa a su nueva prótesis. Realizamos evaluaciones periódicas para medir el progreso y ajustar el programa según las necesidades cambiantes.',
      img: '/images/banners/Rehabilitación en AmputadosFD.png',
    },
    {
      title: 'Entrenamiento Funcional con Prótesis',
      description: 'Programa especializado de entrenamiento para maximizar el uso funcional de la prótesis.',
      longDescription: 'Nuestro programa de entrenamiento funcional está diseñado para ayudar a los pacientes a desarrollar las habilidades necesarias para utilizar su prótesis de manera efectiva en actividades de la vida diaria. Incluye ejercicios específicos para mejorar la coordinación, equilibrio, fuerza y resistencia.\n\nEl entrenamiento se adapta a las necesidades individuales de cada paciente, considerando su nivel de amputación, tipo de prótesis y objetivos personales. Utilizamos equipos especializados y técnicas de rehabilitación avanzadas para acelerar el proceso de adaptación.\n\nRealizamos sesiones progresivas que van desde ejercicios básicos de control hasta actividades complejas como subir escaleras, caminar en terrenos irregulares y realizar tareas específicas. Nuestro objetivo es que cada paciente logre la máxima independencia y confianza en el uso de su prótesis.',
      img: '/images/banners/Entrenamiento Funcional con PrótesisFD.png',
    },
    {
      title: 'Ajuste y Calibración Especializada',
      description: 'Perfeccionamiento continuo del dispositivo con tecnología de precisión.',
      longDescription: 'El ajuste y calibración de dispositivos ortopédicos es un proceso continuo que requiere experiencia técnica y tecnología de precisión. Nuestro equipo de técnicos especializados utiliza equipos de última generación para realizar ajustes milimétricos que optimizan la funcionalidad y confort.\n\nEl proceso de ajuste incluye evaluación del paciente, análisis de la marcha, pruebas de funcionalidad y calibración de componentes electrónicos cuando sea necesario. Utilizamos software especializado para analizar datos biomecánicos y realizar ajustes precisos.\n\nRealizamos seguimiento continuo del paciente, programando revisiones periódicas para evaluar el funcionamiento del dispositivo y realizar ajustes preventivos. Nuestro objetivo es garantizar que cada dispositivo mantenga su funcionalidad óptima a lo largo del tiempo.',
      img: '/images/banners/AjusteProtesisFD.png',
    },
  ],
},
```

#### 4. Fisioterapia (`musculoesqueletica`)

```javascript
musculoesqueletica: {
  title: 'Fisioterapia',
  description: 'Recupera movilidad y fuerza tras lesiones deportivas, cirugías o fracturas.',
  image: '/images/banners/Fisioterapiadf.png',
  features: [
    {
      title: 'Rehabilitación de Lesiones Deportivas',
      description: 'Recuperación específica para deportistas de alto rendimiento con técnicas avanzadas.',
      longDescription: 'Nuestro programa de rehabilitación deportiva está diseñado específicamente para atletas y deportistas que buscan recuperar su rendimiento óptimo después de una lesión. Utilizamos técnicas de fisioterapia avanzada combinadas con tecnología de vanguardia para acelerar la recuperación.\n\nEl tratamiento incluye evaluación biomecánica completa, análisis del gesto deportivo específico, programa de rehabilitación personalizado y prevención de recidivas. Trabajamos con equipos de última generación como ultrasonido terapéutico, electroestimulación y plataformas de equilibrio.\n\nNuestro equipo de fisioterapeutas especializados en deporte desarrolla protocolos específicos para cada tipo de lesión y deporte, garantizando una recuperación segura y efectiva. Realizamos seguimiento continuo del progreso y ajustamos el tratamiento según la evolución del paciente.',
      img: '/images/banners/Lesiones DeportivasFD.png',
    },
    {
      title: 'Rehabilitación Postoperatoria Integral',
      description: 'Recuperación completa después de cirugías con protocolos especializados.',
      longDescription: 'La rehabilitación postoperatoria es fundamental para el éxito de cualquier intervención quirúrgica. Nuestro programa integral incluye evaluación preoperatoria, planificación del tratamiento postoperatorio y seguimiento continuo durante todo el proceso de recuperación.\n\nUtilizamos técnicas de fisioterapia especializadas como movilización precoz, ejercicios de fortalecimiento progresivo, control del dolor y prevención de complicaciones. Cada protocolo se adapta a la cirugía específica, la condición del paciente y sus objetivos de recuperación.\n\nNuestro equipo trabaja en coordinación con los cirujanos para garantizar que el tratamiento de rehabilitación complemente perfectamente la intervención quirúrgica. Realizamos evaluaciones periódicas para medir el progreso y ajustar el tratamiento según sea necesario.',
      img: '/images/banners/Rehabilitación PostoperatoriaFD.png',
    },
    {
      title: 'Terapia Manual Especializada',
      description: 'Técnicas manuales avanzadas para alivio del dolor y mejora de la movilidad.',
      longDescription: 'Nuestra terapia manual especializada combina técnicas tradicionales con enfoques modernos para proporcionar alivio efectivo del dolor y mejora de la movilidad. Utilizamos técnicas como masaje terapéutico, movilización articular, técnicas de liberación miofascial y estiramientos específicos.\n\nEl tratamiento se basa en evaluación manual completa, identificación de puntos gatillo y áreas de tensión, aplicación de técnicas específicas y educación del paciente sobre autocuidado. Cada sesión se adapta a las necesidades específicas del paciente y su respuesta al tratamiento.\n\nRealizamos seguimiento continuo del paciente, ajustando las técnicas según su evolución y necesidades cambiantes. Nuestro objetivo es proporcionar alivio inmediato del dolor mientras trabajamos en la mejora a largo plazo de la movilidad y funcionalidad.',
      img: '/images/banners/Fisioterapia2fd.png',
    },
    {
      title: 'Fortalecimiento Muscular Especializado',
      description: 'Programas personalizados de fortalecimiento con equipos de última generación.',
      longDescription: 'Nuestros programas de fortalecimiento muscular están diseñados específicamente para cada paciente, considerando su condición física, objetivos y limitaciones. Utilizamos equipos de última generación como máquinas isocinéticas, plataformas vibratorias y sistemas de resistencia variable.\n\nEl programa incluye evaluación inicial de fuerza y resistencia, diseño de rutinas personalizadas, supervisión durante las sesiones y seguimiento del progreso. Trabajamos con diferentes modalidades de entrenamiento como entrenamiento excéntrico, pliométrico y funcional.\n\nNuestro equipo de fisioterapeutas especializados en ejercicio terapéutico garantiza que cada programa sea seguro, efectivo y adaptado a las necesidades específicas del paciente. Realizamos evaluaciones periódicas para medir el progreso y ajustar la intensidad del entrenamiento.',
      img: '/images/banners/fortalecimientomuscularfd.png',
    },
  ],
},
```

#### 5. Órtesis (`amputados`)

```javascript
amputados: {
  title: 'Órtesis',
  description: 'Fabricación, ajuste y personalización de dispositivos ortopédicos con tecnología digital y materiales de alta calidad.',
  image: '/images/banners/Ortesis cafeteria.png',
  features: [
    {
      title: 'Órtesis de rodilla (Rodilleras)',
      description: 'Dispositivos para estabilización y protección articular.',
      longDescription: 'Nuestras órtesis de rodilla están diseñadas específicamente para cada paciente, considerando su patología, nivel de actividad y objetivos de tratamiento. Utilizamos materiales de última generación que combinan ligereza, durabilidad y confort.\n\nEl proceso incluye evaluación biomecánica completa, análisis de la marcha, diseño personalizado y fabricación en nuestro taller especializado. Cada órtesis se ajusta perfectamente a la anatomía del paciente, proporcionando el soporte necesario sin limitar la movilidad.\n\nRealizamos seguimiento continuo del paciente, ajustando la órtesis según su evolución y necesidades cambiantes. Nuestro objetivo es proporcionar estabilidad y protección articular mientras mantenemos la máxima funcionalidad posible.',
      img: '/images/banners/Órtesis de RodillaFD.png',
    },
    {
      title: 'Férulas y Soportes',
      description: 'Inmovilización y soporte terapéutico adaptado a cada necesidad específica.',
      longDescription: 'Nuestras férulas y soportes personalizados están diseñados para proporcionar inmovilización terapéutica y soporte específico según la patología del paciente. Utilizamos termoplásticos de alta calidad que se moldean perfectamente a la anatomía del paciente.\n\nEl proceso de fabricación incluye evaluación clínica, diseño personalizado, moldeado a medida y pruebas de ajuste. Cada dispositivo se fabrica considerando factores como la duración del tratamiento, nivel de actividad y comodidad del paciente.\n\nRealizamos revisiones periódicas para evaluar la efectividad del tratamiento y realizar ajustes cuando sea necesario. Nuestro equipo de técnicos especializados garantiza que cada dispositivo cumpla con los más altos estándares de calidad y funcionalidad.',
      img: '/images/banners/Férulas y SoportesFD.png',
    },
    {
      title: 'Órtesis de Columna',
      description: 'Sistemas de soporte especializados para problemas de columna y postura.',
      longDescription: 'Nuestras órtesis de columna están diseñadas para proporcionar soporte y corrección postural específica según la patología del paciente. Utilizamos sistemas modulares que permiten ajustes precisos y personalización completa.\n\nEl proceso incluye evaluación postural completa, análisis de la marcha, diseño personalizado y fabricación en nuestro taller especializado. Cada órtesis se ajusta perfectamente al paciente, proporcionando el soporte necesario sin comprometer la movilidad.\n\nRealizamos seguimiento continuo del paciente, ajustando la órtesis según su evolución y respuesta al tratamiento. Nuestro objetivo es mejorar la postura, reducir el dolor y prevenir futuras complicaciones.',
      img: '/images/banners/Órtesis de ColumnaFD.png',
    },
    {
      title: 'Mangas y equipo deportivo',
      description: 'Compresión, soporte y accesorios para actividad física y deporte.',
      longDescription: 'Nuestras órtesis deportivas están diseñadas específicamente para deportistas y personas activas que requieren soporte articular durante actividades físicas. Utilizamos materiales ligeros y resistentes que permiten libertad de movimiento sin comprometer la protección.\n\nEl proceso incluye evaluación biomecánica deportiva, análisis del gesto deportivo específico, diseño personalizado y fabricación en nuestro taller especializado. Cada órtesis se adapta perfectamente al deporte y nivel de actividad del paciente.\n\nRealizamos pruebas de funcionalidad deportiva y seguimiento continuo del paciente para garantizar que la órtesis cumpla con sus necesidades específicas. Nuestro objetivo es permitir que el deportista mantenga su rendimiento mientras protege sus articulaciones.',
      img: '/images/banners/Mangas y equipo deportivoFD.png',
    },
  ],
},
```

#### 6. Dolor Crónico (`dolor`)

```javascript
dolor: {
  title: 'Rehabilitación del Dolor Crónico',
  description: 'Manejo integral de dolor persistente, artritis y fibromialgia con técnicas especializadas.',
  image: '/images/banners/Rehabilitación del Dolor CrónicoFD.png',
  features: [
    {
      title: 'Manejo Integral del Dolor de Espalda',
      description: 'Terapias especializadas para aliviar el dolor crónico de espalda con enfoque multidisciplinario.',
      longDescription: 'Nuestro programa de manejo del dolor de espalda crónico combina técnicas de fisioterapia avanzada con enfoques multidisciplinarios para abordar las causas raíz del dolor. Utilizamos evaluación biomecánica completa, análisis postural y diagnóstico funcional para desarrollar un plan de tratamiento personalizado.\n\nEl tratamiento incluye terapia manual especializada, ejercicios de estabilización lumbar, técnicas de relajación muscular y educación del paciente sobre ergonomía y prevención. Trabajamos con equipos de última generación como ultrasonido terapéutico, electroestimulación y sistemas de tracción.\n\nRealizamos seguimiento continuo del paciente, ajustando el tratamiento según su evolución y respuesta. Nuestro objetivo es no solo aliviar el dolor, sino también mejorar la funcionalidad y prevenir futuras recidivas.',
      img: '/images/banners/Manejo Integral del Dolor de EspaldaFD.png',
    },
    {
      title: 'Tratamiento de Artritis y Fibromialgia',
      description: 'Manejo integral de la inflamación y dolor con técnicas especializadas y tecnología avanzada.',
      longDescription: 'Nuestro programa para artritis y fibromialgia está diseñado para mejorar la calidad de vida de pacientes con estas condiciones crónicas. Utilizamos un enfoque integral que combina fisioterapia especializada, ejercicio terapéutico y técnicas de manejo del dolor.\n\nEl tratamiento incluye evaluación funcional completa, programa de ejercicio adaptado, técnicas de relajación muscular, educación sobre manejo del dolor y asesoría sobre modificaciones del estilo de vida. Trabajamos con equipos especializados como baños de parafina, ultrasonido terapéutico y sistemas de estimulación eléctrica.\n\nRealizamos seguimiento continuo del paciente, ajustando el tratamiento según la evolución de la enfermedad y las necesidades cambiantes. Nuestro objetivo es mejorar la movilidad, reducir el dolor y mantener la independencia funcional.',
      img: '/images/banners/Tratamiento de ArtritisFD.png',
    },
    {
      title: 'Terapia con equipo especializado',
      description: 'Rehabilitación con dispositivos y tecnología específica para cada fase del tratamiento.',
      longDescription: 'Contamos con equipo especializado para rehabilitación que nos permite adaptar la terapia a tus necesidades: electroestimulación, ultrasonido terapéutico, plataformas de equilibrio, bandas elásticas, poleas y sistemas de resistencia progresiva.\n\nIniciamos con una evaluación funcional para definir objetivos claros y asignar el equipo adecuado a cada etapa (control del dolor, movilidad, fuerza y estabilidad). Las sesiones son guiadas y progresivas, priorizando seguridad y eficacia.\n\nMedimos resultados periódicamente y ajustamos parámetros e intensidad según tu respuesta clínica, asegurando avances sostenidos y una recuperación más rápida y segura.',
      img: '/images/banners/Ejercicio TerapéuticoFD.png',
    },
    {
      title: 'Seguimiento Continuo',
      description: 'Revisiones periódicas, ajustes y acompañamiento para un control duradero del dolor.',
      longDescription: 'El seguimiento continuo es clave en el manejo del dolor crónico. Programamos revisiones periódicas para evaluar tu evolución, ajustar el plan terapéutico y reforzar estrategias de autocuidado.\n\nIntegramos medición de progreso, ajuste de ejercicios, educación postural, hábitos saludables y, cuando corresponde, coordinación con otros especialistas. Este enfoque iterativo permite prevenir recaídas, mantener logros y mejorar tu calidad de vida a largo plazo.\n\nNos enfocamos en objetivos realistas y medibles, optimizando la frecuencia de sesiones y la combinación de terapias según tu respuesta clínica.',
      img: '/images/banners/Seguimiento ContinuoFD.png',
    },
  ],
},
```

#### 7. Productos Ortopédicos (`productos`)

```javascript
productos: {
  title: 'Área de Productos Ortopédicos',
  description: 'Asesoría especializada y venta de productos ortopédicos de alta calidad: bastones, muletas, sillas de ruedas y más.',
  image: '/images/banners/Área de Productos OrtopédicosFD.png',
  features: [
    {
      title: 'Bastones y Muletas',
      description: 'Soporte especializado para mejorar la movilidad con productos de alta calidad.',
      longDescription: 'Nuestro catálogo de bastones y muletas incluye productos de la más alta calidad, diseñados para proporcionar soporte y estabilidad según las necesidades específicas de cada paciente. Ofrecemos asesoría especializada para seleccionar el producto más adecuado.\n\nNuestros productos incluyen bastones ajustables, muletas de axila y antebrazo, bastones con base amplia para mayor estabilidad y productos especializados para diferentes condiciones. Cada producto se selecciona considerando factores como el nivel de movilidad del paciente, su condición física y estilo de vida.\n\nRealizamos evaluación funcional para determinar el producto más adecuado, asesoría sobre uso correcto y seguimiento para garantizar que el producto cumpla con las necesidades del paciente. Nuestro objetivo es mejorar la movilidad y seguridad del paciente.',
      img: '/images/banners/Bastones y Muletas.png',
    },
    {
      title: 'Sillas de Ruedas',
      description: 'Modelos manuales y eléctricos de alta calidad con tecnología avanzada.',
      longDescription: 'Nuestras sillas de ruedas representan la vanguardia en tecnología de movilidad, ofreciendo comodidad, funcionalidad y seguridad. Incluimos modelos manuales ligeros, sillas eléctricas de alta tecnología y productos especializados para diferentes necesidades.\n\nCada silla se selecciona considerando factores como el nivel de movilidad del usuario, su entorno de uso, necesidades de transporte y estilo de vida. Nuestros productos incluyen sillas con sistemas de propulsión asistida, asientos especializados para prevención de úlceras por presión y sistemas de posicionamiento avanzados.\n\nRealizamos evaluación funcional completa, asesoría sobre selección del producto, entrenamiento en uso y seguimiento continuo. Nuestro objetivo es proporcionar independencia y calidad de vida a nuestros usuarios.',
      img: '/images/banners/Sillas de RuedasFD.png',
    },
    {
      title: 'Calzado Ortopédico',
      description: 'Zapatos especializados diseñados para diferentes necesidades ortopédicas.',
      longDescription: 'Nuestro calzado ortopédico está diseñado específicamente para personas con necesidades especiales, combinando funcionalidad terapéutica con comodidad y estilo. Ofrecemos zapatos con características especiales como suelas antideslizantes, plantillas removibles y ajustes personalizados.\n\nNuestros productos incluyen calzado para pie diabético, zapatos con soporte para arco alto o bajo, calzado postoperatorio y zapatos especializados para diferentes actividades. Cada producto se selecciona considerando la condición específica del paciente, su nivel de actividad y preferencias de estilo.\n\nRealizamos evaluación del pie, asesoría sobre selección del calzado, pruebas de ajuste y seguimiento para garantizar que el producto cumpla con las necesidades del paciente. Nuestro objetivo es proporcionar comodidad y soporte mientras mantenemos la movilidad.',
      img: '/images/banners/Calzado OrtopédicoFD.png',
    },
    {
      title: 'Fajas y Soportes',
      description: 'Apoyo especializado para la columna y articulaciones con productos de alta calidad.',
      longDescription: 'Nuestras fajas y soportes están diseñados para proporcionar soporte terapéutico específico según las necesidades de cada paciente. Utilizamos materiales de alta calidad que combinan soporte efectivo con comodidad y durabilidad.\n\nNuestros productos incluyen fajas lumbares, soportes para rodilla, tobilleras, muñequeras y productos especializados para diferentes condiciones. Cada producto se selecciona considerando la patología específica, nivel de actividad y objetivos de tratamiento del paciente.\n\nRealizamos evaluación funcional, asesoría sobre selección del producto, instrucciones de uso y seguimiento para garantizar efectividad. Nuestro objetivo es proporcionar soporte terapéutico efectivo mientras mantenemos la movilidad y comodidad del paciente.',
      img: '/images/banners/Fajas y SoportesFD.png',
    },
  ],
},
```

---

## Imágenes Utilizadas

### Imágenes Principales por Categoría (7 imágenes)

1. **Plantillas Ortopédicas**
   - `/images/banners/plantillasortopedicasfd.png`

2. **Rehabilitación Pediátrica**
   - `/images/banners/NiñoSillaRuedasFlatDesign.png`

3. **Taller de Prótesis y Rehabilitación en Amputados**
   - `/images/banners/Atleta cruzando la meta con alegría FD.png`

4. **Fisioterapia**
   - `/images/banners/Fisioterapiadf.png`

5. **Órtesis**
   - `/images/banners/Ortesis cafeteria.png`

6. **Dolor Crónico**
   - `/images/banners/Rehabilitación del Dolor CrónicoFD.png`

7. **Productos Ortopédicos**
   - `/images/banners/Área de Productos OrtopédicosFD.png`

### Imágenes de Features (28 imágenes - 4 por categoría)

#### Plantillas Ortopédicas
1. `/images/banners/Plantillas PersonalizadasFD.png`
2. `/images/banners/EstudioHuellaFD.png`
3. `/images/banners/cambioposturalconplantillasfd.png`
4. `/images/banners/revisionypseguimientoyajustesfd.png`

#### Rehabilitación Pediátrica
5. `/images/banners/NiñoPiePlanoFlatDesign.png`
6. `/images/banners/NiñaAprendiendoaCaminarAFD.png`
7. `/images/banners/NiñaOrtesisRodillaBFD.png`
8. `/images/banners/TerapeutasReuFD.png`

#### Taller de Prótesis y Rehabilitación en Amputados
9. `/images/banners/Técnico ajustando prótesis en tallerFD.png`
10. `/images/banners/Rehabilitación en AmputadosFD.png`
11. `/images/banners/Entrenamiento Funcional con PrótesisFD.png`
12. `/images/banners/AjusteProtesisFD.png`

#### Fisioterapia
13. `/images/banners/Lesiones DeportivasFD.png`
14. `/images/banners/Rehabilitación PostoperatoriaFD.png`
15. `/images/banners/Fisioterapia2fd.png`
16. `/images/banners/fortalecimientomuscularfd.png`

#### Órtesis
17. `/images/banners/Órtesis de RodillaFD.png`
18. `/images/banners/Férulas y SoportesFD.png`
19. `/images/banners/Órtesis de ColumnaFD.png`
20. `/images/banners/Mangas y equipo deportivoFD.png`

#### Dolor Crónico
21. `/images/banners/Manejo Integral del Dolor de EspaldaFD.png`
22. `/images/banners/Tratamiento de ArtritisFD.png`
23. `/images/banners/Ejercicio TerapéuticoFD.png`
24. `/images/banners/Seguimiento ContinuoFD.png`

#### Productos Ortopédicos
25. `/images/banners/Bastones y Muletas.png`
26. `/images/banners/Sillas de RuedasFD.png`
27. `/images/banners/Calzado OrtopédicoFD.png`
28. `/images/banners/Fajas y SoportesFD.png`

### Resumen Total de Imágenes
- **Imágenes principales**: 7
- **Imágenes de features**: 28
- **Total**: 35 imágenes

---

## Componentes y Dependencias

### Imports Utilizados

```javascript
import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import { BentoCard, BentoGrid } from '@/registry/magicui/bento-grid';
import Marquee from '@/registry/magicui/marquee';
```

### Componentes Externos Utilizados

1. **BentoGrid y BentoCard** - De `@/registry/magicui/bento-grid`
   - Para el layout de las feature cards

2. **Marquee** - De `@/registry/magicui/marquee`
   - Para la animación de imágenes en hover de las cards

3. **framer-motion** - Para animaciones
   - `motion.div` - Animaciones de transición
   - `AnimatePresence` - Animaciones de entrada/salida del modal

4. **next/image** - Optimización de imágenes

5. **next/router** - Navegación a páginas de detalle

### Funcionalidades Clave

1. **Sistema de Tabs Interactivo**
   - Cambio de pestañas con animaciones
   - Navegación con flechas izquierda/derecha
   - Estado persistente del tab activo

2. **Modal/Slide-over Panel**
   - Portal para evitar problemas de z-index
   - Gestión de scroll del body cuando está abierto
   - Cierre con Escape o click fuera
   - Animaciones suaves de entrada/salida

3. **Feature Cards con BentoGrid**
   - Grid responsive (1 col móvil, 2 tablet, 4 desktop)
   - Hover effect con Marquee animado
   - Imágenes optimizadas con Next.js Image

4. **Navegación**
   - Botones para ir a página de detalle (`/servicios/detalle/${activeTab}`)
   - Integración con WhatsApp para agendar citas

---

## Estilos y Clases CSS

### Clases Principales Utilizadas

- **Container**: `container mx-auto px-6`
- **Sección**: `bg-white py-16 relative overflow-hidden`
- **Badge**: `inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full`
- **Tabs**: `px-4 py-2 rounded-md border transition-all duration-300`
- **Cards**: `bg-white text-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300`
- **Modal**: `bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`

### Efectos Visuales

- Elementos decorativos con blur (círculos de fondo)
- Animaciones de transición suaves
- Hover effects en cards y botones
- Backdrop blur en modal
- Gradientes en backgrounds

---

## Notas Técnicas

1. **Gestión de Scroll**: El componente previene el scroll del body cuando el modal está abierto, restaurando la posición exacta al cerrar.

2. **Optimización de Imágenes**: Todas las imágenes usan el componente `Image` de Next.js con:
   - `fill` para imágenes responsivas
   - `quality={95}` para alta calidad
   - `sizes` para optimización responsive
   - `priority` para imágenes above-the-fold

3. **Accesibilidad**: 
   - `aria-label` en botones de navegación
   - `aria-modal` y `role="dialog"` en modal
   - Manejo de tecla Escape

4. **Performance**:
   - Componentes dinámicos con `dynamic()` para code splitting
   - Lazy loading de imágenes no prioritarias
   - Animaciones optimizadas con framer-motion

---

## Archivo Completo de Referencia

El código completo se encuentra en:
- **Archivo**: `src/domains/services/components/Servicios.jsx`
- **Función**: `InteractiveServices()` (líneas 1067-1951)
- **Total de líneas**: ~884 líneas de código

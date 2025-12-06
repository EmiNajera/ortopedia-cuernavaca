import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaChevronDown, FaArrowUp } from 'react-icons/fa';
import MarketingLayout from '@layouts/MarketingLayout';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import { LightRays } from '@registry/magicui/light-rays';

// Contenido completo por servicio - Optimizado SEO y Conversacional
const SERVICE_CONTENT = {
  plantillas: {
    title: 'Plantillas Ortopédicas Personalizadas en Cuernavaca',
    metaDescription:
      'Plantillas ortopédicas personalizadas en Cuernavaca. Análisis de pisada, alivio de dolor en pies, rodillas y espalda. Corrección de pie plano y mejora postural. ¡Agenda tu cita!',
    image: '/images/banners/plantillasortopedicasfd.png',
    heroDescription:
      '¿Sientes un dolor persistente en tus pies, rodillas o espalda? ¿Caminar se ha vuelto una molestia? Es posible que la raíz del problema esté en tu pisada. En Ortopedia Cuernavaca, entendemos lo frustrante que es vivir con estas molestias. Por eso, te ofrecemos una solución diseñada exclusivamente para ti: Plantillas Ortopédicas Personalizadas. No son plantillas genéricas. Son dispositivos médicos creados a la medida de tus pies, después de un análisis biomecánico exhaustivo de tu forma de caminar, tu postura y tus necesidades específicas.',
    highlights: [
      { label: 'A medida', value: '100%' },
      { label: 'Análisis', value: 'Biomecánico' },
      { label: 'Postura', value: 'Mejora' },
      { label: 'Seguimiento', value: 'Incluido' },
    ],
    whatItIs:
      'Las plantillas ortopédicas personalizadas son mucho más que un simple soporte para tus pies. Son una herramienta terapéutica diseñada para interactuar con la biomecánica de tu cuerpo, desde los pies hasta la columna vertebral.',
    whatItDoes: [
      {
        title: 'Corrigen problemas de pisada',
        description:
          'Si tienes pie plano, pie cavo, pronación o supinación excesiva, nuestras plantillas redistribuyen la presión y el peso de manera uniforme, alineando correctamente tus pies al caminar o correr.',
      },
      {
        title: 'Alivian dolores persistentes',
        description:
          'Son increíblemente efectivas para reducir el dolor en los pies (fascitis plantar, espolón calcáneo, metatarsalgia), tobillos, rodillas, caderas e incluso la espalda baja.',
      },
      {
        title: 'Mejoran tu postura',
        description:
          'Una mala pisada puede desequilibrar toda tu cadena cinética, afectando tu postura general. Nuestras plantillas actúan como la base de un edificio, asegurando que tu cuerpo se alinee correctamente.',
      },
      {
        title: 'Previenen lesiones',
        description:
          'Al optimizar la biomecánica de tu cuerpo, reducimos significativamente el riesgo de sufrir lesiones por sobrecarga, movimientos repetitivos incorrectos o desequilibrios musculares.',
      },
      {
        title: 'Optimizan tu rendimiento deportivo',
        description:
          'Para atletas y personas activas, unas plantillas personalizadas pueden mejorar la eficiencia de tu movimiento, la absorción de impactos y la propulsión.',
      },
      {
        title: 'Tratan condiciones específicas',
        description:
          'Son una parte fundamental del tratamiento para diversas condiciones como pie diabético (previniendo úlceras), artritis, tendinitis, juanetes y dedos en garra.',
      },
    ],
    useCases: [
      {
        category: 'Problemas Estructurales',
        items: [
          {
            title: 'Pie Plano (Pes Planus)',
            description:
              'Si tu arco plantar es bajo o inexistente, las plantillas proporcionan el soporte necesario para elevarlo y distribuir el peso de forma adecuada.',
          },
          {
            title: 'Pie Cavo (Arco Muy Alto)',
            description:
              'Un arco excesivamente alto puede causar puntos de presión dolorosos. Nuestras plantillas amortiguan y distribuyen la presión, aliviando el dolor.',
          },
          {
            title: 'Pronación Excesiva',
            description:
              'Cuando tu pie rota demasiado hacia adentro al caminar. Las plantillas controlan este movimiento excesivo, estabilizando el tobillo y la rodilla.',
          },
          {
            title: 'Supinación Excesiva',
            description:
              'Cuando el pie rota demasiado hacia afuera. Las plantillas ayudan a distribuir el peso de manera más uniforme, mejorando el equilibrio.',
          },
        ],
      },
      {
        category: 'Condiciones Específicas',
        items: [
          {
            title: 'Fascitis Plantar',
            description:
              'Dolor agudo en el talón, especialmente por las mañanas. Las plantillas reducen la tensión en la fascia plantar, proporcionando soporte al arco y amortiguación en el talón.',
          },
          {
            title: 'Espolón Calcáneo',
            description:
              'Un crecimiento óseo en el talón que causa dolor. Las plantillas amortiguan la zona afectada y redistribuyen la presión para aliviar la molestia.',
          },
          {
            title: 'Metatarsalgia',
            description:
              'Dolor en la parte delantera del pie. Las plantillas redistribuyen el peso, aliviando la presión sobre los metatarsianos y reduciendo el dolor.',
          },
          {
            title: 'Diferencia de Longitud de Piernas',
            description:
              'Una pequeña diferencia puede causar problemas posturales y dolor. Las plantillas pueden compensar esta discrepancia, mejorando la alineación.',
          },
        ],
      },
    ],
    howWeHelp: {
      title: '¿Cómo te ayudamos exactamente? El proceso completo explicado',
      steps: [
        {
          step: 1,
          title: 'Evaluación Integral',
          duration: '30-45 minutos',
          description:
            'Análisis de tus síntomas, estudio de tu huella plantar, análisis de tu marcha, evaluación postural, y medición y toma de moldes.',
        },
        {
          step: 2,
          title: 'Diseño y Fabricación Personalizada',
          duration: '1-2 semanas',
          description:
            'Análisis de datos, selección de materiales de grado médico, y fabricación en nuestro laboratorio con precisión.',
        },
        {
          step: 3,
          title: 'Aplicación y Ajuste Inicial',
          duration: '30 minutos',
          description:
            'Prueba inicial, ajustes en el momento si es necesario, e instrucciones detalladas de uso y cuidado.',
        },
        {
          step: 4,
          title: 'Seguimiento Continuo',
          duration: '4-6 semanas después',
          description:
            'Revisión del progreso, ajustes finos si es necesario, y evaluación de resultados para medir los cambios.',
        },
      ],
    },
    equipment: [
      'Plataforma de Presión',
      'Escáner 3D',
      'Software Biomecánico Especializado',
      'Materiales de Grado Médico',
      'Laboratorio Propio',
    ],
    benefits: [
      {
        title: 'Alivio del Dolor (2-4 semanas)',
        description:
          'La mayoría de nuestros pacientes experimentan una reducción significativa del dolor en pocas semanas, permitiéndoles retomar sus actividades.',
      },
      {
        title: 'Mejora de la Postura (1-3 meses)',
        description:
          'Al corregir la base, notarás una mejora en tu alineación corporal, lo que reduce la tensión en rodillas, caderas y espalda.',
      },
      {
        title: 'Mayor Comodidad al Caminar',
        description:
          'Sentirás tus pies más cómodos y menos fatigados, incluso después de largas jornadas.',
      },
      {
        title: 'Prevención de Lesiones',
        description:
          'Reducirás el riesgo de esguinces, tendinitis y otras lesiones relacionadas con una mala pisada.',
      },
      {
        title: 'Mejor Rendimiento Deportivo',
        description:
          'Si eres deportista, notarás una mejora en tu eficiencia y una disminución de la fatiga muscular.',
      },
      {
        title: 'Solución a Largo Plazo',
        description:
          'No es un parche temporal. Nuestras plantillas están diseñadas para ofrecer una solución duradera a tus problemas biomecánicos.',
      },
    ],
    faq: [
      {
        q: '¿Cada cuánto se revisan las plantillas?',
        a: 'Recomendamos una primera revisión a las 4-6 semanas de uso para hacer ajustes finos. Después, una revisión cada 6-12 meses es ideal, ya que tus pies y tu cuerpo pueden cambiar con el tiempo.',
      },
      {
        q: '¿Puedo usar las plantillas en cualquier calzado?',
        a: 'Idealmente, sí. Diseñamos las plantillas para que sean lo más versátiles posible. Sin embargo, algunos tipos de calzado (muy estrechos o con tacón alto) pueden no ser compatibles. Te asesoramos sobre el calzado más adecuado.',
      },
      {
        q: '¿Cuánto tiempo tarda en notarse la mejora?',
        a: 'Muchos pacientes sienten alivio desde los primeros días. La adaptación completa y la reducción significativa del dolor suelen notarse entre 2 y 4 semanas. La mejora postural puede tomar un poco más, entre 1 y 3 meses.',
      },
      {
        q: '¿Las plantillas son para siempre?',
        a: 'Las plantillas tienen una vida útil de 1 a 3 años, dependiendo del uso, el material y el crecimiento (en niños). Después de este tiempo, los materiales pueden desgastarse o tus necesidades pueden cambiar, por lo que se recomienda una reevaluación.',
      },
      {
        q: '¿Funcionan para deportes?',
        a: '¡Absolutamente! De hecho, son muy beneficiosas para deportistas. Podemos diseñar plantillas específicas para tu deporte, mejorando la amortiguación, la estabilidad y la propulsión, lo que se traduce en mejor rendimiento y prevención de lesiones.',
      },
      {
        q: '¿Duele usar las plantillas al principio?',
        a: 'Es normal sentir una sensación diferente o una ligera molestia durante los primeros días, ya que tu cuerpo se está adaptando a la nueva alineación. Esto no debería ser doloroso. Si sientes dolor agudo o persistente, contáctanos para un ajuste.',
      },
      {
        q: '¿Puedo lavar las plantillas?',
        a: 'Sí, la mayoría de nuestras plantillas se pueden limpiar fácilmente con un paño húmedo y jabón suave. Te daremos instrucciones específicas de cuidado para prolongar su vida útil.',
      },
      {
        q: '¿Las plantillas curan el pie plano?',
        a: 'En niños, las plantillas pueden ayudar a guiar el desarrollo del arco y, en algunos casos, corregir el pie plano flexible. En adultos, el objetivo principal es proporcionar soporte, aliviar el dolor y mejorar la función, ya que el pie plano estructural no se "cura" pero sí se maneja eficazmente.',
      },
      {
        q: '¿Cuánto cuestan las plantillas personalizadas?',
        a: 'El costo varía según los materiales y la complejidad del diseño. Te daremos un presupuesto claro después de la evaluación inicial. Considera que es una inversión en tu salud y calidad de vida a largo plazo. Muchos seguros médicos pueden cubrir parte del costo con una receta.',
      },
    ],
  },
  amputados: {
    title: 'Órtesis y Dispositivos Ortopédicos en Cuernavaca',
    metaDescription:
      'Órtesis personalizadas en Cuernavaca: rodilleras, férulas, soportes de columna y dispositivos ortopédicos. Estabilización, prevención de lesiones y mejora funcional. Especialistas certificados.',
    image: '/images/banners/Órtesis de RodillaFD.png',
    heroDescription:
      '¿Te lastimaste la rodilla jugando fútbol? ¿Tienes dolor de espalda que no te deja en paz? ¿Necesitas protección después de una cirugía? Las órtesis - rodilleras, férulas, soportes de columna y otros dispositivos ortopédicos - pueden ser exactamente lo que necesitas para recuperarte, prevenir lesiones, o simplemente sentirte más seguro al moverte. En Ortopedia Cuernavaca, no creemos en soluciones de talla única. Cada lesión es diferente, cada cuerpo es único, y cada persona tiene necesidades específicas.',
    highlights: [
      { label: 'Rodilla', value: 'Soporte' },
      { label: 'Columna', value: 'Estabilidad' },
      { label: 'Férulas', value: 'A medida' },
      { label: 'Deporte', value: 'Compresión' },
    ],
    whatItIs:
      'Las órtesis son dispositivos médicos externos que se usan en el cuerpo para soportar, alinear, prevenir o corregir problemas. Piensa en ellas como "ayudantes externos" que trabajan con tu cuerpo para mejorar la función, reducir el dolor, o protegerte de lesiones.',
    whatItDoes: [
      {
        title: 'Estabilización Articular',
        description:
          'Si tienes una articulación lesionada o débil (como una rodilla con ligamentos dañados), una órtesis puede proporcionar la estabilidad que necesitas mientras te recuperas o para actividades específicas.',
      },
      {
        title: 'Prevención de Lesiones',
        description:
          'Si practicas deportes de contacto, tienes un trabajo físicamente demandante, o has tenido lesiones previas, las órtesis pueden protegerte. No son una armadura mágica, pero pueden reducir significativamente el riesgo de ciertos tipos de lesiones.',
      },
      {
        title: 'Corrección Postural',
        description:
          'Para problemas de columna como escoliosis o para mejorar la alineación después de una lesión, las órtesis pueden ayudar a corregir o controlar la postura.',
      },
      {
        title: 'Inmovilización Temporal',
        description:
          'Después de una cirugía o lesión, a veces necesitas limitar el movimiento de cierta parte del cuerpo para que sane correctamente. Las férulas y órtesis pueden proporcionar esta inmovilización controlada.',
      },
      {
        title: 'Reducción de Dolor',
        description:
          'Muchas veces, el dolor viene de presión excesiva o movimiento incorrecto. Las órtesis pueden redistribuir las cargas, reducir la presión en áreas dolorosas, y permitir que te muevas con menos dolor.',
      },
      {
        title: 'Mejora Funcional',
        description:
          'Si una lesión o condición ha limitado tu capacidad de moverte o funcionar normalmente, una órtesis puede ayudarte a recuperar esa función.',
      },
    ],
    useCases: [
      {
        category: 'Órtesis de Rodilla',
        items: [
          {
            title: 'Lesiones de Ligamentos',
            description:
              'Si te lastimaste el ligamento cruzado anterior (LCA), ligamento cruzado posterior (LCP), o ligamentos colaterales, una rodillera funcional puede proporcionar estabilidad mientras te recuperas.',
          },
          {
            title: 'Condromalacia Rotuliana',
            description:
              'Dolor en la parte delantera de la rodilla, a menudo causado por problemas de alineación de la rótula. Una rodillera con soporte rotuliano puede ayudar a mantener la rótula alineada y reducir el dolor.',
          },
          {
            title: 'Artritis y Artrosis',
            description:
              'Si tienes desgaste en la rodilla (artrosis) o inflamación (artritis), una rodillera puede ayudar a reducir la carga en la articulación, proporcionar calor y compresión que puede aliviar el dolor.',
          },
          {
            title: 'Post-Operatorio',
            description:
              'Después de una cirugía de rodilla (como reparación de menisco o ligamentos), una rodillera puede proteger la cirugía mientras sana, limitar movimientos que podrían dañar la reparación, y darte confianza mientras te recuperas.',
          },
        ],
      },
      {
        category: 'Órtesis de Columna',
        items: [
          {
            title: 'Escoliosis',
            description:
              'Si tienes una curvatura lateral de la columna (escoliosis), especialmente si eres joven y aún estás creciendo, una órtesis puede ayudar a controlar o corregir la curva.',
          },
          {
            title: 'Hernias Discales',
            description:
              'Una órtesis de columna puede ayudar a reducir la carga en la columna, mejorar la alineación, y reducir el dolor asociado con hernias discales.',
          },
          {
            title: 'Dolor Lumbar Crónico',
            description:
              'Para dolor de espalda baja persistente, una faja o soporte lumbar puede proporcionar compresión, calor, y recordatorio postural que puede ayudar a reducir el dolor y mejorar la función.',
          },
        ],
      },
    ],
    howWeHelp: {
      title: '¿Cómo trabajamos contigo? El proceso completo',
      steps: [
        {
          step: 1,
          title: 'Evaluación Inicial',
          duration: '30-45 minutos',
          description:
            'Análisis de tu lesión o condición, evaluación funcional, consideración de tu actividad, y medición y evaluación.',
        },
        {
          step: 2,
          title: 'Selección o Diseño',
          duration: '1-2 semanas si es personalizado',
          description:
            'Órtesis prefabricada ajustable o personalizada según tu caso, y selección de materiales (neopreno, termoplásticos, carbono, gel).',
        },
        {
          step: 3,
          title: 'Aplicación y Ajuste',
          duration: '30-45 minutos',
          description:
            'Prueba de la órtesis, ajustes en el momento si es necesario, instrucciones detalladas de uso y cuidado, y programa de uso gradual.',
        },
        {
          step: 4,
          title: 'Seguimiento',
          duration: '2-4 semanas después',
          description:
            'Revisión de adaptación, ajustes finos si es necesario, y evaluación de resultados.',
        },
      ],
    },
    equipment: [
      'Termoplásticos de Baja Temperatura',
      'Sistemas Modulares',
      'Escaneo 3D',
      'Materiales Avanzados (Carbono, Neopreno, Gel)',
      'Laboratorio Propio',
    ],
    benefits: [
      {
        title: 'Estabilidad y Soporte',
        description:
          'Proporcionan la estabilidad que necesitas para moverte con confianza mientras te recuperas o proteges una articulación.',
      },
      {
        title: 'Reducción del Dolor',
        description:
          'Al redistribuir cargas y proporcionar soporte, pueden reducir significativamente el dolor asociado con lesiones o condiciones.',
      },
      {
        title: 'Prevención de Lesiones',
        description:
          'Pueden reducir el riesgo de ciertos tipos de lesiones, especialmente en deportes o actividades de alto riesgo.',
      },
      {
        title: 'Mejora Funcional',
        description:
          'Te permiten hacer actividades que de otra manera serían difíciles o imposibles debido a tu lesión o condición.',
      },
      {
        title: 'Protección Post-Operatoria',
        description:
          'Protegen cirugías mientras sanan, limitan movimientos problemáticos, y te dan confianza durante la recuperación.',
      },
      {
        title: 'Corrección Postural',
        description:
          'Pueden ayudar a corregir o controlar problemas de postura, especialmente en niños y adolescentes.',
      },
    ],
    faq: [
      {
        q: '¿Aceptan receta médica?',
        a: 'Sí, podemos trabajar con indicación médica y coordinar con tu médico tratante. Muchos seguros médicos cubren órtesis cuando hay una receta.',
      },
      {
        q: '¿Cuánto tiempo debo usar la órtesis?',
        a: 'Depende de tu condición y objetivos. Algunas órtesis se usan solo durante actividades específicas, otras todo el día. Te damos recomendaciones específicas según tu caso.',
      },
      {
        q: '¿Puedo hacer deporte con la órtesis?',
        a: 'Depende del tipo de órtesis y deporte. Algunas órtesis están diseñadas específicamente para deportes. Te asesoramos sobre qué actividades puedes hacer con tu órtesis.',
      },
      {
        q: '¿Necesito una órtesis personalizada o una prefabricada funciona?',
        a: 'Para muchos casos, una órtesis prefabricada de buena calidad que ajustamos específicamente para ti es perfecta. Para casos más complejos o cuando las prefabricadas no funcionan bien, podemos fabricar una personalizada. Te asesoramos sobre qué es mejor para tu caso.',
      },
      {
        q: '¿Cómo cuido mi órtesis?',
        a: 'Te damos instrucciones específicas de cuidado cuando recibes tu órtesis. Generalmente, se pueden limpiar con un paño húmedo y jabón suave, y deben secarse completamente antes de usar.',
      },
    ],
  },
  ortesis: {
    title: 'Prótesis Personalizadas y Rehabilitación en Amputados',
    metaDescription:
      'Prótesis personalizadas en Cuernavaca. Fabricación a medida, ajuste preciso y rehabilitación integral para amputados. Tecnología avanzada y seguimiento continuo. Especialistas certificados.',
    image: '/images/banners/Técnico ajustando prótesis en tallerFD.png',
    heroDescription:
      'Si has tenido una amputación, ya sea por accidente, enfermedad, o condición médica, sabemos que estás enfrentando uno de los desafíos más grandes de tu vida. Pero también sabemos que con el apoyo adecuado, la tecnología correcta, y un equipo que realmente se preocupa por ti, puedes recuperar tu independencia y calidad de vida. En Ortopedia Cuernavaca, nuestro taller especializado no es solo un lugar donde fabricamos prótesis. Es un lugar donde trabajamos contigo, paso a paso, para crear una solución que realmente funcione para tu vida.',
    highlights: [
      { label: 'Prótesis a medida', value: '100%' },
      { label: 'Ajustes', value: 'Precisión' },
      { label: 'Rehabilitación', value: 'Integral' },
      { label: 'Seguimiento', value: 'Continuo' },
    ],
    whatItIs:
      'Una prótesis es un dispositivo artificial que reemplaza una parte del cuerpo que se ha perdido. Pero es mucho más que eso - es una herramienta que te permite recuperar función, independencia, y calidad de vida.',
    whatItDoes: [
      {
        title: 'Restaurar la Función',
        description:
          'Te permite volver a caminar, correr, hacer las actividades que quieres hacer. Pero no es solo sobre movimiento - es sobre recuperar tu capacidad de vivir tu vida de manera independiente.',
      },
      {
        title: 'Mejorar la Movilidad',
        description:
          'Con una prótesis bien ajustada y adaptada, puedes moverte con confianza. Ya no dependes de sillas de ruedas o muletas para todo. Puedes ir a donde quieras, cuando quieras.',
      },
      {
        title: 'Prevenir Complicaciones',
        description:
          'Una amputación no solo afecta la extremidad que perdiste. Puede causar problemas en otras partes del cuerpo - dolor de espalda por compensación, problemas en la otra extremidad por sobrecarga. Una prótesis bien diseñada puede prevenir muchos de estos problemas.',
      },
      {
        title: 'Mejorar la Postura',
        description:
          'Cuando falta una extremidad, tu cuerpo compensa. Esto puede causar problemas de postura que llevan a dolor y otros problemas. Una prótesis ayuda a restaurar el equilibrio y la alineación.',
      },
      {
        title: 'Rehabilitación Integral',
        description:
          'La prótesis no es solo un dispositivo - es parte de un proceso de rehabilitación completo. Te ayuda a recuperar fuerza, equilibrio, coordinación, y confianza.',
      },
      {
        title: 'Calidad de Vida',
        description:
          'Quizás lo más importante: una prótesis te permite retomar actividades que son importantes para ti - trabajo, deporte, hobbies, tiempo con familia. No es solo sobre función física - es sobre bienestar emocional y calidad de vida.',
      },
    ],
    useCases: [
      {
        category: 'Amputaciones de Miembro Inferior',
        items: [
          {
            title: 'Amputación Transfemoral (Por Encima de la Rodilla)',
            description:
              'Si tu amputación fue por encima de la rodilla, necesitas una prótesis que incluya una rodilla articulada. Esto es más complejo, pero con la tecnología moderna y el ajuste correcto, puedes caminar de manera muy funcional.',
          },
          {
            title: 'Amputación Transtibial (Por Debajo de la Rodilla)',
            description:
              'Si tu amputación fue por debajo de la rodilla, mantienes tu rodilla natural, lo que hace que la adaptación sea generalmente más rápida y la función sea excelente.',
          },
          {
            title: 'Amputación de Pie Parcial',
            description:
              'Si solo perdiste parte del pie, podemos crear prótesis parciales o plantillas especializadas que te permiten usar calzado normal y caminar de manera natural.',
          },
        ],
      },
      {
        category: 'Amputaciones de Miembro Superior',
        items: [
          {
            title: 'Amputación Transradial (Antebrazo)',
            description:
              'Si tu amputación fue en el antebrazo, podemos crear prótesis que incluyen una mano protésica. Hay opciones mecánicas (controladas por cables) y mioeléctricas (controladas por señales musculares).',
          },
          {
            title: 'Amputación Transhumeral (Brazo)',
            description:
              'Si tu amputación fue en el brazo, necesitas una prótesis que incluya codo y mano. Esto es más complejo pero totalmente posible.',
          },
        ],
      },
    ],
    howWeHelp: {
      title: '¿Cómo te ayudamos? El proceso completo explicado',
      steps: [
        {
          step: 1,
          title: 'Evaluación Integral Inicial',
          duration: '60-90 minutos',
          description:
            'Historia completa, evaluación de la extremidad residual, evaluación de tu condición general, análisis de objetivos, evaluación de entorno, y medición y moldes.',
        },
        {
          step: 2,
          title: 'Diseño Personalizado',
          duration: '2-4 semanas',
          description:
            'Diseño del encaje (la parte más importante), selección de componentes (rodilla, pie, mano, etc.), selección de materiales, y fabricación en nuestro taller.',
        },
        {
          step: 3,
          title: 'Aplicación y Ajuste Inicial',
          duration: '60-90 minutos',
          description:
            'Prueba del encaje, prueba de componentes, ajustes de alineación, instrucciones iniciales, y entrenamiento básico.',
        },
        {
          step: 4,
          title: 'Rehabilitación Integral',
          duration: 'Sesiones según necesidad',
          description:
            'Entrenamiento en el uso, fortalecimiento, acondicionamiento, adaptación a actividades específicas, y apoyo psicológico y emocional.',
        },
        {
          step: 5,
          title: 'Seguimiento Continuo',
          duration: 'Revisión a las 2 semanas y luego según necesidad',
          description:
            'Revisión de adaptación, ajustes finos, evaluación de resultados, y mantenimiento y reparaciones cuando sea necesario.',
        },
      ],
    },
    equipment: [
      'Escáner 3D',
      'Software CAD/CAM',
      'Sistemas Modulares',
      'Materiales Avanzados (Carbono, Titanio, Siliconas)',
      'Laboratorio Propio',
    ],
    benefits: [
      {
        title: 'Recuperación de Función',
        description:
          'Te permite volver a hacer las actividades que son importantes para ti - caminar, trabajar, practicar deporte, vivir tu vida.',
      },
      {
        title: 'Independencia',
        description:
          'Reduce tu dependencia de sillas de ruedas o muletas, permitiéndote moverte de manera más independiente.',
      },
      {
        title: 'Prevención de Complicaciones',
        description:
          'Puede prevenir problemas de postura, dolor de espalda, y problemas en otras extremidades causados por compensación.',
      },
      {
        title: 'Mejora de la Calidad de Vida',
        description:
          'No es solo sobre función física - es sobre bienestar emocional, relaciones, y calidad de vida general.',
      },
      {
        title: 'Rehabilitación Integral',
        description:
          'Es parte de un proceso completo que te ayuda a recuperar fuerza, equilibrio, coordinación, y confianza.',
      },
      {
        title: 'Tecnología Avanzada',
        description:
          'Utilizamos tecnología de última generación y materiales avanzados para darte la mejor prótesis posible.',
      },
    ],
    faq: [
      {
        q: '¿Cuál es el tiempo típico de adaptación?',
        a: 'Depende del nivel de amputación y tipo de prótesis. Generalmente, la adaptación inicial toma semanas a meses, con seguimiento continuo. Cada persona es diferente, y trabajamos contigo a tu ritmo.',
      },
      {
        q: '¿Realizan mantenimiento?',
        a: 'Sí, contamos con mantenimiento, ajustes preventivos y correctivos. Las prótesis necesitan mantenimiento regular para funcionar óptimamente, y estamos aquí para eso.',
      },
      {
        q: '¿Cuánto cuesta una prótesis?',
        a: 'El costo varía significativamente según el tipo de prótesis, componentes, y nivel de personalización. Te damos un presupuesto claro después de la evaluación inicial. Muchos seguros médicos cubren prótesis - te ayudamos a verificar tu cobertura.',
      },
      {
        q: '¿Cuánto tiempo tarda en fabricarse?',
        a: 'Generalmente 2-4 semanas desde la evaluación hasta la aplicación inicial, dependiendo de la complejidad. Te mantenemos informado durante todo el proceso.',
      },
      {
        q: '¿Necesito rehabilitación?',
        a: 'Sí, la rehabilitación es crucial para usar una prótesis efectivamente. Te ayudamos a coordinar con fisioterapeutas especializados en prótesis, o podemos proporcionar rehabilitación en nuestro centro.',
      },
      {
        q: '¿Qué pasa si mi prótesis necesita ajustes?',
        a: 'Los ajustes son parte normal del proceso. Tu cuerpo cambia, especialmente en los primeros meses. Estamos aquí para hacer ajustes cuando los necesites, sin costo adicional durante el período de garantía.',
      },
    ],
  },
  pediatrica: {
    title: 'Rehabilitación Pediátrica en Cuernavaca',
    metaDescription:
      'Rehabilitación pediátrica en Cuernavaca. Detección temprana, tratamiento de pie plano, problemas de marcha y desarrollo motor en niños. Órtesis infantiles y seguimiento especializado.',
    image: '/images/banners/NiñoPiePlanoFlatDesign.png',
    heroDescription:
      'Como padre o madre, ver a tu hijo con problemas de marcha, postura, o desarrollo motor puede ser preocupante. Sabemos que quieres lo mejor para ellos, y que detectar y tratar estos problemas a tiempo puede marcar una diferencia enorme en su futuro. En Ortopedia Cuernavaca, la rehabilitación pediátrica no es solo sobre corregir problemas - es sobre darle a tu hijo las mejores herramientas para desarrollarse, crecer saludablemente, y participar plenamente en todas las actividades que los niños deberían disfrutar.',
    highlights: [
      { label: 'Estimulación', value: 'Temprana' },
      { label: 'Órtesis', value: 'Infantiles' },
      { label: 'Plan', value: 'Familiar' },
      { label: 'Seguimiento', value: 'Constante' },
    ],
    whatItIs:
      'La rehabilitación pediátrica se enfoca en la detección temprana, intervención oportuna, y tratamiento integral de problemas de desarrollo motor, marcha, postura, y condiciones ortopédicas en niños y adolescentes. Es diferente a la rehabilitación de adultos porque los niños están en constante crecimiento y desarrollo, lo que significa que podemos influir positivamente en cómo se desarrollan.',
    whatItDoes: [
      {
        title: 'Detección Temprana',
        description:
          'Muchos problemas ortopédicos en niños son más fáciles de tratar cuando se detectan temprano. La rehabilitación pediátrica nos permite identificar problemas antes de que se vuelvan más complejos o causen más dificultades.',
      },
      {
        title: 'Corrección de Problemas de Marcha',
        description:
          'Si tu hijo camina de manera diferente, tiene problemas de equilibrio, o se cae frecuentemente, podemos ayudar. La rehabilitación puede mejorar cómo camina, su equilibrio, y su confianza al moverse.',
      },
      {
        title: 'Tratamiento de Pie Plano',
        description:
          'El pie plano en niños es común, pero no siempre requiere tratamiento. Evaluamos cada caso individualmente para determinar si necesita intervención o solo observación. Cuando sí necesita tratamiento, podemos ayudar de manera efectiva.',
      },
      {
        title: 'Mejora del Desarrollo Motor',
        description:
          'Los niños aprenden moviéndose. Si hay problemas que limitan su movimiento, pueden afectar su desarrollo general. La rehabilitación ayuda a que se desarrollen de manera óptima.',
      },
      {
        title: 'Prevención de Problemas Futuros',
        description:
          'Problemas no tratados en la infancia pueden causar problemas más serios en la edad adulta. Tratar estos problemas ahora puede prevenir dolor, limitaciones, y necesidad de tratamientos más complejos más adelante.',
      },
      {
        title: 'Mejora de la Calidad de Vida',
        description:
          'Quizás lo más importante: permite que tu hijo participe plenamente en actividades - jugar, hacer deporte, correr con amigos. No es solo sobre función - es sobre permitir que sean niños.',
      },
    ],
    useCases: [
      {
        category: 'Problemas de Pie y Marcha',
        items: [
          {
            title: 'Pie Plano (Pes Planus)',
            description:
              'El pie plano es muy común en niños pequeños. Evaluamos cada caso para determinar si necesita tratamiento o solo observación. Cuando sí necesita tratamiento, podemos usar plantillas ortopédicas pediátricas, ejercicios, y en algunos casos, órtesis.',
          },
          {
            title: 'Problemas de Marcha',
            description:
              'Caminar de puntillas, marcha con pies hacia adentro o afuera, cojera o asimetría. Evaluamos la causa y tratamos según necesidad.',
          },
        ],
      },
      {
        category: 'Problemas Posturales',
        items: [
          {
            title: 'Escoliosis Infantil y Juvenil',
            description:
              'La escoliosis es una curvatura lateral de la columna. En niños, puede progresar rápidamente durante los brotes de crecimiento. Detectarla temprano es crucial. Podemos usar órtesis de columna especializadas para niños, junto con ejercicios.',
          },
          {
            title: 'Desalineaciones de Rodillas',
            description:
              'Genu Valgo (rodillas juntas) o Genu Varo (piernas arqueadas). Es común en niños pequeños y generalmente se corrige solo, pero a veces necesita intervención.',
          },
        ],
      },
    ],
    howWeHelp: {
      title: '¿Cómo ayudamos a tu hijo? El proceso completo',
      steps: [
        {
          step: 1,
          title: 'Evaluación Inicial',
          duration: '45-60 minutos',
          description:
            'Entrevista con padres, evaluación del niño (apropiada para su edad), observación de marcha y movimiento, evaluación postural, y ambiente cómodo y no intimidante.',
        },
        {
          step: 2,
          title: 'Desarrollo del Plan',
          duration: '1 semana',
          description:
            'Análisis de resultados, diseño del plan específico para tu hijo (considerando edad, severidad, objetivos), coordinación con otros especialistas si es necesario, y presentación del plan a los padres.',
        },
        {
          step: 3,
          title: 'Inicio del Tratamiento',
          duration: 'Sesiones según necesidad',
          description:
            'Sesiones de terapia lúdicas y divertidas (si es necesario), fabricación o adaptación de órtesis infantiles, educación familiar, y establecimiento de objetivos claros.',
        },
        {
          step: 4,
          title: 'Seguimiento',
          duration: 'Cada 3-6 meses o según necesidad',
          description:
            'Evaluación del progreso, ajustes de órtesis (los niños crecen rápido), modificaciones del plan según evolución, y actualización de objetivos.',
        },
      ],
    },
    equipment: [
      'Material Sensoriomotor',
      'Plataformas de Equilibrio',
      'Órtesis Pediátricas Especializadas',
      'Equipamiento Lúdico para Terapia',
      'Escaneo 3D para Órtesis',
    ],
    benefits: [
      {
        title: 'Detección y Tratamiento Temprano',
        description:
          'Detectar y tratar problemas temprano puede prevenir complicaciones futuras y mejorar los resultados a largo plazo.',
      },
      {
        title: 'Desarrollo Motor Óptimo',
        description:
          'Ayuda a que tu hijo se desarrolle de manera óptima, permitiéndole participar plenamente en actividades apropiadas para su edad.',
      },
      {
        title: 'Prevención de Problemas Futuros',
        description:
          'Tratar problemas en la infancia puede prevenir dolor, limitaciones, y necesidad de tratamientos más complejos en la edad adulta.',
      },
      {
        title: 'Enfoque Apropiado para la Edad',
        description:
          'No tratamos a los niños como "adultos pequeños" - entendemos que tienen necesidades únicas y que el tratamiento debe ser apropiado para su edad.',
      },
      {
        title: 'Involucramiento Familiar',
        description:
          'Involucramos a toda la familia en el proceso, enseñándote cómo ayudar a tu hijo en casa y qué esperar durante el tratamiento.',
      },
      {
        title: 'Mejora de la Calidad de Vida',
        description:
          'Permite que tu hijo participe plenamente en actividades - jugar, hacer deporte, correr con amigos. No es solo sobre función - es sobre permitir que sean niños.',
      },
    ],
    faq: [
      {
        q: '¿Desde qué edad atienden?',
        a: 'Desde los primeros meses de vida, según indicación médica. Trabajamos con niños desde bebés hasta adolescentes, adaptando nuestros tratamientos a cada etapa del desarrollo.',
      },
      {
        q: '¿El tratamiento es doloroso para mi hijo?',
        a: 'Hacemos todo lo posible para que el tratamiento sea cómodo y no doloroso. Usamos técnicas lúdicas y apropiadas para la edad. Si hay alguna molestia, la abordamos inmediatamente.',
      },
      {
        q: '¿Cuánto tiempo toma ver resultados?',
        a: 'Depende del problema y la edad del niño. Algunos problemas mejoran rápidamente, otros toman más tiempo. Te explicamos qué esperar según el caso específico de tu hijo.',
      },
      {
        q: '¿Las órtesis son incómodas para los niños?',
        a: 'Diseñamos órtesis específicamente para niños - más ligeras, más cómodas, y a menudo con colores que les gusten. Hacemos todo lo posible para que sean cómodas y aceptables.',
      },
      {
        q: '¿Necesito una receta médica?',
        a: 'Depende del tipo de tratamiento. Para algunos servicios, sí. Te ayudamos a coordinar con el pediatra o especialista de tu hijo si es necesario.',
      },
      {
        q: '¿Qué pasa cuando mi hijo crece?',
        a: 'Los niños crecen rápido, y sus necesidades cambian. Revisamos regularmente y ajustamos o reemplazamos órtesis según sea necesario. Estamos aquí para el crecimiento de tu hijo.',
      },
    ],
  },
  musculoesqueletica: {
    title: 'Fisioterapia y Rehabilitación Musculoesquelética en Cuernavaca',
    metaDescription:
      'Fisioterapia en Cuernavaca. Tratamiento de lesiones deportivas, rehabilitación postoperatoria, dolor crónico y condiciones musculoesqueléticas. Terapia manual, ejercicio terapéutico y tecnología avanzada.',
    image: '/images/banners/Fisioterapiadf.png',
    heroDescription:
      '¿Te lastimaste jugando fútbol? ¿Te operaron la rodilla y necesitas recuperarte? ¿Tienes dolor de espalda que no te deja en paz? La fisioterapia y rehabilitación musculoesquelética puede ser exactamente lo que necesitas para recuperarte, reducir el dolor, y volver a hacer las cosas que amas. En Ortopedia Cuernavaca, la fisioterapia no es solo sobre hacer ejercicios. Es sobre entender tu lesión o condición, trabajar contigo para recuperarte de manera segura y efectiva, y darte las herramientas para prevenir problemas futuros.',
    highlights: [
      { label: 'Terapia', value: 'Manual' },
      { label: 'Deporte', value: 'Rendimiento' },
      { label: 'Postop', value: 'Protocolo' },
      { label: 'Fuerza', value: 'Progresiva' },
    ],
    whatItIs:
      'La fisioterapia es el tratamiento de lesiones, condiciones, y disfunciones del sistema musculoesquelético (músculos, articulaciones, tendones, ligamentos) mediante técnicas manuales, ejercicio terapéutico, modalidades físicas, y educación. No es solo sobre "hacer ejercicio" - es sobre un enfoque integral para ayudarte a recuperarte y funcionar mejor.',
    whatItDoes: [
      {
        title: 'Recuperación de Lesiones',
        description:
          'Si te lastimaste - un esguince, una distensión, una fractura - la fisioterapia te ayuda a recuperarte de manera segura y efectiva. No es solo sobre esperar a que sane - es sobre ayudar a que sane mejor y más rápido.',
      },
      {
        title: 'Rehabilitación Postoperatoria',
        description:
          'Después de una cirugía ortopédica, la fisioterapia es crucial. Te ayuda a recuperar movimiento, fuerza, y función de manera guiada y segura. No es solo sobre hacer ejercicios - es sobre hacer los ejercicios correctos, en el momento correcto, de la manera correcta.',
      },
      {
        title: 'Reducción de Dolor',
        description:
          'Ya sea dolor agudo (recién empezó) o crónico (lleva tiempo), la fisioterapia puede ayudar. No siempre es sobre "aguantar" el dolor - es sobre tratarlo de manera efectiva.',
      },
      {
        title: 'Mejora de Movilidad',
        description:
          'Si has perdido rango de movimiento por una lesión, cirugía, o condición, la fisioterapia te ayuda a recuperarlo. No es solo sobre estirar - es sobre movilizar de manera específica y efectiva.',
      },
      {
        title: 'Fortalecimiento',
        description:
          'Si has perdido fuerza por una lesión, cirugía, o falta de uso, la fisioterapia te ayuda a recuperarla de manera progresiva y segura. No es solo sobre levantar pesas - es sobre fortalecer de manera específica para tu condición.',
      },
      {
        title: 'Prevención',
        description:
          'Si has tenido lesiones previas o practicas actividades de alto riesgo, la fisioterapia puede ayudarte a prevenir lesiones futuras. No es solo sobre tratar - es sobre prevenir.',
      },
      {
        title: 'Optimización del Rendimiento',
        description:
          'Si eres atleta o tienes un trabajo físicamente demandante, la fisioterapia puede ayudarte a optimizar tu rendimiento y prevenir lesiones. No es solo sobre recuperarse - es sobre ser mejor.',
      },
    ],
    useCases: [
      {
        category: 'Lesiones Deportivas',
        items: [
          {
            title: 'Esguinces',
            description:
              'Tobillo, rodilla, muñeca. Te ayudamos a recuperarte y prevenir esguinces recurrentes.',
          },
          {
            title: 'Lesiones de Rodilla',
            description:
              'LCA, meniscos, condromalacia rotuliana. Te ayudamos a recuperarte, ya sea con o sin cirugía.',
          },
          {
            title: 'Lesiones de Hombro',
            description:
              'Manguito rotador, inestabilidad. Te ayudamos a recuperar función y reducir dolor.',
          },
          {
            title: 'Tendinitis y Tendinosis',
            description:
              'Codo de tenista, tendinitis de Aquiles, tendinitis del hombro. Te ayudamos a reducir el dolor y corregir la causa.',
          },
        ],
      },
      {
        category: 'Rehabilitación Postoperatoria',
        items: [
          {
            title: 'Post-Artroscopia de Rodilla',
            description:
              'Después de una artroscopia, te ayudamos a recuperar movimiento, fuerza, y función de manera guiada.',
          },
          {
            title: 'Post-Reemplazo de Cadera o Rodilla',
            description:
              'Después de un reemplazo articular, la fisioterapia es crucial. Te ayudamos a recuperar movimiento, caminar, y volver a tus actividades.',
          },
          {
            title: 'Post-Reparación de Ligamentos',
            description:
              'Después de reparar un ligamento (como el LCA), te guiamos a través de un protocolo específico para recuperarte de manera segura y efectiva.',
          },
        ],
      },
    ],
    howWeHelp: {
      title: '¿Cómo trabajamos contigo? El proceso completo',
      steps: [
        {
          step: 1,
          title: 'Evaluación Inicial',
          duration: '45-60 minutos',
          description:
            'Historia clínica completa, evaluación física detallada, análisis de movimiento, establecimiento de objetivos, y desarrollo del plan de tratamiento.',
        },
        {
          step: 2,
          title: 'Sesiones de Tratamiento',
          duration: '45-60 min cada una',
          description:
            'Terapia manual (según necesidad), ejercicios terapéuticos específicos, modalidades físicas (si es necesario), educación sobre tu condición, y entrenamiento para ejercicios en casa.',
        },
        {
          step: 3,
          title: 'Reevaluación',
          duration: 'Cada 4-6 sesiones',
          description:
            'Evaluación del progreso, ajustes del plan según evolución, y establecimiento de nuevos objetivos si es necesario.',
        },
        {
          step: 4,
          title: 'Alta y Mantenimiento',
          duration: 'Según necesidad',
          description:
            'Cuando alcanzas tus objetivos, te damos un programa de mantenimiento para hacer en casa y prevenir recurrencias.',
        },
      ],
    },
    equipment: [
      'Electroterapia (TENS)',
      'Ultrasonido Terapéutico',
      'Laserterapia',
      'Plataformas de Equilibrio',
      'Bandas Elásticas y Pesas',
      'Equipamiento de Fortalecimiento',
    ],
    benefits: [
      {
        title: 'Recuperación Segura y Efectiva',
        description:
          'Te ayudamos a recuperarte de manera segura, evitando complicaciones y asegurando que la recuperación sea completa.',
      },
      {
        title: 'Reducción del Dolor',
        description:
          'Utilizamos técnicas específicas para reducir el dolor, tanto agudo como crónico, de manera efectiva.',
      },
      {
        title: 'Mejora de Función',
        description:
          'No es solo sobre reducir el dolor - es sobre recuperar tu capacidad de hacer las cosas que quieres hacer.',
      },
      {
        title: 'Prevención de Recurrencias',
        description:
          'Te enseñamos cómo prevenir que el problema vuelva, dándote herramientas para mantenerte saludable a largo plazo.',
      },
      {
        title: 'Optimización del Rendimiento',
        description:
          'Si eres atleta, te ayudamos no solo a recuperarte, sino a ser mejor - más fuerte, más eficiente, menos propenso a lesiones.',
      },
      {
        title: 'Educación y Empoderamiento',
        description:
          'Te educamos sobre tu condición, por qué hacemos ciertos ejercicios, y cómo cuidarte. El conocimiento es poder.',
      },
    ],
    faq: [
      {
        q: '¿Cuántas sesiones necesito?',
        a: 'Se define tras la evaluación. Típicamente, la mayoría de las condiciones requieren 6-12 sesiones con reevaluación periódica. Algunas condiciones más complejas pueden requerir más sesiones. Te explicamos qué esperar según tu caso específico.',
      },
      {
        q: '¿Es doloroso?',
        a: 'Algunas técnicas pueden causar molestia temporal, pero no debería ser doloroso. Siempre trabajamos dentro de tu tolerancia y te explicamos qué esperar. Si algo es demasiado doloroso, lo ajustamos.',
      },
      {
        q: '¿Necesito una receta médica?',
        a: 'Depende de tu seguro y el tipo de tratamiento. Algunos seguros requieren receta, otros no. Te ayudamos a verificar tu cobertura y coordinar con tu médico si es necesario.',
      },
      {
        q: '¿Qué debo traer a la primera cita?',
        a: 'Ropa cómoda que permita movimiento, cualquier estudio médico relevante (radiografías, resonancias, etc.), lista de medicamentos, y información de tu seguro si aplica.',
      },
      {
        q: '¿Puedo hacer ejercicio mientras estoy en fisioterapia?',
        a: 'Depende de tu condición. Te damos recomendaciones específicas sobre qué actividades puedes hacer y cuáles debes evitar. Generalmente, queremos que te mantengas activo dentro de lo que es seguro para tu condición.',
      },
      {
        q: '¿Qué pasa si no veo mejoras?',
        a: 'Si no ves mejoras como esperamos, reevaluamos el plan. Puede ser que necesitemos ajustar el enfoque, coordinar con otros especialistas, o considerar otras opciones. Siempre te mantenemos informado y trabajamos contigo para encontrar la mejor solución.',
      },
    ],
  },
  dolor: {
    title: 'Rehabilitación del Dolor Crónico en Cuernavaca',
    metaDescription:
      'Rehabilitación del dolor crónico en Cuernavaca. Manejo integral de dolor persistente, mejora funcional y calidad de vida. Enfoque multidisciplinario y tratamiento personalizado.',
    image: '/images/banners/Rehabilitación del Dolor CrónicoFD.png',
    heroDescription:
      'Si vives con dolor crónico, sabes lo que es despertar cada día con dolor, tener que planear tu vida alrededor del dolor, y sentir que el dolor controla tu vida en lugar de tú controlarlo. Entendemos que el dolor crónico no es solo físico - afecta tu trabajo, tus relaciones, tu capacidad de disfrutar la vida. En Ortopedia Cuernavaca, la rehabilitación del dolor crónico no es solo sobre "aguantar" el dolor o tomar más medicamentos. Es sobre un enfoque integral que combina terapia física, educación sobre el dolor, estrategias de manejo, y mejora funcional para ayudarte a recuperar tu calidad de vida.',
    highlights: [
      { label: 'Dolor', value: 'Control' },
      { label: 'Función', value: 'Mejora' },
      { label: 'Plan', value: 'Integrado' },
      { label: 'Recaídas', value: 'Prevención' },
    ],
    whatItIs:
      'El dolor crónico es dolor que persiste más allá del tiempo normal de curación (generalmente más de 3-6 meses). Es diferente al dolor agudo - el dolor agudo es una señal de que algo está mal y necesita atención. El dolor crónico a menudo persiste incluso después de que la lesión original ha sanado, y puede volverse un problema en sí mismo.',
    whatItDoes: [
      {
        title: 'Reducción del Dolor',
        description:
          'Aunque no siempre podemos eliminar completamente el dolor crónico, podemos ayudar a reducirlo. Esto puede hacer una diferencia enorme en tu calidad de vida.',
      },
      {
        title: 'Mejora Funcional',
        description:
          'A menudo, el dolor crónico limita lo que puedes hacer. La rehabilitación te ayuda a recuperar función - poder hacer más cosas, con menos dolor, o con mejor manejo del dolor.',
      },
      {
        title: 'Mejora de la Calidad de Vida',
        description:
          'Quizás lo más importante: te ayuda a vivir mejor. A pesar del dolor, puedes retomar actividades que son importantes para ti, mejorar tus relaciones, y disfrutar más la vida.',
      },
      {
        title: 'Educación sobre el Dolor',
        description:
          'Entender el dolor crónico - qué es, por qué persiste, cómo funciona - puede ser muy empoderador. Te ayuda a manejar mejor el dolor y a no tenerle tanto miedo.',
      },
      {
        title: 'Estrategias de Manejo',
        description:
          'Aprendes estrategias prácticas para manejar el dolor día a día - técnicas de relajación, manejo del estrés, modificación de actividades, y más.',
      },
      {
        title: 'Prevención de Recaídas',
        description:
          'Aprendes a identificar qué empeora tu dolor y cómo evitar o manejar esos factores.',
      },
      {
        title: 'Reducción de Medicamentos (cuando es posible)',
        description:
          'Con mejor función y estrategias de manejo, algunas personas pueden reducir su dependencia de medicamentos para el dolor. Esto siempre se hace en coordinación con tu médico.',
      },
    ],
    useCases: [
      {
        category: 'Dolor de Espalda',
        items: [
          {
            title: 'Dolor Lumbar Crónico',
            description:
              'Dolor de espalda baja que lleva tiempo. Puede ser por muchas causas - problemas de disco, problemas de postura, desequilibrios musculares, o puede ser "idiopático" (sin causa clara). Te ayudamos a reducir el dolor, mejorar la función, y prevenir recurrencias.',
          },
          {
            title: 'Dolor Cervical Crónico',
            description:
              'Dolor de cuello persistente. Puede ser por problemas de postura, lesiones previas, o tensión crónica. Te ayudamos a reducir el dolor y mejorar la función.',
          },
          {
            title: 'Dolor Relacionado con Hernias Discales',
            description:
              'Aunque la hernia puede haber sanado, el dolor puede persistir. Te ayudamos a manejar este dolor y mejorar la función.',
          },
        ],
      },
      {
        category: 'Dolor Articular',
        items: [
          {
            title: 'Artritis Reumatoide',
            description:
              'Condición autoinmune que causa dolor e inflamación en las articulaciones. Aunque no podemos curarla, podemos ayudarte a manejar el dolor, mantener la función, y mejorar la calidad de vida.',
          },
          {
            title: 'Osteoartritis',
            description:
              'Desgaste de las articulaciones. Te ayudamos a manejar el dolor, mantener la función, y prevenir que empeore.',
          },
          {
            title: 'Dolor de Rodilla Crónico',
            description:
              'Dolor persistente en la rodilla. Te ayudamos a identificar la causa y tratarla, o a manejar el dolor si la causa no es tratable.',
          },
        ],
      },
    ],
    howWeHelp: {
      title: '¿Cómo trabajamos contigo? El proceso completo',
      steps: [
        {
          step: 1,
          title: 'Evaluación Inicial Integral',
          duration: '60-90 minutos',
          description:
            'Historia completa del dolor, evaluación física detallada (no solo el área dolorosa, sino todo tu cuerpo), evaluación funcional, identificación de factores contribuyentes (físicos, psicológicos, de estilo de vida, sociales), y establecimiento de objetivos realistas.',
        },
        {
          step: 2,
          title: 'Desarrollo del Plan Integrado',
          duration: '1 semana',
          description:
            'Análisis de resultados, diseño del plan (terapia física adaptada, ejercicio terapéutico progresivo, educación sobre el dolor, estrategias de manejo), coordinación multidisciplinaria si es necesario, y presentación del plan.',
        },
        {
          step: 3,
          title: 'Tratamiento Multimodal',
          duration: 'Sesiones según necesidad',
          description:
            'Terapia física adaptada (movimientos suaves y progresivos), ejercicio terapéutico progresivo (empezamos muy suave), técnicas de relajación, modalidades físicas (TENS, ultrasonido, calor/frío), educación sobre el dolor, y estrategias de manejo.',
        },
        {
          step: 4,
          title: 'Seguimiento y Ajustes',
          duration: 'Regular',
          description:
            'Reevaluación periódica, ajustes del plan según evolución, apoyo continuo, y coordinación con otros especialistas cuando es necesario.',
        },
      ],
    },
    equipment: [
      'TENS (Estimulación Nerviosa Eléctrica Transcutánea)',
      'Ultrasonido Terapéutico',
      'Laserterapia',
      'Plataformas de Equilibrio',
      'Equipamiento de Ejercicio Terapéutico',
    ],
    benefits: [
      {
        title: 'Reducción del Dolor',
        description:
          'Aunque no siempre podemos eliminar completamente el dolor, podemos ayudar a reducirlo significativamente, lo que puede hacer una diferencia enorme en tu calidad de vida.',
      },
      {
        title: 'Mejora Funcional',
        description:
          'Te ayudamos a recuperar función - poder hacer más cosas, con menos dolor, o con mejor manejo del dolor.',
      },
      {
        title: 'Mejora de la Calidad de Vida',
        description:
          'A pesar del dolor, puedes retomar actividades que son importantes para ti, mejorar tus relaciones, y disfrutar más la vida.',
      },
      {
        title: 'Educación y Empoderamiento',
        description:
          'Entender el dolor crónico puede ser muy empoderador. Te ayuda a manejar mejor el dolor y a no tenerle tanto miedo.',
      },
      {
        title: 'Estrategias de Manejo',
        description:
          'Aprendes estrategias prácticas para manejar el dolor día a día - técnicas de relajación, manejo del estrés, modificación de actividades.',
      },
      {
        title: 'Enfoque Integral',
        description:
          'No solo tratamos el dolor físico - abordamos factores físicos, psicológicos, de estilo de vida, y sociales que contribuyen al dolor.',
      },
    ],
    faq: [
      {
        q: '¿Es doloroso el tratamiento?',
        a: 'Buscamos siempre tolerancia adecuada y seguridad. El tratamiento está adaptado para dolor crónico - movimientos suaves y progresivos. Si algo es demasiado doloroso, lo ajustamos. No queremos que el tratamiento empeore tu dolor.',
      },
      {
        q: '¿Pueden curar el dolor crónico?',
        a: 'No siempre podemos "curar" el dolor crónico completamente, pero podemos ayudar significativamente. Muchas personas con dolor crónico pueden reducir el dolor, mejorar la función, y mejorar su calidad de vida. Te explicamos qué esperar según tu caso específico.',
      },
      {
        q: '¿Cuánto tiempo toma ver resultados?',
        a: 'Depende de muchos factores. Algunas personas notan mejoras en semanas, otras toman más tiempo. El dolor crónico a menudo toma tiempo para mejorar, pero con el enfoque correcto, muchas personas mejoran significativamente.',
      },
      {
        q: '¿Necesito dejar de tomar medicamentos?',
        a: 'No necesariamente. Trabajamos en coordinación con tu médico. El objetivo es mejorar tu función y calidad de vida. Si, con mejor función y estrategias de manejo, puedes reducir medicamentos, eso es algo que se discute con tu médico.',
      },
      {
        q: '¿Qué pasa si he probado muchas cosas antes?',
        a: 'Entendemos que el dolor crónico puede ser frustrante y que has probado muchas cosas. Nuestro enfoque es diferente - integral, multidisciplinario, y enfocado en función y calidad de vida, no solo en dolor. Estamos aquí para trabajar contigo, sin importar cuántas cosas hayas probado antes.',
      },
      {
        q: '¿Necesito una receta médica?',
        a: 'Depende de tu seguro y el tipo de tratamiento. Algunos seguros requieren receta, otros no. Te ayudamos a verificar tu cobertura y coordinar con tu médico si es necesario.',
      },
    ],
  },
  productos: {
    title: 'Productos Ortopédicos en Cuernavaca',
    metaDescription:
      'Productos ortopédicos en Cuernavaca. Bastones, muletas, sillas de ruedas, calzado terapéutico y más. Asesoría experta, ajuste personalizado y servicio de calidad.',
    image: '/images/banners/Área de Productos OrtopédicosFD.png',
    heroDescription:
      'A veces, lo que necesitas no es un tratamiento complejo - es el producto ortopédico correcto que te ayude a moverte mejor, sentirte más seguro, o simplemente hacer las cosas más fáciles. Ya sea que necesites un bastón después de una cirugía, una silla de ruedas para mayor movilidad, o calzado especializado para una condición, nuestro área de productos ortopédicos está aquí para ayudarte. En Ortopedia Cuernavaca, no solo vendemos productos - te asesoramos para encontrar exactamente lo que necesitas.',
    highlights: [
      { label: 'Variedad', value: 'Amplia' },
      { label: 'Asesoría', value: 'Profesional' },
      { label: 'Calidad', value: 'Alta' },
      { label: 'Garantía', value: 'Soporte' },
    ],
    whatItIs:
      'Los productos ortopédicos son dispositivos y equipos diseñados para ayudarte a moverte mejor, proporcionar soporte, prevenir lesiones, o facilitar actividades diarias. Van desde cosas simples como bastones hasta equipos más complejos como sillas de ruedas eléctricas.',
    whatItDoes: [
      {
        title: 'Mejorar la Movilidad',
        description:
          'Si tienes dificultad para moverte, los productos ortopédicos pueden ayudarte a ser más independiente. Un bastón, muletas, o silla de ruedas puede hacer la diferencia entre poder ir donde quieres o quedarte en casa.',
      },
      {
        title: 'Proporcionar Soporte y Estabilidad',
        description:
          'Si tienes problemas de equilibrio, debilidad, o inestabilidad, productos como bastones o andaderas pueden darte el soporte que necesitas para moverte con confianza.',
      },
      {
        title: 'Prevenir Lesiones',
        description:
          'Si has tenido lesiones previas o tienes riesgo de caídas, ciertos productos pueden ayudarte a prevenir lesiones futuras.',
      },
      {
        title: 'Facilitar Actividades Diarias',
        description:
          'A veces, un producto simple puede hacer que las actividades diarias sean mucho más fáciles. Un elevador de asiento, por ejemplo, puede hacer que levantarse de una silla sea mucho más fácil.',
      },
      {
        title: 'Mejorar la Comodidad',
        description:
          'Si tienes dolor o incomodidad al hacer ciertas actividades, productos especializados pueden ayudarte a ser más cómodo.',
      },
      {
        title: 'Promover la Independencia',
        description:
          'Quizás lo más importante: estos productos pueden ayudarte a mantener tu independencia y autonomía, permitiéndote hacer las cosas que quieres hacer.',
      },
    ],
    useCases: [
      {
        category: 'Ayudas para la Marcha',
        items: [
          {
            title: 'Bastones',
            description:
              'Bastón estándar, bastón de 4 puntas, bastón de 3 puntas. Te ayudamos a elegir el tipo correcto y ajustarlo a tu altura para máxima efectividad y comodidad.',
          },
          {
            title: 'Muletas',
            description:
              'Muletas axilares (de hombro) o muletas de antebrazo (canadiense). Te ayudamos a elegir el tipo correcto según tu condición, fuerza, y necesidades.',
          },
          {
            title: 'Andaderas',
            description:
              'Andaderas estándar, con ruedas, o con asiento. Te ayudamos a elegir el tipo correcto y ajustarlo a tu altura.',
          },
        ],
      },
      {
        category: 'Sillas de Ruedas',
        items: [
          {
            title: 'Sillas de Ruedas Manuales',
            description:
              'Estándar, ligeras, o deportivas. Te ayudamos a elegir el tipo correcto según tus necesidades, fuerza, y estilo de vida.',
          },
          {
            title: 'Sillas de Ruedas Eléctricas',
            description:
              'Para personas que no pueden o prefieren no propulsar manualmente. Proporcionan independencia de movilidad con menos esfuerzo físico.',
          },
        ],
      },
    ],
    howWeHelp: {
      title: '¿Cómo te ayudamos? El proceso completo',
      steps: [
        {
          step: 1,
          title: 'Consulta Inicial',
          duration: '30-45 minutos',
          description:
            'Evaluación de necesidades, evaluación física (si es necesario), discusión de opciones disponibles, y prueba de productos cuando es posible.',
        },
        {
          step: 2,
          title: 'Selección y Ajuste',
          duration: '30 minutos',
          description:
            'Selección del producto, ajuste personalizado (altura, ancho, etc.), instrucciones de uso, y entrenamiento si es necesario.',
        },
        {
          step: 3,
          title: 'Seguimiento',
          duration: 'Según necesidad',
          description:
            'Revisión de cómo funciona el producto, ajustes adicionales si es necesario, y soporte continuo.',
        },
      ],
    },
    equipment: [
      'Bastones (Estándar, 3 y 4 Puntas)',
      'Muletas (Axilares y de Antebrazo)',
      'Andaderas (Estándar, con Ruedas, con Asiento)',
      'Sillas de Ruedas (Manuales y Eléctricas)',
      'Calzado Terapéutico',
      'Soportes y Fajas',
      'Productos de Compresión',
    ],
    benefits: [
      {
        title: 'Mejora de la Movilidad',
        description:
          'Te permite moverte mejor, ser más independiente, y hacer las cosas que quieres hacer.',
      },
      {
        title: 'Soporte y Estabilidad',
        description:
          'Proporciona el soporte que necesitas para moverte con confianza, especialmente si tienes problemas de equilibrio o debilidad.',
      },
      {
        title: 'Prevención de Lesiones',
        description:
          'Puede ayudarte a prevenir lesiones, especialmente si has tenido lesiones previas o tienes riesgo de caídas.',
      },
      {
        title: 'Facilita Actividades Diarias',
        description:
          'Hace que las actividades diarias sean más fáciles y cómodas, mejorando tu calidad de vida.',
      },
      {
        title: 'Asesoría Experta',
        description:
          'No solo vendemos productos - te asesoramos para encontrar exactamente lo que necesitas, con ajuste personalizado.',
      },
      {
        title: 'Soporte Continuo',
        description:
          'Estamos aquí para ajustes, reparaciones, y soporte continuo. No te dejamos solo después de la compra.',
      },
    ],
    faq: [
      {
        q: '¿Hacen envíos?',
        a: 'Sí, contáctanos para conocer zonas y costos. Algunos productos se pueden enviar, otros requieren ajuste en persona. Te informamos sobre las opciones disponibles.',
      },
      {
        q: '¿Puedo probar antes de comprar?',
        a: 'Sí, cuando es posible, te permitimos probar productos antes de comprar. Esto es especialmente importante para cosas como sillas de ruedas o andaderas.',
      },
      {
        q: '¿Ofrecen reparación y mantenimiento?',
        a: 'Sí, ofrecemos servicio de reparación y mantenimiento para muchos productos, especialmente sillas de ruedas y equipos más complejos.',
      },
      {
        q: '¿Aceptan seguros médicos?',
        a: 'Depende del producto y tu seguro. Algunos productos ortopédicos están cubiertos por seguros médicos. Te ayudamos a verificar tu cobertura y coordinar si es necesario.',
      },
      {
        q: '¿Qué pasa si el producto no funciona para mí?',
        a: 'Si un producto no funciona para ti, trabajamos contigo para encontrar una solución. Puede ser un ajuste, un producto diferente, o una devolución según nuestras políticas. Tu satisfacción es nuestra prioridad.',
      },
      {
        q: '¿Tienen productos para alquiler?',
        a: 'Algunos productos están disponibles para alquiler, especialmente para uso temporal (después de cirugías o lesiones). Pregúntanos sobre las opciones de alquiler disponibles.',
      },
    ],
  },
};

export default function ServicioDetalle() {
  const router = useRouter();
  const { service } = router.query || {};
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const meta = SERVICE_CONTENT[service] || {
    title: 'Servicio',
    metaDescription: 'Información detallada del servicio.',
    heroDescription: 'Información detallada del servicio.',
    image: '/images/banners/Collage.png',
    highlights: [],
    equipment: [],
    faq: [],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `Ortopedia Cuernavaca - ${meta.title}`,
    description: meta.metaDescription || meta.heroDescription,
    image: meta.image,
    areaServed: 'Cuernavaca, Morelos',
    url: 'https://ortopediacuernavaca.mx',
    medicalSpecialty: 'Orthopedics',
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Animaciones reutilizables
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Head>
        <title>{meta.title} | Ortopedia Cuernavaca</title>
        <meta name="description" content={meta.metaDescription || meta.heroDescription} />
        <meta
          name="keywords"
          content={`${meta.title}, ortopedia, Cuernavaca, rehabilitación, salud`}
        />
        <meta property="og:title" content={`${meta.title} | Ortopedia Cuernavaca`} />
        <meta property="og:description" content={meta.metaDescription || meta.heroDescription} />
        <meta property="og:image" content={meta.image} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white font-sans antialiased selection:bg-blue-100 selection:text-gray-900">
        {/* Breadcrumbs - Optimizado */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-6 md:px-12 lg:px-16 pt-6 md:pt-8"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                href="/servicios"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                Servicios
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">{meta.title}</li>
          </ol>
        </motion.nav>

        {/* Hero Section - Layout Mejorado */}
        <motion.section
          className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Light Rays Effect */}
          <LightRays color="#3b82f6" intensity={0.2} numRays={12} className="z-0" />

          <div className="container mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
              {/* Texto a la izquierda */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="flex flex-col justify-center space-y-6"
              >
                {/* Badge "Servicios Especializados" */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 rounded-full w-fit mx-auto"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-sm font-semibold text-blue-900">
                    Servicios Especializados
                  </span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  {meta.title}
                </h1>
              </motion.div>

              {/* Imagen a la derecha */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="relative w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={meta.image}
                    alt={meta.title}
                    fill
                    className="object-cover object-center"
                    priority
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Highlights - Cards Limpias tipo Apple */}
        {meta.highlights?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 md:px-12 lg:px-16 pt-8 md:pt-12 relative z-20"
          >
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {meta.highlights.map((h, index) => (
                <motion.div
                  key={h.label}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200/50 hover:shadow-md hover:border-gray-300 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{h.value}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                    {h.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Main Content Section - Limpio tipo Apple */}
        <section className="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28 lg:py-32">
          <div className="max-w-5xl mx-auto">
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-20">
                {/* Descripción Principal - Simplificado */}
                {meta.whatItIs && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5 }}
                    className="space-y-10"
                  >
                    {/* Título Limpio */}
                    <div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                        {service === 'plantillas' &&
                          '¿Qué son las plantillas ortopédicas personalizadas y para qué sirven?'}
                        {service === 'amputados' &&
                          '¿Qué son las órtesis y para qué sirven realmente?'}
                        {service === 'ortesis' &&
                          '¿Qué son las prótesis y para qué sirven realmente?'}
                        {service === 'pediatrica' &&
                          '¿Qué es la rehabilitación pediátrica y para qué sirve?'}
                        {service === 'musculoesqueletica' &&
                          '¿Qué es la fisioterapia y para qué sirve realmente?'}
                        {service === 'dolor' &&
                          '¿Qué es la rehabilitación del dolor crónico y para qué sirve?'}
                        {service === 'productos' &&
                          '¿Qué son los productos ortopédicos y para qué sirven?'}
                        {![
                          'plantillas',
                          'amputados',
                          'ortesis',
                          'pediatrica',
                          'musculoesqueletica',
                          'dolor',
                          'productos',
                        ].includes(service) && '¿Qué es este servicio y para qué sirve?'}
                      </h2>
                    </div>

                    {/* Contenido Principal - Visualización Optimizada y Atractiva */}
                    <div className="space-y-8">
                      {meta.heroDescription && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="space-y-6"
                        >
                          {meta.heroDescription
                            .split('\n')
                            .slice(0, 2)
                            .map((paragraph, idx) => {
                              if (paragraph.trim()) {
                                const text = paragraph.trim();
                                // Dividir en oraciones
                                const sentences = text
                                  .split(/(?<=[.!?])\s+/)
                                  .filter((s) => s.trim());

                                return (
                                  <div key={idx} className="relative pl-8">
                                    {/* Línea decorativa vertical */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-400 rounded-full" />

                                    <div className="space-y-4">
                                      {sentences.map((sentence, sIdx) => {
                                        const trimmed = sentence.trim();
                                        if (!trimmed) return null;

                                        // Primera oración más grande y destacada
                                        if (sIdx === 0) {
                                          const words = trimmed.split(' ');
                                          const firstThree = words.slice(0, 3).join(' ');
                                          const rest = words.slice(3).join(' ');

                                          return (
                                            <p
                                              key={sIdx}
                                              className="text-xl md:text-2xl leading-relaxed"
                                            >
                                              <span className="font-bold text-gray-900">
                                                {firstThree}
                                              </span>
                                              {rest && (
                                                <span className="text-gray-800 font-normal">
                                                  {' '}
                                                  {rest}
                                                </span>
                                              )}
                                            </p>
                                          );
                                        }

                                        // Otras oraciones normales
                                        return (
                                          <p
                                            key={sIdx}
                                            className="text-lg md:text-xl text-gray-800 leading-relaxed font-normal"
                                          >
                                            {trimmed}
                                          </p>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            })}
                        </motion.div>
                      )}

                      {meta.whatItIs && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="space-y-6"
                        >
                          {meta.whatItIs
                            .split('\n')
                            .slice(0, 2)
                            .map((paragraph, idx) => {
                              if (paragraph.trim()) {
                                const text = paragraph.trim();
                                const sentences = text
                                  .split(/(?<=[.!?])\s+/)
                                  .filter((s) => s.trim());

                                return (
                                  <div key={idx} className="space-y-4">
                                    {sentences.map((sentence, sIdx) => {
                                      const trimmed = sentence.trim();
                                      if (!trimmed) return null;

                                      // Destacar palabras importantes con negrita
                                      const importantWords = [
                                        'personalizadas',
                                        'diseñadas',
                                        'herramienta',
                                        'terapéutica',
                                        'biomecánica',
                                        'cuerpo',
                                        'exclusivamente',
                                        'específicas',
                                      ];
                                      const words = trimmed.split(' ');

                                      return (
                                        <p
                                          key={sIdx}
                                          className="text-lg md:text-xl text-gray-800 leading-relaxed font-normal"
                                        >
                                          {words.map((word, wIdx) => {
                                            const cleanWord = word.replace(/[.,!?;:]/g, '');
                                            const isImportant = importantWords.some((keyword) =>
                                              cleanWord
                                                .toLowerCase()
                                                .includes(keyword.toLowerCase()),
                                            );

                                            if (isImportant) {
                                              return (
                                                <span key={wIdx}>
                                                  <span className="font-semibold text-blue-700">
                                                    {cleanWord}
                                                  </span>
                                                  {word.replace(cleanWord, '')}
                                                  {wIdx < words.length - 1 ? ' ' : ''}
                                                </span>
                                              );
                                            }

                                            return (
                                              <span key={wIdx}>
                                                {word}
                                                {wIdx < words.length - 1 ? ' ' : ''}
                                              </span>
                                            );
                                          })}
                                        </p>
                                      );
                                    })}
                                  </div>
                                );
                              }
                              return null;
                            })}
                        </motion.div>
                      )}

                      {/* Burbujas de Información - Reducidas a 3 principales */}
                      {meta.whatItDoes && meta.whatItDoes.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="mt-12 space-y-5"
                        >
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                            ¿Para qué sirven exactamente?
                          </h3>
                          <div className="space-y-4">
                            {meta.whatItDoes.slice(0, 3).map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="bg-white rounded-xl p-6 border border-gray-200/50 hover:border-gray-300 transition-all duration-300"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                                  <div className="flex-1">
                                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                                      {item.title}
                                    </h4>
                                    <p className="text-base text-gray-700 leading-relaxed font-normal">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Proceso de Atención - Simplificado */}
                {meta.howWeHelp && meta.howWeHelp.steps && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-10"
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                      {meta.howWeHelp.title || '¿Cómo te ayudamos exactamente?'}
                    </h2>

                    {/* Timeline Vertical Simplificado */}
                    <div className="relative">
                      {/* Línea vertical del timeline */}
                      <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

                      <div className="space-y-10">
                        {meta.howWeHelp.steps.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="relative flex items-start gap-6"
                          >
                            {/* Número del paso */}
                            <div className="relative z-10 flex-shrink-0">
                              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                                <span className="text-lg font-bold text-white">{step.step}</span>
                              </div>
                            </div>

                            {/* Contenido del paso */}
                            <div className="flex-1 pt-1">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-4">
                                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                                    {step.title}
                                  </h3>
                                  {step.duration && (
                                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full whitespace-nowrap">
                                      {step.duration}
                                    </span>
                                  )}
                                </div>
                                <p className="text-base text-gray-700 leading-relaxed font-normal">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Casos de Uso - Simplificado (solo primera categoría) */}
                {meta.useCases && meta.useCases.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-10"
                  >
                    <div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
                        Casos de Uso Específicos
                      </h2>
                    </div>

                    <div className="space-y-8">
                      {meta.useCases.slice(0, 1).map((category, catIndex) => (
                        <div key={catIndex} className="space-y-6">
                          <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                            {category.category}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {category.items.slice(0, 4).map((item, itemIndex) => (
                              <motion.div
                                key={itemIndex}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: itemIndex * 0.05 }}
                                className="bg-white rounded-xl p-5 border border-gray-200/50 hover:border-gray-300 transition-all duration-300"
                              >
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                                  {item.description}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Equipamiento y Tecnología - Simplificado */}
                {meta.equipment && meta.equipment.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                      Equipamiento y Tecnología
                    </h2>

                    <motion.div
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    >
                      {meta.equipment.slice(0, 6).map((equipment, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          className="bg-white rounded-lg p-4 border border-gray-200/50 text-center"
                        >
                          <h4 className="text-sm font-medium text-gray-900">{equipment}</h4>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* Beneficios - Simplificado (solo 3 principales) */}
                {meta.benefits && meta.benefits.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                      Beneficios Reales
                    </h2>

                    <motion.div
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      className="grid md:grid-cols-3 gap-5"
                    >
                      {meta.benefits.slice(0, 3).map((benefit, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          className="bg-white rounded-xl p-5 border border-gray-200/50"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-900" />
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                {benefit.title}
                              </h4>
                              <p className="text-sm text-gray-700 leading-relaxed font-normal">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* FAQ - Simplificado (solo 5 principales) */}
                {meta.faq && meta.faq.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                      Preguntas Frecuentes
                    </h2>

                    <div className="space-y-2">
                      {meta.faq.slice(0, 5).map((faq, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                          className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 transition-colors duration-300"
                        >
                          <button
                            onClick={() => toggleFaq(index)}
                            className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                          >
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                              {faq.q}
                            </h3>
                            <motion.div
                              animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex-shrink-0"
                            >
                              <FaChevronDown className="text-gray-400" />
                            </motion.div>
                          </button>
                          <motion.div
                            initial={false}
                            animate={{
                              height: openFaqIndex === index ? 'auto' : 0,
                              opacity: openFaqIndex === index ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                              <p className="text-sm text-gray-700 leading-relaxed font-normal pt-4">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar - Limpio tipo Apple */}
              <aside className="lg:sticky lg:top-8 h-fit space-y-6">
                {/* CTA Card - Limpio */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900 rounded-3xl p-8 text-white"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Agenda tu cita</h3>
                    <p className="text-gray-300 text-base leading-relaxed font-light">
                      ¿Listo para comenzar? Contáctanos por WhatsApp y recibe asesoría
                      personalizada.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      openWhatsApp(undefined, `Hola, quiero más información sobre: ${meta.title}.`)
                    }
                    className="w-full bg-white text-gray-900 font-semibold py-4 px-6 rounded-2xl hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-3 text-base"
                  >
                    <FaWhatsapp className="text-xl" />
                    <span>Consultar por WhatsApp</span>
                  </motion.button>
                </motion.div>

                {/* Info Card - Limpio */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gray-50 rounded-3xl p-8 border border-gray-200/50"
                >
                  <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Incluye</h4>
                  <ul className="space-y-4">
                    {[
                      'Evaluación integral',
                      'Plan de tratamiento personalizado',
                      'Sesiones guiadas por especialistas',
                      'Seguimiento y ajustes',
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                        <span className="text-base font-light">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA Final - Limpio tipo Apple */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 py-20 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                  ¿Listo para dar el siguiente paso?
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light max-w-2xl mx-auto">
                  Agenda tu valoración y comienza tu proceso de recuperación. Estamos aquí para
                  ayudarte.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    openWhatsApp(
                      undefined,
                      `Hola, me interesa agendar una valoración para: ${meta.title}.`,
                    )
                  }
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl hover:bg-gray-100 transition-colors duration-300 text-lg"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>Agendar por WhatsApp</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Scroll to Top Button - Limpio tipo Apple */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              aria-label="Volver arriba"
            >
              <FaArrowUp className="text-lg" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

// Usar getLayout para aplicar MarketingLayout (evita doble layout)
ServicioDetalle.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

# 🏥 Ortopedia Cuernavaca - Sitio Web

Sitio web profesional para Ortopedia Cuernavaca, construido con Next.js 16, React 19 y Tailwind CSS.

## 🚀 Características

- 🛍️ **E-commerce completo** - Tienda de productos ortopédicos
- 📋 **Sistema de servicios** - Información sobre consultas y tratamientos
- 📚 **Blog educativo** - Contenido sobre salud y ortopedia
- 📞 **Sistema de citas** - Agendar consultas en línea
- 👥 **Gestión de cuenta** - Login y perfil de usuario
- 📱 **Totalmente responsive** - Optimizado para móviles, tablets y desktop
- ⚡ **Alto rendimiento** - Optimizado para Core Web Vitals
- 🔒 **Seguro** - Headers de seguridad y buenas prácticas

## 🛠️ Tecnologías

- **Framework:** Next.js 16.0.7
- **React:** 19.2.1
- **Styling:** Tailwind CSS 3.3.2
- **Animaciones:** Framer Motion 12.23.12
- **Testing:** Jest, Playwright
- **Linting:** ESLint + Prettier

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Git

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/EmiNajera/ortopedia-cuernavaca.git
cd ortopedia-cuernavaca

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# Ejecutar en desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con Turbopack

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia servidor de producción

# Testing
npm test             # Ejecuta tests unitarios
npm run test:e2e     # Ejecuta tests end-to-end con Playwright

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier

# Performance
npm run perf         # Ejecuta Lighthouse en desarrollo
npm run perf:prod    # Ejecuta Lighthouse en producción
npm run analyze      # Analiza el tamaño de bundles
```

## 📁 Estructura del Proyecto

```
├── src/
│   ├── pages/          # Páginas de Next.js (routing)
│   ├── domains/         # Componentes organizados por dominio
│   ├── layouts/         # Layouts compartidos
│   ├── shared/          # Componentes y utilidades compartidas
│   ├── store/           # Estado global (Zustand)
│   └── styles/          # Estilos globales
├── public/              # Archivos estáticos
├── docs/                # Documentación del proyecto
│   ├── architecture/    # Documentación de arquitectura
│   ├── deployment/     # Guías de despliegue
│   ├── optimization/    # Optimizaciones implementadas
│   └── analysis/        # Análisis y auditorías
├── scripts/             # Scripts de utilidad
└── __tests__/           # Tests unitarios
```

## 🔐 Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# URL del sitio
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Para producción, ver `docs/deployment/ENV_PRODUCTION_SETUP.md`

## 📚 Documentación

La documentación completa está en la carpeta `docs/`:

- **Arquitectura:** `docs/architecture/`
- **Despliegue:** `docs/deployment/`
- **Optimizaciones:** `docs/optimization/`
- **Análisis:** `docs/analysis/`

### Guías Rápidas

- 🚀 [Guía de Despliegue en VPS](docs/deployment/GUIA_DESPLIEGUE_VPS.md)
- 📊 [Resumen de Optimizaciones](docs/optimization/RESUMEN_OPTIMIZACIONES_IMPLEMENTADAS.md)
- 🏗️ [Arquitectura del Proyecto](docs/architecture/ARQUITECTURA_COMPLETA_PROYECTO.md)

## 🚀 Despliegue

### VPS (Recomendado)

Ver la guía completa: [docs/deployment/GUIA_DESPLIEGUE_VPS.md](docs/deployment/GUIA_DESPLIEGUE_VPS.md)

**Resumen rápido:**
1. Instalar Node.js, PM2, Nginx
2. Subir proyecto al VPS
3. Configurar `.env.production`
4. Ejecutar `npm run build`
5. Iniciar con PM2: `pm2 start ecosystem.config.js`
6. Configurar Nginx como reverse proxy
7. Configurar SSL con Let's Encrypt

### Otras Plataformas

- **Vercel:** Conectar repositorio y desplegar automáticamente
- **Netlify:** Similar a Vercel
- **AWS Amplify:** Configurar build settings

## 🧪 Testing

```bash
# Tests unitarios
npm test

# Tests end-to-end
npm run test:e2e

# Tests responsive
npm run test:responsive
```

## 📊 Performance

El proyecto está optimizado para:

- ✅ LCP < 2.5s
- ✅ FCP < 1.0s
- ✅ CLS < 0.1
- ✅ Performance Score > 85

Ver métricas con:
```bash
npm run perf:prod
```

## 🔒 Seguridad

- Headers de seguridad configurados
- CSP (Content Security Policy)
- Variables de entorno seguras
- Sin secretos en el código

## 📝 Licencia

Este proyecto es privado y propietario de Ortopedia Cuernavaca.

## 👥 Contribución

Este es un proyecto privado. Para contribuciones, contactar al equipo de desarrollo.

## 📞 Soporte

Para problemas o preguntas, revisar la documentación en `docs/` o contactar al equipo de desarrollo.

---

**Última actualización:** 2025-01-27

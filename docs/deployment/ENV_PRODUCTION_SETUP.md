# 🔐 Configuración de Variables de Entorno para Producción

## Archivo `.env.production`

Crea un archivo `.env.production` en la raíz del proyecto con las siguientes variables:

```env
# URL del sitio en producción (sin trailing slash)
NEXT_PUBLIC_SITE_URL=https://ortopedia-cuernavaca.com

# Entorno de ejecución
NODE_ENV=production
```

## Variables Requeridas

### `NEXT_PUBLIC_SITE_URL` (REQUERIDA)
- **Descripción:** URL completa del sitio en producción
- **Formato:** `https://dominio.com` (sin trailing slash)
- **Uso:** Se usa en sitemap.xml, robots.txt, meta tags Open Graph, y structured data
- **Ejemplo:** `https://ortopedia-cuernavaca.com`

### `NODE_ENV` (REQUERIDA)
- **Descripción:** Entorno de ejecución
- **Valor:** `production`
- **Uso:** Next.js usa esto para optimizaciones y configuración

## Variables Opcionales (Futuras)

### WhatsApp Business API
```env
WHATSAPP_API_KEY=your_api_key_here
WHATSAPP_PHONE_NUMBER=+5217771234567
```

### Google Analytics
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Sentry (Error Tracking)
```env
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=xxx
```

## Configuración en Plataformas de Hosting

### Vercel
1. Ve a Settings > Environment Variables
2. Agrega cada variable con su valor
3. Selecciona "Production" como ambiente
4. Guarda los cambios

### Netlify
1. Ve a Site settings > Build & deploy > Environment
2. Agrega cada variable con su valor
3. Selecciona "Production" como ambiente
4. Guarda los cambios

### AWS Amplify
1. Ve a App settings > Environment variables
2. Agrega cada variable con su valor
3. Selecciona "Production" como ambiente
4. Guarda los cambios

## ⚠️ IMPORTANTE

1. **NUNCA** commitees el archivo `.env.production` al repositorio
2. Las variables que empiezan con `NEXT_PUBLIC_` son **expuestas al cliente**
3. **NO** pongas secretos en variables `NEXT_PUBLIC_*`
4. Mantén este archivo en `.gitignore`

## Verificación

Después de configurar las variables, verifica que funcionan:

1. Ejecuta el build: `npm run build`
2. Verifica que el sitemap usa la URL correcta: `http://localhost:3000/api/sitemap.xml`
3. Verifica que robots.txt usa la URL correcta: `http://localhost:3000/api/robots.txt`


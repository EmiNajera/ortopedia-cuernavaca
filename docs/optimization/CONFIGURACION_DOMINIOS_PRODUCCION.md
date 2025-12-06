# 🌐 Configuración de Dominios para Producción

## Dominios Disponibles

El sitio puede desplegarse en cualquiera de estos dominios:

### Ortopedia Cuernavaca
- **Principal:** `https://ortopediacuernavaca.com`
- **Alternativo:** `https://ortopediacuernavaca.com.mx`

### Ortochavitos
- **Principal:** `https://ortochavitos.com`
- **Alternativo:** `https://ortochavitos.com.mx`

---

## 📋 Configuración de Variables de Entorno

### Opción 1: Vercel

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega la variable para **Production**:
   ```
   NEXT_PUBLIC_SITE_URL=https://ortopediacuernavaca.com
   ```
4. Si necesitas configurar múltiples dominios, puedes usar:
   - **Production:** `https://ortopediacuernavaca.com`
   - **Preview:** `https://ortopediacuernavaca.com.mx`

### Opción 2: Netlify

1. Ve a Site settings > Build & deploy > Environment
2. Agrega variable para **Production**:
   ```
   NEXT_PUBLIC_SITE_URL=https://ortopediacuernavaca.com
   ```
3. Click en "Save"

### Opción 3: Otro Hosting

1. Crea un archivo `.env.production` en la raíz del proyecto:
   ```env
   NEXT_PUBLIC_SITE_URL=https://ortopediacuernavaca.com
   NODE_ENV=production
   ```
2. **IMPORTANTE:** Asegúrate de que `.env.production` esté en `.gitignore`
3. Configura la variable en tu plataforma de hosting

---

## 🔧 Configuración por Dominio

### Para ortopediacuernavaca.com
```env
NEXT_PUBLIC_SITE_URL=https://ortopediacuernavaca.com
```

### Para ortopediacuernavaca.com.mx
```env
NEXT_PUBLIC_SITE_URL=https://ortopediacuernavaca.com.mx
```

### Para ortochavitos.com
```env
NEXT_PUBLIC_SITE_URL=https://ortochavitos.com
```

### Para ortochavitos.com.mx
```env
NEXT_PUBLIC_SITE_URL=https://ortochavitos.com.mx
```

---

## ✅ Verificación Post-Despliegue

Después de desplegar, verifica que todo esté correcto:

### 1. Verificar Sitemap
Visita: `https://tu-dominio.com/sitemap.xml`
- Debe mostrar URLs con el dominio correcto
- No debe mostrar `localhost` o URLs incorrectas

### 2. Verificar Robots.txt
Visita: `https://tu-dominio.com/robots.txt`
- Debe referenciar el sitemap con el dominio correcto

### 3. Verificar Meta Tags
Inspecciona el código fuente de cualquier página:
- `<link rel="canonical">` debe usar el dominio correcto
- `<meta property="og:url">` debe usar el dominio correcto
- JSON-LD structured data debe tener URLs correctas

### 4. Verificar RSS Feed
Visita: `https://tu-dominio.com/api/blog/feed.xml`
- Los enlaces deben usar el dominio correcto

---

## 🔄 Cambiar Dominio Después del Despliegue

Si necesitas cambiar el dominio después de desplegar:

1. **Actualiza la variable de entorno** en tu plataforma de hosting
2. **Redeploy** el sitio (o espera al siguiente build automático)
3. **Verifica** que todas las URLs se actualizaron correctamente

---

## 📝 Notas Importantes

- ✅ **Todas las URLs** ahora usan la variable `NEXT_PUBLIC_SITE_URL`
- ✅ **Fallback automático:** Si no está configurada, usa `https://ortopediacuernavaca.com`
- ✅ **Desarrollo:** En desarrollo local, usa `http://localhost:3000`
- ✅ **Build funciona:** El build funciona sin la variable, pero usará el fallback

---

## 🚀 Despliegue Rápido

### Para Vercel:
```bash
# 1. Conecta tu repositorio a Vercel
# 2. En Vercel Dashboard > Settings > Environment Variables
# 3. Agrega: NEXT_PUBLIC_SITE_URL = https://ortopediacuernavaca.com
# 4. Deploy automático o manual
```

### Para Netlify:
```bash
# 1. Conecta tu repositorio a Netlify
# 2. Site settings > Environment > Add variable
# 3. Agrega: NEXT_PUBLIC_SITE_URL = https://ortopediacuernavaca.com
# 4. Deploy automático o manual
```

---

## 🐛 Solución de Problemas

### Problema: URLs muestran localhost en producción
**Solución:** Verifica que `NEXT_PUBLIC_SITE_URL` esté configurada en el entorno de producción

### Problema: Sitemap tiene URLs incorrectas
**Solución:** 
1. Verifica la variable de entorno
2. Limpia el cache y redeploy
3. Verifica que el build use la variable correcta

### Problema: Meta tags tienen URLs incorrectas
**Solución:** Todas las páginas ahora usan `getSiteUrl()` que lee `NEXT_PUBLIC_SITE_URL`. Verifica que esté configurada.

---

**Última actualización:** 2025-01-27


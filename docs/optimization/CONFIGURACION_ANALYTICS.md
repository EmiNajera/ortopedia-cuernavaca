# 📊 Configuración de Analytics y Web Vitals

## Google Analytics 4

### Configuración

1. **Crear propiedad en Google Analytics 4**
   - Ve a [Google Analytics](https://analytics.google.com/)
   - Crea una nueva propiedad GA4
   - Obtén tu Measurement ID (formato: `G-XXXXXXXXXX`)

2. **Configurar variable de entorno**
   
   En tu plataforma de hosting, agrega:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-P014771Y1K
   ```
   
   **Tu Measurement ID:** `G-P014771Y1K`

   **Vercel:**
   - Settings > Environment Variables
   - Agrega `NEXT_PUBLIC_GA_MEASUREMENT_ID` para Production

   **Netlify:**
   - Site settings > Environment variables
   - Agrega `NEXT_PUBLIC_GA_MEASUREMENT_ID` para Production

3. **Verificar funcionamiento**
   - Despliega el sitio
   - Visita algunas páginas
   - En Google Analytics > Realtime, deberías ver las visitas

### Funcionalidades Implementadas

✅ **Page View Tracking**
- Automático en cada cambio de ruta
- Usa Next.js router events

✅ **Web Vitals Tracking**
- LCP (Largest Contentful Paint)
- FID (First Input Delay) / INP (Interaction to Next Paint)
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)

✅ **Event Tracking**
- Función `trackEvent()` disponible para eventos personalizados

### Uso de Event Tracking

```jsx
import { trackEvent } from '@shared/components/Analytics';

// Ejemplo: Track click en botón
<button onClick={() => {
  trackEvent('click', 'button', 'WhatsApp Contact', 1);
  // ... tu código
}}>
  Contactar
</button>

// Ejemplo: Track formulario
trackEvent('submit', 'form', 'Contact Form', 1);
```

### Eventos Predefinidos Recomendados

- **WhatsApp clicks:** `trackEvent('click', 'whatsapp', 'Contact Button', 1)`
- **Form submissions:** `trackEvent('submit', 'form', 'Contact Form', 1)`
- **Phone clicks:** `trackEvent('click', 'phone', 'Phone Number', 1)`
- **Service clicks:** `trackEvent('click', 'service', serviceName, 1)`
- **Blog article views:** `trackEvent('view', 'article', articleTitle, 1)`

---

## Web Vitals

### Métricas Trackeadas

Las siguientes métricas se envían automáticamente a Google Analytics:

1. **LCP (Largest Contentful Paint)**
   - Meta: < 2.5s
   - Mide tiempo de carga del elemento más grande

2. **FID / INP (First Input Delay / Interaction to Next Paint)**
   - Meta: < 100ms
   - Mide responsividad de la interfaz

3. **CLS (Cumulative Layout Shift)**
   - Meta: < 0.1
   - Mide estabilidad visual

4. **FCP (First Contentful Paint)**
   - Meta: < 1.8s
   - Mide tiempo hasta primer contenido visible

5. **TTFB (Time to First Byte)**
   - Meta: < 800ms
   - Mide tiempo de respuesta del servidor

### Ver Métricas en Google Analytics

1. Ve a Google Analytics > Reports
2. Crea un reporte personalizado o usa Explorations
3. Agrega eventos con categoría "Web Vitals"
4. Filtra por `event_category = "Web Vitals"`

---

## Desarrollo vs Producción

### Desarrollo
- Analytics solo se carga si `NEXT_PUBLIC_GA_MEASUREMENT_ID` está configurado
- Web Vitals se muestran en consola para debugging
- No se envían datos reales a GA (a menos que configures un ID de desarrollo)

### Producción
- Analytics se carga automáticamente
- Web Vitals se envían a Google Analytics
- Todos los eventos se trackean

---

## Privacidad y GDPR

### Consideraciones

- ✅ Google Analytics respeta las preferencias del usuario
- ⚠️ Considera implementar consentimiento de cookies (GDPR)
- ⚠️ Revisa políticas de privacidad según tu jurisdicción

### Implementar Consentimiento (Opcional)

Si necesitas consentimiento de cookies:

```jsx
// Ejemplo básico
const [consent, setConsent] = useState(false);

useEffect(() => {
  if (consent) {
    initGA(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  }
}, [consent]);
```

---

## Troubleshooting

### Analytics no funciona

1. **Verifica variable de entorno:**
   ```bash
   echo $NEXT_PUBLIC_GA_MEASUREMENT_ID
   ```

2. **Verifica en consola del navegador:**
   - Debe aparecer `gtag` en `window`
   - No debe haber errores de CORS

3. **Verifica CSP:**
   - El middleware debe permitir `www.googletagmanager.com`
   - Ya está configurado en `middleware.js`

### Web Vitals no se envían

1. Verifica que `web-vitals` esté instalado:
   ```bash
   npm list web-vitals
   ```

2. Verifica en consola (desarrollo):
   - Deben aparecer logs de Web Vitals

3. Verifica en Google Analytics:
   - Los eventos pueden tardar 24-48 horas en aparecer

---

## Próximos Pasos

- [ ] Configurar `NEXT_PUBLIC_GA_MEASUREMENT_ID` en producción
- [ ] Verificar que Analytics funcione después del despliegue
- [ ] Configurar reportes personalizados en Google Analytics
- [ ] Implementar eventos personalizados según necesidades
- [ ] (Opcional) Implementar consentimiento de cookies

---

**Última actualización:** 2025-01-27


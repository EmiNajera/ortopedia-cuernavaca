# 🎯 Plan Técnico de Diseño Responsive v2.0 (Optimizado para iPhone 16 Pro)

## 📱 Objetivo: Experiencia Nativa en iOS
Este plan está refinado para asegurar que la web se sienta como una app nativa en dispositivos de gama alta como el **iPhone 16 Pro**, aprovechando su pantalla Super Retina XDR, Dynamic Island y tasa de refresco de 120Hz.

---

## 📊 Estado del Proyecto

### ✅ FASE 1: Sistema Base (COMPLETADO)
- [x] **Tailwind Extendido:** Breakpoints `xs` (480px), `3xl`, `4xl` configurados.
- [x] **Tipografía Escalable:** Componente `ResponsiveTypography` implementado.
- [x] **Grid System Unificado:** Componente `ResponsiveGrid` implementado y en uso.
- [x] **Variables CSS:** Sistema de variables responsive (`responsive-variables.css`) creado.

### ✅ FASE 3.1: TiendaCompleta.jsx (COMPLETADO)
- [x] **Grids Optimizados:**
  - Productos: 1 col (xs) → 2 col (sm/iPhone Pro) → 3-6 col (desktop).
  - Categorías: Ajustado para evitar items muy pequeños.
  - Carga visual optimizada con Skeleton loaders.

---

## 🚀 FASES PENDIENTES (Plan de Ejecución)

### 🛠️ FASE 2: Componentes Core & "Safe Areas" (PRIORIDAD ALTA)
*Para que se vea perfecto en iPhone 16 Pro con Dynamic Island.*

1. **Meta Tag Viewport (CRÍTICO)**
   - Acción: Actualizar `_app.jsx` o `_document.jsx`.
   - Código: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1" />`
   - *Por qué:* Elimina las bandas blancas superior/inferior en iOS.

2. **Soporte para Safe Areas (Dynamic Island)**
   - Acción: Agregar variables de entorno CSS en `index.css`.
   - Código:
     ```css
     :root {
       --sat: env(safe-area-inset-top);
       --sab: env(safe-area-inset-bottom);
       --sal: env(safe-area-inset-left);
       --sar: env(safe-area-inset-right);
     }
     ```
   - *Uso:* Padding en Navbar y Footer para que no se encimen con la barra de inicio o la isla.

3. **Optimización de Header (MarketingHeader)**
   - Implementar clases como `pt-[env(safe-area-inset-top)]` o `pt-[var(--sat)]`.
   - Asegurar que el menú hamburguesa sea fácil de alcanzar (Thumb Zone).

4. **Optimización de Footer (ResponsiveFooter)**
   - Agregar `pb-[env(safe-area-inset-bottom)]` para que el contenido no toque la barra de inicio de iOS.

### 📱 FASE 3: Experiencia de Usuario Móvil (UX)

#### 3.2 Blog & Artículos
- **Lectura cómoda:** Ancho máximo de texto de 65-75 caracteres.
- **Imágenes:** Usar `sizes="(max-width: 768px) 100vw, ..."` para servir imágenes 2x en pantallas Retina.

#### 3.3 Página de Producto (ProductDetail)
- **Galería Swipeable:** En móvil, las imágenes deben poder deslizarse con el dedo (snap scroll).
- **Sticky CTA:** El botón "Comprar/Consultar" debe estar siempre visible o fijo abajo (`sticky bottom-0`).

#### 3.4 Formularios (Contacto/Checkout)
- **Inputs:** Tamaño de fuente mínimo 16px para evitar que iOS haga zoom automático al enfocar.
- **Teclados:** Usar `inputmode="numeric"` o `type="tel"` donde corresponda.

### 💎 FASE 4: "Polish" High-End (El toque iPhone Pro)

1. **Animaciones 120Hz (ProMotion)**
   - Usar solo `transform` y `opacity` en animaciones. Evitar animar `width`, `height` o `top`.
   - Clases como `will-change-transform` en elementos pesados.

2. **Efectos Glassmorphism (Apple Style)**
   - Usar `backdrop-blur-md` o `backdrop-blur-xl` en menús y modales para un look nativo iOS.
   - Bordes sutiles: `border border-white/10`.

---

## 🧱 Guía Técnica para iPhone 16 Pro

### Breakpoints Clave
El iPhone 16 Pro tiene un ancho lógico de **~393px**.
- **`xs` (< 480px):** Aquí cae el iPhone.
- **Estrategia Grid:**
  - **Productos:** Usar `grid-cols-2 gap-3` en lugar de `grid-cols-1`. En pantallas de 393px, una sola tarjeta es demasiado grande. Dos tarjetas se ven como una tienda profesional (ej. ASOS, Zara).
  - **Texto:** Títulos `text-xl` o `text-2xl` máximo. `text-4xl` rompe el diseño en vertical.

### Checklist de Verificación iOS
- [ ] ¿El contenido fluye detrás de la Dynamic Island (con blur) o se corta?
- [ ] ¿El botón de "Atrás" o menú choca con la isla?
- [ ] ¿El scroll es suave (`-webkit-overflow-scrolling: touch`)?
- [ ] ¿Los botones tienen al menos 44x44px de área táctil?

---

## 📅 Siguientes Pasos Inmediatos

1. **Corregir el Viewport** en `src/pages/_app.jsx` o `_document.jsx`.
2. **Agregar utilidades de Safe Area** en CSS global.
3. **Refactorizar MarketingHeader** para respetar la Dynamic Island.

# Mapeo de rutas e imports — Ortopedia Cuernavaca

Última revisión: 2025-10-21

Este documento describe el mapeo actual de `src/pages/` (con foco en `src/pages/categoria/`), las dependencias que cada página importa, el estado (OK / error) y recomendaciones para corregir problemas detectados.

## Resumen ejecutivo

- Fuente única de páginas: `src/pages/` (se eliminó el antiguo `pages/` raíz).
- Archivo de configuración central: `src/data/categories.full-config.js` (usado por la ruta dinámica `src/pages/categoria/[slug].jsx`).
- Páginas estáticas por categoría (migradas del legacy): `src/pages/categoria/fajas.jsx`, `plantillas.jsx`, `ortesis.jsx`, `calzado.jsx`, `rehabilitacion.jsx`, `pediatria.jsx`.
- Problemas detectados ahora mismo:
  - Errores de compilación (parsing) en `ortesis.jsx` y `calzado.jsx` -> requieren corrección de JSX (falta cierre o contenedor raíz).
  - Rutas relativas incorrectas en varios archivos de `src/pages/categoria/` que usan `../../../components/...` o `../../../utils/...` (probable `Module not found` en runtime).
  - Uso de `<img>` (no fatal) en varios `ProductCard` — Next.js recomienda `next/image` para mejor LCP.

---

## Detalle por archivo (src/pages/categoria)

> Nota: las rutas de imports se muestran tal como están escritas actualmente en cada archivo.

### `src/pages/categoria/fajas.jsx`

- Imports:
  - `CategoryLanding` from `@components/features/store/CategoryLanding`
  - `StoreLayout` from `@components/layout/StoreLayout`
- Estado: OK
- Observaciones: usa el alias `@components` (declarado en `jsconfig.json`), y exporta una página estática con datos embebidos. No se detectaron errores de parsing.

### `src/pages/categoria/plantillas.jsx`

- Imports:
  - `Link` from `next/link`
  - `MarketingLayout` from `../../../components/layout/MarketingLayout` (probable ruta incorrecta)
  - `{ motion }` from `framer-motion`
  - `{ openWhatsApp }` from `../../../utils/whatsapp` (probable ruta incorrecta)
- Estado: Sintaxis OK, pero riesgo de imports rotos.
- Recomendación: usar alias `@components/layout/MarketingLayout` y `@utils/whatsapp` o ajustar a `../../components/...` dependiendo de convención.

### `src/pages/categoria/ortesis.jsx`

- Imports:
  - `Link` from `next/link`
  - `{ motion }` from `framer-motion`
  - `{ openWhatsApp }` from `../../../utils/whatsapp` (probable ruta incorrecta)
- Estado: ERROR de compilación — "Adjacent JSX elements must be wrapped" y errores de paréntesis alrededor de las líneas finales del archivo.
- Acción requerida: revisar y cerrar el JSX retornado (asegurar un único nodo raíz o fragmento `<>...</>` y que todos `)`/`}` estén balanceados).

### `src/pages/categoria/calzado.jsx`

- Imports:
  - `Link` from `next/link`
  - `{ motion }` from `framer-motion`
  - `{ openWhatsApp }` from `../../../utils/whatsapp` (probable ruta incorrecta)
- Estado: ERROR de compilación (parsing) — similar a `ortesis.jsx`.
- Acción requerida: corregir cierre de JSX y/o paréntesis que falten.

### `src/pages/categoria/pediatria.jsx`

- Imports:
  - `Link` from `next/link`
  - `MarketingLayout` from `../../../components/layout/MarketingLayout` (probable ruta incorrecta)
  - `{ motion }` from `framer-motion`
  - `{ openWhatsApp }` from `../../../utils/whatsapp` (probable rota incorrecta)
- Estado: Sintaxis OK; aviso sobre uso de `<img>` en `ProductCard`.
- Recomendación: ajustar imports (usar alias) y opcionalmente reemplazar `<img>` por `Image`.

### `src/pages/categoria/rehabilitacion.jsx`

- Imports:
  - `Link` from `next/link`
  - `MarketingLayout` from `../../../components/layout/MarketingLayout` (probable ruta incorrecta)
  - `{ motion }` from `framer-motion`
  - `{ openWhatsApp }` from `../../../utils/whatsapp` (probable ruta incorrecta)
- Estado: Sintaxis OK; revisar imports relativos.

### `src/pages/categoria/Categorias.jsx`

- Imports:
  - `MarketingLayout` from `../../components/layout/MarketingLayout` (ruta consistente)
  - `CategoryTemplate` from `../../components/ui/CategoryTemplate` (ruta consistente)
  - `{ categoriesFullConfig }` from `../../data/categories.full-config` (correcto)
- Estado: OK

### `src/pages/categoria/CategoriaPage.jsx` (página que recibe `categorySlug` manualmente)

- Imports:
  - `MarketingLayout` from `../../components/layout/MarketingLayout`
  - `Image` from `next/image` (usado en algunos ProductCard)
  - `openWhatsApp` from `../../utils/whatsapp`
- Estado: OK

### `src/pages/categoria/[slug].jsx` (ruta dinámica)

- Imports:
  - `getCategoryBySlug`, `getAllCategorySlugs`, `getRelatedCategories` from `../../data/categories.full-config`
  - `CategoryLanding` from `../../components/features/store/CategoryLanding`
  - `StoreLayout` from `../../components/layout/StoreLayout`
- Estado: OK (usa el config central)

---

## Otras páginas importantes en `src/pages/`

- `src/pages/_app.jsx`
  - Importa `../index.css` (global Tailwind) y `@components/layout/MarketingLayout`.
  - Estado: OK

- `src/pages/categorias.jsx`
  - Importa `./categoria/Categorias` (correcto); usa `categories.full-config`.
  - Estado: OK

- Rutas de tienda y producto:
  - `src/pages/store/TiendaCompleta.jsx`, `src/pages/store/Tienda.jsx`, `src/pages/store/Producto.jsx` — dependen de `@components/features/store/*` y `@data/*`.
  - Estado: no inspeccionadas a detalle en esta pasada; su estructura no cambió en la migración.

---

## Problemas detectados y soluciones sugeridas (priorizadas)

1. Errores de parsing (alto impacto) — archivos: `ortesis.jsx`, `calzado.jsx`.
   - Solución: abrir cada archivo y:
     - 1. Asegurar que la función componente retorna un único nodo raíz (envolver en `<MarketingLayout>` / `<div>` o `<>...</>`).
     - 2. Asegurar que todos los paréntesis `(` `)`, llaves `{}` y corchetes `[]` están balanceados.
   - Tiempo estimado: 10-25 min por archivo (dependiendo de tamaño del copy/paste y cuánto HTML haya).

2. Imports relativos incorrectos (medio-alto impacto) — rutas con `../../../components` y `../../../utils` desde `src/pages/categoria/`.
   - Por qué: copiar/pegar o mover archivos cambió la profundidad de carpeta; `../../../` posiblemente salga fuera de `src/`.
   - Solución rápida y segura: reemplazar rutas relativas por los alias declarados en `jsconfig.json`:
     - `@components/...` para componentes
     - `@utils/...` para utilidades
     - `@data/...` para datos
   - Alternativa: corregir a `../../components/...` y `../../utils/...` si prefieres no usar aliases.
   - Tiempo estimado: 2-8 min por archivo (automatable con búsqueda/replace).

3. Uso de `<img>` en ProductCard (bajo impacto, recomendado)
   - Mejora: usar `next/image` para optimización de imágenes.
   - Consideración: `Image` necesita `width`/`height` o `layout='fill'` y un contenedor con posición relativa.
   - Puedo aplicar el cambio con estilos equivalentes si quieres.

---

## Acciones recomendadas y plan de trabajo (mi propuesta)

1. Corregir ya los errores de parsing en `ortesis.jsx` y `calzado.jsx` (evita que Next compile).
2. Sustituir imports relativos rotos por aliases (`@components`, `@utils`) en `src/pages/categoria/*` (automatizado).
3. Re-ejecutar la verificación (check de errores). Si verde, arrancar `npm run dev` para smoke-test.
4. Opcional: reemplazar `<img>` por `next/image` en ProductCard(s).

Si me autorizas, aplico los pasos 1 y 2 ahora (editaré los archivos afectados y volveré a correr la verificación). De lo contrario, puedo crear una rama con los cambios y dejarlos listos para tu revisión.

---

## Archivos a editar propuestos (resumen)

- Editar (correcciones JS/JSX):
  - `src/pages/categoria/ortesis.jsx`
  - `src/pages/categoria/calzado.jsx`

- Editar (imports -> aliases):
  - `src/pages/categoria/plantillas.jsx`
  - `src/pages/categoria/ortesis.jsx`
  - `src/pages/categoria/calzado.jsx`
  - `src/pages/categoria/pediatria.jsx`
  - `src/pages/categoria/rehabilitacion.jsx`

- Opcional (Image optimization):
  - `src/components/features/store/CategoryLanding.jsx` (o los ProductCards embebidos dentro de cada página) — reemplazar `<img>` por `next/image`.

---

## Estado actual de la lista de tareas

(Se creó un TODO para gestionar esto — el documento `MAPEO-CATEGORIAS.md` está siendo generado.)

- [x] Generar mapeo y documento (este archivo)
- [ ] Verificar imports en `src/pages`
- [ ] Corregir imports rotos
- [ ] Arreglar errores de JSX
- [ ] Probar dev server

---

## Anexos: búsquedas útiles realizadas

- Búsqueda de imports (regex): `import .* from .*` en workspace
- Alias declarados en `jsconfig.json`:
  - `"@components/*": ["src/components/*"]`
  - `"@utils/*": ["src/utils/*"]`
  - `"@data/*": ["src/data/*"]`

---

Si quieres que proceda con las correcciones automáticas (reemplazar imports y arreglar los dos errores de JSX mínimos) indícamelo y lo aplico ahora. También puedo crear una rama `fix/mapping-2025-10-21` y commitear los cambios ahí si prefieres revisarlos antes de mergear.

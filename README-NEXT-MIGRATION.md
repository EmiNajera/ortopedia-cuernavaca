Migración a Next.js (sin reescritura de vistas)

- Se añadió `pages/` con rutas equivalentes a `react-router-dom` y cada página importa las vistas existentes de `src/pages/...`.
- Se creó `src/utils/routerCompat.js` y se aliasa como `react-router-dom` en `next.config.js` para que `Link`, `useParams`, `useSearchParams`, etc. sigan funcionando.
- Tailwind configurado para Next (`tailwind.config.js`, `postcss.config.js`).
- Scripts `package.json` actualizados a Next (`dev`, `build`, `start`) y pruebas con Jest.

Comandos
- Desarrollo: `npm run dev`
- Build: `npm run build` y `npm start`
- Tests: `npm test`

Nota
- `src/main.jsx`/`index.html` ya no se usan en Next; se mantienen por compatibilidad pero no son necesarios.
- Si agregas nuevas rutas, crea un archivo en `pages/` que importe tu vista React existente.



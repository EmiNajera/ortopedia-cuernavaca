# 🛠️ Tools Directory

Este directorio contiene scripts, herramientas y migraciones que **NO forman parte del runtime de Next.js**.

## Estructura

```
tools/
├── scripts/          # Scripts Python para migraciones y utilidades
├── database/         # Schemas SQL, migraciones, datos de ejemplo
└── migrations/       # Migraciones de datos (futuro)
```

## ⚠️ Importante

- Estos archivos **NO afectan** el build de Next.js
- Son herramientas de desarrollo y mantenimiento
- No se incluyen en el bundle final
- Úsalos solo cuando necesites migrar datos o hacer mantenimiento

## Scripts disponibles

Ver `scripts/` para scripts Python de migración de categorías, corrección de encoding, etc.

## Base de datos

Ver `database/` para schemas, migraciones SQL y archivos de configuración.


# 📤 Guía para Subir Proyecto a GitHub

## 📋 Pasos para Subir el Proyecto

### 1. Verificar que Git está inicializado

```bash
# Verificar estado
git status

# Si no está inicializado
git init
```

### 2. Verificar .gitignore

Asegúrate de que `.gitignore` incluye:
- ✅ `node_modules/`
- ✅ `.next/`
- ✅ `.env*` (incluyendo `.env.production`)
- ✅ `logs/`
- ✅ Archivos sensibles

**Verificar:**
```bash
grep -q "\.env\.production" .gitignore && echo "✅ Ya está en .gitignore" || echo "⚠️ Agregar .env.production a .gitignore"
```

### 3. Crear repositorio en GitHub

1. Ve a [GitHub.com](https://github.com)
2. Click en "New repository" (botón verde)
3. **Configuración:**
   - **Nombre:** `ortopedia-cuernavaca`
   - **Descripción:** "Sitio web de Ortopedia Cuernavaca - Next.js"
   - **Visibilidad:** Private (recomendado) o Public
   - **NO** marques "Add a README file" (ya tenemos uno)
   - **NO** marques "Add .gitignore" (ya tenemos uno)
   - **NO** marques "Choose a license"
4. Click en "Create repository"

### 4. Preparar archivos para commit

```bash
# Ver qué archivos se van a agregar
git status

# Verificar que NO aparezcan archivos sensibles:
# - .env.production (debe estar ignorado)
# - node_modules/ (debe estar ignorado)
# - .next/ (debe estar ignorado)
```

### 5. Agregar todos los archivos

```bash
# Agregar todos los archivos
git add .

# Verificar qué se va a subir (revisar cuidadosamente)
git status
```

### 6. Hacer commit inicial

```bash
git commit -m "Initial commit: Ortopedia Cuernavaca website

- Next.js 16 con React 19
- E-commerce completo
- Sistema de servicios
- Blog educativo
- Optimizaciones de performance
- Documentación completa"
```

### 7. Conectar con GitHub

```bash
# Agregar remote
git remote add origin https://github.com/EmiNajera/ortopedia-cuernavaca.git

# Verificar que se agregó correctamente
git remote -v
```

**Si necesitas autenticación:**
- Usa SSH: `git@github.com:EmiNajera/ortopedia-cuernavaca.git`
- O configura GitHub CLI o Personal Access Token

### 8. Subir a GitHub

```bash
# Verificar en qué rama estás
git branch

# Si estás en 'master', renombrar a 'main' (GitHub usa 'main' por defecto)
git branch -M main

# Subir código
git push -u origin main
```

**Si te pide autenticación:**
- Usa tu Personal Access Token (no tu contraseña)
- O configura SSH keys

## ⚠️ Verificaciones Antes de Subir

### Archivos que NO deben subirse:

Verifica que estos archivos NO aparezcan en `git status`:

- ❌ `.env.production` - Variables de entorno (ya en .gitignore)
- ❌ `.env.local` - Variables locales (ya en .gitignore)
- ❌ `node_modules/` - Dependencias (ya en .gitignore)
- ❌ `.next/` - Build de Next.js (ya en .gitignore)
- ❌ `logs/` - Logs de PM2 (ya en .gitignore)
- ❌ Archivos sensibles (contraseñas, API keys)

### Verificar antes de commit:

```bash
# Ver qué archivos se van a agregar
git status

# Ver archivos específicos que se agregaron
git diff --cached --name-only

# Si ves algo que no debería estar, agregarlo a .gitignore
# Luego: git rm --cached archivo-sensible
```

## 🔐 Seguridad

### ⚠️ IMPORTANTE: Nunca subas:

- Archivos `.env*` con valores reales
- API keys o tokens
- Contraseñas
- Certificados SSL privados
- Datos de clientes
- Archivos de base de datos (.sql con datos reales)

### Si accidentalmente subiste algo sensible:

1. **Eliminar del historial:**
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch archivo-sensible" \
  --prune-empty --tag-name-filter cat -- --all
```

2. **Forzar push:**
```bash
git push origin --force --all
```

3. **Cambiar credenciales** que estaban en el archivo

4. **Considerar:** Hacer el repositorio privado si contiene información sensible

## 📝 Comandos Útiles

### Ver estado actual

```bash
git status
```

### Ver qué archivos están siendo rastreados

```bash
git ls-files
```

### Ver tamaño del repositorio

```bash
git count-objects -vH
```

### Ver historial de commits

```bash
git log --oneline
```

### Ver diferencias antes de commit

```bash
git diff
```

## 🔄 Para Futuros Cambios

```bash
# 1. Ver cambios
git status

# 2. Agregar archivos modificados
git add .

# O agregar archivos específicos
git add archivo1.js archivo2.js

# 3. Hacer commit con mensaje descriptivo
git commit -m "Descripción clara del cambio"

# 4. Subir a GitHub
git push
```

### Buenas prácticas para commits:

```bash
# ✅ Bueno: Mensaje descriptivo
git commit -m "feat: Agregar sistema de citas en línea"

# ✅ Bueno: Múltiples líneas
git commit -m "fix: Corregir error en carrito de compras

- Corregir cálculo de totales
- Agregar validación de stock
- Mejorar mensajes de error"

# ❌ Malo: Mensaje vago
git commit -m "cambios"
```

## 📚 Recursos

- [GitHub Docs](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Desktop](https://desktop.github.com) - Cliente gráfico (opcional)
- [GitHub CLI](https://cli.github.com) - CLI para GitHub

## ✅ Checklist Final

Antes de hacer push:

- [ ] `.gitignore` verificado
- [ ] `.env.production` NO está en el staging area
- [ ] `node_modules/` NO está en el staging area
- [ ] `.next/` NO está en el staging area
- [ ] README.md creado
- [ ] Commit con mensaje descriptivo
- [ ] Remote configurado correctamente
- [ ] Listo para hacer push

---

**Última actualización:** 2025-01-27

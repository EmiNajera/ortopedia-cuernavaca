# 📋 Resumen Rápido: Despliegue en VPS

## ⚡ Comandos Esenciales

### 1. En el VPS - Primera vez

```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2
sudo npm install -g pm2
pm2 startup

# Instalar Nginx
sudo apt install -y nginx

# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Subir proyecto al VPS

```bash
# Desde tu máquina local
scp -r * usuario@tu-vps:/home/usuario/ortopedia-web/
```

### 3. En el VPS - Configurar

```bash
cd /home/usuario/ortopedia-web

# Instalar dependencias
npm install

# Crear .env.production
nano .env.production
# Agregar:
# NEXT_PUBLIC_SITE_URL=https://ortopediacuernavaca.com
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-P014771Y1K
# NODE_ENV=production
# PORT=3000

# Build
npm run build

# Iniciar con PM2
pm2 start ecosystem.config.js
pm2 save
```

### 4. Configurar Nginx

```bash
# Editar configuración
sudo nano /etc/nginx/sites-available/ortopediacuernavaca

# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/ortopediacuernavaca /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL con Let's Encrypt

```bash
sudo certbot --nginx -d ortopediacuernavaca.com -d www.ortopediacuernavaca.com
```

### 6. Deployment futuro

```bash
cd /home/usuario/ortopedia-web
./deploy.sh
```

---

## 📁 Archivos Creados

1. ✅ `ecosystem.config.js` - Configuración de PM2
2. ✅ `deploy.sh` - Script de deployment
3. ✅ `docs/deployment/GUIA_DESPLIEGUE_VPS.md` - Guía completa

---

## 🔐 Variables de Entorno Requeridas

Crear `.env.production` en el VPS:

```env
NEXT_PUBLIC_SITE_URL=https://ortopediacuernavaca.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-P014771Y1K
NODE_ENV=production
PORT=3000
```

---

## ✅ Checklist Rápido

- [ ] Node.js instalado
- [ ] PM2 instalado
- [ ] Nginx instalado
- [ ] Proyecto subido al VPS
- [ ] `.env.production` creado
- [ ] `npm install` ejecutado
- [ ] `npm run build` exitoso
- [ ] PM2 corriendo
- [ ] Nginx configurado
- [ ] SSL configurado
- [ ] Dominio apuntando al VPS

---

**Ver guía completa:** `docs/deployment/GUIA_DESPLIEGUE_VPS.md`

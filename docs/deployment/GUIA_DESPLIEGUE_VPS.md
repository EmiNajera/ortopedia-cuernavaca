# 🚀 Guía Completa de Despliegue en VPS
## Next.js - Ortopedia Cuernavaca

**Última actualización:** 2025-01-27

---

## 📋 Requisitos Previos

### Servidor VPS
- **OS:** Ubuntu 20.04+ o Debian 11+ (recomendado)
- **RAM:** Mínimo 2GB (4GB recomendado)
- **CPU:** 2+ cores
- **Disco:** 20GB+ espacio libre
- **Acceso:** SSH con permisos de root o sudo

### Dominio
- Dominio configurado y apuntando al VPS
- Acceso al panel DNS para configurar registros A/AAAA

---

## 🔧 Paso 1: Configuración Inicial del Servidor

### 1.1 Actualizar el sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Instalar Node.js (v18 o superior)

```bash
# Instalar Node.js usando NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalación
node --version  # Debe ser v18.x o superior
npm --version
```

### 1.3 Instalar PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Configurar PM2 para iniciar al arrancar el servidor
pm2 startup
# Ejecuta el comando que te muestre (algo como: sudo env PATH=...)
```

### 1.4 Instalar Nginx

```bash
sudo apt install -y nginx

# Iniciar y habilitar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 1.5 Instalar Certbot (para SSL)

```bash
sudo apt install -y certbot python3-certbot-nginx
```

---

## 📁 Paso 2: Preparar el Proyecto en el VPS

### 2.1 Crear usuario para la aplicación (opcional pero recomendado)

```bash
# Crear usuario
sudo adduser --disabled-password --gecos "" ortopedia
sudo usermod -aG sudo ortopedia

# Cambiar al usuario
su - ortopedia
```

### 2.2 Clonar el repositorio

```bash
# Instalar Git si no está instalado
sudo apt install -y git

# Clonar el repositorio
cd /home/ortopedia
git clone https://github.com/tu-usuario/tu-repo.git ortopedia-web
cd ortopedia-web
```

**O si prefieres subir los archivos manualmente:**

```bash
# Crear directorio
mkdir -p /home/ortopedia/ortopedia-web
cd /home/ortopedia/ortopedia-web

# Subir archivos usando SCP desde tu máquina local:
# scp -r * usuario@tu-vps:/home/ortopedia/ortopedia-web/
```

### 2.3 Instalar dependencias

```bash
cd /home/ortopedia/ortopedia-web
npm install --production=false
```

---

## 🔐 Paso 3: Configurar Variables de Entorno

### 3.1 Crear archivo `.env.production`

```bash
cd /home/ortopedia/ortopedia-web
nano .env.production
```

**Contenido del archivo:**

```env
# URL del sitio en producción (sin trailing slash)
NEXT_PUBLIC_SITE_URL=https://ortopediacuernavaca.com

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-P014771Y1K

# Entorno de ejecución
NODE_ENV=production

# Puerto donde correrá Next.js (interno, no expuesto)
PORT=3000
```

**Guardar y salir:** `Ctrl+X`, luego `Y`, luego `Enter`

### 3.2 Verificar que `.env.production` está en `.gitignore`

```bash
grep -q "\.env\.production" .gitignore && echo "✅ Ya está en .gitignore" || echo "⚠️ Agregar .env.production a .gitignore"
```

---

## 🏗️ Paso 4: Build del Proyecto

### 4.1 Ejecutar build de producción

```bash
cd /home/ortopedia/ortopedia-web
npm run build
```

**Verificar que el build fue exitoso:**
- Debe completar sin errores
- Debe generar la carpeta `.next/`

### 4.2 Probar el servidor localmente

```bash
# En una terminal, iniciar el servidor
npm run start

# En otra terminal, probar
curl http://localhost:3000

# Si funciona, detener con Ctrl+C
```

---

## ⚙️ Paso 5: Configurar PM2

### 5.1 Crear archivo de configuración PM2

```bash
cd /home/ortopedia/ortopedia-web
nano ecosystem.config.js
```

**Contenido:**

```javascript
module.exports = {
  apps: [
    {
      name: 'ortopedia-web',
      script: 'npm',
      args: 'start',
      cwd: '/home/ortopedia/ortopedia-web',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_file: '.env.production',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '1G',
    },
  ],
};
```

**Crear directorio de logs:**

```bash
mkdir -p /home/ortopedia/ortopedia-web/logs
```

### 5.2 Iniciar la aplicación con PM2

```bash
cd /home/ortopedia/ortopedia-web
pm2 start ecosystem.config.js

# Verificar que está corriendo
pm2 status
pm2 logs ortopedia-web --lines 50
```

### 5.3 Guardar configuración de PM2

```bash
pm2 save
```

---

## 🌐 Paso 6: Configurar Nginx como Reverse Proxy

### 6.1 Crear configuración de Nginx

```bash
sudo nano /etc/nginx/sites-available/ortopediacuernavaca
```

**Contenido (reemplaza `ortopediacuernavaca.com` con tu dominio):**

```nginx
server {
    listen 80;
    server_name ortopediacuernavaca.com www.ortopediacuernavaca.com;

    # Redirigir todo a HTTPS (se configurará después)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ortopediacuernavaca.com www.ortopediacuernavaca.com;

    # SSL será configurado por Certbot
    # ssl_certificate /etc/letsencrypt/live/ortopediacuernavaca.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/ortopediacuernavaca.com/privkey.pem;

    # Logs
    access_log /var/log/nginx/ortopediacuernavaca-access.log;
    error_log /var/log/nginx/ortopediacuernavaca-error.log;

    # Tamaño máximo de upload
    client_max_body_size 10M;

    # Proxy a Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Cache para assets estáticos
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60d;
        add_header Cache-Control "public, immutable";
    }

    # Cache para imágenes
    location /images {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

### 6.2 Habilitar el sitio

```bash
# Crear enlace simbólico
sudo ln -s /etc/nginx/sites-available/ortopediacuernavaca /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Si todo está bien, recargar Nginx
sudo systemctl reload nginx
```

---

## 🔒 Paso 7: Configurar SSL con Let's Encrypt

### 7.1 Obtener certificado SSL

```bash
sudo certbot --nginx -d ortopediacuernavaca.com -d www.ortopediacuernavaca.com
```

**Seguir las instrucciones:**
- Ingresar email para notificaciones
- Aceptar términos y condiciones
- Elegir si redirigir HTTP a HTTPS (recomendado: Sí)

### 7.2 Verificar renovación automática

```bash
# Probar renovación
sudo certbot renew --dry-run

# Verificar que el timer está activo
sudo systemctl status certbot.timer
```

---

## ✅ Paso 8: Verificación Post-Despliegue

### 8.1 Verificar que todo funciona

```bash
# Verificar PM2
pm2 status
pm2 logs ortopedia-web --lines 20

# Verificar Nginx
sudo systemctl status nginx

# Verificar SSL
curl -I https://ortopediacuernavaca.com
```

### 8.2 Verificar URLs importantes

```bash
# Sitemap
curl https://ortopediacuernavaca.com/sitemap.xml

# Robots.txt
curl https://ortopediacuernavaca.com/robots.txt

# Página principal
curl -I https://ortopediacuernavaca.com
```

### 8.3 Verificar en el navegador

1. Visitar: `https://ortopediacuernavaca.com`
2. Verificar que carga correctamente
3. Verificar que el SSL está activo (candado verde)
4. Probar navegación entre páginas

---

## 🔄 Paso 9: Scripts de Deployment

### 9.1 Crear script de deployment

```bash
cd /home/ortopedia/ortopedia-web
nano deploy.sh
```

**Contenido:**

```bash
#!/bin/bash

# Script de deployment para Ortopedia Cuernavaca
# Uso: ./deploy.sh

set -e  # Salir si hay errores

echo "🚀 Iniciando deployment..."

# Ir al directorio del proyecto
cd /home/ortopedia/ortopedia-web

# Pull de cambios (si usas Git)
echo "📥 Actualizando código..."
git pull origin main  # o la rama que uses

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install --production=false

# Build del proyecto
echo "🏗️ Construyendo proyecto..."
npm run build

# Reiniciar PM2
echo "🔄 Reiniciando aplicación..."
pm2 restart ortopedia-web

# Verificar estado
echo "✅ Verificando estado..."
pm2 status

echo "🎉 Deployment completado!"
echo "📊 Ver logs con: pm2 logs ortopedia-web"
```

**Hacer ejecutable:**

```bash
chmod +x deploy.sh
```

### 9.2 Uso del script

```bash
./deploy.sh
```

---

## 📊 Paso 10: Monitoreo y Mantenimiento

### 10.1 Comandos útiles de PM2

```bash
# Ver estado
pm2 status

# Ver logs
pm2 logs ortopedia-web

# Ver logs en tiempo real
pm2 logs ortopedia-web --lines 100 --raw

# Reiniciar aplicación
pm2 restart ortopedia-web

# Detener aplicación
pm2 stop ortopedia-web

# Eliminar aplicación de PM2
pm2 delete ortopedia-web

# Ver uso de recursos
pm2 monit
```

### 10.2 Monitoreo de Nginx

```bash
# Ver logs de acceso
sudo tail -f /var/log/nginx/ortopediacuernavaca-access.log

# Ver logs de errores
sudo tail -f /var/log/nginx/ortopediacuernavaca-error.log

# Verificar estado
sudo systemctl status nginx

# Reiniciar Nginx
sudo systemctl restart nginx
```

### 10.3 Verificar recursos del servidor

```bash
# Uso de CPU y memoria
htop  # o 'top' si no tienes htop

# Espacio en disco
df -h

# Uso de memoria
free -h
```

---

## 🔧 Configuración Adicional

### Firewall (UFW)

```bash
# Instalar UFW si no está
sudo apt install -y ufw

# Permitir SSH
sudo ufw allow 22/tcp

# Permitir HTTP y HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Habilitar firewall
sudo ufw enable

# Ver estado
sudo ufw status
```

### Actualizar Node.js y dependencias

```bash
# Actualizar dependencias del proyecto
cd /home/ortopedia/ortopedia-web
npm update

# Rebuild después de actualizar
npm run build
pm2 restart ortopedia-web
```

---

## 🐛 Troubleshooting

### Problema: La aplicación no inicia

```bash
# Ver logs detallados
pm2 logs ortopedia-web --err

# Verificar variables de entorno
pm2 env 0  # 0 es el ID de la app

# Verificar que el puerto 3000 está libre
sudo netstat -tulpn | grep 3000
```

### Problema: Nginx no puede conectar con Next.js

```bash
# Verificar que Next.js está corriendo
pm2 status

# Verificar que está escuchando en el puerto correcto
sudo netstat -tulpn | grep 3000

# Verificar logs de Nginx
sudo tail -f /var/log/nginx/ortopediacuernavaca-error.log
```

### Problema: SSL no funciona

```bash
# Verificar certificado
sudo certbot certificates

# Renovar certificado manualmente
sudo certbot renew

# Verificar configuración de Nginx
sudo nginx -t
```

### Problema: Build falla

```bash
# Limpiar cache y node_modules
rm -rf .next node_modules
npm install
npm run build
```

---

## 📝 Checklist Final

- [ ] Node.js instalado (v18+)
- [ ] PM2 instalado y configurado
- [ ] Nginx instalado y configurado
- [ ] Certbot instalado
- [ ] Variables de entorno configuradas (`.env.production`)
- [ ] Build ejecutado exitosamente
- [ ] PM2 corriendo la aplicación
- [ ] Nginx configurado como reverse proxy
- [ ] SSL configurado y funcionando
- [ ] Dominio apuntando al VPS
- [ ] Firewall configurado
- [ ] Script de deployment creado
- [ ] Monitoreo configurado

---

## 🎯 Próximos Pasos

1. **Configurar backup automático** (opcional pero recomendado)
2. **Configurar monitoreo** (UptimeRobot, Pingdom, etc.)
3. **Configurar alertas** (email cuando la app se cae)
4. **Optimizar performance** (cache, CDN, etc.)
5. **Configurar CI/CD** (GitHub Actions, GitLab CI, etc.)

---

## 📚 Recursos Adicionales

- [Documentación de Next.js - Deployment](https://nextjs.org/docs/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)

---

**Última actualización:** 2025-01-27

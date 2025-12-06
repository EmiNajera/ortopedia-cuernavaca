#!/bin/bash

# Script de deployment para Ortopedia Cuernavaca
# Uso: ./deploy.sh

set -e  # Salir si hay errores

echo "🚀 Iniciando deployment..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Ir al directorio del proyecto
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encontró package.json${NC}"
    echo "Asegúrate de ejecutar este script desde la raíz del proyecto"
    exit 1
fi

# Pull de cambios (si usas Git)
if [ -d ".git" ]; then
    echo -e "${YELLOW}📥 Actualizando código desde Git...${NC}"
    git pull origin main || git pull origin master || echo "⚠️ No se pudo hacer pull (continuando...)"
else
    echo -e "${YELLOW}⚠️ No se detectó repositorio Git, saltando pull...${NC}"
fi

# Instalar dependencias
echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
npm install --production=false

# Verificar que existe .env.production
if [ ! -f ".env.production" ]; then
    echo -e "${RED}❌ Error: No se encontró .env.production${NC}"
    echo "Crea el archivo .env.production antes de desplegar"
    exit 1
fi

# Build del proyecto
echo -e "${YELLOW}🏗️ Construyendo proyecto...${NC}"
npm run build

# Crear directorio de logs si no existe
mkdir -p logs

# Reiniciar PM2
echo -e "${YELLOW}🔄 Reiniciando aplicación con PM2...${NC}"
if pm2 list | grep -q "ortopedia-web"; then
    pm2 restart ortopedia-web
else
    pm2 start ecosystem.config.js
    pm2 save
fi

# Verificar estado
echo -e "${GREEN}✅ Verificando estado...${NC}"
pm2 status

echo ""
echo -e "${GREEN}🎉 Deployment completado!${NC}"
echo ""
echo "📊 Comandos útiles:"
echo "  - Ver logs: pm2 logs ortopedia-web"
echo "  - Ver estado: pm2 status"
echo "  - Monitoreo: pm2 monit"
echo ""

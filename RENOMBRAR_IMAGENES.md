# Instrucciones para Renombrar Imágenes en el Servidor

## Problema
Las imágenes con espacios y acentos en sus nombres causan errores 400 en producción con Next.js Image Optimization.

## Archivos a Renombrar

Ejecuta estos comandos en el servidor (en la carpeta `public/images/banners/`):

```bash
cd ~/ortopedia-cuernavaca/public/images/banners

# Imágenes ya renombradas (ya están en el código)
mv "Calzado OrtopédicoFD.png" "calzado-ortopedico-fd.png"
mv "Técnico ajustando prótesis en tallerFD.png" "tecnico-ajustando-protesis-fd.png"
mv "Órtesis de RodillaFD.png" "ortesis-rodilla-fd.png"
mv "Férulas y SoportesFD.png" "ferulas-soportes-fd.png"

# Imágenes con acentos y espacios (usadas en Next.js Image)
mv "Área de Productos OrtopédicosFD.png" "area-productos-ortopedicos-fd.png"x
mv "Atleta cruzando la meta con alegría FD.png" "atleta-cruzando-meta-fd.png"x
mv "Ejercicio TerapéuticoFD.png" "ejercicio-terapeutico-fd.png"x
mv "Entrenamiento Funcional con PrótesisFD.png" "entrenamiento-funcional-protesis-fd.png"x
mv "Manejo Integral del Dolor de EspaldaFD.png" "manejo-integral-dolor-espalda-fd.png"x
mv "Mangas y equipo deportivoFD.png" "mangas-equipo-deportivo-fd.png"x
mv "Órtesis de ColumnaFD.png" "ortesis-columna-fd.png"x
mv "Prótesis MioeléctricaFD.png" "protesis-mioelectrica-fd.png"?
mv "Rehabilitación del Dolor CrónicoFD.png" "rehabilitacion-dolor-cronico-fd.png"x
mv "Rehabilitación en AmputadosFD.png" "rehabilitacion-amputados-fd.png"x
mv "Rehabilitación PostoperatoriaFD.png" "rehabilitacion-postoperatoria-fd.png"x
mv "Seguimiento ContinuoFD.png" "seguimiento-continuo-fd.png"x
mv "Tratamiento de ArtritisFD.png" "tratamiento-artritis-fd.png"x
mv "Lesiones DeportivasFD.png" "lesiones-deportivas-fd.png"x
mv "Plantillas PersonalizadasFD.png" "plantillas-personalizadas-fd.png"x

# Imágenes con espacios (usadas en Next.js Image)
mv "Bastones y Muletas.png" "bastones-muletas.png"x
mv "Sillas de RuedasFD.png" "sillas-ruedas-fd.png"x
mv "Fajas y SoportesFD.png" "fajas-soportes-fd.png"x
mv "Ortesis cafeteria.png" "ortesis-cafeteria.png"x

# Categorías con espacios
mv "Calzado categoria.png" "calzado-categoria.png"x
mv "Fajas Categoria.png" "fajas-categoria.png"x
mv "Movilidad categoria.png" "movilidad-categoria.png"x
mv "Pediatria categoria.png" "pediatria-categoria.png"x
mv "Plantillas categoria.png" "plantillas-categoria.png"x
mv "Rodillera categorias.png" "rodillera-categorias.png"x

# Banners de tienda con espacios
mv "Banner Tienda 1.png" "banner-tienda-1.png"x
mv "Banner Tienda 2.png" "banner-tienda-2.png"x
mv "Banner tienda 3.png" "banner-tienda-3.png"x
mv "Banner tienda 4.png" "banner-tienda-4.png"x
mv "Banner tienda 5.png" "banner-tienda-5.png"x

# Banners web con espacios
mv "Banner cuadrado central.png" "banner-cuadrado-central.png"
mv "Banner Cuadrado Derecho.png" "banner-cuadrado-derecho.png"
mv "Banner cuadrado Izquierdo.png" "banner-cuadrado-izquierdo.png"
mv "Banner lateral Inferior.png" "banner-lateral-inferior.png"
mv "Banner lateral Superior.png" "banner-lateral-superior.png"
mv "Banner Web Inferior.png" "banner-web-inferior.png"
mv "Banner Web Redes Sociales.png" "banner-web-redes-sociales.png"

# Logos y otros con espacios
mv "Logo Ortochavitos.png" "logo-ortochavitos.png"x
mv "SuperConfort Logo.png" "superconfort-logo.png"
mv "TikTok Icon.png" "tiktok-icon.png"x
mv "Fisioterapia 2.png" "fisioterapia-2.png"x
mv "Plantillas Ortopedicas A.PNG" "plantillas-ortopedicas-a.png"x
mv "Protesis Taller.JPG" "protesis-taller.jpg"x
mv "Protesis TiE.jpg" "protesis-tie.jpg"x
mv "Logo Antiguo Ortochavitos.JPEG" "logo-antiguo-ortochavitos.jpeg"x
mv "Misión.png" "mision.png"x
mv "Viisón.png" "vision.png"x
```

## NOTA IMPORTANTE: Logo Principal

El archivo `"Ortopedia Cuernavaca Logo.png"` y `"Ortopedia Cuernavaca Logo.svg"` se usan en muchos lugares (meta tags, favicon, etc.). 

**Opción 1 (Recomendada):** Dejarlo como está si no causa problemas (solo se usa en meta tags y favicon, no en Next.js Image)

**Opción 2:** Si causa problemas, renombrarlo también:
```bash
mv "Ortopedia Cuernavaca Logo.png" "ortopedia-cuernavaca-logo.png"
mv "Ortopedia Cuernavaca Logo.svg" "ortopedia-cuernavaca-logo.svg"
```

## Después de Renombrar

1. Reconstruir la aplicación:
```bash
cd ~/ortopedia-cuernavaca
git pull origin main  # Para obtener los cambios del código
npm run build
```

2. Reiniciar PM2:
```bash
pm2 restart ortopedia-web
```

## Nota
Las referencias en el código ya fueron actualizadas para usar los nuevos nombres.

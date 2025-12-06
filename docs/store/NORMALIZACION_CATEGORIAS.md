# Plan de Normalización de Categorías - Ortopedia Cuernavaca
## Estructura Final Optimizada para SEO

---

## 📋 ESTRUCTURA FINAL DE CATEGORÍAS (Nivel 1 - URLs Planas)

### Categorías Principales (URLs Directas - Optimizadas para SEO)

1. **`/categoria/rodilleras`** - Rodilleras Ortopédicas
2. **`/categoria/tobilleras`** - Tobilleras Ortopédicas
3. **`/categoria/muniqueras`** - Muñequeras Ortopédicas
4. **`/categoria/coderas`** - Coderas Ortopédicas
5. **`/categoria/fajas`** - Fajas Ortopédicas
6. **`/categoria/collares-cervicales`** - Collares y Ortesis Cervicales
7. **`/categoria/ferulas`** - Férulas Ortopédicas
8. **`/categoria/inmovilizadores`** - Inmovilizadores Ortopédicos
9. **`/categoria/cabestrillos`** - Cabestrillos y Soportes de Hombro
10. **`/categoria/zapatos-ortopedicos`** - Zapatos Ortopédicos
11. **`/categoria/tenis-ortopedicos`** - Tenis y Calzado Deportivo Ortopédico
12. **`/categoria/plantillas-ortopedicas`** - Plantillas Ortopédicas
13. **`/categoria/taloneras`** - Taloneras Ortopédicas
14. **`/categoria/bastones`** - Bastones Ortopédicos
15. **`/categoria/muletas`** - Muletas Ortopédicas
16. **`/categoria/sillas-de-ruedas`** - Sillas de Ruedas
17. **`/categoria/andadores`** - Andadores
18. **`/categoria/medias-compresion`** - Medias y Calcetines de Compresión
19. **`/categoria/productos-pediatricos`** - Productos Pediátricos
20. **`/categoria/terapia-rehabilitacion`** - Terapia y Rehabilitación
21. **`/categoria/cojines-almohadas`** - Cojines y Almohadas Terapéuticas
22. **`/categoria/equipos-medicos`** - Equipos Médicos
23. **`/categoria/mobiliario-medico`** - Mobiliario Médico
24. **`/categoria/accesorios-bano`** - Accesorios de Baño
25. **`/categoria/separadores-alineadores`** - Separadores y Alineadores de Pie

**Total: 25 categorías principales**

---

## 🎯 INSTRUCCIONES DE IMPLEMENTACIÓN

### FASE 1: Preparación de Base de Datos

#### Paso 1.1: Crear Tabla de Categorías Normalizadas

```sql
-- Crear tabla de categorías normalizadas
CREATE TABLE IF NOT EXISTS categorias_normalizadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    meta_titulo VARCHAR(255),
    meta_descripcion TEXT,
    orden INT DEFAULT 0,
    activa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_activa (activa),
    INDEX idx_orden (orden)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Paso 1.2: Insertar Categorías Normalizadas

```sql
INSERT INTO categorias_normalizadas (slug, nombre, descripcion, meta_titulo, meta_descripcion, orden) VALUES
('rodilleras', 'Rodilleras Ortopédicas', 'Rodilleras ortopédicas para rehabilitación, deporte y soporte. Rodilleras mecánicas, elásticas y especializadas.', 'Rodilleras Ortopédicas | Ortopedia Cuernavaca', 'Rodilleras ortopédicas para rehabilitación y deporte. Rodilleras mecánicas, elásticas y especializadas. Envío gratis.', 1),
('tobilleras', 'Tobilleras Ortopédicas', 'Tobilleras ortopédicas elásticas, de neopreno y especializadas para soporte y rehabilitación del tobillo.', 'Tobilleras Ortopédicas | Ortopedia Cuernavaca', 'Tobilleras ortopédicas para soporte y rehabilitación. Tobilleras elásticas, neopreno y especializadas.', 2),
('muniqueras', 'Muñequeras Ortopédicas', 'Muñequeras ortopédicas básicas, con refuerzo y férulas de muñeca para soporte y rehabilitación.', 'Muñequeras Ortopédicas | Ortopedia Cuernavaca', 'Muñequeras ortopédicas para soporte y rehabilitación. Muñequeras básicas, con refuerzo y férulas.', 3),
('coderas', 'Coderas Ortopédicas', 'Coderas ortopédicas elásticas, con anillo y deportivas para soporte del codo y tratamiento de epicondilitis.', 'Coderas Ortopédicas | Ortopedia Cuernavaca', 'Coderas ortopédicas para soporte del codo. Coderas elásticas, con anillo y deportivas.', 4),
('fajas', 'Fajas Ortopédicas', 'Fajas ortopédicas lumbosacras, para hernias, maternidad y correctores de postura.', 'Fajas Ortopédicas | Ortopedia Cuernavaca', 'Fajas ortopédicas para soporte lumbar, hernias y maternidad. Fajas lumbosacras y correctores de postura.', 5),
('collares-cervicales', 'Collares y Ortesis Cervicales', 'Collares cervicales blandos, rígidos y ajustables para inmovilización y soporte cervical.', 'Collares Cervicales | Ortopedia Cuernavaca', 'Collares cervicales ortopédicos. Collares blandos, rígidos y ajustables para soporte cervical.', 6),
('ferulas', 'Férulas Ortopédicas', 'Férulas ortopédicas para mano, dedos, muñeca, antebrazo y pie. Férulas estándar y dinámicas.', 'Férulas Ortopédicas | Ortopedia Cuernavaca', 'Férulas ortopédicas para inmovilización. Férulas para mano, dedos, muñeca y pie.', 7),
('inmovilizadores', 'Inmovilizadores Ortopédicos', 'Inmovilizadores ortopédicos para rodilla, hombro, pulgar y dedos.', 'Inmovilizadores Ortopédicos | Ortopedia Cuernavaca', 'Inmovilizadores ortopédicos para rodilla, hombro y dedos. Inmovilización completa y especializada.', 8),
('cabestrillos', 'Cabestrillos y Soportes de Hombro', 'Cabestrillos ortopédicos e inmovilizadores de hombro para soporte y recuperación.', 'Cabestrillos Ortopédicos | Ortopedia Cuernavaca', 'Cabestrillos e inmovilizadores de hombro. Soporte ortopédico para hombro y brazo.', 9),
('zapatos-ortopedicos', 'Zapatos Ortopédicos', 'Zapatos ortopédicos especializados para adultos e infantes. Zapatos con horma estándar e inversa.', 'Zapatos Ortopédicos | Ortopedia Cuernavaca', 'Zapatos ortopédicos especializados. Zapatos Monto, Sandy, Dany y más. Horma estándar e inversa.', 10),
('tenis-ortopedicos', 'Tenis y Calzado Deportivo Ortopédico', 'Tenis y calzado deportivo con características ortopédicas. Calzado para pie plano, pronación y supinación.', 'Tenis Ortopédicos | Ortopedia Cuernavaca', 'Tenis y calzado deportivo ortopédico. Calzado especializado para deporte y actividad física.', 11),
('plantillas-ortopedicas', 'Plantillas Ortopédicas', 'Plantillas ortopédicas de gel, deportivas y personalizadas. Plantillas para pie plano, fascitis plantar y diabetes.', 'Plantillas Ortopédicas | Ortopedia Cuernavaca', 'Plantillas ortopédicas de gel y personalizadas. Plantillas para pie plano, fascitis plantar y más.', 12),
('taloneras', 'Taloneras Ortopédicas', 'Taloneras de gel y terapéuticas para alivio de presión y fascitis plantar.', 'Taloneras Ortopédicas | Ortopedia Cuernavaca', 'Taloneras ortopédicas de gel. Alivio de presión y fascitis plantar.', 13),
('bastones', 'Bastones Ortopédicos', 'Bastones ortopédicos estándar, plegables, de 4 puntos y especializados para apoyo y estabilidad.', 'Bastones Ortopédicos | Ortopedia Cuernavaca', 'Bastones ortopédicos para apoyo y estabilidad. Bastones plegables, de 4 puntos y especializados.', 14),
('muletas', 'Muletas Ortopédicas', 'Muletas ortopédicas estándar, canadienses y ajustables para soporte durante la recuperación.', 'Muletas Ortopédicas | Ortopedia Cuernavaca', 'Muletas ortopédicas para soporte y recuperación. Muletas estándar, canadienses y ajustables.', 15),
('sillas-de-ruedas', 'Sillas de Ruedas', 'Sillas de ruedas manuales, eléctricas, deportivas y pediátricas. Accesorios para sillas de ruedas.', 'Sillas de Ruedas | Ortopedia Cuernavaca', 'Sillas de ruedas manuales y eléctricas. Sillas de ruedas deportivas y pediátricas.', 16),
('andadores', 'Andadores', 'Andadores estándar, con ruedas, plegables y con asiento para movilidad asistida.', 'Andadores | Ortopedia Cuernavaca', 'Andadores ortopédicos para movilidad asistida. Andadores con ruedas, plegables y con asiento.', 17),
('medias-compresion', 'Medias y Calcetines de Compresión', 'Medias y calcetines de compresión para caballero, dama y diabéticos. Medias antiembólicas y deportivas.', 'Medias de Compresión | Ortopedia Cuernavaca', 'Medias y calcetines de compresión. Medias para caballero, dama, diabéticos y deportivas.', 18),
('productos-pediatricos', 'Productos Pediátricos', 'Productos ortopédicos especializados para niños. Soporte pediátrico, tratamiento de hernias y displasia de cadera.', 'Productos Pediátricos | Ortopedia Cuernavaca', 'Productos ortopédicos para niños. Soporte pediátrico, hernias y displasia de cadera.', 19),
('terapia-rehabilitacion', 'Terapia y Rehabilitación', 'Compresas de gel, ejercitadores y correctores para terapia y rehabilitación.', 'Terapia y Rehabilitación | Ortopedia Cuernavaca', 'Productos para terapia y rehabilitación. Compresas, ejercitadores y correctores.', 20),
('cojines-almohadas', 'Cojines y Almohadas Terapéuticas', 'Cojines terapéuticos tipo dona y almohadas cervicales para alivio de presión y soporte postural.', 'Cojines y Almohadas | Ortopedia Cuernavaca', 'Cojines y almohadas terapéuticas. Alivio de presión y soporte postural.', 21),
('equipos-medicos', 'Equipos Médicos', 'Equipos de monitoreo médico: baumanómetros, oxímetros, termómetros y espirómetros.', 'Equipos Médicos | Ortopedia Cuernavaca', 'Equipos médicos de monitoreo. Baumanómetros, oxímetros, termómetros y más.', 22),
('mobiliario-medico', 'Mobiliario Médico', 'Mobiliario médico especializado: colchones de presión alterna, elevadores para baño y mobiliario de apoyo.', 'Mobiliario Médico | Ortopedia Cuernavaca', 'Mobiliario médico especializado. Colchones, elevadores y mobiliario de apoyo.', 23),
('accesorios-bano', 'Accesorios de Baño', 'Accesorios de baño: barras de agarre, protectores de yeso, elevadores para inodoro y accesorios de seguridad.', 'Accesorios de Baño | Ortopedia Cuernavaca', 'Accesorios de baño para seguridad. Barras de agarre, protectores y elevadores.', 24),
('separadores-alineadores', 'Separadores y Alineadores de Pie', 'Separadores y alineadores de dedos para corrección de deformidades y alineación correcta.', 'Separadores y Alineadores | Ortopedia Cuernavaca', 'Separadores y alineadores de pie. Corrección de deformidades y alineación correcta.', 25);
```

---

### FASE 2: Mapeo de Categorías Actuales a Nuevas

#### Tabla de Mapeo Completo

| Categoría Actual | Categoría Nueva (Slug) | Notas |
|------------------|------------------------|-------|
| Rodilleras elásticas abiertas sencillas | `rodilleras` | Usar filtro: `?tipo=elastica` |
| Rodilleras | `rodilleras` | Categoría principal |
| Tobilleras y bolsas | `tobilleras` | Separar bolsas a `accesorios-bano` |
| Tobilleras en banda y soportes | `tobilleras` | Usar filtros para tipo |
| Tobilleras | `tobilleras` | Categoría principal |
| Muñequeras, férulas y tobilleras | `muniqueras` o `ferulas` | Separar según tipo de producto |
| Muñequeras | `muniqueras` | Categoría principal |
| Coderas | `coderas` | Categoría principal |
| Fajas, soportes y órtesis | `fajas` | Categoría principal |
| Fajas, soportes y correctores | `fajas` | Categoría principal |
| Fajas, férulas y soportes | `fajas` o `ferulas` | Separar según tipo |
| Fajas, férulas, soportes y ortesis | `fajas` o `ferulas` | Separar según tipo |
| Fajas | `fajas` | Categoría principal |
| Collares y ortesis cervicales | `collares-cervicales` | Categoría principal |
| Férulas y dispositivos para mano/dedo | `ferulas` | Categoría principal |
| Férulas | `ferulas` | Categoría principal |
| Inmovilizadores | `inmovilizadores` | Categoría principal |
| Cabestrillos y ortesis | `cabestrillos` | Categoría principal |
| Zapatos ortopédicos | `zapatos-ortopedicos` | Categoría principal |
| Plantillas | `plantillas-ortopedicas` | Categoría principal |
| Taloneras | `taloneras` | Categoría principal |
| Bastones | `bastones` | Categoría principal |
| Muletas | `muletas` | Categoría principal |
| Ayudas de movilidad | `bastones`, `muletas`, `sillas-de-ruedas`, `andadores` | Separar según tipo |
| Sillas y mobiliario | `mobiliario-medico` | Sillas de traslado a `mobiliario-medico` |
| Medias y calcetines | `medias-compresion` | Categoría principal |
| Pediátricos / Hernias / Inguinal | `productos-pediatricos` | Categoría principal |
| Rehabilitación | `terapia-rehabilitacion` | Categoría principal |
| Deportivo | Usar filtro `?uso=deportivo` | No crear categoría separada |
| Deportivo/Rehabilitación | Usar filtro `?uso=deportivo-rehabilitacion` | No crear categoría separada |
| Terapia y Rehabilitación | `terapia-rehabilitacion` | Categoría principal |
| Cojines y almohadas | `cojines-almohadas` | Categoría principal |
| Regatones, cojines y accesorios de apoyo | `bastones` (regatones) + `cojines-almohadas` | Separar según tipo |
| Equipos médicos | `equipos-medicos` | Categoría principal |
| Accesorios baño | `accesorios-bano` | Categoría principal |
| Accesorios y otros | Reasignar a categorías específicas | NO mantener como categoría |
| Insumos médicos / ortopédicos | Reasignar según tipo | NO mantener como categoría |
| Separadores | `separadores-alineadores` | Categoría principal |
| Alineadores | `separadores-alineadores` | Categoría principal |
| Correctores y estabilizadores | `fajas` (correctores) o `separadores-alineadores` | Separar según tipo |
| Cinturones, rodilleras y compresas | `fajas` (cinturones) + `rodilleras` + `terapia-rehabilitacion` (compresas) | Separar según tipo |
| Protectores de muslo | `rodilleras` | Usar filtro o subcategoría si hay suficientes productos |

---

### FASE 3: Script de Migración de Datos

#### Paso 3.1: Crear Script de Actualización

```python
# database/migrate_categories.py
import mysql.connector
from mysql.connector import Error

# Mapeo de categorías antiguas a nuevas
CATEGORY_MAPPING = {
    'Rodilleras elásticas abiertas sencillas': 'rodilleras',
    'Rodilleras': 'rodilleras',
    'Tobilleras y bolsas': 'tobilleras',
    'Tobilleras en banda y soportes': 'tobilleras',
    'Tobilleras': 'tobilleras',
    'Muñequeras, férulas y tobilleras': 'muniqueras',  # Revisar manualmente
    'Muñequeras': 'muniqueras',
    'Coderas': 'coderas',
    'Fajas, soportes y órtesis': 'fajas',
    'Fajas, soportes y correctores': 'fajas',
    'Fajas, férulas y soportes': 'fajas',  # Revisar manualmente
    'Fajas, férulas, soportes y ortesis': 'fajas',  # Revisar manualmente
    'Fajas': 'fajas',
    'Collares y ortesis cervicales': 'collares-cervicales',
    'Férulas y dispositivos para mano/dedo': 'ferulas',
    'Férulas': 'ferulas',
    'Inmovilizadores': 'inmovilizadores',
    'Cabestrillos y ortesis': 'cabestrillos',
    'Zapatos ortopédicos': 'zapatos-ortopedicos',
    'Plantillas': 'plantillas-ortopedicas',
    'Taloneras': 'taloneras',
    'Bastones': 'bastones',
    'Muletas': 'muletas',
    'Ayudas de movilidad': 'bastones',  # Revisar manualmente
    'Sillas y mobiliario': 'mobiliario-medico',
    'Medias y calcetines': 'medias-compresion',
    'Pediátricos / Hernias / Inguinal': 'productos-pediatricos',
    'Rehabilitación': 'terapia-rehabilitacion',
    'Terapia y Rehabilitación': 'terapia-rehabilitacion',
    'Cojines y almohadas': 'cojines-almohadas',
    'Regatones, cojines y accesorios de apoyo': 'bastones',  # Revisar manualmente
    'Equipos médicos': 'equipos-medicos',
    'Accesorios baño': 'accesorios-bano',
    'Separadores': 'separadores-alineadores',
    'Alineadores': 'separadores-alineadores',
    'Correctores y estabilizadores': 'fajas',  # Revisar manualmente
    'Cinturones, rodilleras y compresas': 'fajas',  # Revisar manualmente
    'Protectores de muslo': 'rodilleras',
}

def migrate_categories():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='Z@nahoria1909',
            database='ortopedia_cuernavaca'
        )
        
        cursor = conn.cursor()
        
        # Obtener todas las categorías actuales
        cursor.execute("SELECT id, nombre FROM categorias")
        current_categories = cursor.fetchall()
        
        # Obtener categorías normalizadas
        cursor.execute("SELECT id, slug FROM categorias_normalizadas")
        normalized_categories = {slug: cat_id for cat_id, slug in cursor.fetchall()}
        
        # Actualizar productos
        for cat_id, cat_name in current_categories:
            if cat_name in CATEGORY_MAPPING:
                new_slug = CATEGORY_MAPPING[cat_name]
                if new_slug in normalized_categories:
                    new_cat_id = normalized_categories[new_slug]
                    # Actualizar productos
                    cursor.execute(
                        "UPDATE productos SET categoria_id = %s WHERE categoria_id = %s",
                        (new_cat_id, cat_id)
                    )
                    print(f"Actualizados productos de '{cat_name}' a '{new_slug}'")
        
        conn.commit()
        print("Migración completada exitosamente")
        
    except Error as e:
        print(f"Error: {e}")
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    migrate_categories()
```

---

### FASE 4: Actualización del Frontend

#### Paso 4.1: Actualizar `src/data/categories.config.js`

```javascript
export const categoriesConfig = [
  {
    slug: 'rodilleras',
    name: 'Rodilleras',
    description: 'Rodilleras ortopédicas para rehabilitación, deporte y soporte.',
    image: '/images/banners/Rodillera categorias.png',
    metaTitle: 'Rodilleras Ortopédicas | Ortopedia Cuernavaca',
    metaDescription: 'Rodilleras ortopédicas para rehabilitación y deporte. Rodilleras mecánicas, elásticas y especializadas.',
    filters: ['tipo', 'marca', 'talla', 'uso'],
  },
  {
    slug: 'tobilleras',
    name: 'Tobilleras',
    description: 'Tobilleras ortopédicas elásticas, de neopreno y especializadas.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Tobilleras Ortopédicas | Ortopedia Cuernavaca',
    metaDescription: 'Tobilleras ortopédicas para soporte y rehabilitación. Tobilleras elásticas, neopreno y especializadas.',
    filters: ['tipo', 'marca', 'talla', 'uso'],
  },
  {
    slug: 'muniqueras',
    name: 'Muñequeras',
    description: 'Muñequeras ortopédicas básicas, con refuerzo y férulas de muñeca.',
    image: '/images/banners/Fajas Categoria.png',
    metaTitle: 'Muñequeras Ortopédicas | Ortopedia Cuernavaca',
    metaDescription: 'Muñequeras ortopédicas para soporte y rehabilitación. Muñequeras básicas, con refuerzo y férulas.',
    filters: ['tipo', 'marca', 'talla'],
  },
  {
    slug: 'coderas',
    name: 'Coderas',
    description: 'Coderas ortopédicas elásticas, con anillo y deportivas.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Coderas Ortopédicas | Ortopedia Cuernavaca',
    metaDescription: 'Coderas ortopédicas para soporte del codo. Coderas elásticas, con anillo y deportivas.',
    filters: ['tipo', 'marca', 'talla'],
  },
  {
    slug: 'fajas',
    name: 'Fajas',
    description: 'Fajas ortopédicas lumbosacras, para hernias, maternidad y correctores de postura.',
    image: '/images/banners/Fajas Categoria.png',
    metaTitle: 'Fajas Ortopédicas | Ortopedia Cuernavaca',
    metaDescription: 'Fajas ortopédicas para soporte lumbar, hernias y maternidad. Fajas lumbosacras y correctores de postura.',
    filters: ['tipo', 'marca', 'talla', 'uso'],
  },
  {
    slug: 'collares-cervicales',
    name: 'Collares Cervicales',
    description: 'Collares cervicales blandos, rígidos y ajustables.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Collares Cervicales | Ortopedia Cuernavaca',
    metaDescription: 'Collares cervicales ortopédicos. Collares blandos, rígidos y ajustables para soporte cervical.',
    filters: ['tipo', 'marca'],
  },
  {
    slug: 'ferulas',
    name: 'Férulas',
    description: 'Férulas ortopédicas para mano, dedos, muñeca, antebrazo y pie.',
    image: '/images/banners/Fajas Categoria.png',
    metaTitle: 'Férulas Ortopédicas | Ortopedia Cuernavaca',
    metaDescription: 'Férulas ortopédicas para inmovilización. Férulas para mano, dedos, muñeca y pie.',
    filters: ['tipo', 'marca', 'talla'],
  },
  {
    slug: 'inmovilizadores',
    name: 'Inmovilizadores',
    description: 'Inmovilizadores ortopédicos para rodilla, hombro, pulgar y dedos.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Inmovilizadores Ortopédicos | Ortopedia Cuernavaca',
    metaDescription: 'Inmovilizadores ortopédicos para rodilla, hombro y dedos. Inmovilización completa y especializada.',
    filters: ['tipo', 'marca', 'talla'],
  },
  {
    slug: 'cabestrillos',
    name: 'Cabestrillos',
    description: 'Cabestrillos ortopédicos e inmovilizadores de hombro.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Cabestrillos Ortopédicos | Ortopedia Cuernavaca',
    metaDescription: 'Cabestrillos e inmovilizadores de hombro. Soporte ortopédico para hombro y brazo.',
    filters: ['tipo', 'marca', 'talla'],
  },
  {
    slug: 'zapatos-ortopedicos',
    name: 'Zapatos Ortopédicos',
    description: 'Zapatos ortopédicos especializados para adultos e infantes.',
    image: '/images/banners/Calzado categoria.png',
    metaTitle: 'Zapatos Ortopédicos | Ortopedia Cuernavaca',
    metaDescription: 'Zapatos ortopédicos especializados. Zapatos Monto, Sandy, Dany y más. Horma estándar e inversa.',
    filters: ['marca', 'talla', 'horma', 'edad'],
  },
  {
    slug: 'tenis-ortopedicos',
    name: 'Tenis Ortopédicos',
    description: 'Tenis y calzado deportivo con características ortopédicas.',
    image: '/images/banners/Calzado categoria.png',
    metaTitle: 'Tenis Ortopédicos | Ortopedia Cuernavaca',
    metaDescription: 'Tenis y calzado deportivo ortopédico. Calzado especializado para deporte y actividad física.',
    filters: ['marca', 'talla', 'actividad'],
  },
  {
    slug: 'plantillas-ortopedicas',
    name: 'Plantillas Ortopédicas',
    description: 'Plantillas ortopédicas de gel, deportivas y personalizadas.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Plantillas Ortopédicas | Ortopedia Cuernavaca',
    metaDescription: 'Plantillas ortopédicas de gel y personalizadas. Plantillas para pie plano, fascitis plantar y más.',
    filters: ['tipo', 'material', 'uso'],
  },
  {
    slug: 'taloneras',
    name: 'Taloneras',
    description: 'Taloneras de gel y terapéuticas para alivio de presión.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Taloneras Ortopédicas | Ortopedia Cuernavaca',
    metaDescription: 'Taloneras ortopédicas de gel. Alivio de presión y fascitis plantar.',
    filters: ['tipo', 'marca'],
  },
  {
    slug: 'bastones',
    name: 'Bastones',
    description: 'Bastones ortopédicos estándar, plegables, de 4 puntos y especializados.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Bastones Ortopédicos | Ortopedia Cuernavaca',
    metaDescription: 'Bastones ortopédicos para apoyo y estabilidad. Bastones plegables, de 4 puntos y especializados.',
    filters: ['tipo', 'marca'],
  },
  {
    slug: 'muletas',
    name: 'Muletas',
    description: 'Muletas ortopédicas estándar, canadienses y ajustables.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Muletas Ortopédicas | Ortopedia Cuernavaca',
    metaDescription: 'Muletas ortopédicas para soporte y recuperación. Muletas estándar, canadienses y ajustables.',
    filters: ['tipo', 'marca', 'talla'],
  },
  {
    slug: 'sillas-de-ruedas',
    name: 'Sillas de Ruedas',
    description: 'Sillas de ruedas manuales, eléctricas, deportivas y pediátricas.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Sillas de Ruedas | Ortopedia Cuernavaca',
    metaDescription: 'Sillas de ruedas manuales y eléctricas. Sillas de ruedas deportivas y pediátricas.',
    filters: ['tipo', 'marca'],
  },
  {
    slug: 'andadores',
    name: 'Andadores',
    description: 'Andadores estándar, con ruedas, plegables y con asiento.',
    image: '/images/banners/Movilidad categoria.png',
    metaTitle: 'Andadores | Ortopedia Cuernavaca',
    metaDescription: 'Andadores ortopédicos para movilidad asistida. Andadores con ruedas, plegables y con asiento.',
    filters: ['tipo', 'marca'],
  },
  {
    slug: 'medias-compresion',
    name: 'Medias de Compresión',
    description: 'Medias y calcetines de compresión para caballero, dama y diabéticos.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Medias de Compresión | Ortopedia Cuernavaca',
    metaDescription: 'Medias y calcetines de compresión. Medias para caballero, dama, diabéticos y deportivas.',
    filters: ['tipo', 'marca', 'talla', 'sexo'],
  },
  {
    slug: 'productos-pediatricos',
    name: 'Productos Pediátricos',
    description: 'Productos ortopédicos especializados para niños.',
    image: '/images/banners/Pediatria categoria.png',
    metaTitle: 'Productos Pediátricos | Ortopedia Cuernavaca',
    metaDescription: 'Productos ortopédicos para niños. Soporte pediátrico, hernias y displasia de cadera.',
    filters: ['tipo', 'edad'],
  },
  {
    slug: 'terapia-rehabilitacion',
    name: 'Terapia y Rehabilitación',
    description: 'Compresas de gel, ejercitadores y correctores para terapia.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Terapia y Rehabilitación | Ortopedia Cuernavaca',
    metaDescription: 'Productos para terapia y rehabilitación. Compresas, ejercitadores y correctores.',
    filters: ['tipo', 'marca'],
  },
  {
    slug: 'cojines-almohadas',
    name: 'Cojines y Almohadas',
    description: 'Cojines terapéuticos tipo dona y almohadas cervicales.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Cojines y Almohadas | Ortopedia Cuernavaca',
    metaDescription: 'Cojines y almohadas terapéuticas. Alivio de presión y soporte postural.',
    filters: ['tipo', 'marca'],
  },
  {
    slug: 'equipos-medicos',
    name: 'Equipos Médicos',
    description: 'Equipos de monitoreo médico: baumanómetros, oxímetros, termómetros.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Equipos Médicos | Ortopedia Cuernavaca',
    metaDescription: 'Equipos médicos de monitoreo. Baumanómetros, oxímetros, termómetros y más.',
    filters: ['tipo', 'marca'],
  },
  {
    slug: 'mobiliario-medico',
    name: 'Mobiliario Médico',
    description: 'Mobiliario médico especializado: colchones, elevadores y mobiliario de apoyo.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Mobiliario Médico | Ortopedia Cuernavaca',
    metaDescription: 'Mobiliario médico especializado. Colchones, elevadores y mobiliario de apoyo.',
    filters: ['tipo', 'marca'],
  },
  {
    slug: 'accesorios-bano',
    name: 'Accesorios de Baño',
    description: 'Accesorios de baño: barras de agarre, protectores de yeso, elevadores.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Accesorios de Baño | Ortopedia Cuernavaca',
    metaDescription: 'Accesorios de baño para seguridad. Barras de agarre, protectores y elevadores.',
    filters: ['tipo', 'marca'],
  },
  {
    slug: 'separadores-alineadores',
    name: 'Separadores y Alineadores',
    description: 'Separadores y alineadores de dedos para corrección de deformidades.',
    image: '/images/banners/Plantillas categoria.png',
    metaTitle: 'Separadores y Alineadores | Ortopedia Cuernavaca',
    metaDescription: 'Separadores y alineadores de pie. Corrección de deformidades y alineación correcta.',
    filters: ['tipo', 'marca'],
  },
];
```

---

### FASE 5: Implementación de Filtros

#### Estructura de Filtros por Categoría

**Filtros Comunes:**
- `marca` - Marca del producto
- `talla` - Talla del producto
- `precio_min` - Precio mínimo
- `precio_max` - Precio máximo
- `stock` - Disponibilidad (en_stock, agotado)

**Filtros Específicos por Categoría:**

**Rodilleras:**
- `tipo`: elastica, mecanica, deportiva, especializada
- `uso`: rehabilitacion, deportivo, diario

**Tobilleras:**
- `tipo`: elastica, neopreno, tipo-8, banda
- `uso`: rehabilitacion, deportivo

**Fajas:**
- `tipo`: lumbosacra, hernia-umbilical, hernia-inguinal, maternidad, corrector-postura
- `uso`: diario, postparto, postquirurgico

**Zapatos Ortopédicos:**
- `marca`: monto, sandy, dany, alisa, sultanin, dinky, ortofántini
- `horma`: estandar, inversa, especial
- `edad`: adulto, infantil, adolescente

**Tenis Ortopédicos:**
- `actividad`: caminar, correr, entrenamiento, deporte-especifico
- `tipo`: pie-plano, pronacion, supinacion

**Plantillas:**
- `tipo`: gel, deportiva, personalizada, cuero
- `uso`: pie-plano, fascitis-plantar, diabetes, juanetes

**Medias de Compresión:**
- `sexo`: caballero, dama, unisex
- `tipo`: pantimedia, calcetin, tobimedia
- `compresion`: baja, media, alta, antiembolica

---

### FASE 6: Redirecciones y URLs Antiguas

#### Crear Tabla de Redirecciones

```sql
CREATE TABLE IF NOT EXISTS redirects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    old_url VARCHAR(500) UNIQUE NOT NULL,
    new_url VARCHAR(500) NOT NULL,
    redirect_type ENUM('301', '302') DEFAULT '301',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_old_url (old_url)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### Redirecciones Necesarias

```sql
INSERT INTO redirects (old_url, new_url, redirect_type) VALUES
VALUES
('/categoria/soportes-y-ortesis/rodilleras', '/categoria/rodilleras', '301'),
('/categoria/soportes-y-ortesis/tobilleras', '/categoria/tobilleras', '301'),
('/categoria/movilidad-y-ayudas-para-caminar/bastones', '/categoria/bastones', '301'),
('/categoria/movilidad-y-ayudas-para-caminar/muletas', '/categoria/muletas', '301'),
('/categoria/movilidad-y-ayudas-para-caminar/sillas-de-ruedas', '/categoria/sillas-de-ruedas', '301'),
('/categoria/calzado-ortopedico/zapatos-ortopedicos', '/categoria/zapatos-ortopedicos', '301'),
('/categoria/calzado-ortopedico/tenis-ortopedicos', '/categoria/tenis-ortopedicos', '301');
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Base de Datos
- [ ] Crear tabla `categorias_normalizadas`
- [ ] Insertar las 25 categorías normalizadas
- [ ] Crear tabla `redirects` para redirecciones
- [ ] Ejecutar script de migración de categorías
- [ ] Verificar que todos los productos tengan categoría asignada
- [ ] Crear índices necesarios

### Backend
- [ ] Actualizar `src/lib/db.js` para usar categorías normalizadas
- [ ] Actualizar función `getCategories()` para obtener de `categorias_normalizadas`
- [ ] Actualizar función `getProducts()` para filtrar por slug de categoría
- [ ] Implementar sistema de filtros por query parameters
- [ ] Crear API para redirecciones (`/api/redirect/[old-url]`)

### Frontend
- [ ] Actualizar `src/data/categories.config.js` con nuevas categorías
- [ ] Actualizar componente de navegación de categorías
- [ ] Implementar breadcrumbs en páginas de categoría
- [ ] Implementar sistema de filtros en páginas de categoría
- [ ] Actualizar meta tags dinámicos por categoría
- [ ] Implementar schema markup (CollectionPage)
- [ ] Crear páginas de categoría dinámicas (`/categoria/[slug]`)

### SEO
- [ ] Implementar meta titles y descriptions por categoría
- [ ] Crear sitemap.xml con todas las categorías
- [ ] Implementar canonical URLs
- [ ] Implementar breadcrumbs con schema.org
- [ ] Verificar que todas las URLs sean amigables
- [ ] Configurar redirecciones 301 para URLs antiguas

### Testing
- [ ] Probar navegación entre categorías
- [ ] Probar filtros en cada categoría
- [ ] Verificar que todos los productos se muestren correctamente
- [ ] Probar redirecciones de URLs antiguas
- [ ] Verificar meta tags en cada página de categoría
- [ ] Probar búsqueda de productos

---

## 📊 ESTRUCTURA FINAL RESUMIDA

### Categorías Principales (25)
1. Rodilleras
2. Tobilleras
3. Muñequeras
4. Coderas
5. Fajas
6. Collares Cervicales
7. Férulas
8. Inmovilizadores
9. Cabestrillos
10. Zapatos Ortopédicos
11. Tenis Ortopédicos
12. Plantillas Ortopédicas
13. Taloneras
14. Bastones
15. Muletas
16. Sillas de Ruedas
17. Andadores
18. Medias de Compresión
19. Productos Pediátricos
20. Terapia y Rehabilitación
21. Cojines y Almohadas
22. Equipos Médicos
23. Mobiliario Médico
24. Accesorios de Baño
25. Separadores y Alineadores

### Características SEO
- ✅ URLs planas (1 nivel máximo)
- ✅ Keywords en el slug
- ✅ URLs cortas y descriptivas
- ✅ Filtros en lugar de subcategorías
- ✅ Meta tags optimizados
- ✅ Breadcrumbs implementados
- ✅ Schema markup

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

1. **Revisar y aprobar** esta estructura final
2. **Ejecutar scripts SQL** para crear tablas y categorías
3. **Ejecutar script de migración** para actualizar productos
4. **Actualizar frontend** con nuevas categorías
5. **Implementar filtros** en páginas de categoría
6. **Configurar redirecciones** para URLs antiguas
7. **Probar y validar** toda la implementación

---

## 📝 NOTAS FINALES

- **Estructura optimizada para SEO**: URLs planas, keywords al inicio, máximo 2 niveles
- **Filtros en lugar de subcategorías**: Mejor para SEO y UX
- **25 categorías principales**: Suficiente para organizar todos los productos
- **Fácil escalabilidad**: Agregar nuevas categorías sin afectar estructura existente
- **Compatibilidad**: Mantiene compatibilidad con estructura actual durante migración

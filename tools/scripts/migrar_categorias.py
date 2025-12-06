#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import mysql.connector

# Configuración
DB_CONFIG = {
    'host': 'localhost',
    'database': 'ortopedia_cuernavaca',
    'user': 'root',
    'password': 'Z@nahoria1909',
    'charset': 'utf8mb4'
}

# Mapeo de categorías antiguas a nuevas
CATEGORY_MAPPING = {
    'Rodilleras elásticas abiertas sencillas': 'rodilleras',
    'Rodilleras': 'rodilleras',
    'Tobilleras y bolsas': 'tobilleras',
    'Tobilleras en banda y soportes': 'tobilleras',
    'Tobilleras': 'tobilleras',
    'Muñequeras, férulas y tobilleras': 'muniqueras',
    'Muñequeras': 'muniqueras',
    'Coderas': 'coderas',
    'Fajas, soportes y órtesis': 'fajas',
    'Fajas, soportes y correctores': 'fajas',
    'Fajas, férulas y soportes': 'fajas',
    'Fajas, férulas, soportes y ortesis': 'fajas',
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
    'Ayudas de movilidad': 'bastones',
    'Sillas y mobiliario': 'mobiliario-medico',
    'Medias y calcetines': 'medias-compresion',
    'Pediátricos / Hernias / Inguinal': 'productos-pediatricos',
    'Rehabilitación': 'terapia-rehabilitacion',
    'Terapia y Rehabilitación': 'terapia-rehabilitacion',
    'Cojines y almohadas': 'cojines-almohadas',
    'Regatones, cojines y accesorios de apoyo': 'bastones',
    'Equipos médicos': 'equipos-medicos',
    'Accesorios baño': 'accesorios-bano',
    'Separadores': 'separadores-alineadores',
    'Alineadores': 'separadores-alineadores',
    'Correctores y estabilizadores': 'fajas',
    'Cinturones, rodilleras y compresas': 'fajas',
    'Protectores de muslo': 'rodilleras',
}

def slugify(text):
    """Convertir texto a slug"""
    import re
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text

conn = mysql.connector.connect(**DB_CONFIG)
cursor = conn.cursor()

print("=" * 70)
print("MIGRACION DE CATEGORIAS")
print("=" * 70)

# 1. Obtener categorías normalizadas
print("\n1. Obteniendo categorias normalizadas...")
cursor.execute("SELECT id, slug FROM categorias_normalizadas")
normalized = {slug: cat_id for cat_id, slug in cursor.fetchall()}
print(f"   OK: {len(normalized)} categorias normalizadas encontradas")

# 2. Obtener categorías actuales de productos
print("\n2. Obteniendo categorias actuales de productos...")
cursor.execute("SELECT DISTINCT categoria FROM productos WHERE categoria IS NOT NULL AND categoria != ''")
old_categories = [row[0] for row in cursor.fetchall()]
print(f"   OK: {len(old_categories)} categorias distintas encontradas")

# 3. Migrar productos
print("\n3. Migrando productos...")
stats = {'migrados': 0, 'sin_mapeo': 0, 'redirects': 0}

for old_cat in old_categories:
    # Buscar mapeo
    new_slug = None
    if old_cat in CATEGORY_MAPPING:
        new_slug = CATEGORY_MAPPING[old_cat]
    else:
        # Buscar coincidencia parcial
        for key, value in CATEGORY_MAPPING.items():
            if key.lower() in old_cat.lower() or old_cat.lower() in key.lower():
                new_slug = value
                break
    
    if new_slug and new_slug in normalized:
        new_cat_id = normalized[new_slug]
        # Actualizar productos
        cursor.execute(
            "UPDATE productos SET categoria_id = %s WHERE categoria = %s AND (categoria_id IS NULL OR categoria_id != %s)",
            (new_cat_id, old_cat, new_cat_id)
        )
        updated = cursor.rowcount
        if updated > 0:
            stats['migrados'] += updated
            print(f"   OK: '{old_cat}' -> '{new_slug}' ({updated} productos)")
            
            # Registrar redirección
            old_slug = slugify(old_cat)
            if old_slug != new_slug:
                try:
                    cursor.execute(
                        "INSERT INTO redirects (old_path, new_path) VALUES (%s, %s) ON DUPLICATE KEY UPDATE new_path = VALUES(new_path)",
                        (f"/categoria/{old_slug}", f"/categoria/{new_slug}")
                    )
                    stats['redirects'] += 1
                except:
                    pass
    else:
        stats['sin_mapeo'] += 1
        print(f"   ADVERTENCIA: '{old_cat}' sin mapeo")

conn.commit()

# 4. Verificar resultados
print("\n4. Verificando resultados...")
cursor.execute("SELECT COUNT(*) FROM productos WHERE categoria_id IS NOT NULL")
con_categoria = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM productos")
total = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM redirects")
total_redirects = cursor.fetchone()[0]

print("\n" + "=" * 70)
print("RESUMEN")
print("=" * 70)
print(f"Productos migrados: {stats['migrados']}")
print(f"Categorias sin mapeo: {stats['sin_mapeo']}")
print(f"Redirecciones creadas: {stats['redirects']}")
print(f"Productos con categoria_id: {con_categoria} / {total}")
print(f"Total redirecciones en BD: {total_redirects}")
print("=" * 70)

cursor.close()
conn.close()


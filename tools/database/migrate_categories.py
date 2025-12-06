#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de migración de categorías antiguas a categorías normalizadas
Ortopedia Cuernavaca
"""

import mysql.connector
from mysql.connector import Error

# Configuración de base de datos
DB_CONFIG = {
    'host': 'localhost',
    'database': 'ortopedia_cuernavaca',
    'user': 'root',
    'password': 'Z@nahoria1909',
    'charset': 'utf8mb4',
    'collation': 'utf8mb4_unicode_ci'
}

# Mapeo de categorías antiguas a nuevas (slug)
CATEGORY_MAPPING = {
    'Rodilleras elásticas abiertas sencillas': 'rodilleras',
    'Rodilleras': 'rodilleras',
    'Tobilleras y bolsas': 'tobilleras',
    'Tobilleras en banda y soportes': 'tobilleras',
    'Tobilleras': 'tobilleras',
    'Muñequeras, férulas y tobilleras': 'muniqueras',  # Revisar manualmente si hay férulas
    'Muñequeras': 'muniqueras',
    'Coderas': 'coderas',
    'Fajas, soportes y órtesis': 'fajas',
    'Fajas, soportes y correctores': 'fajas',
    'Fajas, férulas y soportes': 'fajas',  # Revisar manualmente si hay férulas
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
    'Ayudas de movilidad': 'bastones',  # Revisar manualmente - puede ser bastones, muletas, etc.
    'Sillas y mobiliario': 'mobiliario-medico',
    'Medias y calcetines': 'medias-compresion',
    'Pediátricos / Hernias / Inguinal': 'productos-pediatricos',
    'Rehabilitación': 'terapia-rehabilitacion',
    'Terapia y Rehabilitación': 'terapia-rehabilitacion',
    'Cojines y almohadas': 'cojines-almohadas',
    'Regatones, cojines y accesorios de apoyo': 'bastones',  # Regatones van a bastones
    'Equipos médicos': 'equipos-medicos',
    'Accesorios baño': 'accesorios-bano',
    'Separadores': 'separadores-alineadores',
    'Alineadores': 'separadores-alineadores',
    'Correctores y estabilizadores': 'fajas',  # Revisar manualmente
    'Cinturones, rodilleras y compresas': 'fajas',  # Cinturones van a fajas
    'Protectores de muslo': 'rodilleras',
    'Insumos médicos / ortopédicos': 'equipos-medicos',  # Revisar manualmente
    'Accesorios y otros': None,  # NO mantener - reasignar manualmente
}

def get_normalized_category_id(cursor, slug):
    """Obtener ID de categoría normalizada por slug"""
    cursor.execute("SELECT id FROM categorias_normalizadas WHERE slug = %s", (slug,))
    result = cursor.fetchone()
    return result[0] if result else None

def migrate_categories():
    """Migrar categorías antiguas a categorías normalizadas"""
    conn = None
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        print("=" * 70)
        print("MIGRACION DE CATEGORIAS - ORTOPEDIA CUERNAVACA")
        print("=" * 70)
        
        # Obtener todas las categorías actuales
        cursor.execute("SELECT id, nombre FROM categorias ORDER BY nombre")
        current_categories = cursor.fetchall()
        
        print(f"\nCategorias actuales encontradas: {len(current_categories)}")
        
        # Estadísticas
        stats = {
            'migradas': 0,
            'sin_mapeo': 0,
            'productos_actualizados': 0,
            'categorias_sin_productos': 0
        }
        
        categorias_sin_mapeo = []
        
        # Procesar cada categoría
        for cat_id, cat_name in current_categories:
            print(f"\nProcesando: '{cat_name}' (ID: {cat_id})")
            
            # Verificar si hay productos en esta categoría
            cursor.execute("SELECT COUNT(*) FROM productos WHERE categoria_id = %s", (cat_id,))
            product_count = cursor.fetchone()[0]
            
            if product_count == 0:
                print(f"  - Sin productos, saltando...")
                stats['categorias_sin_productos'] += 1
                continue
            
            # Buscar mapeo
            if cat_name in CATEGORY_MAPPING:
                new_slug = CATEGORY_MAPPING[cat_name]
                
                if new_slug is None:
                    print(f"  - ADVERTENCIA: Categoria '{cat_name}' debe reasignarse manualmente")
                    categorias_sin_mapeo.append((cat_id, cat_name, product_count))
                    stats['sin_mapeo'] += 1
                    continue
                
                # Obtener ID de categoría normalizada
                new_cat_id = get_normalized_category_id(cursor, new_slug)
                
                if new_cat_id:
                    # Actualizar productos
                    cursor.execute(
                        "UPDATE productos SET categoria_id = %s WHERE categoria_id = %s",
                        (new_cat_id, cat_id)
                    )
                    updated = cursor.rowcount
                    stats['productos_actualizados'] += updated
                    stats['migradas'] += 1
                    print(f"  - OK: Migrados {updated} productos a '{new_slug}'")
                else:
                    print(f"  - ERROR: Categoria normalizada '{new_slug}' no encontrada")
                    categorias_sin_mapeo.append((cat_id, cat_name, product_count))
                    stats['sin_mapeo'] += 1
            else:
                print(f"  - ADVERTENCIA: Sin mapeo definido para '{cat_name}'")
                categorias_sin_mapeo.append((cat_id, cat_name, product_count))
                stats['sin_mapeo'] += 1
        
        # Commit de cambios
        conn.commit()
        
        # Mostrar resumen
        print("\n" + "=" * 70)
        print("RESUMEN DE MIGRACION")
        print("=" * 70)
        print(f"Categorias migradas: {stats['migradas']}")
        print(f"Productos actualizados: {stats['productos_actualizados']}")
        print(f"Categorias sin mapeo: {stats['sin_mapeo']}")
        print(f"Categorias sin productos: {stats['categorias_sin_productos']}")
        
        if categorias_sin_mapeo:
            print("\n" + "=" * 70)
            print("CATEGORIAS QUE REQUIEREN REVISION MANUAL:")
            print("=" * 70)
            for cat_id, cat_name, product_count in categorias_sin_mapeo:
                print(f"  - ID {cat_id}: '{cat_name}' ({product_count} productos)")
        
        # Verificar productos sin categoría
        cursor.execute("SELECT COUNT(*) FROM productos WHERE categoria_id IS NULL")
        sin_categoria = cursor.fetchone()[0]
        if sin_categoria > 0:
            print(f"\nADVERTENCIA: {sin_categoria} productos sin categoria asignada")
        
        print("\n" + "=" * 70)
        print("MIGRACION COMPLETADA")
        print("=" * 70)
        
    except Error as e:
        print(f"\nERROR: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    migrate_categories()


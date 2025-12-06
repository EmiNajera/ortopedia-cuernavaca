#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    database='ortopedia_cuernavaca',
    user='root',
    password='Z@nahoria1909',
    charset='utf8mb4'
)
cursor = conn.cursor()

# Mapeo específico basado en el nombre del producto
# Esto corrige productos que fueron mal categorizados
correcciones = {
    # Equipos médicos
    'baumanómetro': 'equipos-medicos',
    'estetoscopio': 'equipos-medicos',
    'oxímetro': 'equipos-medicos',
    'termómetro': 'equipos-medicos',
    'espirómetro': 'equipos-medicos',
    
    # Accesorios de baño
    'bolsa recolectora': 'accesorios-bano',
    'recolectora de orina': 'accesorios-bano',
    'elevador para inodoro': 'accesorios-bano',
    'barra de agarre': 'accesorios-bano',
    'silla de baño': 'accesorios-bano',
    'silla de ducha': 'accesorios-bano',
    
    # Fajas
    'faja lumbosacra': 'fajas',
    'faja inguinal': 'fajas',
    'faja para hernia': 'fajas',
    'espaldera': 'fajas',
    'tirante para corregir': 'fajas',
    'corrector de postura': 'fajas',
    'corset': 'fajas',
    
    # Inmovilizadores
    'inmovilizador de hombro': 'inmovilizadores',
    'correa reforzada para clavícula': 'inmovilizadores',
    'inmovilizador de rodilla': 'inmovilizadores',
    'inmovilizador de pulgar': 'inmovilizadores',
    
    # Cojines y almohadas
    'cojín de fredyka': 'cojines-almohadas',
    'cojín metatarsico': 'plantillas-ortopedicas',
    'cojín tipo dona': 'cojines-almohadas',
    'almohada cervical': 'cojines-almohadas',
    
    # Tobilleras
    'soporte tobillo': 'tobilleras',
    'tobillera': 'tobilleras',
    'talón de aquiles': 'tobilleras',
    
    # Muñequeras
    'muñequera': 'muniqueras',
    
    # Férulas
    'férula para muñeca': 'ferulas',
    'férula para mano': 'ferulas',
    'férula para dedo': 'ferulas',
    'férula para pie': 'ferulas',
    
    # Bastones y muletas
    'regatón para bastón': 'bastones',
    'regatón para muleta': 'muletas',
    'bastón': 'bastones',
    'muleta': 'muletas',
    
    # Plantillas
    'plantilla': 'plantillas-ortopedicas',
    'talonera': 'taloneras',
}

# Obtener categorías normalizadas
cursor.execute("SELECT id, slug FROM categorias_normalizadas")
normalized = {slug: cat_id for cat_id, slug in cursor.fetchall()}

# Obtener todos los productos en rodilleras
cursor.execute("""
    SELECT p.id, p.nombre_producto, c.id as cat_id
    FROM productos p 
    JOIN categorias_normalizadas c ON p.categoria_id = c.id 
    WHERE c.slug = 'rodilleras'
""")
productos_rodilleras = cursor.fetchall()

print("=" * 70)
print("CORRECCION DE CATEGORIAS EN RODILLERAS")
print("=" * 70)
print(f"\nTotal productos en rodilleras: {len(productos_rodilleras)}")

corregidos = 0
sin_correccion = []

for prod_id, nombre, cat_id in productos_rodilleras:
    nombre_lower = nombre.lower()
    categoria_encontrada = None
    
    # Buscar coincidencia en las correcciones
    for keyword, new_slug in correcciones.items():
        if keyword in nombre_lower:
            categoria_encontrada = new_slug
            break
    
    # Si no es una rodillera real, moverla
    if categoria_encontrada and categoria_encontrada != 'rodilleras':
        if categoria_encontrada in normalized:
            new_cat_id = normalized[categoria_encontrada]
            cursor.execute(
                "UPDATE productos SET categoria_id = %s WHERE id = %s",
                (new_cat_id, prod_id)
            )
            corregidos += 1
            print(f"  ✓ '{nombre[:50]}...' -> {categoria_encontrada}")
    elif 'rodillera' not in nombre_lower and 'rodilla' not in nombre_lower:
        # Si no contiene "rodillera" o "rodilla", probablemente está mal categorizado
        sin_correccion.append(nombre)

conn.commit()

print(f"\nProductos corregidos: {corregidos}")
print(f"Productos sin corrección automática: {len(sin_correccion)}")

if sin_correccion:
    print("\nProductos que necesitan revisión manual:")
    for nombre in sin_correccion[:20]:  # Mostrar solo los primeros 20
        print(f"  - {nombre[:60]}...")

cursor.close()
conn.close()


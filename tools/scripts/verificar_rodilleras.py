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

print("=" * 70)
print("VERIFICACION DE PRODUCTOS EN CATEGORIA RODILLERAS")
print("=" * 70)

# Obtener ID de categoría rodilleras
cursor.execute("SELECT id, nombre FROM categorias_normalizadas WHERE slug = 'rodilleras'")
rodilleras_cat = cursor.fetchone()
if not rodilleras_cat:
    print("ERROR: No se encontró la categoría rodilleras")
    exit(1)

rodilleras_id = rodilleras_cat[0]
print(f"\nCategoria ID: {rodilleras_id} - {rodilleras_cat[1]}")

# Contar productos
cursor.execute("SELECT COUNT(*) FROM productos WHERE categoria_id = %s", (rodilleras_id,))
total = cursor.fetchone()[0]
print(f"Total productos en rodilleras: {total}")

# Obtener todos los productos con sus nombres
cursor.execute("""
    SELECT p.nombre_producto, p.codigo, p.nombre_generico
    FROM productos p
    WHERE p.categoria_id = %s
    ORDER BY p.nombre_producto
""", (rodilleras_id,))

productos = cursor.fetchall()
print(f"\nLista de productos ({len(productos)}):")
print("-" * 70)

# Analizar palabras clave que NO deberían estar en rodilleras
palabras_problema = [
    'tobillera', 'tobillo', 'muñequera', 'muñeca', 'codo', 'codera',
    'faja', 'lumbar', 'cervical', 'collar', 'ferula', 'inmovilizador',
    'cabestrillo', 'zapato', 'tenis', 'plantilla', 'talonera',
    'baston', 'muleta', 'silla', 'andador', 'media', 'calcetin',
    'pediatrico', 'cojin', 'almohada', 'equipo', 'mobiliario',
    'accesorio', 'separador', 'alineador'
]

productos_mal_categorizados = []

for nombre, codigo, generico in productos:
    nombre_lower = (nombre or '').lower()
    generico_lower = (generico or '').lower()
    texto_completo = f"{nombre_lower} {generico_lower}"
    
    # Verificar si contiene palabras que NO son de rodilleras
    problemas = []
    for palabra in palabras_problema:
        if palabra in texto_completo and 'rodillera' not in texto_completo:
            problemas.append(palabra)
    
    if problemas:
        productos_mal_categorizados.append((nombre, codigo, problemas))
        print(f"⚠️  {nombre} ({codigo})")
        print(f"   Problemas: {', '.join(problemas)}")
    else:
        print(f"✓  {nombre} ({codigo})")

print("\n" + "=" * 70)
print(f"RESUMEN:")
print(f"  Total productos: {len(productos)}")
print(f"  Posiblemente mal categorizados: {len(productos_mal_categorizados)}")
print("=" * 70)

cursor.close()
conn.close()

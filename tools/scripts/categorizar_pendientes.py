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
print("CATEGORIZACION DE PRODUCTOS PENDIENTES")
print("=" * 70)

# Mapeo de categorías pendientes
mapeos = [
    ('Deportivo', 'tenis-ortopedicos'),
    ('Insumos médicos / ortopédicos', 'equipos-medicos'),
    ('Accesorios y otros', 'accesorios-bano'),
    ('Corsets', 'fajas'),
]

total_actualizados = 0

for old_name, new_slug in mapeos:
    # Obtener ID de categoría nueva
    cursor.execute("SELECT id FROM categorias_normalizadas WHERE slug = %s", (new_slug,))
    new_cat = cursor.fetchone()
    
    if not new_cat:
        print(f"ERROR: Categoria normalizada '{new_slug}' no encontrada")
        continue
    
    new_cat_id = new_cat[0]
    
    # Obtener ID de categoría antigua
    cursor.execute("SELECT id FROM categorias WHERE nombre = %s", (old_name,))
    old_cat = cursor.fetchone()
    
    if not old_cat:
        print(f"  INFO: Categoria '{old_name}' no encontrada (puede que ya esté migrada)")
        continue
    
    old_cat_id = old_cat[0]
    
    # Contar productos antes
    cursor.execute("SELECT COUNT(*) FROM productos WHERE categoria_id = %s", (old_cat_id,))
    count_before = cursor.fetchone()[0]
    
    if count_before == 0:
        print(f"  INFO: '{old_name}' no tiene productos")
        continue
    
    # Actualizar productos
    cursor.execute(
        "UPDATE productos SET categoria_id = %s WHERE categoria_id = %s",
        (new_cat_id, old_cat_id)
    )
    updated = cursor.rowcount
    total_actualizados += updated
    
    print(f"  OK: '{old_name}' -> '{new_slug}' ({updated} productos)")

conn.commit()

# Verificar resultados
print("\n" + "=" * 70)
print("VERIFICACION FINAL")
print("=" * 70)

cursor.execute("SELECT COUNT(*) FROM productos WHERE categoria_id IS NOT NULL")
con_cat = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM productos")
total = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(DISTINCT categoria_id) FROM productos WHERE categoria_id IS NOT NULL")
cats_distintas = cursor.fetchone()[0]

print(f"Productos con categoria: {con_cat} / {total}")
print(f"Categorias distintas usadas: {cats_distintas}")
print(f"Total productos actualizados en esta ejecucion: {total_actualizados}")

# Verificar si quedan categorías sin mapear
cursor.execute("""
    SELECT c.id, c.nombre, COUNT(p.id) as total
    FROM categorias c
    LEFT JOIN productos p ON c.id = p.categoria_id
    WHERE p.categoria_id IS NOT NULL
    GROUP BY c.id, c.nombre
    HAVING total > 0
    ORDER BY total DESC
""")
categorias_restantes = cursor.fetchall()

if categorias_restantes:
    print("\nCategorias antiguas que aun tienen productos:")
    for cat_id, cat_name, count in categorias_restantes:
        # Verificar si esta categoría está en categorias_normalizadas
        cursor.execute("SELECT id FROM categorias_normalizadas WHERE id = %s", (cat_id,))
        if not cursor.fetchone():
            print(f"  - {cat_name} ({count} productos) - SIN MAPEO")

print("=" * 70)

cursor.close()
conn.close()


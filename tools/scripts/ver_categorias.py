import mysql.connector
import sys
import os

# Cambiar al directorio del script
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

try:
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='Z@nahoria1909',
        database='ortopedia_cuernavaca'
    )
    
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT 
            c.id,
            c.nombre,
            c.slug,
            COUNT(p.id) as total_productos
        FROM categorias c
        LEFT JOIN productos p ON c.id = p.categoria_id AND p.publicado = TRUE
        GROUP BY c.id, c.nombre, c.slug
        ORDER BY c.nombre
    """)
    
    categorias = cursor.fetchall()
    
    print("=" * 110)
    print("CATEGORIAS EN LA BASE DE DATOS")
    print("=" * 110)
    print(f"{'ID':<5} {'Nombre':<60} {'Slug':<40} {'Productos':<10}")
    print("-" * 110)
    
    total_productos = 0
    categorias_con_productos = 0
    
    for cat in categorias:
        cat_id, nombre, slug, productos = cat
        total_productos += productos
        if productos > 0:
            categorias_con_productos += 1
        slug_str = slug if slug else 'N/A'
        print(f"{cat_id:<5} {nombre:<60} {slug_str:<40} {productos:<10}")
    
    print("-" * 110)
    print(f"\nTotal de categorias: {len(categorias)}")
    print(f"Categorias con productos: {categorias_con_productos}")
    print(f"Total de productos publicados: {total_productos}")
    
    cursor.execute("""
        SELECT COUNT(*) 
        FROM productos 
        WHERE publicado = TRUE AND categoria_id IS NULL
    """)
    sin_categoria = cursor.fetchone()[0]
    
    if sin_categoria > 0:
        print(f"\nADVERTENCIA: {sin_categoria} productos publicados NO tienen categoria asignada")
    
    cursor.close()
    conn.close()
    
except mysql.connector.Error as err:
    print(f"Error: {err}")


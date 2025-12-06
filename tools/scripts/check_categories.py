#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import mysql.connector

try:
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='Z@nahoria1909',
        database='ortopedia_cuernavaca'
    )
    
    cursor = conn.cursor()
    
    # Obtener todas las categorías con conteo de productos
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
    print("CATEGORÍAS EN LA BASE DE DATOS")
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
    print(f"\nTotal de categorías: {len(categorias)}")
    print(f"Categorías con productos: {categorias_con_productos}")
    print(f"Total de productos publicados: {total_productos}")
    
    # Verificar productos sin categoría
    cursor.execute("""
        SELECT COUNT(*) 
        FROM productos 
        WHERE publicado = TRUE AND categoria_id IS NULL
    """)
    sin_categoria = cursor.fetchone()[0]
    
    if sin_categoria > 0:
        print(f"\n⚠️  ADVERTENCIA: {sin_categoria} productos publicados NO tienen categoría asignada")
    
    cursor.close()
    conn.close()
    
except mysql.connector.Error as err:
    print(f"Error: {err}")


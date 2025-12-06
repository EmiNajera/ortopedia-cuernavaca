#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para importar productos desde Lista de productos.md a MySQL
Uso: python import_from_markdown.py
"""

import csv
import re
import mysql.connector
from mysql.connector import Error
import sys
import os

# Configuración de la base de datos (actualiza con tus credenciales)
DB_CONFIG = {
    'host': 'localhost',
    'database': 'ortopedia_cuernavaca',
    'user': 'root',  # Cambia por tu usuario MySQL
    'password': 'Z@nahoria1909',  # Cambia por tu contraseña MySQL
    'charset': 'utf8mb4',
    'collation': 'utf8mb4_unicode_ci'
}

def generar_slug(texto):
    """Genera un slug URL-friendly desde un texto"""
    if not texto:
        return None
    # Convertir a minúsculas y reemplazar espacios
    slug = texto.lower()
    # Reemplazar caracteres especiales
    slug = re.sub(r'[àáâãäå]', 'a', slug)
    slug = re.sub(r'[èéêë]', 'e', slug)
    slug = re.sub(r'[ìíîï]', 'i', slug)
    slug = re.sub(r'[òóôõö]', 'o', slug)
    slug = re.sub(r'[ùúûü]', 'u', slug)
    slug = re.sub(r'[ñ]', 'n', slug)
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug[:200]  # Limitar longitud

def limpiar_precio(precio_str):
    """Convierte string de precio a decimal"""
    if not precio_str or precio_str == '-' or precio_str.strip() == '':
        return None
    # Remover símbolos de moneda y espacios
    precio_str = precio_str.replace('$', '').replace(',', '').strip()
    try:
        return float(precio_str)
    except:
        return None

def obtener_o_crear_categoria(cursor, nombre):
    """Obtiene o crea una categoría"""
    if not nombre or nombre == '-' or nombre.strip() == '':
        return None
    
    nombre = nombre.strip()
    
    # Buscar categoría existente
    cursor.execute("SELECT id FROM categorias WHERE nombre = %s", (nombre,))
    result = cursor.fetchone()
    if result:
        return result[0]
    
    # Crear nueva categoría
    slug = generar_slug(nombre)
    cursor.execute(
        "INSERT INTO categorias (nombre, slug) VALUES (%s, %s)",
        (nombre, slug)
    )
    return cursor.lastrowid

def obtener_o_crear_marca(cursor, nombre):
    """Obtiene o crea una marca"""
    if not nombre or nombre == '-' or nombre.strip() == '':
        return None
    
    nombre = nombre.strip()
    
    # Buscar marca existente
    cursor.execute("SELECT id FROM marcas WHERE nombre = %s", (nombre,))
    result = cursor.fetchone()
    if result:
        return result[0]
    
    # Crear nueva marca
    cursor.execute("INSERT INTO marcas (nombre) VALUES (%s)", (nombre,))
    return cursor.lastrowid

def obtener_o_crear_tipo(cursor, nombre):
    """Obtiene o crea un tipo de producto"""
    if not nombre or nombre == '-' or nombre.strip() == '':
        return None
    
    nombre = nombre.strip()
    
    # Buscar tipo existente
    cursor.execute("SELECT id FROM tipos_producto WHERE nombre = %s", (nombre,))
    result = cursor.fetchone()
    if result:
        return result[0]
    
    # Crear nuevo tipo
    cursor.execute("INSERT INTO tipos_producto (nombre) VALUES (%s)", (nombre,))
    return cursor.lastrowid

def leer_csv_desde_markdown(archivo_md):
    """Lee el CSV contenido en el archivo markdown"""
    productos = []
    
    with open(archivo_md, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Buscar la línea del encabezado (línea que contiene "Nombre Producto")
    header_line = None
    header_index = None
    
    for i, line in enumerate(lines):
        if 'Nombre Producto' in line and ',' in line:
            header_line = line.strip()
            header_index = i
            break
    
    if not header_line:
        raise ValueError("No se encontró el encabezado CSV en el archivo markdown")
    
    # Parsear encabezado
    headers = [h.strip() for h in header_line.split(',')]
    
    # Leer las líneas siguientes (productos)
    for i in range(header_index + 1, len(lines)):
        line = lines[i].strip()
        
        # Saltar líneas vacías o comentarios
        if not line or line.startswith('#') or line.startswith('##'):
            continue
        
        # Parsear línea CSV
        # Manejar campos con comillas que pueden contener comas
        reader = csv.reader([line])
        try:
            row_values = next(reader)
            
            # Asegurar que tenemos suficientes columnas
            if len(row_values) < len(headers):
                # Rellenar con valores vacíos
                row_values.extend([''] * (len(headers) - len(row_values)))
            
            # Crear diccionario
            producto = {}
            for j, header in enumerate(headers):
                if j < len(row_values):
                    producto[header] = row_values[j].strip()
                else:
                    producto[header] = ''
            
            productos.append(producto)
        except Exception as e:
            print(f"Error parseando línea {i+1}: {e}")
            continue
    
    return productos

def importar_productos(archivo_md='Lista de productos.md'):
    """Importa productos desde el archivo markdown"""
    try:
        # Verificar que el archivo existe
        if not os.path.exists(archivo_md):
            # Intentar con ruta relativa desde database/
            archivo_md = os.path.join('..', archivo_md)
            if not os.path.exists(archivo_md):
                raise FileNotFoundError(f"No se encontró el archivo {archivo_md}")
        
        # Conectar a la base de datos
        print("Conectando a MySQL...")
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()
        
        print("OK - Conectado a la base de datos MySQL")
        
        # Leer productos del archivo markdown
        print(f"\nLeyendo productos desde {archivo_md}...")
        productos_data = leer_csv_desde_markdown(archivo_md)
        print(f"OK - Encontrados {len(productos_data)} productos en el archivo")
        
        productos_importados = 0
        productos_actualizados = 0
        productos_publicados = 0
        errores = []
        
        print("\nImportando productos...")
        
        for idx, row in enumerate(productos_data, start=1):
            try:
                # Obtener valores del CSV
                nombre_producto = row.get('Nombre Producto', '').strip()
                if not nombre_producto:
                    continue
                
                # Obtener o crear relaciones
                categoria_id = obtener_o_crear_categoria(cursor, row.get('Categoria', ''))
                marca_id = obtener_o_crear_marca(cursor, row.get('Marca', ''))
                tipo_id = obtener_o_crear_tipo(cursor, row.get('Tipo', ''))
                
                # Preparar datos del producto
                codigo = row.get('Codigo', '').strip() or None
                nombre_generico = row.get('Nombre Generico', '').strip() or None
                nombre_ingles = row.get('Nombre Ingles', '').strip() or None
                descripcion = row.get('Descripción', '').strip() or None
                caracteristicas = row.get('Características', '').strip() or None
                talla = row.get('Talla', '').strip() or None
                sexo = row.get('Sexo', 'Unisex').strip() or 'Unisex'
                modelo = row.get('Modelo', '').strip() or None
                precio = limpiar_precio(row.get('Precio', ''))
                ruta_imagen = row.get('Ruta Imagen', '').strip() or None
                estado_imagen = row.get('Estado Imagen', '').strip() or 'pendiente'
                
                # Generar slug
                slug = generar_slug(nombre_producto)
                if codigo:
                    slug = f"{slug}-{codigo}" if slug else codigo
                
                # Verificar si el producto ya existe
                producto_existente = None
                if codigo:
                    cursor.execute("SELECT id FROM productos WHERE codigo = %s", (codigo,))
                    producto_existente = cursor.fetchone()
                else:
                    # Buscar por nombre y código si no hay código
                    cursor.execute(
                        "SELECT id FROM productos WHERE nombre_producto = %s AND (codigo IS NULL OR codigo = '')",
                        (nombre_producto,)
                    )
                    producto_existente = cursor.fetchone()
                
                # Determinar si debe publicarse (tiene descripción y características)
                publicado = bool(descripcion and caracteristicas)
                
                if producto_existente:
                    # Actualizar producto existente
                    producto_id = producto_existente[0]
                    cursor.execute("""
                        UPDATE productos SET
                            nombre_producto = %s,
                            nombre_generico = %s,
                            nombre_ingles = %s,
                            descripcion = %s,
                            caracteristicas = %s,
                            categoria_id = %s,
                            marca_id = %s,
                            tipo_id = %s,
                            talla = %s,
                            sexo = %s,
                            modelo = %s,
                            precio = %s,
                            ruta_imagen = %s,
                            estado_imagen = %s,
                            slug = %s,
                            publicado = %s
                        WHERE id = %s
                    """, (
                        nombre_producto,
                        nombre_generico,
                        nombre_ingles,
                        descripcion,
                        caracteristicas,
                        categoria_id,
                        marca_id,
                        tipo_id,
                        talla,
                        sexo,
                        modelo,
                        precio,
                        ruta_imagen,
                        estado_imagen,
                        slug,
                        publicado,
                        producto_id
                    ))
                    productos_actualizados += 1
                    if publicado:
                        productos_publicados += 1
                else:
                    # Insertar nuevo producto
                    cursor.execute("""
                        INSERT INTO productos (
                            codigo, nombre_producto, nombre_generico, nombre_ingles,
                            descripcion, caracteristicas, categoria_id, marca_id, tipo_id,
                            talla, sexo, modelo, precio, ruta_imagen, estado_imagen, slug, publicado
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (
                        codigo,
                        nombre_producto,
                        nombre_generico,
                        nombre_ingles,
                        descripcion,
                        caracteristicas,
                        categoria_id,
                        marca_id,
                        tipo_id,
                        talla,
                        sexo,
                        modelo,
                        precio,
                        ruta_imagen,
                        estado_imagen,
                        slug,
                        publicado
                    ))
                    productos_importados += 1
                    if publicado:
                        productos_publicados += 1
                
                # Commit cada 50 productos
                if (productos_importados + productos_actualizados) % 50 == 0:
                    connection.commit()
                    print(f"  Procesados {productos_importados + productos_actualizados} productos...")
            
            except Exception as e:
                errores.append(f"Linea {idx} ({nombre_producto}): {str(e)}")
                print(f"  ADVERTENCIA - Error en linea {idx}: {str(e)}")
                continue
        
        # Commit final
        connection.commit()
        
        print(f"\n{'='*50}")
        print(f"=== Resumen de Importación ===")
        print(f"{'='*50}")
        print(f"OK - Productos nuevos: {productos_importados}")
        print(f"OK - Productos actualizados: {productos_actualizados}")
        print(f"OK - Total procesados: {productos_importados + productos_actualizados}")
        print(f"OK - Productos publicados: {productos_publicados}")
        print(f"ADVERTENCIA - Errores: {len(errores)}")
        
        if errores:
            print(f"\nPrimeros errores encontrados:")
            for error in errores[:10]:
                print(f"  - {error}")
            if len(errores) > 10:
                print(f"  ... y {len(errores) - 10} errores más")
        
        print(f"\n{'='*50}")
        
    except Error as e:
        print(f"\nERROR - Error de base de datos: {e}")
        sys.exit(1)
    except FileNotFoundError as e:
        print(f"\nERROR - {e}")
        print(f"   Asegurate de que el archivo 'Lista de productos.md' este en el directorio raiz del proyecto")
        sys.exit(1)
    except Exception as e:
        print(f"\nERROR - Error inesperado: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()
            print("OK - Conexion cerrada")

if __name__ == '__main__':
    print("="*50)
    print("=== Importador de Productos desde Markdown ===")
    print("="*50)
    print("\nAsegúrate de haber:")
    print("  1. Creado la base de datos: ortopedia_cuernavaca")
    print("  2. Ejecutado el esquema: schema.sql")
    print("  3. Configurado DB_CONFIG con tus credenciales")
    print()
    
    # Verificar configuración
    if DB_CONFIG['user'] == 'root' and DB_CONFIG['password'] == '':
        print("⚠️  ADVERTENCIA: Usando configuración por defecto (root sin contraseña)")
        print("   Si tu MySQL tiene contraseña, actualiza DB_CONFIG en el script")
        respuesta = input("\n¿Continuar? (s/n): ")
        if respuesta.lower() != 's':
            sys.exit(0)
    
    importar_productos()


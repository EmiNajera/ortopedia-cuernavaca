#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para generar rutas de imágenes automáticamente basándose en el código del producto
y organizarlas por categoría
"""

import csv
import re
import os

def generar_slug_categoria(categoria):
    """Genera un slug para la categoría"""
    if not categoria:
        return 'otros'
    
    slug = categoria.lower()
    # Reemplazar caracteres especiales
    slug = re.sub(r'[àáâãäå]', 'a', slug)
    slug = re.sub(r'[èéêë]', 'e', slug)
    slug = re.sub(r'[ìíîï]', 'i', slug)
    slug = re.sub(r'[òóôõö]', 'o', slug)
    slug = re.sub(r'[ùúûü]', 'u', slug)
    slug = re.sub(r'[ñ]', 'n', slug)
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

def generar_ruta_imagen(codigo, categoria, base_path='/public/images/products'):
    """Genera la ruta de imagen basándose en código y categoría"""
    if not codigo or codigo == '-':
        return None
    
    # Limpiar código
    codigo_limpio = str(codigo).strip().replace(' ', '-').upper()
    
    # Generar slug de categoría
    categoria_slug = generar_slug_categoria(categoria)
    
    # Rutas posibles (intentar diferentes extensiones)
    rutas_posibles = [
        f"{base_path}/{categoria_slug}/{codigo_limpio}.jpg",
        f"{base_path}/{categoria_slug}/{codigo_limpio}.jpeg",
        f"{base_path}/{categoria_slug}/{codigo_limpio}.png",
        f"{base_path}/{categoria_slug}/producto-{codigo_limpio}.jpg",
    ]
    
    # Retornar la primera ruta (el sistema verificará si existe)
    return rutas_posibles[0]

def actualizar_rutas_imagenes(archivo_csv='Lista de productos.md', output_file='Lista de productos_con_rutas.md'):
    """Actualiza el CSV con rutas de imágenes generadas"""
    
    productos_actualizados = 0
    
    with open(archivo_csv, 'r', encoding='utf-8') as f_in:
        lines = f_in.readlines()
    
    with open(output_file, 'w', encoding='utf-8') as f_out:
        for i, line in enumerate(lines):
            line = line.rstrip()
            
            # Si es el encabezado, mantenerlo
            if i == 2:  # Línea del encabezado (índice 2)
                f_out.write(line + '\n')
                continue
            
            # Si es una línea de producto
            if line and not line.startswith('#') and ',' in line:
                # Parsear la línea
                parts = []
                in_quotes = False
                current = ''
                
                for char in line:
                    if char == '"':
                        in_quotes = not in_quotes
                        current += char
                    elif char == ',' and not in_quotes:
                        parts.append(current)
                        current = ''
                    else:
                        current += char
                if current:
                    parts.append(current)
                
                # Si tiene menos de 15 columnas, agregar las faltantes
                while len(parts) < 15:
                    parts.append('')
                
                # Obtener código y categoría
                codigo = parts[3].strip('"') if len(parts) > 3 else ''
                categoria = parts[7].strip('"') if len(parts) > 7 else ''
                
                # Si no tiene ruta de imagen, generarla
                if len(parts) > 13 and (not parts[13] or parts[13].strip() == ''):
                    ruta = generar_ruta_imagen(codigo, categoria)
                    if ruta:
                        parts[13] = f'"{ruta}"'
                        productos_actualizados += 1
                
                # Si no tiene estado, poner 'pendiente'
                if len(parts) > 14 and (not parts[14] or parts[14].strip() == ''):
                    parts[14] = 'pendiente'
                
                # Escribir línea actualizada
                f_out.write(','.join(parts) + '\n')
            else:
                # Mantener líneas de comentarios y espacios
                f_out.write(line + '\n')
    
    print(f"✅ Actualizados {productos_actualizados} productos con rutas de imagen generadas")
    print(f"📁 Archivo guardado como: {output_file}")

if __name__ == '__main__':
    print("=== Generador de Rutas de Imágenes ===")
    print()
    actualizar_rutas_imagenes()



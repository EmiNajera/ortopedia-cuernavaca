#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import csv
import re

categorias = set()

with open('Lista de productos.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    
    # Encontrar el índice de la columna Categoria
    header = lines[2].strip()
    headers = [h.strip() for h in header.split(',')]
    
    try:
        cat_idx = headers.index('Categoria')
    except ValueError:
        print("No se encontró la columna 'Categoria'")
        exit(1)
    
    # Extraer categorías de cada línea
    for line in lines[3:]:
        if not line.strip() or line.startswith('#'):
            continue
        
        # Dividir por comas, pero respetar comillas
        parts = []
        current = ''
        in_quotes = False
        
        for char in line:
            if char == '"':
                in_quotes = not in_quotes
            elif char == ',' and not in_quotes:
                parts.append(current.strip())
                current = ''
                continue
            current += char
        
        if current:
            parts.append(current.strip())
        
        if len(parts) > cat_idx:
            cat = parts[cat_idx].strip().strip('"').strip()
            if cat and cat != '-' and cat != 'Categoria':
                categorias.add(cat)

print("CATEGORIAS ENCONTRADAS EN EL ARCHIVO:")
print("=" * 80)
for cat in sorted(categorias):
    print(f"- {cat}")
print(f"\nTotal: {len(categorias)} categorías únicas")


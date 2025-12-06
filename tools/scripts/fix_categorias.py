import mysql.connector

conn = mysql.connector.connect(host='localhost', database='ortopedia_cuernavaca', user='root', password='Z@nahoria1909', charset='utf8mb4')
cursor = conn.cursor()

mapeos = [
    ('Deportivo', 'tenis-ortopedicos'),
    ('Insumos médicos / ortopédicos', 'equipos-medicos'),
    ('Accesorios y otros', 'accesorios-bano'),
    ('Corsets', 'fajas'),
]

print("Categorizando productos pendientes...")
total = 0

for old_name, new_slug in mapeos:
    cursor.execute("SELECT id FROM categorias_normalizadas WHERE slug = %s", (new_slug,))
    new_cat = cursor.fetchone()
    if not new_cat:
        print(f"ERROR: {new_slug} no encontrada")
        continue
    
    cursor.execute("SELECT id FROM categorias WHERE nombre = %s", (old_name,))
    old_cat = cursor.fetchone()
    if not old_cat:
        print(f"INFO: {old_name} no encontrada")
        continue
    
    cursor.execute("UPDATE productos SET categoria_id = %s WHERE categoria_id = %s", (new_cat[0], old_cat[0]))
    updated = cursor.rowcount
    total += updated
    print(f"OK: {old_name} -> {new_slug} ({updated} productos)")

conn.commit()
print(f"\nTotal actualizados: {total}")

cursor.execute("SELECT COUNT(*) FROM productos WHERE categoria_id IS NOT NULL")
print(f"Productos con categoria: {cursor.fetchone()[0]}/362")

cursor.close()
conn.close()


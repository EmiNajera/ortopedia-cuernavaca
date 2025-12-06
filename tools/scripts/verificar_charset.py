import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    database='ortopedia_cuernavaca',
    user='root',
    password='Z@nahoria1909',
    charset='utf8mb4',
    collation='utf8mb4_unicode_ci'
)
cursor = conn.cursor()

print("Verificando charset de la base de datos...")
cursor.execute("SHOW VARIABLES LIKE 'character_set%'")
print("\nVariables de charset:")
for row in cursor.fetchall():
    print(f"  {row[0]}: {row[1]}")

cursor.execute("SELECT nombre, descripcion FROM categorias_normalizadas WHERE slug='rodilleras'")
cat = cursor.fetchone()
if cat:
    print(f"\nCategoria rodilleras (raw):")
    print(f"  Nombre: {repr(cat[0])}")
    print(f"  Descripcion: {repr(cat[1][:50])}...")
    print(f"\nCategoria rodilleras (decoded):")
    print(f"  Nombre: {cat[0]}")
    print(f"  Descripcion: {cat[1][:50]}...")

# Verificar charset de la tabla
cursor.execute("SHOW CREATE TABLE categorias_normalizadas")
create_table = cursor.fetchone()
if create_table:
    print("\nCharset de la tabla categorias_normalizadas:")
    if 'utf8mb4' in create_table[1]:
        print("  OK: Tabla usa utf8mb4")
    else:
        print("  ERROR: Tabla NO usa utf8mb4")
        print(f"  SQL: {create_table[1][:200]}...")

cursor.close()
conn.close()


#!/usr/bin/env python3
# -*- coding: utf-8 -*-
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

# Asegurar que la tabla use utf8mb4
print("Convirtiendo tabla a utf8mb4...")
cursor.execute("ALTER TABLE categorias_normalizadas CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
print("OK: Tabla convertida")

# Actualizar todas las categorías con la codificación correcta
updates = [
    ('rodilleras', 'Rodilleras Ortopédicas', 'Rodilleras ortopédicas para rehabilitación, deporte y soporte. Rodilleras mecánicas, elásticas y especializadas.'),
    ('tobilleras', 'Tobilleras Ortopédicas', 'Tobilleras ortopédicas elásticas, de neopreno y especializadas para soporte y rehabilitación del tobillo.'),
    ('muniqueras', 'Muñequeras Ortopédicas', 'Muñequeras ortopédicas básicas, con refuerzo y férulas de muñeca para soporte y rehabilitación.'),
    ('coderas', 'Coderas Ortopédicas', 'Coderas ortopédicas elásticas, con anillo y deportivas para soporte del codo y tratamiento de epicondilitis.'),
    ('fajas', 'Fajas Ortopédicas', 'Fajas ortopédicas lumbosacras, para hernias, maternidad y correctores de postura.'),
    ('collares-cervicales', 'Collares y Ortesis Cervicales', 'Collares cervicales blandos, rígidos y ajustables para inmovilización y soporte cervical.'),
    ('ferulas', 'Férulas Ortopédicas', 'Férulas ortopédicas para mano, dedos, muñeca, antebrazo y pie. Férulas estándar y dinámicas.'),
    ('inmovilizadores', 'Inmovilizadores Ortopédicos', 'Inmovilizadores ortopédicos para rodilla, hombro, pulgar y dedos.'),
    ('cabestrillos', 'Cabestrillos y Soportes de Hombro', 'Cabestrillos ortopédicos e inmovilizadores de hombro para soporte y recuperación.'),
    ('zapatos-ortopedicos', 'Zapatos Ortopédicos', 'Zapatos ortopédicos especializados para adultos e infantes. Zapatos con horma estándar e inversa.'),
    ('tenis-ortopedicos', 'Tenis y Calzado Deportivo Ortopédico', 'Tenis y calzado deportivo con características ortopédicas. Calzado para pie plano, pronación y supinación.'),
    ('plantillas-ortopedicas', 'Plantillas Ortopédicas', 'Plantillas ortopédicas de gel, deportivas y personalizadas. Plantillas para pie plano, fascitis plantar y diabetes.'),
    ('taloneras', 'Taloneras Ortopédicas', 'Taloneras de gel y terapéuticas para alivio de presión y fascitis plantar.'),
    ('bastones', 'Bastones Ortopédicos', 'Bastones ortopédicos estándar, plegables, de 4 puntos y especializados para apoyo y estabilidad.'),
    ('muletas', 'Muletas Ortopédicas', 'Muletas ortopédicas estándar, canadienses y ajustables para soporte durante la recuperación.'),
    ('sillas-de-ruedas', 'Sillas de Ruedas', 'Sillas de ruedas manuales, eléctricas, deportivas y pediátricas. Accesorios para sillas de ruedas.'),
    ('andadores', 'Andadores', 'Andadores estándar, con ruedas, plegables y con asiento para movilidad asistida.'),
    ('medias-compresion', 'Medias y Calcetines de Compresión', 'Medias y calcetines de compresión para caballero, dama y diabéticos. Medias antiembólicas y deportivas.'),
    ('productos-pediatricos', 'Productos Pediátricos', 'Productos ortopédicos especializados para niños. Soporte pediátrico, tratamiento de hernias y displasia de cadera.'),
    ('terapia-rehabilitacion', 'Terapia y Rehabilitación', 'Compresas de gel, ejercitadores y correctores para terapia y rehabilitación.'),
    ('cojines-almohadas', 'Cojines y Almohadas Terapéuticas', 'Cojines terapéuticos tipo dona y almohadas cervicales para alivio de presión y soporte postural.'),
    ('equipos-medicos', 'Equipos Médicos', 'Equipos de monitoreo médico: baumanómetros, oxímetros, termómetros y espirómetros.'),
    ('mobiliario-medico', 'Mobiliario Médico', 'Mobiliario médico especializado: colchones de presión alterna, elevadores para baño y mobiliario de apoyo.'),
    ('accesorios-bano', 'Accesorios de Baño', 'Accesorios de baño: barras de agarre, protectores de yeso, elevadores para inodoro y accesorios de seguridad.'),
    ('separadores-alineadores', 'Separadores y Alineadores de Pie', 'Separadores y alineadores de dedos para corrección de deformidades y alineación correcta.'),
]

print("\nActualizando categorías...")
for slug, nombre, descripcion in updates:
    cursor.execute(
        "UPDATE categorias_normalizadas SET nombre = %s, descripcion = %s WHERE slug = %s",
        (nombre, descripcion, slug)
    )
    if cursor.rowcount > 0:
        print(f"  OK: {nombre}")
    else:
        print(f"  ADVERTENCIA: {slug} no encontrada")

conn.commit()

# Verificar
cursor.execute("SELECT nombre, descripcion FROM categorias_normalizadas WHERE slug = 'rodilleras'")
cat = cursor.fetchone()
if cat:
    print(f"\nVerificación - Rodilleras:")
    print(f"  Nombre: {cat[0]}")
    print(f"  Descripcion: {cat[1][:50]}...")

cursor.close()
conn.close()
print("\nCodificación corregida!")


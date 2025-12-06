#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para crear e insertar categorías normalizadas
Ortopedia Cuernavaca
"""

import mysql.connector
from mysql.connector import Error

# Configuración de base de datos
DB_CONFIG = {
    'host': 'localhost',
    'database': 'ortopedia_cuernavaca',
    'user': 'root',
    'password': 'Z@nahoria1909',
    'charset': 'utf8mb4',
    'collation': 'utf8mb4_unicode_ci'
}

# Categorías normalizadas
CATEGORIAS = [
    ('rodilleras', 'Rodilleras Ortopédicas', 'Rodilleras ortopédicas para rehabilitación, deporte y soporte. Rodilleras mecánicas, elásticas y especializadas.', 'Rodilleras Ortopédicas | Ortopedia Cuernavaca', 'Rodilleras ortopédicas para rehabilitación y deporte. Rodilleras mecánicas, elásticas y especializadas. Envío gratis.', 1),
    ('tobilleras', 'Tobilleras Ortopédicas', 'Tobilleras ortopédicas elásticas, de neopreno y especializadas para soporte y rehabilitación del tobillo.', 'Tobilleras Ortopédicas | Ortopedia Cuernavaca', 'Tobilleras ortopédicas para soporte y rehabilitación. Tobilleras elásticas, neopreno y especializadas.', 2),
    ('muniqueras', 'Muñequeras Ortopédicas', 'Muñequeras ortopédicas básicas, con refuerzo y férulas de muñeca para soporte y rehabilitación.', 'Muñequeras Ortopédicas | Ortopedia Cuernavaca', 'Muñequeras ortopédicas para soporte y rehabilitación. Muñequeras básicas, con refuerzo y férulas.', 3),
    ('coderas', 'Coderas Ortopédicas', 'Coderas ortopédicas elásticas, con anillo y deportivas para soporte del codo y tratamiento de epicondilitis.', 'Coderas Ortopédicas | Ortopedia Cuernavaca', 'Coderas ortopédicas para soporte del codo. Coderas elásticas, con anillo y deportivas.', 4),
    ('fajas', 'Fajas Ortopédicas', 'Fajas ortopédicas lumbosacras, para hernias, maternidad y correctores de postura.', 'Fajas Ortopédicas | Ortopedia Cuernavaca', 'Fajas ortopédicas para soporte lumbar, hernias y maternidad. Fajas lumbosacras y correctores de postura.', 5),
    ('collares-cervicales', 'Collares y Ortesis Cervicales', 'Collares cervicales blandos, rígidos y ajustables para inmovilización y soporte cervical.', 'Collares Cervicales | Ortopedia Cuernavaca', 'Collares cervicales ortopédicos. Collares blandos, rígidos y ajustables para soporte cervical.', 6),
    ('ferulas', 'Férulas Ortopédicas', 'Férulas ortopédicas para mano, dedos, muñeca, antebrazo y pie. Férulas estándar y dinámicas.', 'Férulas Ortopédicas | Ortopedia Cuernavaca', 'Férulas ortopédicas para inmovilización. Férulas para mano, dedos, muñeca y pie.', 7),
    ('inmovilizadores', 'Inmovilizadores Ortopédicos', 'Inmovilizadores ortopédicos para rodilla, hombro, pulgar y dedos.', 'Inmovilizadores Ortopédicos | Ortopedia Cuernavaca', 'Inmovilizadores ortopédicos para rodilla, hombro y dedos. Inmovilización completa y especializada.', 8),
    ('cabestrillos', 'Cabestrillos y Soportes de Hombro', 'Cabestrillos ortopédicos e inmovilizadores de hombro para soporte y recuperación.', 'Cabestrillos Ortopédicos | Ortopedia Cuernavaca', 'Cabestrillos e inmovilizadores de hombro. Soporte ortopédico para hombro y brazo.', 9),
    ('zapatos-ortopedicos', 'Zapatos Ortopédicos', 'Zapatos ortopédicos especializados para adultos e infantes. Zapatos con horma estándar e inversa.', 'Zapatos Ortopédicos | Ortopedia Cuernavaca', 'Zapatos ortopédicos especializados. Zapatos Monto, Sandy, Dany y más. Horma estándar e inversa.', 10),
    ('tenis-ortopedicos', 'Tenis y Calzado Deportivo Ortopédico', 'Tenis y calzado deportivo con características ortopédicas. Calzado para pie plano, pronación y supinación.', 'Tenis Ortopédicos | Ortopedia Cuernavaca', 'Tenis y calzado deportivo ortopédico. Calzado especializado para deporte y actividad física.', 11),
    ('plantillas-ortopedicas', 'Plantillas Ortopédicas', 'Plantillas ortopédicas de gel, deportivas y personalizadas. Plantillas para pie plano, fascitis plantar y diabetes.', 'Plantillas Ortopédicas | Ortopedia Cuernavaca', 'Plantillas ortopédicas de gel y personalizadas. Plantillas para pie plano, fascitis plantar y más.', 12),
    ('taloneras', 'Taloneras Ortopédicas', 'Taloneras de gel y terapéuticas para alivio de presión y fascitis plantar.', 'Taloneras Ortopédicas | Ortopedia Cuernavaca', 'Taloneras ortopédicas de gel. Alivio de presión y fascitis plantar.', 13),
    ('bastones', 'Bastones Ortopédicos', 'Bastones ortopédicos estándar, plegables, de 4 puntos y especializados para apoyo y estabilidad.', 'Bastones Ortopédicos | Ortopedia Cuernavaca', 'Bastones ortopédicos para apoyo y estabilidad. Bastones plegables, de 4 puntos y especializados.', 14),
    ('muletas', 'Muletas Ortopédicas', 'Muletas ortopédicas estándar, canadienses y ajustables para soporte durante la recuperación.', 'Muletas Ortopédicas | Ortopedia Cuernavaca', 'Muletas ortopédicas para soporte y recuperación. Muletas estándar, canadienses y ajustables.', 15),
    ('sillas-de-ruedas', 'Sillas de Ruedas', 'Sillas de ruedas manuales, eléctricas, deportivas y pediátricas. Accesorios para sillas de ruedas.', 'Sillas de Ruedas | Ortopedia Cuernavaca', 'Sillas de ruedas manuales y eléctricas. Sillas de ruedas deportivas y pediátricas.', 16),
    ('andadores', 'Andadores', 'Andadores estándar, con ruedas, plegables y con asiento para movilidad asistida.', 'Andadores | Ortopedia Cuernavaca', 'Andadores ortopédicos para movilidad asistida. Andadores con ruedas, plegables y con asiento.', 17),
    ('medias-compresion', 'Medias y Calcetines de Compresión', 'Medias y calcetines de compresión para caballero, dama y diabéticos. Medias antiembólicas y deportivas.', 'Medias de Compresión | Ortopedia Cuernavaca', 'Medias y calcetines de compresión. Medias para caballero, dama, diabéticos y deportivas.', 18),
    ('productos-pediatricos', 'Productos Pediátricos', 'Productos ortopédicos especializados para niños. Soporte pediátrico, tratamiento de hernias y displasia de cadera.', 'Productos Pediátricos | Ortopedia Cuernavaca', 'Productos ortopédicos para niños. Soporte pediátrico, hernias y displasia de cadera.', 19),
    ('terapia-rehabilitacion', 'Terapia y Rehabilitación', 'Compresas de gel, ejercitadores y correctores para terapia y rehabilitación.', 'Terapia y Rehabilitación | Ortopedia Cuernavaca', 'Productos para terapia y rehabilitación. Compresas, ejercitadores y correctores.', 20),
    ('cojines-almohadas', 'Cojines y Almohadas Terapéuticas', 'Cojines terapéuticos tipo dona y almohadas cervicales para alivio de presión y soporte postural.', 'Cojines y Almohadas | Ortopedia Cuernavaca', 'Cojines y almohadas terapéuticas. Alivio de presión y soporte postural.', 21),
    ('equipos-medicos', 'Equipos Médicos', 'Equipos de monitoreo médico: baumanómetros, oxímetros, termómetros y espirómetros.', 'Equipos Médicos | Ortopedia Cuernavaca', 'Equipos médicos de monitoreo. Baumanómetros, oxímetros, termómetros y más.', 22),
    ('mobiliario-medico', 'Mobiliario Médico', 'Mobiliario médico especializado: colchones de presión alterna, elevadores para baño y mobiliario de apoyo.', 'Mobiliario Médico | Ortopedia Cuernavaca', 'Mobiliario médico especializado. Colchones, elevadores y mobiliario de apoyo.', 23),
    ('accesorios-bano', 'Accesorios de Baño', 'Accesorios de baño: barras de agarre, protectores de yeso, elevadores para inodoro y accesorios de seguridad.', 'Accesorios de Baño | Ortopedia Cuernavaca', 'Accesorios de baño para seguridad. Barras de agarre, protectores y elevadores.', 24),
    ('separadores-alineadores', 'Separadores y Alineadores de Pie', 'Separadores y alineadores de dedos para corrección de deformidades y alineación correcta.', 'Separadores y Alineadores | Ortopedia Cuernavaca', 'Separadores y alineadores de pie. Corrección de deformidades y alineación correcta.', 25),
]

def setup_categorias():
    """Crear tabla e insertar categorías normalizadas"""
    conn = None
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        print("=" * 70)
        print("CONFIGURACION DE CATEGORIAS NORMALIZADAS")
        print("=" * 70)
        
        # Crear tabla
        print("\n1. Creando tabla categorias_normalizadas...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS categorias_normalizadas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(100) UNIQUE NOT NULL,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT,
                meta_titulo VARCHAR(255),
                meta_descripcion TEXT,
                orden INT DEFAULT 0,
                activa BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_slug (slug),
                INDEX idx_activa (activa),
                INDEX idx_orden (orden)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        """)
        print("   OK: Tabla creada")
        
        # Verificar si ya existen categorías
        cursor.execute("SELECT COUNT(*) FROM categorias_normalizadas")
        count = cursor.fetchone()[0]
        
        if count > 0:
            print(f"\n   ADVERTENCIA: Ya existen {count} categorias. ¿Desea continuar? (S/N)")
            # Por ahora continuamos, pero podríamos agregar lógica para preguntar
        
        # Insertar categorías
        print("\n2. Insertando categorias normalizadas...")
        insertados = 0
        duplicados = 0
        
        for cat_data in CATEGORIAS:
            slug, nombre, descripcion, meta_titulo, meta_descripcion, orden = cat_data
            try:
                cursor.execute("""
                    INSERT INTO categorias_normalizadas 
                    (slug, nombre, descripcion, meta_titulo, meta_descripcion, orden)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (slug, nombre, descripcion, meta_titulo, meta_descripcion, orden))
                insertados += 1
                print(f"   OK: {nombre} ({slug})")
            except mysql.connector.IntegrityError:
                # Ya existe, actualizar
                cursor.execute("""
                    UPDATE categorias_normalizadas 
                    SET nombre = %s, descripcion = %s, meta_titulo = %s, 
                        meta_descripcion = %s, orden = %s
                    WHERE slug = %s
                """, (nombre, descripcion, meta_titulo, meta_descripcion, orden, slug))
                duplicados += 1
                print(f"   ACTUALIZADO: {nombre} ({slug})")
        
        conn.commit()
        
        # Verificar
        cursor.execute("SELECT COUNT(*) FROM categorias_normalizadas")
        total = cursor.fetchone()[0]
        
        print("\n" + "=" * 70)
        print("RESUMEN")
        print("=" * 70)
        print(f"Categorias insertadas: {insertados}")
        print(f"Categorias actualizadas: {duplicados}")
        print(f"Total de categorias: {total}")
        
        # Mostrar lista
        cursor.execute("SELECT slug, nombre, orden FROM categorias_normalizadas ORDER BY orden")
        print("\nCategorias normalizadas:")
        for slug, nombre, orden in cursor.fetchall():
            print(f"  {orden:2d}. {nombre} ({slug})")
        
        print("\n" + "=" * 70)
        print("CONFIGURACION COMPLETADA")
        print("=" * 70)
        
    except Error as e:
        print(f"\nERROR: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    setup_categorias()


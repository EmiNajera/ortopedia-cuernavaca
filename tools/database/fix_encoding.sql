-- Script para corregir la codificación de las categorías
-- Ejecutar: mysql -u root -p ortopedia_cuernavaca < fix_encoding.sql

-- Verificar y corregir charset de la tabla
ALTER TABLE categorias_normalizadas CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Actualizar las categorías con caracteres especiales correctamente codificados
UPDATE categorias_normalizadas SET 
  nombre = 'Rodilleras Ortopédicas',
  descripcion = 'Rodilleras ortopédicas para rehabilitación, deporte y soporte. Rodilleras mecánicas, elásticas y especializadas.'
WHERE slug = 'rodilleras';

UPDATE categorias_normalizadas SET 
  nombre = 'Tobilleras Ortopédicas',
  descripcion = 'Tobilleras ortopédicas elásticas, de neopreno y especializadas para soporte y rehabilitación del tobillo.'
WHERE slug = 'tobilleras';

UPDATE categorias_normalizadas SET 
  nombre = 'Muñequeras Ortopédicas',
  descripcion = 'Muñequeras ortopédicas básicas, con refuerzo y férulas de muñeca para soporte y rehabilitación.'
WHERE slug = 'muniqueras';

UPDATE categorias_normalizadas SET 
  nombre = 'Coderas Ortopédicas',
  descripcion = 'Coderas ortopédicas elásticas, con anillo y deportivas para soporte del codo y tratamiento de epicondilitis.'
WHERE slug = 'coderas';

UPDATE categorias_normalizadas SET 
  nombre = 'Fajas Ortopédicas',
  descripcion = 'Fajas ortopédicas lumbosacras, para hernias, maternidad y correctores de postura.'
WHERE slug = 'fajas';

UPDATE categorias_normalizadas SET 
  nombre = 'Collares y Ortesis Cervicales',
  descripcion = 'Collares cervicales blandos, rígidos y ajustables para inmovilización y soporte cervical.'
WHERE slug = 'collares-cervicales';

UPDATE categorias_normalizadas SET 
  nombre = 'Férulas Ortopédicas',
  descripcion = 'Férulas ortopédicas para mano, dedos, muñeca, antebrazo y pie. Férulas estándar y dinámicas.'
WHERE slug = 'ferulas';

UPDATE categorias_normalizadas SET 
  nombre = 'Inmovilizadores Ortopédicos',
  descripcion = 'Inmovilizadores ortopédicos para rodilla, hombro, pulgar y dedos.'
WHERE slug = 'inmovilizadores';

UPDATE categorias_normalizadas SET 
  nombre = 'Cabestrillos y Soportes de Hombro',
  descripcion = 'Cabestrillos ortopédicos e inmovilizadores de hombro para soporte y recuperación.'
WHERE slug = 'cabestrillos';

UPDATE categorias_normalizadas SET 
  nombre = 'Zapatos Ortopédicos',
  descripcion = 'Zapatos ortopédicos especializados para adultos e infantes. Zapatos con horma estándar e inversa.'
WHERE slug = 'zapatos-ortopedicos';

UPDATE categorias_normalizadas SET 
  nombre = 'Tenis y Calzado Deportivo Ortopédico',
  descripcion = 'Tenis y calzado deportivo con características ortopédicas. Calzado para pie plano, pronación y supinación.'
WHERE slug = 'tenis-ortopedicos';

UPDATE categorias_normalizadas SET 
  nombre = 'Plantillas Ortopédicas',
  descripcion = 'Plantillas ortopédicas de gel, deportivas y personalizadas. Plantillas para pie plano, fascitis plantar y diabetes.'
WHERE slug = 'plantillas-ortopedicas';

UPDATE categorias_normalizadas SET 
  nombre = 'Taloneras Ortopédicas',
  descripcion = 'Taloneras de gel y terapéuticas para alivio de presión y fascitis plantar.'
WHERE slug = 'taloneras';

UPDATE categorias_normalizadas SET 
  nombre = 'Bastones Ortopédicos',
  descripcion = 'Bastones ortopédicos estándar, plegables, de 4 puntos y especializados para apoyo y estabilidad.'
WHERE slug = 'bastones';

UPDATE categorias_normalizadas SET 
  nombre = 'Muletas Ortopédicas',
  descripcion = 'Muletas ortopédicas estándar, canadienses y ajustables para soporte durante la recuperación.'
WHERE slug = 'muletas';

UPDATE categorias_normalizadas SET 
  nombre = 'Sillas de Ruedas',
  descripcion = 'Sillas de ruedas manuales, eléctricas, deportivas y pediátricas. Accesorios para sillas de ruedas.'
WHERE slug = 'sillas-de-ruedas';

UPDATE categorias_normalizadas SET 
  nombre = 'Andadores',
  descripcion = 'Andadores estándar, con ruedas, plegables y con asiento para movilidad asistida.'
WHERE slug = 'andadores';

UPDATE categorias_normalizadas SET 
  nombre = 'Medias y Calcetines de Compresión',
  descripcion = 'Medias y calcetines de compresión para caballero, dama y diabéticos. Medias antiembólicas y deportivas.'
WHERE slug = 'medias-compresion';

UPDATE categorias_normalizadas SET 
  nombre = 'Productos Pediátricos',
  descripcion = 'Productos ortopédicos especializados para niños. Soporte pediátrico, tratamiento de hernias y displasia de cadera.'
WHERE slug = 'productos-pediatricos';

UPDATE categorias_normalizadas SET 
  nombre = 'Terapia y Rehabilitación',
  descripcion = 'Compresas de gel, ejercitadores y correctores para terapia y rehabilitación.'
WHERE slug = 'terapia-rehabilitacion';

UPDATE categorias_normalizadas SET 
  nombre = 'Cojines y Almohadas Terapéuticas',
  descripcion = 'Cojines terapéuticos tipo dona y almohadas cervicales para alivio de presión y soporte postural.'
WHERE slug = 'cojines-almohadas';

UPDATE categorias_normalizadas SET 
  nombre = 'Equipos Médicos',
  descripcion = 'Equipos de monitoreo médico: baumanómetros, oxímetros, termómetros y espirómetros.'
WHERE slug = 'equipos-medicos';

UPDATE categorias_normalizadas SET 
  nombre = 'Mobiliario Médico',
  descripcion = 'Mobiliario médico especializado: colchones de presión alterna, elevadores para baño y mobiliario de apoyo.'
WHERE slug = 'mobiliario-medico';

UPDATE categorias_normalizadas SET 
  nombre = 'Accesorios de Baño',
  descripcion = 'Accesorios de baño: barras de agarre, protectores de yeso, elevadores para inodoro y accesorios de seguridad.'
WHERE slug = 'accesorios-bano';

UPDATE categorias_normalizadas SET 
  nombre = 'Separadores y Alineadores de Pie',
  descripcion = 'Separadores y alineadores de dedos para corrección de deformidades y alineación correcta.'
WHERE slug = 'separadores-alineadores';


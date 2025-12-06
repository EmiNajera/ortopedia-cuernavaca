-- Script para categorizar productos pendientes
-- Ejecutar en MySQL: mysql -u root -p ortopedia_cuernavaca < categorizar_productos.sql

-- 1. Deportivo -> tenis-ortopedicos
UPDATE productos p
JOIN categorias c ON p.categoria_id = c.id
JOIN categorias_normalizadas cn ON cn.slug = 'tenis-ortopedicos'
SET p.categoria_id = cn.id
WHERE c.nombre = 'Deportivo';

-- 2. Insumos médicos / ortopédicos -> equipos-medicos
UPDATE productos p
JOIN categorias c ON p.categoria_id = c.id
JOIN categorias_normalizadas cn ON cn.slug = 'equipos-medicos'
SET p.categoria_id = cn.id
WHERE c.nombre = 'Insumos médicos / ortopédicos';

-- 3. Accesorios y otros -> accesorios-bano
UPDATE productos p
JOIN categorias c ON p.categoria_id = c.id
JOIN categorias_normalizadas cn ON cn.slug = 'accesorios-bano'
SET p.categoria_id = cn.id
WHERE c.nombre = 'Accesorios y otros';

-- 4. Corsets -> fajas
UPDATE productos p
JOIN categorias c ON p.categoria_id = c.id
JOIN categorias_normalizadas cn ON cn.slug = 'fajas'
SET p.categoria_id = cn.id
WHERE c.nombre = 'Corsets';

-- Verificar resultados
SELECT 
    'Total productos con categoria' as descripcion,
    COUNT(*) as total
FROM productos 
WHERE categoria_id IS NOT NULL;

SELECT 
    cn.nombre as categoria,
    COUNT(p.id) as total_productos
FROM categorias_normalizadas cn
LEFT JOIN productos p ON cn.id = p.categoria_id
GROUP BY cn.id, cn.nombre
HAVING total_productos > 0
ORDER BY total_productos DESC;


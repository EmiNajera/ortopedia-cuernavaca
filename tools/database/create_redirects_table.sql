-- Script para crear tabla de redirecciones
-- Ortopedia Cuernavaca

CREATE TABLE IF NOT EXISTS redirects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    old_url VARCHAR(500) UNIQUE NOT NULL,
    new_url VARCHAR(500) NOT NULL,
    redirect_type ENUM('301', '302') DEFAULT '301',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_old_url (old_url),
    INDEX idx_new_url (new_url)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Redirecciones iniciales (se pueden agregar más según necesidad)
INSERT INTO redirects (old_url, new_url, redirect_type) VALUES
('/categoria/soportes-y-ortesis/rodilleras', '/categoria/rodilleras', '301'),
('/categoria/soportes-y-ortesis/tobilleras', '/categoria/tobilleras', '301'),
('/categoria/soportes-y-ortesis/muniqueras', '/categoria/muniqueras', '301'),
('/categoria/soportes-y-ortesis/coderas', '/categoria/coderas', '301'),
('/categoria/soportes-y-ortesis/fajas', '/categoria/fajas', '301'),
('/categoria/movilidad-y-ayudas-para-caminar/bastones', '/categoria/bastones', '301'),
('/categoria/movilidad-y-ayudas-para-caminar/muletas', '/categoria/muletas', '301'),
('/categoria/movilidad-y-ayudas-para-caminar/sillas-de-ruedas', '/categoria/sillas-de-ruedas', '301'),
('/categoria/movilidad-y-ayudas-para-caminar/andadores', '/categoria/andadores', '301'),
('/categoria/calzado-ortopedico/zapatos-ortopedicos', '/categoria/zapatos-ortopedicos', '301'),
('/categoria/calzado-ortopedico/tenis-ortopedicos', '/categoria/tenis-ortopedicos', '301'),
('/categoria/calzado-ortopedico/plantillas-ortopedicas', '/categoria/plantillas-ortopedicas', '301');


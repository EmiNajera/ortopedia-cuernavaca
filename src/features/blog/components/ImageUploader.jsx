import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Check, 
  AlertCircle,
  Loader2
} from 'lucide-react';

const ImageUploader = ({ 
  onImageSelect, 
  currentImage = '', 
  placeholder = 'Selecciona una imagen...',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImage);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileSelect = async (file) => {
    setError('');
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validar tamaño
    if (file.size > maxSize) {
      setError(`El archivo es demasiado grande. Máximo ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    setIsUploading(true);

    try {
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // En un entorno real, aquí subirías la imagen al servidor
      // Por ahora, simulamos la subida
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generar nombre de archivo único
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const fileName = `banner-${timestamp}.${extension}`;
      const imagePath = `/images/banners/${fileName}`;

      // Llamar callback con la ruta de la imagen
      onImageSelect(imagePath);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error al subir la imagen. Inténtalo de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview('');
    setError('');
    onImageSelect('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zona de Drop */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 transition-colors cursor-pointer ${
          isDragging
            ? 'border-blue-400 bg-blue-50'
            : preview
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">Subiendo imagen...</p>
            </motion.div>
          ) : preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className="relative inline-block">
                {/* preview is a data URL; next/image doesn't accept data URLs — disable rule */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-sm text-green-600 flex items-center justify-center">
                <Check className="w-4 h-4 mr-1" />
                Imagen seleccionada
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-1">
                {placeholder}
              </p>
              <p className="text-xs text-gray-500">
                Arrastra una imagen aquí o haz clic para seleccionar
              </p>
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG, GIF hasta {maxSize / (1024 * 1024)}MB
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
          <p className="text-sm text-red-600">{error}</p>
        </motion.div>
      )}

      {/* Imagen actual */}
      {currentImage && !preview && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-500 mb-2">Imagen actual:</p>
          <div className="flex items-center space-x-2">
            <NextImage
              src={currentImage}
              alt="Current"
              className="w-12 h-12 object-cover rounded"
              width={48}
              height={48}
              unoptimized
            />
            <span className="text-sm text-gray-700 flex-1 truncate">
              {currentImage}
            </span>
            <button
              onClick={handleRemoveImage}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;


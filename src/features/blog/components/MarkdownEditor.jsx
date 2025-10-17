import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Link, 
  Image as ImageIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Edit3,
  Save,
  Undo,
  Redo
} from 'lucide-react';

const MarkdownEditor = ({ 
  value = '', 
  onChange, 
  placeholder = 'Escribe tu artículo en Markdown...',
  className = ''
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [history, setHistory] = useState([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const textareaRef = useRef(null);

  // Actualizar historial cuando cambia el valor
  useEffect(() => {
    if (value !== history[historyIndex]) {
      setHistory(prevHistory => {
        const newHistory = prevHistory.slice(0, historyIndex + 1);
        newHistory.push(value);
        return newHistory;
      });
      setHistoryIndex(prev => prev + 1);
    }
  }, [value, history, historyIndex]);

  const insertText = (before, after = '', placeholder = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = before + (selectedText || placeholder) + after;
    
    const newValue = value.substring(0, start) + textToInsert + value.substring(end);
    onChange(newValue);

    // Restaurar selección
    setTimeout(() => {
      const newStart = start + before.length;
      const newEnd = newStart + (selectedText || placeholder).length;
      textarea.setSelectionRange(newStart, newEnd);
      textarea.focus();
    }, 0);
  };

  const insertAtCursor = (text) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);
    onChange(newValue);

    // Mover cursor al final del texto insertado
    setTimeout(() => {
      const newPosition = start + text.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };

  const renderMarkdown = (text) => {
    // Conversión básica de Markdown a HTML
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-800 mb-3 mt-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-12">$1</h1>')
      
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      
      // Code
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
      
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
      
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 bg-blue-50 pl-4 py-2 my-4 italic text-gray-700">$1</blockquote>')
      
      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
      
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
      .replace(/^(?!<[h|l|b|i|c|a|i])(.*$)/gim, '<p class="mb-4 text-gray-700 leading-relaxed">$1</p>');

    return html;
  };

  const toolbarButtons = [
    {
      icon: Bold,
      action: () => insertText('**', '**', 'texto en negrita'),
      title: 'Negrita'
    },
    {
      icon: Italic,
      action: () => insertText('*', '*', 'texto en cursiva'),
      title: 'Cursiva'
    },
    {
      icon: Heading1,
      action: () => insertAtCursor('# Título Principal\n\n'),
      title: 'Título H1'
    },
    {
      icon: Heading2,
      action: () => insertAtCursor('## Subtítulo\n\n'),
      title: 'Título H2'
    },
    {
      icon: Heading3,
      action: () => insertAtCursor('### Sub-subtítulo\n\n'),
      title: 'Título H3'
    },
    {
      icon: List,
      action: () => insertAtCursor('- Elemento de lista\n'),
      title: 'Lista'
    },
    {
      icon: ListOrdered,
      action: () => insertAtCursor('1. Elemento numerado\n'),
      title: 'Lista numerada'
    },
    {
      icon: Quote,
      action: () => insertAtCursor('> Cita destacada\n\n'),
      title: 'Cita'
    },
    {
      icon: Link,
      action: () => insertText('[', '](https://ejemplo.com)', 'texto del enlace'),
      title: 'Enlace'
    },
    {
      icon: ImageIcon,
      action: () => insertAtCursor('![Texto alternativo](ruta/imagen.jpg)\n\n'),
      title: 'Imagen'
    },
    {
      icon: Code,
      action: () => insertText('`', '`', 'código'),
      title: 'Código'
    }
  ];

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {/* Historial */}
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
              title="Deshacer"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
              title="Rehacer"
            >
              <Redo className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-2" />
            
            {/* Botones de formato */}
            {toolbarButtons.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                title={button.title}
              >
                <button.icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Toggle Preview */}
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isPreviewMode
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {isPreviewMode ? (
              <>
                <Edit3 className="w-4 h-4 mr-2" />
                Editar
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Vista Previa
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {isPreviewMode ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 min-h-[400px] bg-white"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
            />
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="relative"
            >
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full h-[400px] p-6 border-0 resize-none focus:ring-0 focus:outline-none font-mono text-sm leading-relaxed"
                spellCheck={false}
              />
              
              {/* Contador de palabras */}
              <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white px-2 py-1 rounded border">
                {value.split(/\s+/).filter(word => word.length > 0).length} palabras
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MarkdownEditor;


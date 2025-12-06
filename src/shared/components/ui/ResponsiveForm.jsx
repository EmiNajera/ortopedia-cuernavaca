import React from 'react';

/**
 * Formulario Responsive
 * Contenedor base para formularios optimizados en móvil
 */
const ResponsiveForm = ({ children, onSubmit, className = '', ...props }) => (
  <form onSubmit={onSubmit} className={`space-y-6 sm:space-y-8 ${className}`} {...props}>
    {children}
  </form>
);

/**
 * Grupo de Formulario
 * Contenedor para un campo de formulario con etiqueta y mensajes de error
 */
export const FormGroup = ({
  label,
  error,
  required = false,
  children,
  className = '',
  ...props
}) => (
  <div className={`space-y-2 ${className}`} {...props}>
    {label && (
      <label className="block text-sm sm:text-base font-medium text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    {children}
    {error && <p className="text-xs sm:text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

/**
 * Input Responsive
 * Campo de entrada optimizado para móvil
 */
export const ResponsiveInput = React.forwardRef(
  ({ type = 'text', size = 'md', error = false, ...props }, ref) => {
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-sm sm:text-base',
      lg: 'px-4 py-4 text-base sm:text-lg',
    };

    return (
      <input
        type={type}
        ref={ref}
        className={`
        w-full border rounded-lg transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${sizes[size]}
        ${
          error
            ? 'border-red-500 bg-red-50 focus:border-red-500'
            : 'border-gray-300 focus:border-blue-500'
        }
        placeholder:text-gray-400
        disabled:bg-gray-100 disabled:cursor-not-allowed
      `}
        {...props}
      />
    );
  },
);

ResponsiveInput.displayName = 'ResponsiveInput';

/**
 * Textarea Responsive
 * Área de texto optimizada para móvil
 */
export const ResponsiveTextarea = React.forwardRef(({ rows = 4, error = false, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={`
      w-full px-4 py-3 border rounded-lg transition-colors
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      text-sm sm:text-base
      resize-none
      ${
        error
          ? 'border-red-500 bg-red-50 focus:border-red-500'
          : 'border-gray-300 focus:border-blue-500'
      }
      placeholder:text-gray-400
      disabled:bg-gray-100 disabled:cursor-not-allowed
    `}
    {...props}
  />
));

ResponsiveTextarea.displayName = 'ResponsiveTextarea';

/**
 * Select Responsive
 * Selector optimizado para móvil
 */
export const ResponsiveSelect = React.forwardRef(
  ({ options = [], error = false, ...props }, ref) => (
    <select
      ref={ref}
      className={`
      w-full px-4 py-3 border rounded-lg transition-colors
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      text-sm sm:text-base
      appearance-none
      bg-white
      cursor-pointer
      ${
        error
          ? 'border-red-500 bg-red-50 focus:border-red-500'
          : 'border-gray-300 focus:border-blue-500'
      }
      disabled:bg-gray-100 disabled:cursor-not-allowed
      pr-10
    `}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.5em 1.5em',
      }}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
);

ResponsiveSelect.displayName = 'ResponsiveSelect';

/**
 * Checkbox Responsive
 * Checkbox accesible y táctil
 */
export const ResponsiveCheckbox = React.forwardRef(({ label, ...props }, ref) => (
  <div className="flex items-center">
    <input
      ref={ref}
      type="checkbox"
      className={`
        w-5 h-5 sm:w-6 sm:h-6 text-blue-600 
        border-gray-300 rounded
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        cursor-pointer
      `}
      {...props}
    />
    {label && (
      <label className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-900 cursor-pointer">
        {label}
      </label>
    )}
  </div>
));

ResponsiveCheckbox.displayName = 'ResponsiveCheckbox';

/**
 * Radio Responsive
 * Radio button accesible y táctil
 */
export const ResponsiveRadio = React.forwardRef(({ label, ...props }, ref) => (
  <div className="flex items-center">
    <input
      ref={ref}
      type="radio"
      className={`
        w-5 h-5 sm:w-6 sm:h-6 text-blue-600 
        border-gray-300
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        cursor-pointer
      `}
      {...props}
    />
    {label && (
      <label className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-900 cursor-pointer">
        {label}
      </label>
    )}
  </div>
));

ResponsiveRadio.displayName = 'ResponsiveRadio';

/**
 * Botón de Formulario
 * Botón optimizado con área táctil adecuada
 */
export const FormButton = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm sm:text-base',
    lg: 'px-8 py-4 text-base sm:text-lg',
  };

  return (
    <button
      className={`
        w-full sm:w-auto
        min-h-[44px] min-w-[44px]
        rounded-lg font-semibold
        transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
};

/**
 * Grupo de Botones Responsive
 * Contenedor para múltiples botones
 */
export const FormButtonGroup = ({ children, className = '', direction = 'vertical', ...props }) => (
  <div
    className={`
      flex ${direction === 'vertical' ? 'flex-col' : 'flex-row'} 
      gap-3 sm:gap-4
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

/**
 * Validación de Campo
 * Componente para mostrar validación en tiempo real
 */
export const FieldValidation = ({ valid, validMessage, invalidMessage }) =>
  valid !== null && (
    <div className={`text-xs sm:text-sm ${valid ? 'text-green-600' : 'text-red-600'}`}>
      {valid ? validMessage : invalidMessage}
    </div>
  );

/**
 * Formulario de Dos Columnas Responsive
 * Layout que se adapta a móvil
 */
export const FormTwoColumn = ({ children, className = '', ...props }) => (
  <div
    className={`
      grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

export default ResponsiveForm;

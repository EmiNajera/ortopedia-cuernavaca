import React from 'react';
import Link from 'next/link';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que la próxima renderización muestre la UI de error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Registra el error en un servicio de logging
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Aquí podrías enviar el error a un servicio de logging como Sentry
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
    // }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Puedes personalizar la UI de error aquí
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Algo salió mal</h1>
            <p className="text-gray-600 mb-6">
              Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta recargar la página o
              vuelve al inicio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Intentar de nuevo
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Volver al inicio
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  Detalles del error (solo en desarrollo)
                </summary>
                <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-48">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

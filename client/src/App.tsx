import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ScrollToTop } from './components/common/ScrollToTop';

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#0B0F19',
                color: '#fff',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '12px 18px',
                fontSize: '13px',
                fontWeight: 500,
              },
              success: {
                iconTheme: {
                  primary: '#25D366',
                  secondary: '#0B0F19',
                },
              },
              error: {
                iconTheme: {
                  primary: '#E11D48',
                  secondary: '#0B0F19',
                },
              },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

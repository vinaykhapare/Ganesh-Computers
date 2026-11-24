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
                background: '#0F172A',
                color: '#fff',
                borderRadius: '0.5rem',
                border: '1px solid #1E293B',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: 500,
              },
              success: {
                iconTheme: {
                  primary: '#16A34A',
                  secondary: '#0F172A',
                },
              },
              error: {
                iconTheme: {
                  primary: '#DC2626',
                  secondary: '#0F172A',
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

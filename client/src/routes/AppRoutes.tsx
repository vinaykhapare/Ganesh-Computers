import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { ProductsPage } from '../pages/public/ProductsPage';
import { ProductDetailPage } from '../pages/public/ProductDetailPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminProductsListPage } from '../pages/admin/AdminProductsListPage';
import { AdminProductCreatePage } from '../pages/admin/AdminProductCreatePage';
import { AdminProductEditPage } from '../pages/admin/AdminProductEditPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Catalog Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
      </Route>

      {/* Admin Login Route (Unauthenticated Admin Access) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Control Center */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsListPage />} />
        <Route path="products/new" element={<AdminProductCreatePage />} />
        <Route path="products/edit/:id" element={<AdminProductEditPage />} />
      </Route>

      {/* 404 Fallback */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

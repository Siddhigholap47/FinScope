// FinScope App - Modern Budgeting Dashboard v2.0
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { FinScopeLayout } from './layouts/FinScopeLayout';
import { FinScopeLogin } from './pages/FinScopeLogin';
import { FinScopeSignup } from './pages/FinScopeSignup';
import { FinScopeDashboard } from './pages/FinScopeDashboard';
import { CouplesDashboard } from './pages/CouplesDashboard';
import { Goals } from './pages/Goals';
import { Accounts } from './pages/Accounts';
import { Income } from './pages/Income';
import { Expenses } from './pages/Expenses';
import { Reports } from './pages/Reports';
import { CalendarView } from './pages/CalendarView';
import { Settings } from './pages/Settings';
import { Logout } from './pages/Logout';
import React from 'react';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Redirect root and preview_page.html to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/preview_page.html" element={<Navigate to="/login" replace />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<FinScopeLogin />} />
        <Route path="/signup" element={<FinScopeSignup />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* Dashboard Routes */}
        <Route element={<FinScopeLayout />}>
          <Route path="/dashboard" element={<FinScopeDashboard />} />
          <Route path="/couples" element={<CouplesDashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

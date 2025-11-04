import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { ProfileDropdown } from '../components/ProfileDropdown';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-xl shadow-lg"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed left-0 top-0 h-screen z-50">
            <Sidebar />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="bg-white/60 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex-1"></div>
            <ProfileDropdown />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import { FinScopeSidebar } from '../components/FinScopeSidebar';
import { ProfileDropdown } from '../components/ProfileDropdown';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function FinScopeLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F754]/40 via-[#E9D484]/30 to-[#CFADC1]/25 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4E61D3]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#CFADC1]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F4F754]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block relative z-10">
        <FinScopeSidebar />
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-white/30"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed left-0 top-0 h-screen z-50"
            >
              <FinScopeSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen relative z-10">
        {/* Top Bar */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-white/40 sticky top-0 z-30 shadow-sm">
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

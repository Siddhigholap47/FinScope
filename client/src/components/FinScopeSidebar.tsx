import {
  Home,
  Heart,
  Target,
  CreditCard,
  DollarSign,
  TrendingDown,
  FileText,
  Calendar,
  Settings,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/285b3c17d5f2ab4d6211975815ad36d136ce9a6a.png';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Heart, label: 'Couple Budget', path: '/couples' },
  { icon: Target, label: 'Financial Goals', path: '/goals' },
  { icon: CreditCard, label: 'Accounts', path: '/accounts' },
  { icon: DollarSign, label: 'Income', path: '/income' },
  { icon: TrendingDown, label: 'Expenses', path: '/expenses' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function FinScopeSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white/50 backdrop-blur-xl border-r border-white/40 shadow-2xl z-40">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="bg-gradient-to-br from-[#F4F754]/20 via-[#E9D484]/15 to-[#CFADC1]/10 rounded-2xl p-4 shadow-inner">
            <img
              src={logoImage}
              alt="FinScope"
              className="h-12 mx-auto mix-blend-multiply"
              style={{ 
                filter: 'brightness(1.1) contrast(1.1) saturate(1.3)',
                opacity: 0.95
              }}
            />
          </div>
        </motion.div>
        <p className="text-gray-700 text-xs text-center font-medium">Plan. Save. Celebrate.</p>
      </div>

      <nav className="px-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] text-white shadow-lg shadow-[#4E61D3]/30'
                    : 'text-gray-700 hover:bg-[#F4F754]/30 hover:translate-x-1'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: menuItems.length * 0.05 }}
          onClick={() => {
            window.location.href = '/logout';
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-100 hover:text-red-600 transition-all duration-300 mt-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </nav>


    </aside>
  );
}

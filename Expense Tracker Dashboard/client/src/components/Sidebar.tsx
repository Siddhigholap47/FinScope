import { Home, DollarSign, CreditCard, FileText, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: DollarSign, label: 'Income', path: '/income' },
  { icon: CreditCard, label: 'Expenses', path: '/expenses' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white/40 backdrop-blur-lg border-r border-white/20 shadow-xl z-40">
      <div className="p-6">
        <h1 className="text-[#4E61D3] mb-8">💰 ExpenseTracker</h1>
      </div>
      
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-[#4E61D3] text-white shadow-lg'
                  : 'text-gray-700 hover:bg-[#F4F754]/30 hover:translate-x-1'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-100 hover:text-red-600 transition-all duration-300 mt-8"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

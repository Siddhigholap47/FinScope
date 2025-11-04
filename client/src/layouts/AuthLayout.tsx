import { Outlet } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Form Area */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white">
        <Outlet />
      </div>

      {/* Right: Illustration Area */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#CFADC1] via-[#E9D484] to-[#4E61D3] relative overflow-hidden">
        <div className="absolute top-12 left-12 text-white z-10 max-w-md">
          <h1 className="text-white mb-2">Track Your Income & Expenses</h1>
          <p className="text-white/90">Manage your finances with ease and precision</p>
          <div className="mt-6 bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <p className="text-white/80 mb-1">Total Balance</p>
            <p className="text-white">₹4,30,000</p>
          </div>
        </div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1748609278627-4b0e483b9b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzYxOTM0NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Financial Dashboard"
          className="w-3/4 rounded-2xl shadow-2xl opacity-80"
        />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#F4F754] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#4E61D3] rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
}

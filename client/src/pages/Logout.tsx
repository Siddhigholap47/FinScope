import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Sparkles, Heart, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import logo from "../assets/logout-logo.png";
const logoImage = logo;

export function Logout() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const userName = localStorage.getItem('userName') || 'there';

  useEffect(() => {
    // Clear all data except userName for personalized message
    const name = localStorage.getItem('userName');
    localStorage.clear();
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F754]/40 via-[#E9D484]/30 to-[#CFADC1]/25 relative overflow-hidden flex items-center justify-center p-6">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4E61D3]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#CFADC1]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F4F754]/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="bg-gradient-to-br from-[#F4F754]/20 via-[#E9D484]/15 to-[#CFADC1]/10 rounded-2xl p-4 shadow-inner inline-block">
              <img
                src={logoImage}
                alt="FinScope"
                className="h-16 mx-auto mix-blend-multiply"
                style={{ 
                  filter: 'brightness(1.1) contrast(1.1) saturate(1.3)',
                  opacity: 0.95
                }}
              />
            </div>
          </motion.div>

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="inline-block p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-gray-900 mb-2 flex items-center justify-center gap-2">
              Goodbye, {userName}! 
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 1.5, delay: 0.6 }}
              >
                👋
              </motion.span>
            </h1>
            <p className="text-gray-600">You've been successfully logged out</p>
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#F4F754]/10 to-[#CFADC1]/10 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#F4F754]" />
              <h3 className="text-gray-900">Thank You for Using FinScope!</h3>
              <Sparkles className="w-5 h-5 text-[#F4F754]" />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Your financial journey matters to us. We hope you're one step closer to your goals!
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Stay motivated</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Keep saving</span>
              </div>
            </div>
          </motion.div>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-6"
          >
            <p className="text-xs text-gray-500">
              ✓ All your data has been secured
            </p>
            <p className="text-xs text-gray-500">
              ✓ Session cleared successfully
            </p>
          </motion.div>

          {/* Countdown & Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm text-gray-600 mb-4">
              Redirecting to login in <span className="font-medium text-[#4E61D3]">{countdown}</span> seconds...
            </p>
            <Button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] rounded-xl py-6"
            >
              Back to Login
            </Button>
          </motion.div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6"
          >
            <p className="text-xs text-gray-500">
              See you soon! Remember: <span className="font-medium text-gray-700">Plan. Save. Celebrate.</span> 🎉
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import logo from "../assets/logout-logo.png";
const logoImage = logo;

export function FinScopeSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '', userType: '', partnerEmail: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ name: '', email: '', password: '', confirmPassword: '', userType: '', partnerEmail: '' });
    
    // Validation
    let hasErrors = false;
    const newErrors = { name: '', email: '', password: '', confirmPassword: '', userType: '', partnerEmail: '' };
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      hasErrors = true;
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
      hasErrors = true;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      hasErrors = true;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }
    
    if (!userType) {
      newErrors.userType = 'Please select a user type';
      hasErrors = true;
    }
    
    if (userType === 'couple' && !partnerEmail) {
      newErrors.partnerEmail = 'Partner email is required for couple accounts';
      hasErrors = true;
    } else if (userType === 'couple' && partnerEmail && !validateEmail(partnerEmail)) {
      newErrors.partnerEmail = 'Please enter a valid partner email';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      // Check if user already exists
      const existingUser = localStorage.getItem('finscope_user_' + email);
      if (existingUser) {
        toast.error('User already exists. Please login.');
        setErrors({ ...errors, email: 'Email already registered' });
        setIsLoading(false);
        return;
      }
      
      // Create user data
      const userData = {
        name,
        password,
        userType,
        partnerEmail: userType === 'couple' ? partnerEmail : '',
        partnerName: userType === 'couple' ? partnerName : '',
        partnerId: userType === 'couple' ? 'partner-' + Date.now() : '',
        createdAt: new Date().toISOString()
      };
      
      // Save user
      localStorage.setItem('finscope_user_' + email, JSON.stringify(userData));
      localStorage.setItem('token', 'finscope-token-' + Date.now());
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userType', userType);
      localStorage.setItem('partnerId', userData.partnerId);
      localStorage.setItem('partnerName', partnerName);
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F754] via-[#E9D484] to-[#CFADC1] relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-[#4E61D3] rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-[#CFADC1] rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block"
            >
              <img 
                src={logoImage} 
                alt="FinScope" 
                className="h-24 mx-auto mb-4 mix-blend-multiply"
                style={{ 
                  filter: 'brightness(1.1) contrast(1.1) saturate(1.3)',
                  opacity: 0.95
                }}
              />
            </motion.div>
            <p className="text-gray-800 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4E61D3]" />
              Start Your Financial Journey Today
              <Sparkles className="w-4 h-4 text-[#4E61D3]" />
            </p>
          </motion.div>

          {/* Signup Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8"
          >
            <h2 className="text-gray-900 mb-2 text-center">Create Account</h2>
            <p className="text-gray-700 text-center mb-6">Join FinScope and take control</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-gray-800">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 bg-white/60 border-white/40 focus:ring-2 focus:ring-[#4E61D3] focus:border-transparent rounded-xl backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-800">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 bg-white/60 border-white/40 focus:ring-2 focus:ring-[#4E61D3] focus:border-transparent rounded-xl backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-800">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/60 border-white/40 focus:ring-2 focus:ring-[#4E61D3] focus:border-transparent rounded-xl pr-10 backdrop-blur-sm"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-800">Confirm Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white/60 border-white/40 focus:ring-2 focus:ring-[#4E61D3] focus:border-transparent rounded-xl pr-10 backdrop-blur-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="userType" className="text-gray-800">I am a...</Label>
                <Select value={userType} onValueChange={(val) => {
                  setUserType(val);
                  setErrors({ ...errors, userType: '' });
                }}>
                  <SelectTrigger className={`mt-1 bg-white/60 border-white/40 rounded-xl backdrop-blur-sm ${
                    errors.userType ? 'border-red-400' : ''
                  }`}>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">🎓 Student</SelectItem>
                    <SelectItem value="employee">💼 Employee</SelectItem>
                    <SelectItem value="couple">💑 Couple</SelectItem>
                  </SelectContent>
                </Select>
                {errors.userType && (
                  <p className="text-red-600 text-xs mt-1">{errors.userType}</p>
                )}
              </div>

              {userType === 'couple' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 border-2 border-[#4E61D3]/30 rounded-2xl p-4 bg-[#4E61D3]/5"
                >
                  <div className="flex items-center gap-2 text-[#4E61D3]">
                    <Users className="w-5 h-5" />
                    <span className="text-sm">Partner Details</span>
                  </div>
                  <div>
                    <Label htmlFor="partnerName" className="text-gray-800">Partner Name</Label>
                    <Input
                      id="partnerName"
                      type="text"
                      placeholder="Partner's full name"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      className="mt-1 bg-white/60 border-white/40 focus:ring-2 focus:ring-[#4E61D3] focus:border-transparent rounded-xl backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="partnerEmail" className="text-gray-800">Partner Email</Label>
                    <Input
                      id="partnerEmail"
                      type="email"
                      placeholder="partner@email.com"
                      value={partnerEmail}
                      onChange={(e) => {
                        setPartnerEmail(e.target.value);
                        setErrors({ ...errors, partnerEmail: '' });
                      }}
                      className={`mt-1 bg-white/60 border-white/40 focus:ring-2 focus:ring-[#4E61D3] focus:border-transparent rounded-xl backdrop-blur-sm ${
                        errors.partnerEmail ? 'border-red-400' : ''
                      }`}
                    />
                    {errors.partnerEmail && (
                      <p className="text-red-600 text-xs mt-1">{errors.partnerEmail}</p>
                    )}
                    <p className="text-xs text-gray-600 mt-1">
                      Your partner can join using this email to link accounts
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] hover:from-[#3d4fb0] hover:to-[#4E61D3] text-white rounded-xl py-6 shadow-lg shadow-[#4E61D3]/30 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </motion.div>
            </form>

            <p className="mt-6 text-center text-gray-700">
              Already a user?{' '}
              <Link to="/login" className="text-[#4E61D3] hover:underline">
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

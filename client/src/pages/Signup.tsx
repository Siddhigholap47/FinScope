import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - in real app, call API
    localStorage.setItem('token', 'mock-token-12345');
    localStorage.setItem('userName', name);
    navigate('/dashboard');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-600">Sign up to start tracking your finances</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="name" className="text-gray-700">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 border-gray-300 focus:ring-2 focus:ring-[#4E61D3] focus:border-transparent rounded-xl"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-700">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 border-gray-300 focus:ring-2 focus:ring-[#4E61D3] focus:border-transparent rounded-xl"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-700">Password</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 focus:ring-2 focus:ring-[#4E61D3] focus:border-transparent rounded-xl pr-10"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <Label className="text-gray-700">Profile Photo (Optional)</Label>
          <div className="mt-1 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-3 text-center hover:border-[#4E61D3] transition-colors">
                <p className="text-gray-600">Choose Photo</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#4E61D3] hover:bg-[#3d4fb0] text-white rounded-xl py-6 transition-all duration-300 hover:shadow-lg"
        >
          SIGN UP
        </Button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-[#4E61D3] hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}

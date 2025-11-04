import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { motion } from "motion/react";
import { Toaster, toast } from "sonner"; // ✅ fixed import

import logo from "../assets/logout-logo.png";
const logoImage = logo;

const rotatingTexts = [
  "Plan. Save. Celebrate.",
  "Your Money, Your Goals.",
  "Make Finance Fun.",
];

export function FinScopeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    let hasErrors = false;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasErrors = true;
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulated authentication
    setTimeout(() => {
      const storedUser = localStorage.getItem("finscope_user_" + email);

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
          localStorage.setItem("token", "finscope-token-" + Date.now());
          localStorage.setItem("userName", userData.name);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userType", userData.userType || "employee");
          localStorage.setItem("partnerId", userData.partnerId || "");
          localStorage.setItem("partnerName", userData.partnerName || "");
          if (rememberMe) localStorage.setItem("rememberMe", "true");

          toast.success("Welcome back!");
          navigate("/dashboard");
        } else {
          toast.error("Invalid password");
          setErrors({ ...errors, password: "Incorrect password" });
        }
      } else {
        toast.error("User not found. Please sign up first.");
        setErrors({ ...errors, email: "User not found" });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F754] via-[#E9D484] to-[#CFADC1] relative overflow-hidden">
      <Toaster position="top-right" richColors /> {/* ✅ Added toaster */}

      {/* Animated background */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-[#4E61D3] rounded-full blur-3xl opacity-20"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-[#CFADC1] rounded-full blur-3xl opacity-30"
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, -50, 0] }}
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
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <img
                src={logoImage}
                alt="FinScope"
                className="h-24 mx-auto mb-4 mix-blend-multiply"
                style={{
                  filter: "brightness(1.1) contrast(1.1) saturate(1.3)",
                  opacity: 0.95,
                }}
              />
            </motion.div>
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-800 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#4E61D3]" />
              {rotatingTexts[currentTextIndex]}
              <Sparkles className="w-4 h-4 text-[#4E61D3]" />
            </motion.p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8"
          >
            <h2 className="text-gray-900 mb-2 text-center">Welcome Back!</h2>
            <p className="text-gray-700 text-center mb-6">
              Login to continue your financial journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-gray-800">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: "" });
                  }}
                  className={`mt-1 bg-white/60 border-white/40 focus:ring-2 focus:ring-[#4E61D3] focus:border-transparent rounded-xl backdrop-blur-sm ${
                    errors.email ? "border-red-400" : ""
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-800">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: "" });
                    }}
                    className={`bg-white/60 border-white/40 focus:ring-2 focus:ring-[#4E61D3] focus:border-transparent rounded-xl pr-10 backdrop-blur-sm ${
                      errors.password ? "border-red-400" : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label htmlFor="remember" className="text-gray-700 cursor-pointer">
                    Remember Me
                  </Label>
                </div>
                <Link to="/forgot-password" className="text-[#4E61D3] hover:underline">
                  Forgot?
                </Link>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] hover:from-[#3d4fb0] hover:to-[#4E61D3] text-white rounded-xl py-6 shadow-lg shadow-[#4E61D3]/30 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? "Logging in..." : "Login to FinScope"}
                </Button>
              </motion.div>
            </form>

            <p className="mt-6 text-center text-gray-700">
              New here?{" "}
              <Link to="/signup" className="text-[#4E61D3] hover:underline">
                Create an Account
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

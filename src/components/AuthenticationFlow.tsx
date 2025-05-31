
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

interface AuthenticationFlowProps {
  onAuthSuccess: () => void;
}

const AuthenticationFlow: React.FC<AuthenticationFlowProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    captcha: '',
    rememberMe: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState(8); // 5 + 3

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && parseInt(formData.captcha) !== captchaAnswer) {
      toast({
        title: "Invalid CAPTCHA",
        description: "Please solve the math problem correctly.",
        variant: "destructive"
      });
      return;
    }

    if (isLogin) {
      // Login logic
      toast({
        title: "Login Successful! 🎉",
        description: "Welcome to Jewelry Billing Software",
      });
      onAuthSuccess();
    } else {
      // Registration logic
      toast({
        title: "Registration Successful! ✨",
        description: "Verification email sent. Please check your inbox.",
      });
      setIsLogin(true);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Reset Link Sent 📧",
      description: "Password reset link has been sent to your email.",
    });
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {isLogin ? 'Sign in to your account' : 'Join our jewelry platform'}
            </p>
          </div>

          {/* Forgot Password Modal */}
          {showForgotPassword && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Reset Password</h3>
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="mb-3"
              />
              <div className="flex gap-2">
                <Button onClick={handleForgotPassword} size="sm" className="flex-1">
                  Send Reset Link
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowForgotPassword(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Registration Fields */}
            {!isLogin && (
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Username (min 4 chars)"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="pl-12"
                    required
                    minLength={4}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="pl-12"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({...formData, password: e.target.value});
                  if (!isLogin) calculatePasswordStrength(e.target.value);
                }}
                className="pl-12 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Strength Meter */}
            {!isLogin && formData.password && (
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[0, 25, 50, 75].map((threshold) => (
                    <div
                      key={threshold}
                      className={`h-2 flex-1 rounded ${
                        passwordStrength > threshold
                          ? passwordStrength <= 25 ? 'bg-red-500'
                          : passwordStrength <= 50 ? 'bg-yellow-500'
                          : passwordStrength <= 75 ? 'bg-blue-500'
                          : 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-sm ${
                  passwordStrength <= 25 ? 'text-red-500'
                  : passwordStrength <= 50 ? 'text-yellow-500'
                  : passwordStrength <= 75 ? 'text-blue-500'
                  : 'text-green-500'
                }`}>
                  {passwordStrength <= 25 ? 'Weak' 
                  : passwordStrength <= 50 ? 'Fair'
                  : passwordStrength <= 75 ? 'Good'
                  : 'Strong'}
                </p>
              </div>
            )}

            {/* Confirm Password for Registration */}
            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="pl-12"
                  required
                />
              </div>
            )}

            {/* CAPTCHA for Registration */}
            {!isLogin && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <Label className="text-sm font-medium mb-2 block">Security Check</Label>
                <p className="text-lg font-bold text-center mb-3">5 + 3 = ?</p>
                <Input
                  type="number"
                  placeholder="Enter answer"
                  value={formData.captcha}
                  onChange={(e) => setFormData({...formData, captcha: e.target.value})}
                  className="text-center"
                  required
                />
              </div>
            )}

            {/* Remember Me for Login */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300"
            >
              {isLogin ? 'Sign In' : 'Create Account'} ✨
            </Button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-amber-600 hover:text-amber-700 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationFlow;

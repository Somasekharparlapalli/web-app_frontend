import { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Stethoscope } from 'lucide-react';
import { apiService } from '../api/apiService';

interface DoctorLoginScreenProps {
  onNavigate: (screen: string) => void;
  setUserRole: (role: 'doctor' | 'admin' | 'patient') => void;
  setForgotPasswordPortal: (portal: 'doctor' | 'student') => void;
  onLoginSuccess: (doctorData: any) => void;
}

export function DoctorLoginScreen({ onNavigate, setUserRole, setForgotPasswordPortal, onLoginSuccess }: DoctorLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const clearMsg = () => setTimeout(() => setMessage({ text: '', type: '' }), 4000);

    if (!email || !password) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      clearMsg();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      clearMsg();
      return;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    if (password.length < 8) {
      setMessage({ text: 'Password must be at least 8 characters', type: 'error' });
      clearMsg();
      return;
    }
    
    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      setMessage({ text: 'Invalid password format. Must meet strength requirements.', type: 'error' });
      clearMsg();
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.loginDoctor(email, password);

      if (response.status) {
        setMessage({ text: 'Login successful! Welcome, Doctor', type: 'success' });

        // Fetch full profile info to get ID and other details
        const profileResponse = await apiService.getDoctorProfile(email);
        const doctorData = profileResponse.status ? profileResponse.data : response.data;

        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(doctorData);
          setUserRole('doctor');
          onNavigate('home');
        }, 600);
      } else {
        setMessage({ text: response.message || 'Login failed', type: 'error' });
        setIsLoading(false);
      }
    } catch (error: any) {
      setMessage({ text: error.message || 'An error occurred during login', type: 'error' });
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3 bg-white">
        <button
          onClick={() => onNavigate('role-selection')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg text-gray-800">Doctor Sign In</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="min-h-full flex flex-col items-center justify-center p-6 w-full">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
        {/* Icon Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl text-gray-800 mb-2">Welcome Back, Doctor</h2>
          <p className="text-sm text-gray-600 text-center">Sign in to manage your patients and cases</p>
        </div>

        {/* Success/Error Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${message.type === 'success'
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
            }`}>
            <p className={`text-sm ${message.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
              {message.text}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@hospital.com"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm text-gray-700 mb-2 ml-1">Password</label>
            <div className="relative group overflow-hidden rounded-xl">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center z-10 pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-20 p-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setForgotPasswordPortal('doctor');
                onNavigate('forgot-password');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-xl font-medium hover:opacity-90 transition-all shadow-md disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have a doctor account?{' '}
            <button
              onClick={() => onNavigate('doctor-signup')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>


        </div>
        </div>
      </div>
    </div>
  );
}
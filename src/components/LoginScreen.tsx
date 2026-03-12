import { Activity, Mail, Lock, CheckCircle, ArrowLeft, Eye, EyeOff, Stethoscope } from 'lucide-react';
import { useState, useEffect } from 'react';
import { apiService } from '../api/apiService';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
  setUserRole: (role: 'patient' | 'doctor' | 'admin' | 'student') => void;
  setForgotPasswordPortal: (portal: 'doctor' | 'student') => void;
  onLoginSuccess?: (doctorData: any) => void;
}

export function LoginScreen({ onNavigate, setUserRole, setForgotPasswordPortal, onLoginSuccess }: LoginScreenProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Initial loading simulation like a splash
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      return;
    }

    setFormLoading(true);

    try {
      const response = await apiService.loginDoctor(email, password);

      if (response.status) {
        setMessage({ text: 'Login successful! Welcome, Doctor', type: 'success' });

        // Fetch full profile info to get ID and other details if needed, 
        // or just use the response data if it's already full
        const doctorData = response.data;

        setTimeout(() => {
          setFormLoading(false);
          if (onLoginSuccess) onLoginSuccess(doctorData);
          setUserRole('doctor');
          onNavigate('home');
        }, 800);
      } else {
        setMessage({ text: response.message || 'Invalid login details', type: 'error' });
        setFormLoading(false);
      }
    } catch (error: any) {
      setMessage({ text: error.message || 'Invalid login details', type: 'error' });
      setFormLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">

      {/* Left Side: Splash Content (Identity Panel) */}
      <div className="w-full md:w-1/2 bg-blue-500 flex flex-col items-center justify-center p-8 md:p-12 text-white relative">
        <div className="max-w-md w-full flex flex-col items-center text-center">
          {/* Animated Logo Container */}
          <div className="relative mb-8">
            <div className="absolute inset-0 w-28 h-28 border-4 border-white/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="relative bg-white p-6 rounded-3xl shadow-2xl">
              <Activity className="w-16 h-16 text-blue-500" strokeWidth={2} />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
            AI-Based Antimicrobial Peptide Varnish for Caries Prevention
          </h1>

          <p className="text-blue-50 opacity-80 text-lg mb-8">
            Advanced oral health analysis and preventative care powered by integrated dental intelligence.
          </p>
        </div>
      </div>

      {/* Right Side: Doctor Login Form (The "As Is" Content) */}
      <div className={`w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 transition-all duration-1000 transform ${isLoading ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
        <div className="max-w-md w-full">
          {/* Doctor Header Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back, Doctor</h2>
            <p className="text-sm text-gray-600 text-center">Sign in to manage your patients and cases</p>
          </div>

          {/* Messages */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl animate-in fade-in duration-300 ${message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
              <p className={`text-sm flex items-center gap-2 ${message.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {message.type === 'success' && <CheckCircle className="w-4 h-4" />}
                {message.text}
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email Address</label>
              <div className="relative group overflow-hidden rounded-xl">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center z-10 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@hospital.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400 shadow-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Password</label>
              <div className="relative group rounded-xl">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center z-10 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-all z-30 p-2 bg-transparent rounded-full hover:bg-gray-100/50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordPortal('doctor');
                  onNavigate('forgot-password');
                }}
                className="text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
            >
              {formLoading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs font-bold text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don't have a doctor account?{' '}
            <button
              onClick={() => onNavigate('doctor-signup')}
              className="text-blue-600 font-bold hover:text-blue-700 underline underline-offset-4"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div >
  );
}
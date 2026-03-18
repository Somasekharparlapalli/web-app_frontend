import { ArrowLeft, User, Mail, Lock, Phone, Check } from 'lucide-react';
import { useState } from 'react';

interface SignUpScreenProps {
  onNavigate: (screen: string) => void;
}

export function SignUpScreen({ onNavigate }: SignUpScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateAccount = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Account created successfully!');
      setTimeout(() => {
        onNavigate('login');
      }, 1500);
    }, 600);
  };

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3 bg-white">
        <button
          onClick={() => onNavigate('auth')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg text-gray-800">Create Account</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 flex justify-center">
        <div className="min-h-full flex flex-col items-center justify-center p-6 w-full">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
              Create Account
            </h2>
            <p className="text-sm text-center text-gray-600 mb-6">
              Sign up to get started
            </p>

        <div className="space-y-5 mb-6">
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-2 block">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Create a password"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleCreateAccount}
          disabled={isLoading || successMessage !== ''}
          className="w-full bg-blue-500 text-white py-3.5 rounded-xl mb-4 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-blue-600"
          >
            Sign In
          </button>
        </p>
        </div>
        </div>
      </div>
    </div>
  );
}
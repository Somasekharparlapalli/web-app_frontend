import { useState } from 'react';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface ResetPasswordScreenProps {
  onNavigate: (screen: string) => void;
  forgotPasswordPortal?: 'doctor' | 'student' | 'patient';
}

export function ResetPasswordScreen({ onNavigate, forgotPasswordPortal = 'doctor' }: ResetPasswordScreenProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [success, setSuccess] = useState(false);

  const isStudentPortal = forgotPasswordPortal === 'student';
  const themeColor = isStudentPortal ? 'bg-green-500' : 'bg-blue-600';
  const ringColor = isStudentPortal ? 'focus:ring-green-500' : 'focus:ring-blue-600';

  const handleReset = () => {
    if (newPassword.length < 6) return;
    if (newPassword !== confirmPassword) return;

    setIsResetting(true);
    // Simulate API
    setTimeout(() => {
      setIsResetting(false);
      setSuccess(true);
      setTimeout(() => {
        onNavigate(forgotPasswordPortal === 'patient' ? 'login' : forgotPasswordPortal === 'student' ? 'student-login' : 'doctor-login');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 ${themeColor}`} />

      <div className="flex-1 flex flex-col px-8 py-12">
        <button
          onClick={() => onNavigate('verify-otp')}
          className="mb-8 p-3 hover:bg-gray-100 rounded-2xl transition-all w-fit group"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="flex justify-center mb-8">
          <div className={`${themeColor} p-5 rounded-[28px] shadow-lg shadow-blue-100`}>
            <Lock className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
            New Password
          </h2>
          <p className="text-base text-gray-500 font-medium">
            Create a strong password to protect your account
          </p>
        </div>

        {success ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Password Reset!</h3>
            <p className="text-gray-500 font-medium mb-8">Your account password has been updated successfully.</p>
            <p className="text-sm text-gray-400">Redirecting to login...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block ml-1 uppercase tracking-wider">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={`w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-300 transition-all bg-gray-50/50 pr-12 font-medium ${ringColor} focus:ring-4 focus:ring-opacity-10`}
                />
                <button
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block ml-1 uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className={`w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-300 transition-all bg-gray-50/50 pr-12 font-medium ${ringColor} focus:ring-4 focus:ring-opacity-10`}
                />
                <button
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Validation Feedback */}
            {newPassword && confirmPassword && (
              <div className={`p-4 rounded-2xl flex items-center gap-3 transition-colors ${newPassword === confirmPassword ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {newPassword === confirmPassword ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="text-sm font-bold">
                  {newPassword === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                </span>
              </div>
            )}

            <button
              onClick={handleReset}
              disabled={newPassword.length < 6 || newPassword !== confirmPassword || isResetting}
              className={`w-full py-5 rounded-[22px] font-black text-lg transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 mt-4
                ${newPassword.length >= 6 && newPassword === confirmPassword
                  ? `${themeColor} text-white shadow-blue-200 hover:brightness-110` 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'}`}
            >
              {isResetting ? (
                <ShieldCheck className="w-6 h-6 animate-pulse" />
              ) : (
                'Save New Password'
              )}
            </button>
          </div>
        )}

        <div className="mt-auto pt-6 text-center">
          <p className="text-sm text-gray-400 font-medium">
            Secured by Varnish Dental Protocol
          </p>
        </div>
      </div>
    </div>
  );
}

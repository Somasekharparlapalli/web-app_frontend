import { ArrowLeft, Mail, Check, ShieldCheck, Lock, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { apiService } from '../api/apiService';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: string) => void;
  forgotPasswordPortal?: 'doctor' | 'student' | 'patient';
}

export function ForgotPasswordScreen({ onNavigate, forgotPasswordPortal = 'doctor' }: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const exactEmail = email.trim();
      console.log('Front-end requesting OTP for email:', exactEmail);
      const response = await apiService.forgotPassword(exactEmail);
      console.log('Front-end received OTP response:', response);
      if (response.status) {
        setEmail(exactEmail); // Sync exactly what was sent
        setStep('otp');
      } else {
        setError(response.message || 'Failed to send OTP');
      }
    } catch (err: any) {
      console.error('Front-end OTP request error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim() || !newPassword) return;

    setIsLoading(true);
    setError('');

    try {
      console.log('Front-end verifying OTP:', otp.trim(), 'for email:', email);
      const response = await apiService.verifyOtp(email, otp.trim(), newPassword);
      console.log('Front-end received verification response:', response);
      if (response.status) {
        setStep('success');
      } else {
        setError(response.message || 'Verification failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Determine colors and back destination based on portal
  const isStudentPortal = forgotPasswordPortal === 'student';
  const isPatientPortal = forgotPasswordPortal === 'patient';
  const backDestination = isPatientPortal ? 'login' : isStudentPortal ? 'student-login' : 'doctor-login';
  const portalName = isPatientPortal ? 'Patient' : isStudentPortal ? 'Student / Researcher' : 'Doctor';
  const themeColor = isStudentPortal ? "bg-green-500" : "bg-blue-500";
  const btnColor = isStudentPortal ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600";
  const textColor = isStudentPortal ? "text-green-600" : "text-blue-600";

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 flex flex-col justify-center px-6 py-8 overflow-y-auto">
        <button
          onClick={() => step === 'otp' ? setStep('email') : onNavigate(backDestination)}
          className="mb-8 p-2 hover:bg-gray-100 rounded-lg transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {step === 'email' && (
          <form onSubmit={handleRequestOtp}>
            <div className="flex justify-center mb-8">
              <div className={`${themeColor} p-4 rounded-2xl`}>
                <Mail className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
            </div>

            <h2 className="text-2xl text-center mb-2 text-gray-800 font-bold">
              Forgot Password?
            </h2>
            <p className="text-sm text-center text-gray-600 mb-8">
              Enter your {portalName} email address and we'll send you an OTP to reset your password
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="text-sm text-gray-700 mb-2 block font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isStudentPortal ? "student@university.edu" : "doctor@hospital.com"}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${btnColor} text-white py-3.5 rounded-xl mb-4 transition-all flex items-center justify-center gap-2 font-semibold shadow-md`}
            >
              {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Send OTP"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => onNavigate(backDestination)}
                className={textColor}
              >
                Sign In
              </button>
            </p>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleResetPassword}>
            <div className="flex justify-center mb-8">
              <div className={`${themeColor} p-4 rounded-2xl`}>
                <ShieldCheck className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
            </div>

            <h2 className="text-2xl text-center mb-2 text-gray-800 font-bold">
              Verify OTP
            </h2>
            <p className="text-sm text-center text-gray-600 mb-8">
              Enter the verification code sent to <span className="font-bold text-gray-800">{email}</span> and your new password
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-700 mb-2 block font-medium">Verification Code</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 text-center text-lg tracking-widest font-bold"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-2 block font-medium">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Create new password"
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${btnColor} text-white py-3.5 rounded-xl mb-4 transition-all flex items-center justify-center gap-2 font-semibold shadow-md`}
            >
              {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Verify & Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-sm text-gray-500 font-medium hover:text-gray-700 transition-colors"
            >
              Change Email
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center mb-8">
              <div className="bg-green-500 p-4 rounded-full shadow-lg shadow-green-100">
                <Check className="w-16 h-16 text-white" strokeWidth={3} />
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-800 mb-3">
              Success!
            </h2>
            <p className="text-base text-gray-600 mb-10 leading-relaxed font-medium">
              Your password has been reset successfully. You can now sign in with your new credentials.
            </p>

            <button
              onClick={() => onNavigate(backDestination)}
              className={`w-full ${btnColor} text-white py-4 rounded-[22px] font-black text-lg shadow-xl shadow-blue-100 transition-all active:scale-95`}
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


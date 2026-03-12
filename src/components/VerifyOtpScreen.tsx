import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

interface VerifyOtpScreenProps {
  onNavigate: (screen: string) => void;
  forgotPasswordPortal?: 'doctor' | 'student' | 'patient';
}

export function VerifyOtpScreen({ onNavigate, forgotPasswordPortal = 'doctor' }: VerifyOtpScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(59);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const isStudentPortal = forgotPasswordPortal === 'student';
  const themeColor = isStudentPortal ? 'bg-green-500' : 'bg-blue-600';
  const textColor = isStudentPortal ? 'text-green-600' : 'text-blue-600';
  const ringColor = isStudentPortal ? 'focus:ring-green-500' : 'focus:ring-blue-600';

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.some(digit => digit === '')) return;
    
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      onNavigate('reset-password'); // Moving to reset password screen
    }, 1500);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setTimer(59);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Background Decor */}
      <div className={`absolute top-0 left-0 w-full h-1 ${themeColor}`} />

      <div className="flex-1 flex flex-col px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('forgot-password')}
          className="mb-8 p-3 hover:bg-gray-100 rounded-2xl transition-all w-fit group"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* Header Icon */}
        <div className="flex justify-center mb-8">
          <div className={`${themeColor} p-5 rounded-[28px] shadow-lg shadow-blue-100 animate-in zoom-in-50 duration-500`}>
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
            Verify OTP
          </h2>
          <p className="text-base text-gray-500 leading-relaxed max-w-[280px] mx-auto font-medium">
            Enter the 4-digit verification code sent to your registered email address
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4 mb-10">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-16 h-18 text-center text-3xl font-black border-2 rounded-2xl transition-all outline-none bg-gray-50/50
                ${digit ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 focus:border-blue-300'}
                ${ringColor} focus:ring-4 focus:ring-opacity-10`}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={otp.some(digit => digit === '') || isVerifying}
          className={`w-full py-5 rounded-[22px] font-black text-lg transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3
            ${otp.every(digit => digit !== '') 
              ? `${themeColor} text-white shadow-blue-200 hover:brightness-110` 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'}`}
        >
          {isVerifying ? (
            <>
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-6 h-6" />
              <span>Verify & Proceed</span>
            </>
          )}
        </button>

        {/* Resend Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 font-medium mb-4">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={timer > 0 || isResending}
            className={`flex items-center gap-2 mx-auto font-black text-base px-6 py-2 rounded-xl transition-all
              ${timer > 0 || isResending 
                ? 'text-gray-300 cursor-not-allowed' 
                : `${textColor} bg-blue-50/50 hover:bg-blue-100/50`}`}
          >
            {isResending ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {timer > 0 ? `Resend in ${timer}s` : 'Resend Code Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

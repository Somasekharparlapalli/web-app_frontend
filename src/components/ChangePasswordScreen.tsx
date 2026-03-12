import { useState } from 'react';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface ChangePasswordScreenProps {
  onNavigate: (screen: string) => void;
}

export function ChangePasswordScreen({ onNavigate }: ChangePasswordScreenProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'red' };
    if (password.length < 8) return { strength: 50, label: 'Fair', color: 'orange' };
    if (password.length < 12) return { strength: 75, label: 'Good', color: 'blue' };
    return { strength: 100, label: 'Strong', color: 'green' };
  };

  const strength = passwordStrength(newPassword);

  const handleChangePassword = () => {
    setError('');
    
    if (!currentPassword) {
      setError('Please enter your current password');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }
    if (currentPassword === newPassword) {
      setError('New password must be different from current password');
      return;
    }

    setSuccess(true);
    
    // Navigate back after showing success message
    setTimeout(() => {
      onNavigate('settings');
    }, 600);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('settings')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl text-gray-800">Change Password</h2>
            <p className="text-xs text-gray-500">Update your account password</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm text-green-800 font-medium">Password Changed Successfully!</p>
                <p className="text-xs text-green-600">Your password has been updated. Redirecting...</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !success && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-sm text-red-800 font-medium">Error</p>
                <p className="text-xs text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800 mb-1">Security Tips</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Use at least 8 characters</li>
                <li>• Mix uppercase and lowercase letters</li>
                <li>• Include numbers and special characters</li>
                <li>• Don't use personal information</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-700 mb-2 block">Current Password *</label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <button
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 mb-2 block">New Password *</label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <button
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">Password Strength</span>
                <span className={`text-xs text-${strength.color}-600 font-medium`}>{strength.label}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-${strength.color}-500 h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${strength.strength}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-700 mb-2 block">Confirm New Password *</label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <button
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Match Indicator */}
          {confirmPassword && (
            <div className="mt-2">
              {newPassword === confirmPassword ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs">Passwords match</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs">Passwords do not match</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Requirements List */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h4 className="text-sm text-gray-800 mb-3">Password Requirements</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {newPassword.length >= 6 ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
              )}
              <span className={`text-xs ${newPassword.length >= 6 ? 'text-green-600' : 'text-gray-600'}`}>
                At least 6 characters
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/[A-Z]/.test(newPassword) ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
              )}
              <span className={`text-xs ${/[A-Z]/.test(newPassword) ? 'text-green-600' : 'text-gray-600'}`}>
                One uppercase letter
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/[0-9]/.test(newPassword) ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
              )}
              <span className={`text-xs ${/[0-9]/.test(newPassword) ? 'text-green-600' : 'text-gray-600'}`}>
                One number
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="px-6 py-4 border-t border-gray-200">
        <button
          onClick={handleChangePassword}
          disabled={success}
          className={`w-full py-3.5 rounded-xl transition-colors ${
            success
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {success ? 'Password Updated' : 'Update Password'}
        </button>
      </div>
    </div>
  );
}
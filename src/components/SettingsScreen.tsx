import { useState } from 'react';
import { ArrowLeft, Bell, Lock, Globe, Moon, Volume2, HelpCircle, FileText, ChevronRight, Info, MessageSquare, LogOut, Users, AlertTriangle, Smartphone } from 'lucide-react';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  userRole?: 'doctor' | 'patient' | 'admin' | 'student' | null;
}

export function SettingsScreen({ onNavigate, darkMode, setDarkMode, userRole }: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-semibold">Settings</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account and app preferences</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-8">
          {/* General Settings */}
          <div>
            <h2 className="text-lg text-gray-800 dark:text-gray-200 font-semibold mb-4">General</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">Notifications</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {notificationsEnabled ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationsEnabled}
                      onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>

              <button
                onClick={() => onNavigate('language')}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-800 dark:text-gray-200">Language</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Select your language</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">›</span>
                </div>
              </button>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Moon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">Dark Mode</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {darkMode ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security Settings */}
          <div>
            <h2 className="text-lg text-gray-800 dark:text-gray-200 font-semibold mb-4">Privacy & Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => onNavigate('changePassword')}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-800 dark:text-gray-200">Change Password</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Update your password</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">›</span>
                </div>
              </button>

              <button
                onClick={() => onNavigate('privacySettings')}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-800 dark:text-gray-200">Privacy Settings</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Manage data & privacy</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">›</span>
                </div>
              </button>
            </div>
          </div>

          {/* Support Settings */}
          <div>
            <h2 className="text-lg text-gray-800 dark:text-gray-200 font-semibold mb-4">Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => onNavigate('faq')}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-800 dark:text-gray-200">Help & FAQ</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Get help and answers</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">›</span>
                </div>
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Info className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-800 dark:text-gray-200">About App</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Version & information</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">›</span>
                </div>
              </button>

              <button
                onClick={() => onNavigate('contactSupport')}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-800 dark:text-gray-200">Contact Support</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Get help from our team</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">›</span>
                </div>
              </button>

              <button
                onClick={() => onNavigate('feedback')}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-800 dark:text-gray-200">Feedback</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Send us your feedback</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">›</span>
                </div>
              </button>
            </div>
          </div>

          {/* Legal & Information Settings */}
          <div>
            <h2 className="text-lg text-gray-800 dark:text-gray-200 font-semibold mb-4">Legal & Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => onNavigate('terms-of-service')}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-800 dark:text-gray-200">Terms of Service</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Read our terms & conditions</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">›</span>
                </div>
              </button>

              <button
                onClick={() => onNavigate('app-info')}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-teal-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-800 dark:text-gray-200">App Info & Version</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Version 1.0.0</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">›</span>
                </div>
              </button>

              <button
                onClick={() => onNavigate('system-disclaimer')}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-800 dark:text-gray-200">System Disclaimer</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Important legal information</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">›</span>
                </div>
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-6 mb-6">
            <button
              onClick={() => onNavigate(userRole === 'student' ? 'student-login' : 'doctor-login')}
              className="w-full bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
            >
              <div className="flex items-center justify-center gap-3">
                <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">Logout</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
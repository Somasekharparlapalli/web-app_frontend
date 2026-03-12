import { useState } from 'react';
import {
  Activity,
  Users,
  FileText,
  Settings,
  User,
  Menu,
  X,
  LogOut,
  Bell,
  Home,
  Upload
} from 'lucide-react';

interface WebLayoutProps {
  children: React.ReactNode;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  userRole: 'doctor' | 'patient' | 'admin' | 'student' | null;
  userProfile: {
    name: string;
    email: string;
    phone: string;
    specialty: string;
  };
}

export function WebLayout({ children, currentScreen, onNavigate, userRole, userProfile }: WebLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define navigation items based on user role
  const doctorNavItems = [
    { screen: 'home', label: 'Home', icon: Home },
    { screen: 'patients', label: 'Patients', icon: Users },
    { screen: 'history', label: 'Reports', icon: FileText },
    { screen: 'settings', label: 'Settings', icon: Settings },
    { screen: 'profile', label: 'Profile', icon: User },
  ];

  const patientNavItems = [
    { screen: 'home', label: 'Home', icon: Home },
    { screen: 'patients', label: 'Patients', icon: Users },
    { screen: 'history', label: 'Reports', icon: FileText },
    { screen: 'settings', label: 'Settings', icon: Settings },
    { screen: 'profile', label: 'Profile', icon: User },
  ];

  const navItems = userRole === 'doctor' ? doctorNavItems : patientNavItems;

  const handleLogout = () => {
    onNavigate('auth');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR - Always visible */}
      <aside className="flex flex-col bg-white border-r border-gray-200 shadow-sm w-72 flex-shrink-0">
        {/* Sidebar Header */}
        <div className="h-20 border-b border-gray-200 flex items-center justify-center px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">DentalCare AI</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.screen;

              return (
                <button
                  key={item.screen}
                  onClick={() => onNavigate(item.screen)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isActive
                    ? 'bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="border-t border-gray-200 p-">
          <button
            onClick={() => onNavigate('profile')}
            className="w-full flex items-center gap-3 rounded-xl hover:bg-gray-50 transition-colors"
          >


          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* MOBILE SIDEBAR */}
      <aside className={`md:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* Mobile Sidebar Header */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-800">DentalCare AI</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.screen;

              return (
                <button
                  key={item.screen}
                  onClick={() => {
                    onNavigate(item.screen);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Mobile User Profile & Logout */}
        <div className="border-t border-gray-200 p-4">
          <div className="space-y-3">
            <button
              onClick={() => {
                onNavigate('profile');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{userProfile.name}</p>
                <p className="text-xs text-gray-500 truncate">{userRole === 'doctor' ? 'Doctor' : 'Patient'}</p>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header - Mobile */}
        <header className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-800">DentalCare AI</span>
          </div>
          <button
            onClick={() => onNavigate('notifications')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-hidden bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
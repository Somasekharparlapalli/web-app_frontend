import { Activity, LogIn, UserPlus } from 'lucide-react';

interface AuthScreenProps {
  onNavigate: (screen: string) => void;
}

export function AuthScreen({ onNavigate }: AuthScreenProps) {
  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center">
        
        <div className="flex flex-col items-center justify-center">
          <div className="bg-blue-500 p-5 rounded-2xl mb-5 shadow-lg flex items-center justify-center">
            <Activity className="w-16 h-16 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">
            Peptide Varnish
          </h1>
          <p className="text-sm text-center text-gray-600 max-w-xs mb-8">
            AI-Based Antimicrobial Peptide Varnish for Caries Prevention
          </p>
        </div>

        <div className="w-full space-y-3 mt-4">
          <button
            onClick={() => onNavigate('login')}
            className="w-full bg-blue-500 text-white py-3.5 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium shadow-md"
          >
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => onNavigate('signup')}
            className="w-full bg-white border-2 border-blue-500 text-blue-500 py-3.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <UserPlus className="w-5 h-5" />
            <span>Create Account</span>
          </button>
        </div>

      </div>
    </div>
  );
}

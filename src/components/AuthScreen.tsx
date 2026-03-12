import { Activity, LogIn, UserPlus } from 'lucide-react';

interface AuthScreenProps {
  onNavigate: (screen: string) => void;
}

export function AuthScreen({ onNavigate }: AuthScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-between bg-white px-6 py-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-blue-500 p-6 rounded-3xl mb-6 shadow-lg">
          <Activity className="w-16 h-16 text-white" strokeWidth={2} />
        </div>
        <h1 className="text-2xl mb-2 text-center text-gray-800">
          Peptide Varnish
        </h1>
        <p className="text-sm text-gray-600 text-center max-w-xs mb-8">
          AI-Based Antimicrobial Peptide Varnish for Caries Prevention
        </p>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={() => onNavigate('login')}
          className="w-full bg-blue-500 text-white py-3.5 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In</span>
        </button>

        <button
          onClick={() => onNavigate('signup')}
          className="w-full bg-white border-2 border-blue-500 text-blue-500 py-3.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Create Account</span>
        </button>
      </div>
    </div>
  );
}

import { Activity } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-blue-500 px-8">
      <div className="flex flex-col items-center justify-center">
        {/* Animated Logo Container */}
        <div className="relative mb-8">
          {/* Outer rotating circle */}
          <div className="absolute inset-0 w-28 h-28 border-4 border-white/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          
          {/* Logo */}
          <div className="relative bg-white p-6 rounded-3xl shadow-2xl">
            <Activity className="w-16 h-16 text-blue-500" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl mb-6 text-center text-white font-medium px-4">
          AI-Based Antimicrobial Peptide Varnish for Caries Prevention
        </h1>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center gap-3">
          {/* Loading Dots */}
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-white/80 text-sm">Loading...</p>
        </div>
      </div>
    </div>
  );
}
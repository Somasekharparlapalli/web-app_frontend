import { useState } from 'react';
import { ArrowLeft, Check, Globe, CheckCircle } from 'lucide-react';

interface LanguageScreenProps {
  onNavigate: (screen: string) => void;
}

export function LanguageScreen({ onNavigate }: LanguageScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [success, setSuccess] = useState(false);

  const languages = [
    { code: 'en-US', name: 'English (US)', nativeName: 'English' },
    { code: 'en-GB', name: 'English (UK)', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  ];

  const handleLanguageSelect = (langName: string) => {
    setSelectedLanguage(langName);
  };

  const handleSave = () => {
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
            <h2 className="text-xl text-gray-800">Language</h2>
            <p className="text-xs text-gray-500">Select your preferred language</p>
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
                <p className="text-sm text-green-800 font-medium">Language Changed Successfully!</p>
                <p className="text-xs text-green-600">Your language preference has been saved. Redirecting...</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800 mb-1">Current Language</p>
              <p className="text-xs text-gray-600">{selectedLanguage}</p>
            </div>
          </div>
        </div>

        <h3 className="text-sm text-gray-700 mb-3">Available Languages</h3>
        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.name)}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                selectedLanguage === lang.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm text-gray-800">{lang.name}</p>
                  <p className="text-xs text-gray-500">{lang.nativeName}</p>
                </div>
                {selectedLanguage === lang.name && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Button */}
      <div className="px-6 py-4 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={success}
          className={`w-full py-3.5 rounded-xl transition-colors ${
            success
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {success ? 'Language Saved' : 'Save Language'}
        </button>
      </div>
    </div>
  );
}
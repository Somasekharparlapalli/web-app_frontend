import { ArrowLeft, Shield, Droplet, CheckCircle, Info, Activity } from 'lucide-react';
import { AIChatButton } from './AIChatButton';

interface VarnishInfoScreenProps {
  onNavigate: (screen: string) => void;
}

export function VarnishInfoScreen({ onNavigate }: VarnishInfoScreenProps) {
  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-6 rounded-b-3xl">
        <button
          onClick={() => onNavigate('home')}
          className="mb-4 p-2 hover:bg-purple-400 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl text-white">Antimicrobial Varnish</h2>
            <p className="text-sm text-purple-100">Peptide-based Protection</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="bg-purple-50 rounded-xl p-4 mb-6">
          <h3 className="text-sm text-gray-800 mb-2">What is it?</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Antimicrobial peptide varnish is an advanced dental treatment that uses naturally occurring peptides to prevent and combat dental caries. It forms a protective barrier on teeth while actively fighting harmful bacteria.
          </p>
        </div>

        <h3 className="text-sm text-gray-800 mb-3">Key Benefits</h3>
        <div className="space-y-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800 mb-1">Prevents Caries Formation</p>
                <p className="text-xs text-gray-600">
                  Creates a protective shield that prevents bacterial colonization
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Droplet className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800 mb-1">Long-lasting Protection</p>
                <p className="text-xs text-gray-600">
                  Provides sustained antimicrobial activity for extended periods
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800 mb-1">Safe & Biocompatible</p>
                <p className="text-xs text-gray-600">
                  Natural peptides that are safe for oral application
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-sm text-gray-800 mb-3">Application Method</h3>
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <ol className="space-y-2 text-xs text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-500 flex-shrink-0">1.</span>
              <span>Clean and dry the tooth surface thoroughly</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 flex-shrink-0">2.</span>
              <span>Apply thin layer of varnish using applicator</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 flex-shrink-0">3.</span>
              <span>Allow varnish to set for 30-60 seconds</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 flex-shrink-0">4.</span>
              <span>Avoid eating/drinking for 30 minutes after application</span>
            </li>
          </ol>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm text-gray-800 mb-1">Important Note</h3>
              <p className="text-xs text-gray-600">
                This treatment should be applied by a qualified dental professional. Consult your dentist for proper application and guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <AIChatButton context="general" />
    </div>
  );
}
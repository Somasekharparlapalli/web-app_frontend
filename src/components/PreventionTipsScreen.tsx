import { ArrowLeft, Smile, Droplet, Apple, Moon, AlertTriangle, CheckCircle, Shield, Clock } from 'lucide-react';
import { AIChatButton } from './AIChatButton';

interface PreventionTipsScreenProps {
  onNavigate: (screen: string) => void;
}

export function PreventionTipsScreen({ onNavigate }: PreventionTipsScreenProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-6 rounded-b-3xl">
        <button
          onClick={() => onNavigate('home')}
          className="mb-4 p-2 hover:bg-green-400 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl text-white">Prevention Tips</h2>
            <p className="text-sm text-green-100">Keep your teeth healthy</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="bg-green-50 rounded-xl p-4 mb-6">
          <h3 className="text-sm text-gray-800 mb-2">About Dental Caries</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Dental caries (tooth decay) is caused by bacteria that produce acid, which damages tooth enamel. Prevention is key to maintaining healthy teeth and avoiding cavities.
          </p>
        </div>

        <h3 className="text-sm text-gray-800 mb-3">Daily Prevention Tips</h3>
        <div className="space-y-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Smile className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800 mb-1">Brush Twice Daily</p>
                <p className="text-xs text-gray-600">
                  Brush your teeth for 2 minutes, twice a day with fluoride toothpaste
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Droplet className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800 mb-1">Floss Regularly</p>
                <p className="text-xs text-gray-600">
                  Floss at least once daily to remove plaque between teeth
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Apple className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800 mb-1">Healthy Diet</p>
                <p className="text-xs text-gray-600">
                  Limit sugary foods and drinks. Choose nutritious snacks
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800 mb-1">Regular Checkups</p>
                <p className="text-xs text-gray-600">
                  Visit your dentist every 6 months for professional cleaning
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-teal-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800 mb-1">Use Fluoride Products</p>
                <p className="text-xs text-gray-600">
                  Use fluoride toothpaste and mouthwash to strengthen enamel
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-sm text-gray-800 mb-3">Additional Tips</h3>
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>Drink plenty of water throughout the day</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>Avoid frequent snacking between meals</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>Replace your toothbrush every 3-4 months</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>Consider dental sealants for extra protection</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>Rinse your mouth after eating sugary foods</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => onNavigate('varnish')}
          className="w-full bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition-colors"
        >
          Learn About Antimicrobial Varnish
        </button>
      </div>
      
      <AIChatButton context="prevention" />
    </div>
  );
}
import { ArrowLeft, Activity, Info, FileText, Shield, Mail } from 'lucide-react';

interface AboutScreenProps {
  onNavigate: (screen: string) => void;
}

export function AboutScreen({ onNavigate }: AboutScreenProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-6 rounded-b-3xl">
        <button
          onClick={() => onNavigate('settings')}
          className="mb-4 p-2 hover:bg-blue-400 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-3">
            <Activity className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-xl text-white mb-1">DentalCare AI</h2>
          <p className="text-sm text-blue-100">Version 1.0.0</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <h3 className="text-sm text-gray-800 mb-2">About This App</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            DentalCare AI is an innovative mobile application designed for the detection and prevention of dental caries using AI-based antimicrobial peptide varnish technology. This application is developed as part of a final year academic project.
          </p>
        </div>

        <h3 className="text-sm text-gray-800 mb-3">Project Information</h3>
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Project Title</p>
              <p className="text-sm text-gray-800">
                AI-Based Antimicrobial Peptide Varnish for Caries Prevention
              </p>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-600 mb-1">Institution</p>
              <p className="text-sm text-gray-800">University Name</p>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-600 mb-1">Academic Year</p>
              <p className="text-sm text-gray-800">2025-2026</p>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-600 mb-1">Department</p>
              <p className="text-sm text-gray-800">Computer Science & Engineering</p>
            </div>
          </div>
        </div>

        <h3 className="text-sm text-gray-800 mb-3">Key Features</h3>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-3">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-800">AI-Powered Detection</p>
              <p className="text-xs text-gray-600">Advanced caries detection using machine learning</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-3">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-800">Peptide Varnish Info</p>
              <p className="text-xs text-gray-600">Comprehensive antimicrobial treatment details</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-3">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-800">Report Management</p>
              <p className="text-xs text-gray-600">Track and manage dental health history</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onNavigate('faq')}
            className="w-full bg-white border border-gray-200 p-4 rounded-xl hover:border-blue-300 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-800">FAQs</span>
            </div>
            <span className="text-xs text-gray-500">›</span>
          </button>

          <button className="w-full bg-white border border-gray-200 p-4 rounded-xl hover:border-blue-300 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-800">Privacy Policy</span>
            </div>
            <span className="text-xs text-gray-500">›</span>
          </button>

          <button className="w-full bg-white border border-gray-200 p-4 rounded-xl hover:border-blue-300 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-800">Contact Support</span>
            </div>
            <span className="text-xs text-gray-500">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
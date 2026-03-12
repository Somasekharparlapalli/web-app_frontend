import { ArrowLeft, Info, Smartphone, Code, Shield, Users, Award, Github, Mail, Globe } from 'lucide-react';

interface AppInfoScreenProps {
  onNavigate: (screen: string) => void;
}

export function AppInfoScreen({ onNavigate }: AppInfoScreenProps) {
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
            <h2 className="text-xl text-gray-800">App Info & Version</h2>
            <p className="text-xs text-gray-500">Application information</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* App Logo & Name */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-lg text-gray-800">AI Caries Prevention</h3>
          <p className="text-xs text-gray-500">Antimicrobial Peptide Varnish System</p>
        </div>

        {/* Version Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-800">Version Information</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">App Version</span>
              <span className="text-xs text-gray-800 font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Build Number</span>
              <span className="text-xs text-gray-800 font-medium">2026.01.001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Release Date</span>
              <span className="text-xs text-gray-800 font-medium">January 29, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Platform</span>
              <span className="text-xs text-gray-800 font-medium">Web Application</span>
            </div>
          </div>
        </div>

        {/* About Application */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-700 mb-3">About This Application</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-600 leading-relaxed">
              This application is an AI-based system designed to detect dental caries and recommend antimicrobial peptide varnish treatments for prevention. Developed as part of a final year academic project, it combines advanced machine learning algorithms with clinical dental care practices to provide healthcare professionals with accurate diagnostic support and treatment recommendations.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-700 mb-3">Key Features</h3>
          <div className="space-y-2">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-800 font-medium mb-0.5">AI-Powered Detection</p>
                  <p className="text-xs text-gray-600">Advanced algorithms for accurate caries identification</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-800 font-medium mb-0.5">Peptide Varnish Recommendations</p>
                  <p className="text-xs text-gray-600">Personalized treatment plans based on detection results</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-800 font-medium mb-0.5">Patient Management</p>
                  <p className="text-xs text-gray-600">Comprehensive patient records and history tracking</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-800 font-medium mb-0.5">Secure & Compliant</p>
                  <p className="text-xs text-gray-600">HIPAA-compliant data security and privacy protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Information */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-700 mb-3">Technical Information</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Framework</span>
              <span className="text-xs text-gray-800">React + TypeScript</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">UI Library</span>
              <span className="text-xs text-gray-800">Tailwind CSS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">AI Model</span>
              <span className="text-xs text-gray-800">Deep Learning CNN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Database</span>
              <span className="text-xs text-gray-800">Encrypted Storage</span>
            </div>
          </div>
        </div>

        {/* Project Information */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-700 mb-3">Project Information</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Project Type</span>
              <span className="text-xs text-gray-800">Final Year Academic Project</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Institution</span>
              <span className="text-xs text-gray-800">University Research</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Category</span>
              <span className="text-xs text-gray-800">Healthcare Technology</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">License</span>
              <span className="text-xs text-gray-800">Academic Use</span>
            </div>
          </div>
        </div>

        {/* Credits & Acknowledgments */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-700 mb-3">Credits & Acknowledgments</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-600 leading-relaxed">
              This project was developed with guidance from healthcare professionals and academic advisors. Special thanks to all contributors who helped make this application possible.
            </p>
          </div>
        </div>

        {/* Contact Links */}
        <div className="space-y-2">
          <h3 className="text-sm text-gray-700 mb-3">Contact & Support</h3>
          
          <button className="w-full bg-white border border-gray-200 p-3 rounded-xl hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-800">Email Support</p>
                <p className="text-xs text-gray-500">support@aicariesprevention.com</p>
              </div>
            </div>
          </button>

          <button className="w-full bg-white border border-gray-200 p-3 rounded-xl hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-800">Website</p>
                <p className="text-xs text-gray-500">www.aicariesprevention.com</p>
              </div>
            </div>
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © 2026 AI Caries Prevention. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            For academic and research purposes
          </p>
        </div>
      </div>
    </div>
  );
}

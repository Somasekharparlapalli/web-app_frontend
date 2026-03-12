import { ArrowLeft, FileText, Shield, AlertCircle, CheckCircle } from 'lucide-react';

interface TermsOfServiceScreenProps {
  onNavigate: (screen: string) => void;
}

export function TermsOfServiceScreen({ onNavigate }: TermsOfServiceScreenProps) {
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
            <h2 className="text-xl text-gray-800">Terms of Service</h2>
            <p className="text-xs text-gray-500">Last updated: January 29, 2026</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Introduction */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800 mb-1">Agreement to Terms</p>
              <p className="text-xs text-gray-600">
                By accessing and using this application, you accept and agree to be bound by the terms and conditions outlined below.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div>
            <h3 className="text-sm text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">1</span>
              Use of Application
            </h3>
            <div className="ml-8 text-xs text-gray-600 space-y-2">
              <p>
                This application is designed to assist healthcare professionals in detecting dental caries and recommending antimicrobial peptide varnish treatments. It is not intended to replace professional medical judgment.
              </p>
              <p>
                You agree to use this application only for its intended medical and educational purposes. Any misuse or unauthorized access is strictly prohibited.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-sm text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">2</span>
              Medical Disclaimer
            </h3>
            <div className="ml-8 text-xs text-gray-600 space-y-2">
              <p>
                The AI-based detection and recommendations provided by this application are for informational purposes only. All diagnoses and treatment decisions should be made by qualified healthcare professionals.
              </p>
              <p>
                This application does not provide medical advice. Always consult with a licensed dentist or healthcare provider before making any medical decisions.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-sm text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">3</span>
              Data Privacy & Security
            </h3>
            <div className="ml-8 text-xs text-gray-600 space-y-2">
              <p>
                We are committed to protecting your privacy and the confidentiality of patient data. All information is stored securely and handled in accordance with healthcare data protection regulations.
              </p>
              <p>
                Patient data is encrypted and only accessible to authorized healthcare professionals. We do not share or sell any personal or medical information to third parties.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="text-sm text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">4</span>
              User Responsibilities
            </h3>
            <div className="ml-8 text-xs text-gray-600 space-y-2">
              <p>
                As a user, you are responsible for:
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Maintaining the confidentiality of your login credentials</li>
                <li>Ensuring accurate input of patient information</li>
                <li>Using the application in compliance with local healthcare regulations</li>
                <li>Reporting any technical issues or security concerns immediately</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h3 className="text-sm text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">5</span>
              Intellectual Property
            </h3>
            <div className="ml-8 text-xs text-gray-600 space-y-2">
              <p>
                All content, features, and functionality of this application, including but not limited to AI algorithms, user interface design, and documentation, are owned by the application developers and protected by international copyright laws.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h3 className="text-sm text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">6</span>
              Limitation of Liability
            </h3>
            <div className="ml-8 text-xs text-gray-600 space-y-2">
              <p>
                The application is provided "as is" without any warranties. We shall not be liable for any damages arising from the use or inability to use this application, including but not limited to medical malpractice claims.
              </p>
              <p>
                Healthcare professionals using this application remain solely responsible for all patient care decisions.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div>
            <h3 className="text-sm text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">7</span>
              Updates & Modifications
            </h3>
            <div className="ml-8 text-xs text-gray-600 space-y-2">
              <p>
                We reserve the right to modify these terms at any time. Users will be notified of significant changes. Continued use of the application after changes constitutes acceptance of the modified terms.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div>
            <h3 className="text-sm text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">8</span>
              Termination
            </h3>
            <div className="ml-8 text-xs text-gray-600 space-y-2">
              <p>
                We reserve the right to terminate or suspend access to the application immediately, without prior notice, for any breach of these Terms of Service.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div>
            <h3 className="text-sm text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">9</span>
              Contact Information
            </h3>
            <div className="ml-8 text-xs text-gray-600 space-y-2">
              <p>
                For questions about these Terms of Service, please contact our support team through the Contact Support option in the Help section.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800 mb-1">Agreement Acknowledgment</p>
              <p className="text-xs text-gray-600">
                By using this application, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

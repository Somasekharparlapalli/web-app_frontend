import { ArrowLeft, AlertTriangle, Shield, FileText, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface SystemDisclaimerScreenProps {
  onNavigate: (screen: string) => void;
}

export function SystemDisclaimerScreen({ onNavigate }: SystemDisclaimerScreenProps) {
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
            <h2 className="text-xl text-gray-800">System Disclaimer</h2>
            <p className="text-xs text-gray-500">Important legal information</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Warning Banner */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800 mb-1 font-medium">Important Notice</p>
              <p className="text-xs text-gray-600">
                Please read this disclaimer carefully before using this application. By using this system, you acknowledge and accept all terms outlined below.
              </p>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-800 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Medical & Clinical Disclaimer
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="space-y-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Not a Substitute for Professional Medical Advice:</span> This application is designed as a diagnostic support tool only. It does not replace professional medical judgment, clinical examination, or consultation with qualified healthcare providers.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">No Medical Diagnosis:</span> The AI-based detection system provides analysis and recommendations based on algorithmic processing. Final diagnosis and treatment decisions must be made by licensed dental professionals.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Clinical Validation Required:</span> All detection results should be clinically validated by qualified dentists before any treatment is administered.
              </p>
            </div>
          </div>
        </div>

        {/* AI System Limitations */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-800 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            AI System Limitations
          </h3>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-3">
            <div className="space-y-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Accuracy Not Guaranteed:</span> While our AI model has been trained on extensive datasets, no automated system can achieve 100% accuracy. False positives and false negatives may occur.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Image Quality Dependent:</span> Detection accuracy is highly dependent on image quality, lighting conditions, camera specifications, and proper positioning. Poor quality images may lead to inaccurate results.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Continuous Learning:</span> The AI model is continuously being improved. Results may vary between different versions of the application.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Limited Scope:</span> The system is designed specifically for caries detection. It may not detect other dental conditions or pathologies.
              </p>
            </div>
          </div>
        </div>

        {/* Treatment Recommendations */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-800 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Treatment Recommendations
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="space-y-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Not Treatment Instructions:</span> Antimicrobial peptide varnish recommendations are provided as general guidance only. Healthcare providers must evaluate each patient individually and make treatment decisions based on comprehensive clinical assessment.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Patient-Specific Factors:</span> Treatment recommendations do not account for patient allergies, medical history, contraindications, or individual risk factors. Healthcare providers must consider these factors before treatment.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Regulatory Compliance:</span> Healthcare providers are responsible for ensuring all treatments comply with local medical regulations and standards of care.
              </p>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-800 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Data Security & Privacy
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="space-y-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Security Measures:</span> While we implement industry-standard security measures, no system is completely immune to security breaches. Users must also maintain proper security practices.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">User Responsibility:</span> Healthcare providers are responsible for maintaining patient confidentiality and securing their access credentials.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Data Backup:</span> Users should maintain independent backup records of critical patient information.
              </p>
            </div>
          </div>
        </div>

        {/* Academic & Research Use */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-800 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            Academic & Research Context
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
            <div className="space-y-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Research Project:</span> This application was developed as part of a final year academic project titled "AI-Based Antimicrobial Peptide Varnish for Caries Prevention."
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Clinical Validation:</span> The system is intended for research and educational purposes. Any clinical deployment requires proper validation, regulatory approval, and compliance with medical device regulations.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Experimental Technology:</span> Some features may be experimental and under continuous development. Results should be interpreted with appropriate caution.
              </p>
            </div>
          </div>
        </div>

        {/* Liability Disclaimer */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Limitation of Liability
          </h3>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
            <div className="space-y-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">No Liability for Outcomes:</span> The developers, maintainers, and affiliated institutions of this application shall not be held liable for any medical outcomes, misdiagnosis, treatment complications, or damages arising from the use of this system.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">User Assumes Risk:</span> Healthcare professionals using this application acknowledge that they assume all risks and responsibility for patient care decisions.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-medium text-gray-800">Professional Liability:</span> Users maintain full professional liability for all clinical decisions and patient treatments.
              </p>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-800 mb-3">Recommended Usage Guidelines</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600">Always verify AI detection results with clinical examination</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600">Use high-quality images with proper lighting and positioning</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600">Consider patient history and risk factors in treatment decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600">Document all clinical findings and decisions independently</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600">Report any system errors or unexpected results immediately</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800 mb-1 font-medium">User Acknowledgment</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                By using this application, you acknowledge that you have read, understood, and accept this disclaimer in its entirety. You agree to use this system responsibly and in accordance with professional medical standards and ethical guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-6 pt-4">
          <p className="text-xs text-gray-400">
            Last Updated: January 29, 2026
          </p>
        </div>
      </div>
    </div>
  );
}

import { ArrowLeft, AlertCircle, CheckCircle, FileText, Shield, Droplet } from 'lucide-react';
import { AIChatButton } from './AIChatButton';
import { ScanData } from '../types';
import { apiService } from '../api/apiService';

interface DetectionResultScreenProps {
  onNavigate: (screen: string) => void;
  scanData: ScanData | null;
  userRole?: 'doctor' | 'patient' | 'admin' | 'student' | null;
  onSaveScanLocally?: (scanData: ScanData, dbId: string | number) => void;
}

interface PeptideRecommendation {
  name: string;
  type: string;
  description: string;
}

// Peptide recommendation based on severity
const getPeptideForSeverity = (severity: ScanData['severity']): PeptideRecommendation => {
  switch (severity) {
    case 'none':
      return {
        name: 'LL-37 (Preventive)',
        type: 'Cathelicidin',
        description: 'Preventive antimicrobial peptide for maintaining healthy enamel',
      };
    case 'low':
      return {
        name: 'Nisin Z',
        type: 'Bacteriocin',
        description: 'Effective against early-stage caries bacteria',
      };
    case 'moderate':
      return {
        name: 'P-113 (Histatin)',
        type: 'Histatin Derivative',
        description: 'Advanced peptide for moderate caries treatment',
      };
    case 'high':
      return {
        name: 'C16G2 Complex',
        type: 'Combination Therapy',
        description: 'High-potency peptide for severe caries intervention',
      };
    default:
      return {
        name: 'LL-37',
        type: 'General',
        description: 'General antimicrobial peptide',
      };
  }
};

export function DetectionResultScreen({ onNavigate, scanData, userRole, onSaveScanLocally }: DetectionResultScreenProps) {
  // Default values if no scan data is provided
  const defaultData: ScanData = {
    image: '',
    hasIssue: true,
    severity: 'moderate',
    confidence: 94.5,
    affectedArea: 'Molar Region',
    ageGroup: 'Middle Aged (19-60)',
    riskLevel: 'Moderate',
    toothType: 'Molar',
  };

  const data = scanData || defaultData;

  // Live scan date — moment the result screen is shown
  const scanDate = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
  const scanTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true
  });
  // Determine colors and messages based on severity
  const severityConfig: Record<string, any> = {
    none: {
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-500',
      textColor: 'text-green-600',
      badgeColor: 'bg-green-100 text-green-700',
      title: 'Healthy Teeth',
      message: 'No signs of caries detected. Your teeth appear healthy!',
      recommendation: 'Continue with regular dental hygiene and preventive care',
    },
    low: {
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-500',
      textColor: 'text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-700',
      title: 'Minor Caries Risk',
      message: 'Analysis shows minor signs of early dental caries',
      recommendation: 'Preventive antimicrobial peptide varnish application recommended',
    },
    moderate: {
      color: 'amber',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-500',
      textColor: 'text-amber-600',
      badgeColor: 'bg-amber-100 text-amber-700',
      title: 'Early Caries Detected',
      message: 'Analysis shows signs of early stage dental caries',
      recommendation: 'Application of antimicrobial peptide varnish is recommended for prevention',
    },
    high: {
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-500',
      textColor: 'text-red-600',
      badgeColor: 'bg-red-100 text-red-700',
      title: 'Significant Caries Detected',
      message: 'Analysis shows significant dental caries requiring attention',
      recommendation: 'Immediate antimicrobial peptide varnish application and dental consultation recommended',
    },
  };

  const config = severityConfig[data.severity] || severityConfig.moderate;
  const Icon = data.hasIssue ? AlertCircle : CheckCircle;
  const peptideInfo = getPeptideForSeverity(data.severity);

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(userRole === 'student' ? 'student-home' : 'home')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl text-gray-800">Analysis Result</h2>
            <p className="text-xs text-gray-500">Scan completed · {scanDate} at {scanTime}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Image Preview */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-6 relative overflow-hidden flex items-center justify-center min-h-[200px] border border-gray-200 shadow-inner">
          {data.image ? (
            <img
              src={data.image}
              alt="Teeth Scan"
              className="w-full h-48 object-contain rounded-xl"
            />
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-600">No Image Preview Available</p>
            </div>
          )}
        </div>

        {/* Detection Status */}
        <div className={`${config.bgColor} border-2 ${config.borderColor} rounded-2xl p-4 mb-6`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 ${config.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm text-gray-800 mb-1">{config.title}</h3>
              <p className="text-xs text-gray-600 mb-2">
                {config.message}
              </p>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${config.badgeColor} px-2 py-1 rounded-full`}>
                  Severity: {data.severity.charAt(0).toUpperCase() + data.severity.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm text-gray-800 mb-3">Detection Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Age Group</span>
                <span className="text-xs text-gray-800 font-medium">{data.ageGroup}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Risk Level</span>
                <span className={`text-xs font-medium ${data.riskLevel === 'Mild' ? 'text-green-600' :
                  data.riskLevel === 'Moderate' ? 'text-amber-600' :
                    'text-red-600'
                  }`}>{data.riskLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Tooth Type</span>
                <span className="text-xs text-gray-800 font-medium">{data.toothType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Affected Area</span>
                <span className="text-xs text-gray-800">{data.affectedArea}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Confidence</span>
                <span className="text-xs text-gray-800">{data.confidence}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Scan Date</span>
                <span className="text-xs text-gray-800 font-medium">{scanDate}, {scanTime}</span>
              </div>
            </div>
          </div>

          <div className={`${config.bgColor} border ${config.borderColor} rounded-xl p-4`}>
            <div className="flex items-start gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm text-gray-800 mb-1">Recommended Action</h3>
                <p className="text-xs text-gray-600">
                  {config.recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* AI Recommended Peptide Type */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Droplet className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm text-gray-800 mb-1">AI Recommended Peptides</h3>
                <p className="text-xs text-gray-600">Based on {data.riskLevel} risk level</p>
              </div>
            </div>

            <div className="space-y-2">
              {data.peptideRecommendations && data.peptideRecommendations.map((peptide: any, index: number) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-purple-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-purple-700 font-semibold">{peptide}</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {data.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {peptide === 'Nisin Peptide' && 'Potent bacteriocin effective against gram-positive bacteria causing severe dental caries'}
                    {peptide === 'Cecropin Peptide' && 'Broad-spectrum antimicrobial peptide for severe caries prevention and treatment'}
                    {peptide === 'KSL-W Peptide' && 'Synthetic antimicrobial peptide designed for moderate caries treatment'}
                    {peptide === 'LL-37 Peptide' && 'Human cathelicidin with strong antimicrobial properties for moderate cases'}
                    {peptide === 'Histatin-5 Peptide' && 'Natural salivary peptide effective for mild caries prevention in young patients'}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('peptide-types')}
              className="w-full mt-3 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors text-xs"
            >
              View All Peptide Types
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onNavigate('recommendation')}
            className="w-full bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition-colors"
          >
            View Full Recommendation
          </button>

          <button
            onClick={() => onNavigate('varnish')}
            className="w-full bg-white border-2 border-blue-500 text-blue-500 p-4 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" />
            <span>Learn About Varnish</span>
          </button>

          <button
            onClick={async () => {
              try {
                const res = await apiService.saveScan({
                  patient_id: (data.patient_id && data.patient_id !== 'undefined') ? String(data.patient_id) : '0',
                  image_path: data.imageUrl || data.image?.split('/').pop() || 'unknown.jpg',
                  condition_title: config.title,
                  condition_desc: config.message,
                  severity: data.severity.charAt(0).toUpperCase() + data.severity.slice(1),
                  risk_level: data.riskLevel,
                  tooth_type: data.toothType,
                  affected_area: data.affectedArea,
                  confidence: String(data.confidence)
                });
                
                const dbId = res?.id || Math.random().toString();
                if (onSaveScanLocally) onSaveScanLocally(data, dbId);
                alert('Scan successfully saved to cloud and local history!');
              } catch (e) {
                console.error("Manual save failed:", e);
                if (onSaveScanLocally) onSaveScanLocally(data, Math.random().toString());
              }
              onNavigate('history');
            }}
            className="w-full bg-gray-100 text-gray-700 p-4 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Save to History
          </button>
        </div>
      </div>

      <AIChatButton context="detection" />
    </div>
  );
}
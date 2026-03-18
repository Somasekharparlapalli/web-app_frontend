import { ArrowLeft, TrendingUp, Shield, Calendar, AlertTriangle, CheckCircle, Droplet, Zap, BookmarkCheck } from 'lucide-react';
import { ScanData } from '../App';
import { useState } from 'react';

interface RecommendationScreenProps {
  onNavigate: (screen: string) => void;
  scanData: ScanData | null;
}

// Peptide recommendation based on severity
const getPeptideRecommendation = (severity: string) => {
  switch (severity) {
    case 'none':
      return {
        peptide: 'LL-37 (Preventive)',
        description: 'Cathelicidin peptide for general oral health maintenance',
        concentration: '0.5-1.0 mg/mL',
        frequency: 'Monthly application',
        expectedResult: 'Maintains healthy enamel and prevents bacterial colonization',
      };
    case 'low':
      return {
        peptide: 'Nisin Z',
        description: 'Bacteriocin effective against early-stage caries bacteria',
        concentration: '1.5-2.0 mg/mL',
        frequency: 'Bi-weekly application for 1 month',
        expectedResult: 'Eliminates early caries-causing bacteria and strengthens enamel',
      };
    case 'moderate':
      return {
        peptide: 'P-113 (Histatin Derivative)',
        description: 'Advanced antimicrobial peptide for moderate caries treatment',
        concentration: '2.5-3.0 mg/mL',
        frequency: 'Weekly application for 4-6 weeks',
        expectedResult: 'Reduces bacterial load by 75-85% and promotes remineralization',
      };
    case 'high':
      return {
        peptide: 'C16G2 (Combination Therapy)',
        description: 'High-potency peptide complex for severe caries intervention',
        concentration: '3.5-4.0 mg/mL',
        frequency: 'Twice weekly for 6-8 weeks',
        expectedResult: 'Maximum antibacterial action with 90%+ efficacy and enamel repair',
      };
    default:
      return {
        peptide: 'LL-37 (Preventive)',
        description: 'General antimicrobial peptide',
        concentration: '1.0 mg/mL',
        frequency: 'As needed',
        expectedResult: 'General protection',
      };
  }
};

// Get dynamic recommendation data based on severity
const getRecommendationData = (severity: string) => {
  switch (severity) {
    case 'none':
      return {
        riskLevel: 'Low',
        riskColor: 'from-green-500 to-green-600',
        riskIcon: CheckCircle,
        riskText: 'Preventive care recommended',
        currentRisk: 15,
        protectionLevel: 85,
        expectedAfterTreatment: 95,
        successRate: 98,
        duration: '1-2 weeks',
        followUpDays: 30,
        priority: 'Low',
      };
    case 'low':
      return {
        riskLevel: 'Mild',
        riskColor: 'from-blue-500 to-blue-600',
        riskIcon: Shield,
        riskText: 'Early intervention beneficial',
        currentRisk: 35,
        protectionLevel: 60,
        expectedAfterTreatment: 90,
        successRate: 95,
        duration: '2-3 weeks',
        followUpDays: 14,
        priority: 'Medium',
      };
    case 'moderate':
      return {
        riskLevel: 'Moderate',
        riskColor: 'from-amber-500 to-orange-500',
        riskIcon: AlertTriangle,
        riskText: 'Early intervention recommended',
        currentRisk: 65,
        protectionLevel: 45,
        expectedAfterTreatment: 85,
        successRate: 92,
        duration: '2-4 weeks',
        followUpDays: 14,
        priority: 'High',
      };
    case 'high':
      return {
        riskLevel: 'High',
        riskColor: 'from-red-500 to-red-600',
        riskIcon: AlertTriangle,
        riskText: 'Immediate intervention required',
        currentRisk: 85,
        protectionLevel: 25,
        expectedAfterTreatment: 75,
        successRate: 88,
        duration: '4-6 weeks',
        followUpDays: 7,
        priority: 'Critical',
      };
    default:
      return {
        riskLevel: 'Unknown',
        riskColor: 'from-gray-500 to-gray-600',
        riskIcon: AlertTriangle,
        riskText: 'Assessment needed',
        currentRisk: 50,
        protectionLevel: 50,
        expectedAfterTreatment: 70,
        successRate: 85,
        duration: '2-4 weeks',
        followUpDays: 14,
        priority: 'Medium',
      };
  }
};

export function RecommendationScreen({ onNavigate, scanData }: RecommendationScreenProps) {
  const severity = scanData?.severity || 'moderate';
  const peptideInfo = getPeptideRecommendation(severity);
  const recData = getRecommendationData(severity);
  const RiskIcon = recData.riskIcon;

  const handleVarnishClick = () => {
    onNavigate('varnish');
  };

  const handleFollowUpClick = () => {
    onNavigate('schedule-appointment');
  };

  const handleHygieneClick = () => {
    onNavigate('prevention-tips');
  };

  const handlePeptideTypesClick = () => {
    onNavigate('peptide-types');
  };

  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('result')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl text-gray-800">AI Recommendation</h2>
            <p className="text-xs text-gray-500">Personalized treatment plan</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Risk Level */}
        <div className={`bg-gradient-to-r ${recData.riskColor} rounded-2xl p-4 mb-6 text-white`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <RiskIcon className="w-5 h-5" />
              <span className="text-sm">Current Risk Level</span>
            </div>
          </div>
          <p className="text-2xl mb-1">{recData.riskLevel}</p>
          <p className="text-xs text-white/90">{recData.riskText}</p>
        </div>

        {/* Recommended Peptide Varnish */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Droplet className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm text-gray-800 font-semibold">AI Recommended Peptides</h3>
          </div>
          
          {scanData?.peptideRecommendations && scanData.peptideRecommendations.length > 0 ? (
            <div className="space-y-3 mb-3">
              {scanData.peptideRecommendations.map((peptide, index) => (
                <div key={index} className="bg-white rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base text-purple-700 font-semibold">{peptide}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      scanData.riskLevel === 'Severe' ? 'bg-red-100 text-red-700' :
                      scanData.riskLevel === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {scanData.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    {peptide === 'Nisin Peptide' && 'Potent bacteriocin effective against gram-positive bacteria causing severe dental caries. Shows 85-90% efficacy in clinical trials.'}
                    {peptide === 'Cecropin Peptide' && 'Broad-spectrum antimicrobial peptide for severe caries prevention and treatment. Disrupts bacterial cell membranes effectively.'}
                    {peptide === 'KSL-W Peptide' && 'Synthetic antimicrobial peptide designed for moderate caries treatment. Targets Streptococcus mutans specifically.'}
                    {peptide === 'LL-37 Peptide' && 'Human cathelicidin with strong antimicrobial properties for moderate cases. Natural defense peptide with immunomodulatory effects.'}
                    {peptide === 'Histatin-5 Peptide' && 'Natural salivary peptide effective for mild caries prevention in young patients. Promotes enamel remineralization.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-purple-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500 mb-1">Concentration</p>
                      <p className="text-sm text-gray-800">
                        {scanData.riskLevel === 'Severe' ? '3.5-4.0 mg/mL' :
                         scanData.riskLevel === 'Moderate' ? '2.5-3.0 mg/mL' :
                         '1.5-2.0 mg/mL'}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500 mb-1">Application</p>
                      <p className="text-sm text-gray-800">
                        {scanData.riskLevel === 'Severe' ? 'Twice weekly' :
                         scanData.riskLevel === 'Moderate' ? 'Weekly' :
                         'Bi-weekly'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">Expected Result</p>
                    <p className="text-xs text-gray-700">
                      {scanData.riskLevel === 'Severe' ? 'Maximum antibacterial action with 90%+ efficacy and enamel repair within 6-8 weeks' :
                       scanData.riskLevel === 'Moderate' ? 'Reduces bacterial load by 75-85% and promotes remineralization within 4-6 weeks' :
                       'Prevents caries progression and strengthens enamel within 2-4 weeks'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base text-purple-700 font-semibold">{peptideInfo.peptide}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  recData.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                  recData.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                  recData.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {recData.priority} Priority
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3">{peptideInfo.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="bg-purple-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500 mb-1">Concentration</p>
                  <p className="text-sm text-gray-800">{peptideInfo.concentration}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500 mb-1">Application</p>
                  <p className="text-sm text-gray-800">{peptideInfo.frequency}</p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-2">
                <p className="text-xs text-gray-500 mb-1">Expected Result</p>
                <p className="text-xs text-gray-700">{peptideInfo.expectedResult}</p>
              </div>
            </div>
          )}

          <button
            onClick={handlePeptideTypesClick}
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            View All Peptide Types
          </button>
        </div>

        {/* Graph */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
          <h3 className="text-sm text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            Risk vs Protection Analysis
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Current Risk</span>
                <span className="text-red-600">{recData.currentRisk}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${recData.currentRisk}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Current Protection Level</span>
                <span className="text-blue-600">{recData.protectionLevel}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${recData.protectionLevel}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Expected After Treatment</span>
                <span className="text-green-600">{recData.expectedAfterTreatment}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${recData.expectedAfterTreatment}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Plan */}
        <h3 className="text-sm text-gray-800 mb-3">Suggested Treatment Plan</h3>
        <div className="space-y-3 mb-6">
          <button
            onClick={handleVarnishClick}
            className="w-full bg-green-50 border border-green-200 rounded-xl p-4 hover:bg-green-100 transition-colors text-left"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Apply {peptideInfo.peptide}</p>
                <p className="text-xs text-gray-600 mb-2">
                  {peptideInfo.frequency} - {peptideInfo.concentration}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    recData.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    recData.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    recData.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    Priority: {recData.priority}
                  </span>
                  <span className="text-xs text-green-600">Tap to learn more →</span>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={handleFollowUpClick}
            className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4 hover:bg-blue-100 transition-colors text-left"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Schedule Follow-up</p>
                <p className="text-xs text-gray-600 mb-2">
                  Book appointment in {recData.followUpDays} days for progress check
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    Priority: Medium
                  </span>
                  <span className="text-xs text-blue-600">Tap to schedule →</span>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={handleHygieneClick}
            className="w-full bg-purple-50 border border-purple-200 rounded-xl p-4 hover:bg-purple-100 transition-colors text-left"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Maintain Oral Hygiene</p>
                <p className="text-xs text-gray-600 mb-2">
                  Follow daily brushing and flossing routine
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    Ongoing
                  </span>
                  <span className="text-xs text-purple-600">Tap for tips →</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Effectiveness */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 mb-6">
          <h3 className="text-sm text-gray-800 mb-2">Expected Effectiveness</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl text-blue-600 mb-1">{recData.successRate}%</p>
              <p className="text-xs text-gray-600">Success Rate</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-800 mb-1">{recData.duration}</p>
              <p className="text-xs text-gray-600">Expected Duration</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsSaved(true);
            onNavigate('home');
          }}
          className="w-full bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition-colors"
        >
          {isSaved ? (
            <div className="flex items-center justify-center">
              <BookmarkCheck className="w-4 h-4 mr-2" />
              Saved
            </div>
          ) : (
            'Save Recommendation'
          )}
        </button>
      </div>
      
          </div>
  );
}
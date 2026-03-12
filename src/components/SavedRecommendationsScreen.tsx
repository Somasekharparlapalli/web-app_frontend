import { ArrowLeft, BookmarkCheck, Calendar, FileText, ChevronRight, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { AIChatButton } from './AIChatButton';
import { ScanData } from '../App';

interface SavedRecommendationsScreenProps {
  onNavigate: (screen: string) => void;
  onViewRecommendation: (scanData: ScanData) => void;
}

export function SavedRecommendationsScreen({ onNavigate, onViewRecommendation }: SavedRecommendationsScreenProps) {
  const savedRecommendations = [
    {
      id: 1,
      title: 'Severe Caries Treatment - Nisin & Cecropin Peptides',
      date: 'Jan 28, 2026',
      severity: 'Severe' as const,
      color: 'red',
      description: 'Geriatric patient - Multiple teeth affected',
      ageGroup: 'Geriatric (60+)' as const,
      peptides: 'Nisin + Cecropin',
      duration: '6-8 weeks',
      toothType: 'Molar' as const
    },
    {
      id: 2,
      title: 'Moderate Caries Treatment - KSL-W & LL-37 Peptides',
      date: 'Jan 22, 2026',
      severity: 'Moderate' as const,
      color: 'amber',
      description: 'Middle-aged patient - Posterior molar region',
      ageGroup: 'Middle Aged (19-60)' as const,
      peptides: 'KSL-W + LL-37',
      duration: '4-6 weeks',
      toothType: 'Molar' as const
    },
    {
      id: 3,
      title: 'Mild Caries Prevention - Histatin-5 Peptide',
      date: 'Jan 20, 2026',
      severity: 'Mild' as const,
      color: 'green',
      description: 'Pediatric patient - Early prevention stage',
      ageGroup: 'Pediatric (1-18)' as const,
      peptides: 'Histatin-5',
      duration: '2-4 weeks',
      toothType: 'Incisor' as const
    },
    {
      id: 4,
      title: 'Moderate Risk Follow-up Treatment',
      date: 'Jan 15, 2026',
      severity: 'Moderate' as const,
      color: 'amber',
      description: 'Post-treatment monitoring - Canine region',
      ageGroup: 'Middle Aged (19-60)' as const,
      peptides: 'KSL-W + LL-37',
      duration: '4-6 weeks',
      toothType: 'Canine' as const
    },
    {
      id: 5,
      title: 'Severe Risk - Advanced Antimicrobial Protocol',
      date: 'Jan 10, 2026',
      severity: 'Severe' as const,
      color: 'red',
      description: 'High decay indicators detected',
      ageGroup: 'Geriatric (60+)' as const,
      peptides: 'Nisin + Cecropin',
      duration: '6-8 weeks',
      toothType: 'Premolar' as const
    },
  ];

  // Helper function to convert saved recommendation to ScanData
  const convertToScanData = (recommendation: typeof savedRecommendations[0]): ScanData => {
    const peptideRecommendations = recommendation.peptides.includes('+')
      ? recommendation.peptides.split(' + ').map(p => p + ' Peptide')
      : [recommendation.peptides + ' Peptide'];

    // Map severity levels to the 'none' | 'low' | 'moderate' | 'high' format
    const severityMap = {
      'Mild': 'low' as const,
      'Moderate': 'moderate' as const,
      'Severe': 'high' as const
    };

    return {
      image: '/placeholder-teeth.jpg', // Placeholder image for saved recommendations
      hasIssue: recommendation.severity !== 'Mild',
      severity: severityMap[recommendation.severity],
      confidence: recommendation.severity === 'Severe' ? 92 : recommendation.severity === 'Moderate' ? 85 : 78,
      affectedArea: recommendation.toothType + ' region',
      ageGroup: recommendation.ageGroup,
      riskLevel: recommendation.severity,
      toothType: recommendation.toothType,
      peptideRecommendations: peptideRecommendations
    };
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl text-gray-800">Saved Recommendations</h2>
            <p className="text-xs text-gray-500">Your saved treatment plans</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <BookmarkCheck className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-800 font-medium">Total Saved</p>
              <p className="text-2xl text-blue-600">{savedRecommendations.length}</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            Keep track of your personalized treatment recommendations
          </p>
        </div>

        {/* Recommendations List */}
        <h3 className="text-sm text-gray-700 mb-3">All Recommendations</h3>
        <div className="space-y-3">
          {savedRecommendations.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 bg-${item.color}-50 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <FileText className={`w-5 h-5 text-${item.color}-500`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 mb-1 font-medium">{item.title}</p>
                    <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">{item.ageGroup}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors ml-2">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Peptides</p>
                    <p className="text-xs text-gray-800 font-medium">{item.peptides}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Duration</p>
                    <p className="text-xs text-gray-800 font-medium">{item.duration}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs bg-${item.color}-100 text-${item.color}-700 px-2 py-1 rounded-full`}>
                  {item.severity} Risk
                </span>
                {item.severity === 'Severe' && (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
                {item.severity === 'Moderate' && (
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                )}
                {item.severity === 'Mild' && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>

              <button
                onClick={() => onViewRecommendation(convertToScanData(item))}
                className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center justify-center gap-2"
              >
                View Full Recommendation
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800 mb-1">About Saved Recommendations</p>
              <p className="text-xs text-gray-600">
                Your saved recommendations contain personalized treatment plans, preventive care guidelines, and follow-up schedules. Review them regularly to maintain optimal oral health.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <AIChatButton context="recommendations" />
    </div>
  );
}
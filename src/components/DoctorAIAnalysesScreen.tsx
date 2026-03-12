import { ArrowLeft, Brain, CheckCircle, Download, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DoctorAIAnalysesScreenProps {
  onNavigate: (screen: string) => void;
  doctorAnalysisHistory: any[];
}

export function DoctorAIAnalysesScreen({ onNavigate, doctorAnalysisHistory }: DoctorAIAnalysesScreenProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => onNavigate('history')}
            className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white text-lg">Recent AI Analyses</h1>
            <p className="text-blue-100 text-xs">Uploaded scans with AI detection</p>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Total Scans</p>
            <p className="text-xl text-blue-600 font-semibold">{doctorAnalysisHistory.length}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Avg Confidence</p>
            <p className="text-xl text-blue-600 font-semibold">
              {doctorAnalysisHistory.length > 0
                ? Math.round(
                  doctorAnalysisHistory.reduce((acc, a) => acc + a.confidence, 0) /
                  doctorAnalysisHistory.length
                )
                : 0}
              %
            </p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">This Week</p>
            <p className="text-xl text-blue-600 font-semibold">{doctorAnalysisHistory.length}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {doctorAnalysisHistory.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center mt-8">
            <Brain className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-700 font-medium mb-1">No AI Analyses Yet</p>
            <p className="text-xs text-gray-600 mb-4">Upload and analyze dental scans to see them here</p>
            <button
              onClick={() => onNavigate('upload')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              Upload First Scan
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {doctorAnalysisHistory.map((analysis) => (
              <div
                key={analysis.id}
                className="w-full bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={analysis.image}
                      alt="Scan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-800 font-medium">
                          AI Scan Analysis #{analysis.id}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {analysis.date} • {analysis.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
                        <Brain className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-blue-700">{analysis.confidence}%</span>
                      </div>
                    </div>

                    <div className="bg-white/80 rounded-lg p-2 mb-2">
                      <p className="text-xs text-gray-700">{analysis.aiFindings}</p>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${analysis.severity === 'Severe'
                            ? 'bg-red-100 text-red-700'
                            : analysis.severity === 'Moderate'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-green-100 text-green-700'
                            }`}
                        >
                          {analysis.severity}
                        </span>
                        <span className="text-xs text-gray-600">
                          {analysis.ageGroup.split(' ')[0]}
                        </span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {analysis.status}
                      </span>
                    </div>

                    {analysis.peptides && analysis.peptides.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-blue-100">
                        <p className="text-xs text-gray-600 mb-1">Recommended Peptides:</p>
                        <div className="flex flex-wrap gap-1">
                          {analysis.peptides.map((peptide: any, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                            >
                              {peptide.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { ArrowLeft, Shield, Droplet, Sparkles, Zap, Star, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { AIChatButton } from './AIChatButton';
import { useState } from 'react';

interface PeptideTypesScreenProps {
  onNavigate: (screen: string) => void;
  userRole?: 'doctor' | 'patient' | 'admin' | 'student' | null;
  previousScreen?: string;
}

export function PeptideTypesScreen({ onNavigate, userRole, previousScreen }: PeptideTypesScreenProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Determine where to go back based on previous screen
  const getBackDestination = () => {
    // If coming from recommendation screen (which means from saved-recommendations), go back to saved-recommendations
    if (previousScreen === 'recommendation') {
      return 'saved-recommendations';
    }
    // Otherwise go to home based on user role
    return userRole === 'student' ? 'student-home' : 'home';
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-6 rounded-b-3xl">
        <button
          onClick={() => onNavigate(getBackDestination())}
          className="mb-4 p-2 hover:bg-purple-400 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl text-white">Peptide Types</h2>
            <p className="text-sm text-purple-100">Antimicrobial Variants</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="bg-purple-50 rounded-xl p-4 mb-6">
          <h3 className="text-sm text-gray-800 mb-2">About Antimicrobial Peptides</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Our AI system recommends specific peptide types based on caries severity, location, and patient history. Each peptide variant offers unique antimicrobial properties.
          </p>
        </div>

        <h3 className="text-sm text-gray-800 mb-3">Available Peptide Variants</h3>

        <div className="space-y-4">
          {/* Type 1 - LL-37 */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-gray-800 mb-1">LL-37 Peptide</h4>
                <p className="text-xs text-blue-600 mb-2">Broad-spectrum Protection</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Highly effective against gram-positive and gram-negative bacteria. Ideal for moderate to severe caries prevention.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                Effectiveness: 94%
              </span>
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                Duration: 6-8 weeks
              </span>
            </div>

            {expandedId === 1 && (
              <div className="pt-3 border-t border-blue-100 space-y-2 animate-in fade-in duration-200">
                <div className="bg-blue-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Mechanism of Action</h5>
                  <p className="text-xs text-gray-600">
                    LL-37 disrupts bacterial membranes through electrostatic interactions, leading to cell lysis. Also modulates immune response for enhanced protection.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Clinical Applications</h5>
                  <p className="text-xs text-gray-600">
                    Recommended for patients with moderate to high caries risk, especially those with multiple affected sites or history of recurrent cavities.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Safety Profile</h5>
                  <p className="text-xs text-gray-600">
                    Well-tolerated with minimal side effects. Natural human peptide with excellent biocompatibility.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => toggleExpand(1)}
              className="w-full mt-3 flex items-center justify-center gap-2 text-xs text-blue-600 hover:text-blue-700 transition-colors"
            >
              {expandedId === 1 ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show More Info</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Type 2 - Nisin */}
          <div className="bg-white border-2 border-green-200 rounded-2xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-gray-800 mb-1">Nisin Peptide</h4>
                <p className="text-xs text-green-600 mb-2">Natural Biofilm Inhibitor</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Prevents bacterial biofilm formation and targets Streptococcus mutans. Best for early-stage caries prevention.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                Effectiveness: 89%
              </span>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                Duration: 4-6 weeks
              </span>
            </div>

            {expandedId === 2 && (
              <div className="pt-3 border-t border-green-100 space-y-2 animate-in fade-in duration-200">
                <div className="bg-green-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Mechanism of Action</h5>
                  <p className="text-xs text-gray-600">
                    Nisin binds to lipid II molecules in bacterial membranes, inhibiting cell wall synthesis and preventing biofilm formation.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Clinical Applications</h5>
                  <p className="text-xs text-gray-600">
                    Ideal for preventive care in low-risk patients or as early intervention for initial caries lesions (white spot lesions).
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Safety Profile</h5>
                  <p className="text-xs text-gray-600">
                    FDA-approved food preservative with excellent safety record. Natural origin from lactic acid bacteria.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => toggleExpand(2)}
              className="w-full mt-3 flex items-center justify-center gap-2 text-xs text-green-600 hover:text-green-700 transition-colors"
            >
              {expandedId === 2 ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show More Info</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Type 3 - Histatin-5 */}
          <div className="bg-white border-2 border-purple-200 rounded-2xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-gray-800 mb-1">Histatin-5 Peptide</h4>
                <p className="text-xs text-purple-600 mb-2">Rapid Action Formula</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Fast-acting antimicrobial with strong candidacidal properties. Effective for mixed bacterial-fungal infections.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                Effectiveness: 91%
              </span>
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                Duration: 3-5 weeks
              </span>
            </div>

            {expandedId === 3 && (
              <div className="pt-3 border-t border-purple-100 space-y-2 animate-in fade-in duration-200">
                <div className="bg-purple-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Mechanism of Action</h5>
                  <p className="text-xs text-gray-600">
                    Generates reactive oxygen species (ROS) in fungal cells and disrupts mitochondrial function, providing dual antibacterial-antifungal action.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Clinical Applications</h5>
                  <p className="text-xs text-gray-600">
                    Best for cases with confirmed or suspected fungal involvement, or patients with compromised immune systems prone to oral candidiasis.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Safety Profile</h5>
                  <p className="text-xs text-gray-600">
                    Naturally found in human saliva. Rapid action minimizes exposure time with excellent tolerability.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => toggleExpand(3)}
              className="w-full mt-3 flex items-center justify-center gap-2 text-xs text-purple-600 hover:text-purple-700 transition-colors"
            >
              {expandedId === 3 ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show More Info</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Type 4 - KSL-W */}
          <div className="bg-white border-2 border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-gray-800 mb-1">KSL-W Peptide</h4>
                <p className="text-xs text-amber-600 mb-2">Advanced Synthetic Formula</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Engineered peptide with enhanced stability and prolonged antimicrobial activity. Recommended for high-risk patients.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                Effectiveness: 96%
              </span>
              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                Duration: 8-10 weeks
              </span>
            </div>

            {expandedId === 4 && (
              <div className="pt-3 border-t border-amber-100 space-y-2 animate-in fade-in duration-200">
                <div className="bg-amber-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Mechanism of Action</h5>
                  <p className="text-xs text-gray-600">
                    Synthetic optimization provides enhanced membrane penetration and stability. Tryptophan residues anchor to bacterial membranes for sustained activity.
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Clinical Applications</h5>
                  <p className="text-xs text-gray-600">
                    Premium choice for high-risk patients, severe caries cases, or those requiring extended protection between visits.
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Safety Profile</h5>
                  <p className="text-xs text-gray-600">
                    Extensively tested with superior stability profile. Engineered to minimize off-target effects while maximizing efficacy.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => toggleExpand(4)}
              className="w-full mt-3 flex items-center justify-center gap-2 text-xs text-amber-600 hover:text-amber-700 transition-colors"
            >
              {expandedId === 4 ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show More Info</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Type 5 - Cecropin */}
          <div className="bg-white border-2 border-rose-200 rounded-2xl p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-gray-800 mb-1">Cecropin Peptide</h4>
                <p className="text-xs text-rose-600 mb-2">Membrane Disruption Agent</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Disrupts bacterial cell membranes and prevents resistance development. Suitable for recurrent caries cases.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-rose-50 text-rose-700 px-2 py-1 rounded-full">
                Effectiveness: 92%
              </span>
              <span className="text-xs bg-rose-50 text-rose-700 px-2 py-1 rounded-full">
                Duration: 5-7 weeks
              </span>
            </div>

            {expandedId === 5 && (
              <div className="pt-3 border-t border-rose-100 space-y-2 animate-in fade-in duration-200">
                <div className="bg-rose-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Mechanism of Action</h5>
                  <p className="text-xs text-gray-600">
                    Creates pores in bacterial membranes through voltage-independent mechanism, preventing adaptation and resistance development.
                  </p>
                </div>
                <div className="bg-rose-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Clinical Applications</h5>
                  <p className="text-xs text-gray-600">
                    Particularly effective for recurrent caries or treatment-resistant cases where traditional antimicrobials have failed.
                  </p>
                </div>
                <div className="bg-rose-50 rounded-lg p-3">
                  <h5 className="text-xs text-gray-800 mb-1 font-medium">Safety Profile</h5>
                  <p className="text-xs text-gray-600">
                    Derived from insect immune systems with proven safety. Low toxicity to mammalian cells while highly effective against bacteria.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => toggleExpand(5)}
              className="w-full mt-3 flex items-center justify-center gap-2 text-xs text-rose-600 hover:text-rose-700 transition-colors"
            >
              {expandedId === 5 ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show More Info</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6 mb-6">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm text-gray-800 mb-1">AI Recommendation</h3>
              <p className="text-xs text-gray-600">
                Our AI system analyzes your caries detection results and recommends the most suitable peptide type based on severity, location, and efficacy data.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AIChatButton context="peptide" />
    </div>
  );
}
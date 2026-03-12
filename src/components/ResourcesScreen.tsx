import { ArrowLeft, Search, BookOpen, Microscope, Award, FlaskConical, FileText, Video, Download, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

interface ResourcesScreenProps {
  onNavigate: (screen: string) => void;
}

export function ResourcesScreen({ onNavigate }: ResourcesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [downloadSuccess, setDownloadSuccess] = useState<number | null>(null);
  const [readingResource, setReadingResource] = useState<number | null>(null);
  const [showExternalDialog, setShowExternalDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const categories = ['All', 'Articles', 'Videos', 'Guidelines', 'Research Papers'];

  const resources = [
    {
      id: 1,
      title: 'Understanding Antimicrobial Peptides',
      category: 'Articles',
      type: 'article',
      duration: '12 min read',
      icon: BookOpen,
      color: 'green',
      description: 'Comprehensive guide to antimicrobial peptides, their mechanisms of action, and role in dental care.',
      topics: ['Peptide Structure', 'Mechanism of Action', 'Clinical Applications', 'Safety Profile'],
      external: true,
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6723430/'
    },
    {
      id: 2,
      title: 'AI in Dental Diagnostics',
      category: 'Articles',
      type: 'article',
      duration: '8 min read',
      icon: Microscope,
      color: 'blue',
      description: 'How artificial intelligence is revolutionizing dental caries detection and risk assessment.',
      topics: ['Machine Learning Models', 'Image Analysis', 'Predictive Analytics', 'Clinical Integration'],
      external: true,
      url: 'https://www.nature.com/articles/s41598-021-90386-1'
    },
    {
      id: 3,
      title: 'Caries Prevention Mechanisms',
      category: 'Articles',
      type: 'article',
      duration: '15 min read',
      icon: Award,
      color: 'purple',
      description: 'Detailed explanation of how antimicrobial peptide varnishes prevent dental caries formation.',
      topics: ['Biofilm Disruption', 'Bacterial Inhibition', 'Remineralization', 'Long-term Protection'],
      external: true,
      url: 'https://www.frontiersin.org/articles/10.3389/fmicb.2020.01705/full'
    },
    {
      id: 4,
      title: 'Histatin-5: Pediatric Applications',
      category: 'Research Papers',
      type: 'pdf',
      duration: '45 min read',
      icon: FileText,
      color: 'green',
      description: 'Clinical research paper on Histatin-5 efficacy in preventing caries in children aged 1-18 years.',
      topics: ['Clinical Trials', 'Safety Data', 'Efficacy Results', 'Treatment Protocols'],
      external: true,
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7139722/'
    },
    {
      id: 5,
      title: 'LL-37 and KSL-W Comparative Study',
      category: 'Research Papers',
      type: 'pdf',
      duration: '60 min read',
      icon: FileText,
      color: 'yellow',
      description: 'Meta-analysis comparing LL-37 and KSL-W peptides for moderate risk adult patients.',
      topics: ['Comparative Efficacy', 'Side Effects', 'Patient Outcomes', 'Cost Analysis'],
      external: true,
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8235476/'
    },
    {
      id: 6,
      title: 'Nisin and Cecropin in Geriatric Care',
      category: 'Research Papers',
      type: 'pdf',
      duration: '50 min read',
      icon: FileText,
      color: 'red',
      description: 'Longitudinal study on Nisin and Cecropin peptides for severe caries risk in elderly patients.',
      topics: ['Geriatric Considerations', 'Multi-drug Resistance', 'Quality of Life', 'Long-term Outcomes'],
      external: true,
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9227156/'
    },
    {
      id: 7,
      title: 'Peptide Application Techniques',
      category: 'Videos',
      type: 'video',
      duration: '18 min',
      icon: Video,
      color: 'blue',
      description: 'Step-by-step video tutorial on proper application of antimicrobial peptide varnishes.',
      topics: ['Tooth Preparation', 'Application Methods', 'Curing Process', 'Post-application Care'],
      external: true,
      url: 'https://www.youtube.com/watch?v=9m_K2Yg7wGQ'
    },
    {
      id: 8,
      title: 'Patient Education: Caries Prevention',
      category: 'Videos',
      type: 'video',
      duration: '10 min',
      icon: Video,
      color: 'green',
      description: 'Educational video for patients explaining caries prevention and peptide varnish benefits.',
      topics: ['Patient Communication', 'Benefits Explanation', 'Expectations', 'Aftercare Instructions'],
      external: true,
      url: 'https://www.youtube.com/watch?v=tIXwNz_Z-T8'
    },
    {
      id: 9,
      title: 'Clinical Guidelines for Peptide Selection',
      category: 'Guidelines',
      type: 'guideline',
      duration: '20 min read',
      icon: FlaskConical,
      color: 'purple',
      description: 'Evidence-based guidelines for selecting appropriate peptides based on patient age and risk level.',
      topics: ['Risk Assessment', 'Age-based Selection', 'Dosage Guidelines', 'Contraindications'],
      external: false
    },
    {
      id: 10,
      title: 'AI Analysis Interpretation Guide',
      category: 'Guidelines',
      type: 'guideline',
      duration: '15 min read',
      icon: Microscope,
      color: 'blue',
      description: 'How to interpret AI-generated caries detection results and risk assessments.',
      topics: ['Reading Reports', 'Confidence Scores', 'Clinical Correlation', 'Decision Making'],
      external: false
    },
    {
      id: 11,
      title: 'Infection Control Protocols',
      category: 'Guidelines',
      type: 'guideline',
      duration: '12 min read',
      icon: Award,
      color: 'red',
      description: 'Standard infection control procedures when applying antimicrobial peptide varnishes.',
      topics: ['Sterilization', 'PPE Requirements', 'Cross-contamination Prevention', 'Disposal Protocols'],
      external: false
    },
    {
      id: 12,
      title: 'Biofilm Formation and Control',
      category: 'Articles',
      type: 'article',
      duration: '10 min read',
      icon: FlaskConical,
      color: 'orange',
      description: 'Understanding bacterial biofilm formation and how peptides disrupt this process.',
      topics: ['Biofilm Stages', 'Bacterial Adhesion', 'Peptide Mechanisms', 'Prevention Strategies'],
      external: true,
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8394842/'
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      green: { bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-600' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-600' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-600' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: 'text-yellow-600' },
      red: { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-600' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-700', icon: 'text-orange-600' },
    };
    return colors[color] || colors.green;
  };

  const handleReadNow = (resource: any) => {
    if (resource.external) {
      // Show external resource confirmation dialog
      setSelectedResource(resource);
      setShowExternalDialog(true);
    } else {
      // Internal resource - simulate opening
      setReadingResource(resource.id);
      setTimeout(() => {
        setReadingResource(null);
      }, 600);
    }
  };

  const handleConfirmExternal = () => {
    if (selectedResource) {
      setReadingResource(selectedResource.id);
      setTimeout(() => {
        // Open in new tab
        window.open(selectedResource.url, '_blank', 'noopener,noreferrer');
        setReadingResource(null);
        setShowExternalDialog(false);
        setSelectedResource(null);
      }, 600);
    }
  };

  const handleCancelExternal = () => {
    setShowExternalDialog(false);
    setSelectedResource(null);
  };

  const handleDownload = (resourceId: number, title: string, type: string) => {
    // Create downloadable content
    const content = `
${title}
${'='.repeat(title.length)}

Type: ${type.toUpperCase()}
Downloaded: ${new Date().toLocaleString()}

This is a sample ${type} from the AI-Based Antimicrobial Peptide Varnish for Caries Prevention system.

In a production environment, this would download the actual ${type} file.

---
AI Dental Care System
Learning Resources
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Show success message
    setDownloadSuccess(resourceId);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => onNavigate('student-home')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl text-gray-800">Learning Resources</h1>
            <p className="text-sm text-gray-600">{filteredResources.length} resources available</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-4">
          {filteredResources.map((resource) => {
            const colorClasses = getColorClasses(resource.color);
            return (
              <div key={resource.id} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-green-300 transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <resource.icon className={`w-6 h-6 ${colorClasses.icon}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base text-gray-800 flex-1">{resource.title}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full ${colorClasses.bg} ${colorClasses.text} whitespace-nowrap ml-2`}>
                        {resource.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{resource.description}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-500">{resource.duration}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 capitalize">{resource.type}</span>
                      {resource.external && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-blue-600 flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            External Resource
                          </span>
                        </>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <h4 className="text-xs text-gray-700 font-medium mb-2">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {resource.topics.map((topic, index) => (
                          <span key={index} className="text-xs bg-white px-2.5 py-1 rounded-full text-gray-700 border border-gray-200">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleReadNow(resource)}
                        disabled={readingResource === resource.id}
                        className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white text-sm px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        {readingResource === resource.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Opening...</span>
                          </>
                        ) : resource.type === 'video' ? (
                          <>
                            <Video className="w-4 h-4" />
                            <span>Watch Now</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-4 h-4" />
                            <span>Read Now</span>
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => handleDownload(resource.id, resource.title, resource.type)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        {downloadSuccess === resource.id && (
                          <span className="text-xs text-green-600 font-medium">Downloaded!</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* External Resource Confirmation Dialog */}
      {showExternalDialog && selectedResource && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-6 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 font-medium">External Scientific Resource</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Verified Educational Content</p>
                </div>
              </div>
              <button 
                onClick={handleCancelExternal}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-5">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-800 font-medium mb-1">{selectedResource.title}</p>
                <p className="text-xs text-gray-600">{selectedResource.duration} • {selectedResource.category}</p>
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                This educational content is sourced from verified scientific literature and will open in a new browser tab outside the application.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800">
                  <strong>Note:</strong> You will be redirected to an external scientific resource. Please verify the source when the page loads.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleCancelExternal}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmExternal}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
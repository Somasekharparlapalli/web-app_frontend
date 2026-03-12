import { ArrowLeft, Search, Filter, FlaskConical, Calendar, User, Award } from 'lucide-react';
import { useState } from 'react';

interface CaseStudiesScreenProps {
  onNavigate: (screen: string) => void;
}

export function CaseStudiesScreen({ onNavigate }: CaseStudiesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Pediatric', 'Middle Aged', 'Geriatric', 'Research'];

  const caseStudies = [
    {
      id: 1,
      title: 'Pediatric Caries Prevention with Histatin-5',
      category: 'Pediatric',
      date: 'Jan 28, 2026',
      author: 'Dr. Sarah Johnson',
      peptide: 'Histatin-5',
      riskLevel: 'Mild',
      ageGroup: '1-18 years',
      efficacy: '92%',
      summary: 'Comprehensive study on the effectiveness of Histatin-5 peptide varnish in preventing dental caries in pediatric patients aged 1-18 years.',
      findings: [
        'Reduced caries incidence by 92% over 6 months',
        'No adverse reactions reported',
        'Improved oral microbiome balance',
        'Enhanced enamel remineralization'
      ]
    },
    {
      id: 2,
      title: 'LL-37 Efficacy in Middle-Aged Patients',
      category: 'Middle Aged',
      date: 'Jan 25, 2026',
      author: 'Dr. Michael Chen',
      peptide: 'LL-37',
      riskLevel: 'Moderate',
      ageGroup: '19-60 years',
      efficacy: '87%',
      summary: 'Clinical trial evaluating LL-37 antimicrobial peptide application for moderate risk caries prevention in middle-aged adults.',
      findings: [
        'Significant reduction in bacterial colonization',
        'Effective against Streptococcus mutans',
        'Long-lasting protective effect (8-10 weeks)',
        'Well-tolerated by all participants'
      ]
    },
    {
      id: 3,
      title: 'KSL-W Peptide in Adult Caries Management',
      category: 'Middle Aged',
      date: 'Jan 22, 2026',
      author: 'Dr. Emily Rodriguez',
      peptide: 'KSL-W',
      riskLevel: 'Moderate',
      ageGroup: '19-60 years',
      efficacy: '85%',
      summary: 'Analysis of KSL-W peptide varnish effectiveness in preventing root caries in adults with moderate risk factors.',
      findings: [
        'Strong antimicrobial activity',
        'Effective on exposed root surfaces',
        'Reduced biofilm formation by 78%',
        'Monthly application recommended'
      ]
    },
    {
      id: 4,
      title: 'Nisin Application in Geriatric Dental Care',
      category: 'Geriatric',
      date: 'Jan 20, 2026',
      author: 'Dr. Robert Williams',
      peptide: 'Nisin',
      riskLevel: 'Severe',
      ageGroup: '60+ years',
      efficacy: '89%',
      summary: 'Long-term study on Nisin peptide varnish for severe caries risk management in geriatric patients.',
      findings: [
        'Highly effective against multi-drug resistant bacteria',
        'Safe for elderly patients with comorbidities',
        'Reduced need for invasive treatments',
        'Improved quality of life scores'
      ]
    },
    {
      id: 5,
      title: 'Cecropin Peptide in High-Risk Seniors',
      category: 'Geriatric',
      date: 'Jan 18, 2026',
      author: 'Dr. Lisa Thompson',
      peptide: 'Cecropin',
      riskLevel: 'Severe',
      ageGroup: '60+ years',
      efficacy: '91%',
      summary: 'Evaluation of Cecropin antimicrobial peptide in preventing advanced caries in high-risk geriatric population.',
      findings: [
        'Excellent penetration into deep lesions',
        'Synergistic effect with Nisin',
        'Reduced progression of existing caries',
        'Minimal side effects'
      ]
    },
    {
      id: 6,
      title: 'Comparative Analysis of Multiple Peptides',
      category: 'Research',
      date: 'Jan 15, 2026',
      author: 'Dr. David Park',
      peptide: 'Multiple',
      riskLevel: 'All Levels',
      ageGroup: 'All Ages',
      efficacy: 'Varies',
      summary: 'Meta-analysis comparing the efficacy of different antimicrobial peptides across various age groups and risk levels.',
      findings: [
        'Age-specific peptides show higher efficacy',
        'Combination therapy beneficial in severe cases',
        'Patient compliance rates above 90%',
        'Cost-effective compared to traditional methods'
      ]
    },
  ];

  const filteredCases = caseStudies.filter(study => {
    const matchesCategory = selectedCategory === 'All' || study.category === selectedCategory;
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.peptide.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
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
            <h1 className="text-xl text-gray-800">Case Studies</h1>
            <p className="text-sm text-gray-600">{filteredCases.length} studies available</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search case studies, peptides..."
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
          {filteredCases.map((study) => (
            <div key={study.id} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-green-300 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base text-gray-800 mb-2">{study.title}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-xs text-gray-600">{study.author}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-xs text-gray-600">{study.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${
                  study.riskLevel === 'Mild' ? 'bg-green-50 text-green-700' :
                  study.riskLevel === 'Moderate' ? 'bg-yellow-50 text-yellow-700' :
                  study.riskLevel === 'Severe' ? 'bg-red-50 text-red-700' :
                  'bg-purple-50 text-purple-700'
                }`}>
                  {study.riskLevel}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{study.summary}</p>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="bg-green-50 rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <FlaskConical className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs text-gray-600">Peptide</span>
                  </div>
                  <p className="text-sm text-gray-800 font-medium">{study.peptide}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs text-gray-600">Efficacy</span>
                  </div>
                  <p className="text-sm text-gray-800 font-medium">{study.efficacy}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <User className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-xs text-gray-600">Age Group</span>
                  </div>
                  <p className="text-xs text-gray-800 font-medium">{study.ageGroup}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-xs text-gray-700 font-medium mb-2">Key Findings:</h4>
                <ul className="space-y-1.5">
                  {study.findings.map((finding, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span className="text-xs text-gray-700">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

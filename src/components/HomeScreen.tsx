import { useState } from 'react';
import {
  Users2,
  FileText,
  Camera,
  AlertTriangle,
  Edit3,
  Clock,
  CheckCircle,
  Brain,
  Sparkles,
  Shield,
  BookOpen,
  BookmarkCheck,
  ChevronRight,
  Plus,
  Calendar,
  TrendingUp,
  Activity,
  BarChart3,
  Droplet,
  Info,
  HeartPulse,
  Save,
  Trash2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeScreenProps {
  userProfile: {
    name: string;
    email: string;
    phone: string;
    specialty: string;
    profile_image: string;
  };
  onNavigate: (screen: string) => void;
  onViewReport: (reportIndex: number) => void;
  doctorAnalysisHistory: any[];
  onDeleteScan?: (scanId: string | number) => Promise<{ status: boolean; message?: string }>;
  patients?: any[];
  allDbScans?: any[];
}

export function HomeScreen({ userProfile, onNavigate, doctorAnalysisHistory = [], onDeleteScan, patients = [], allDbScans = [] }: HomeScreenProps) {
  const [imgError, setImgError] = useState(false);
  const [timeOfDay] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  });

  const getCombinedScans = () => {
    const localScans = doctorAnalysisHistory.map(s => ({
      ...s,
      severity: s.severity || s.riskLevel || 'Mild'
    }));
    const localIds = new Set(localScans.map(s => String(s.id)));
    
    // Filter remote scans to only those belonging to doctor's patients
    const patientIds = new Set((patients || []).map(p => String(p.id)));
    const uniqueRemote = allDbScans.filter(s => {
      const isLocal = localIds.has(String(s.id));
      const belongsToPatient = s.patient_id ? patientIds.has(String(s.patient_id)) : false;
      return !isLocal && belongsToPatient;
    }).map(s => ({
      ...s,
      severity: s.severity || 'Mild'
    }));
    
    return [...localScans, ...uniqueRemote];
  };

  const combinedScansForStats = getCombinedScans();
  const severeCount = combinedScansForStats.filter(s => s.severity === 'Severe' || s.severity === 'High').length;
  const totalScanCount = combinedScansForStats.length;

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedScans, setSelectedScans] = useState<Set<string | number>>(new Set());

  const toggleSelection = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    const newSelected = new Set(selectedScans);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedScans(newSelected);
    if (newSelected.size > 0) setIsSelectionMode(true);
    else setIsSelectionMode(false);
  };

  const handleBulkDelete = async () => {
    if (selectedScans.size === 0) return;
    if (!window.confirm(`Delete ${selectedScans.size} selected scans?`)) return;

    if (onDeleteScan) {
      for (const id of Array.from(selectedScans)) {
        await onDeleteScan(id);
      }
      setSelectedScans(new Set());
      setIsSelectionMode(false);
      alert('Selected scans deleted');
    }
  };

  const recentScans = [
    { id: 1, title: 'Dental Scan - Sarah Johnson', date: 'Today, 10:30 AM', type: 'High Risk', risk: 'Severe' },
    { id: 2, title: 'Dental Scan - John Smith', date: 'Today, 09:15 AM', type: 'Moderate Risk', risk: 'Moderate' },
    { id: 3, title: 'Dental Scan - Emily Davis', date: 'Yesterday, 03:45 PM', type: 'Low Risk', risk: 'Mild' },
    { id: 4, title: 'Dental Scan - Michael Brown', date: 'Yesterday, 11:20 AM', type: 'High Risk', risk: 'Severe' },
    { id: 5, title: 'Dental Scan - Lisa Anderson', date: '2 days ago', type: 'Moderate Risk', risk: 'Moderate' },
    { id: 6, title: 'Dental Scan - David Wilson', date: '2 days ago', type: 'Low Risk', risk: 'Mild' },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden relative">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] px-6 py-5 flex-shrink-0 rounded-b-[24px]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-[80px] h-[80px] bg-white/20 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 border-4 border-white/30">
                  {userProfile.profile_image && !imgError ? (
                    <img 
                      src={`${userProfile.profile_image}${userProfile.profile_image.includes('?') ? '&' : '?'}t=${Date.now()}`} 
                      alt={userProfile.name} 
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)} 
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white uppercase">{userProfile.name?.charAt(0) || 'D'}</span>
                  )}
                </div>
                {/* Edit Icon */}
                <button
                  onClick={() => onNavigate('profile')}
                  className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors border-2 border-white"
                >
                  <Edit3 className="w-3.5 h-3.5 text-white" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 pt-0.5">
                <p className="text-white/90 text-sm mb-0.5">{timeOfDay},</p>
                <h1 className="text-white text-2xl font-bold mb-1">{userProfile.name}</h1>
                <p className="text-white/90 text-sm mb-0.5">{userProfile.specialty}</p>
                <p className="text-white/80 text-xs mb-0.5">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <p className="text-white/70 text-xs italic">Varnish Dental Clinic</p>
              </div>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => onNavigate('notifications')}
              className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-8">

          {/* Quick Stats Grid */}
          <div>
            <h2 className="text-lg text-gray-800 font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              {/* Total Patients */}
              <button
                onClick={() => onNavigate('patients')}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-left cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">Active</span>
                </div>
                <p className="text-3xl text-gray-900 font-bold mb-1">{patients.length}</p>
                <p className="text-sm text-gray-600">Total Patients</p>
              </button>

              {/* High Risk */}
              <button
                onClick={() => onNavigate('scan-history')}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-left cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full font-medium">Urgent</span>
                </div>
                <p className="text-3xl text-gray-900 font-bold mb-1">
                  {severeCount}
                </p>
                <p className="text-sm text-gray-600">High Risk Cases</p>
              </button>

              {/* Total Scans */}
              <button
                onClick={() => onNavigate('scan-history')}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-left cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Camera className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">Updated</span>
                </div>
                <p className="text-3xl text-gray-900 font-bold mb-1">
                  {totalScanCount}
                </p>
                <p className="text-sm text-gray-600">Total Scans</p>
              </button>

            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg text-gray-800 font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <button
                onClick={() => onNavigate('upload')}
                className="bg-white p-6 rounded-2xl hover:shadow-md transition-all border border-gray-200 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Camera className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm text-gray-800 font-medium">Scan Teeth</p>
                </div>
              </button>

              <button
                onClick={() => onNavigate('scan-history')}
                className="bg-white p-6 rounded-2xl hover:shadow-md transition-all border border-gray-200 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm text-gray-800 font-medium">Scan History</p>
                </div>
              </button>

              <button
                onClick={() => onNavigate('peptide-types')}
                className="bg-white p-6 rounded-2xl hover:shadow-md transition-all border border-gray-200 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Droplet className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm text-gray-800 font-medium">Peptide Types</p>
                </div>
              </button>

              <button
                onClick={() => onNavigate('varnish-info')}
                className="bg-white p-6 rounded-2xl hover:shadow-md transition-all border border-gray-200 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Info className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm text-gray-800 font-medium">Varnish Info</p>
                </div>
              </button>

              <button
                onClick={() => onNavigate('prevention')}
                className="bg-white p-6 rounded-2xl hover:shadow-md transition-all border border-gray-200 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <HeartPulse className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm text-gray-800 font-medium">Prevention</p>
                </div>
              </button>

              <button
                onClick={() => onNavigate('saved-plans')}
                className="bg-white p-6 rounded-2xl hover:shadow-md transition-all border border-gray-200 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Save className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm text-gray-800 font-medium">Saved Plans</p>
                </div>
              </button>
            </div>
          </div>

          {/* Two Column Layout for Activity */}
          <div>
            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg text-gray-800 font-semibold">Recent Scans</h2>
                <div className="flex items-center gap-3">
                  {!isSelectionMode ? (
                    <button
                      onClick={() => setIsSelectionMode(true)}
                      className="text-sm text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Select
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleBulkDelete}
                        className={`text-sm font-bold px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${selectedScans.size > 0
                            ? 'text-red-600 bg-red-50 hover:bg-red-100'
                            : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                          }`}
                        disabled={selectedScans.size === 0}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete ({selectedScans.size})
                      </button>
                      <button
                        onClick={() => {
                          setIsSelectionMode(false);
                          setSelectedScans(new Set());
                        }}
                        className="text-sm font-bold text-gray-500 hover:text-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onNavigate('history')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {combinedScansForStats.length > 0 ? (
                    combinedScansForStats.slice(0, 5).map((scan) => (
                      <div key={scan.id} className="relative group/scan-item flex items-center">
                        {isSelectionMode && (
                          <div className="p-4 pr-0">
                            <button
                              onClick={(e) => toggleSelection(e, scan.id)}
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedScans.has(scan.id)
                                  ? 'bg-blue-500 border-blue-500 text-white'
                                  : 'bg-white border-gray-300 hover:border-blue-400'
                                }`}
                            >
                              {selectedScans.has(scan.id) && <CheckCircle className="w-3 h-3" />}
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => {
                            if (isSelectionMode) {
                              toggleSelection({ stopPropagation: () => { } } as any, scan.id);
                            } else {
                              onNavigate('scan-history');
                            }
                          }}
                          className="flex-1 p-4 hover:bg-gray-50 transition-colors text-left flex items-center gap-4 pr-12"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${(scan.severity === 'Severe' || scan.severity === 'High') ? 'bg-red-100' :
                            scan.severity === 'Moderate' ? 'bg-orange-100' : 'bg-green-100'
                            }`}>
                            <FileText className={`w-5 h-5 ${(scan.severity === 'Severe' || scan.severity === 'High') ? 'text-red-600' :
                              scan.severity === 'Moderate' ? 'text-orange-600' : 'text-green-600'
                              }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 font-medium truncate">{scan.title || (scan.toothType ? `${scan.toothType} Scan` : 'Dental Scan')}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{scan.date} {scan.time ? `• ${scan.time}` : ''}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${(scan.severity === 'Severe' || scan.severity === 'High') ? 'bg-red-100 text-red-700' :
                            scan.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                            }`}>
                            {scan.severity} Risk
                          </span>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center">
                      <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-800">No Recent Scans</p>
                      <p className="text-xs text-gray-500">Scans you capture will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
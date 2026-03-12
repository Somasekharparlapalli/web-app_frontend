import { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Calendar, CheckCircle, ChevronRight, TrendingDown, Download, Brain, Loader2, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { apiService } from '../api/apiService';
import { UPLOADS_URL, API_BASE_URL } from '../api/config';

interface ScanHistoryScreenProps {
  onNavigate: (screen: string) => void;
  userRole?: 'doctor' | 'patient' | 'admin' | 'student' | null;
  onViewScanReport?: (scanData: any) => void;
  patientId?: string;
  doctorAnalysisHistory?: any[];
  onDeleteScan?: (scanId: string | number) => Promise<{ status: boolean; message?: string }>;
}

export function ScanHistoryScreen({ onNavigate, userRole, onViewScanReport, patientId, doctorAnalysisHistory = [], onDeleteScan }: ScanHistoryScreenProps) {
  const [scans, setScans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dbError, setDbError] = useState(false);
  const [stats, setStats] = useState({ total: 0, severe: 0, moderate: 0, mild: 0 });
  const [selectedScans, setSelectedScans] = useState<Set<string | number>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  useEffect(() => {
    loadScans();
  }, [patientId, doctorAnalysisHistory]);

  const updateStats = (scanList: any[]) => {
    const newStats = {
      total: scanList.length,
      severe: scanList.filter((s: any) => s.severity === 'Severe' || s.severity === 'High').length,
      moderate: scanList.filter((s: any) => s.severity === 'Moderate').length,
      mild: scanList.filter((s: any) => s.severity === 'Mild' || s.severity === 'Low' || s.severity === 'None').length
    };
    setStats(newStats);
  };

  // Helper: resolve the correct image URL for display
  const resolveImageUrl = (imagePath: string | undefined): string => {
    if (!imagePath) return '';
    // Already a base64 data URL (from web app scan) — use directly
    if (imagePath.startsWith('data:')) return imagePath;
    // Already a full HTTP URL
    if (imagePath.startsWith('http')) return imagePath;
    // Server-relative filename — prefix with backend uploads URL
    return `${UPLOADS_URL}${imagePath}`;
  };

  const loadScans = async () => {
    setIsLoading(true);
    setDbError(false);
    let combinedScans: any[] = [];

    // 1. Add local/persisted session scans first (most recent on top)
    if (doctorAnalysisHistory && doctorAnalysisHistory.length > 0) {
      const mappedLocal = doctorAnalysisHistory.map((s: any) => ({
        ...s,
        id: s.id || `local-${Math.random()}`,
        title: s.title || (s.toothType ? `${s.toothType} Scan` : 'Dental Scan'),
        date: s.date || new Date().toLocaleString(),
        confidence: typeof s.confidence === 'number' ? `${s.confidence}%` : (s.confidence || '0%'),
        severity: s.severity || 'Mild',
        image: resolveImageUrl(s.image)
      }));
      combinedScans = [...mappedLocal];
    }

    // 2. Fetch DB scans — try all-scans endpoint, fallback to patient '0'
    try {
      let response: any;
      if (patientId) {
        response = await apiService.getScanHistory(patientId);
      } else {
        try {
          response = await apiService.getAllScanHistory();
        } catch {
          // Fallback: backend not restarted yet, try anonymous scans only
          response = await apiService.getScanHistory('0');
        }
      }

      if (response?.status && response?.data?.length > 0) {
        const mappedRemote = response.data.map((s: any) => ({
          id: s.id,
          title: s.condition_type || 'Dental Scan',
          date: s.scan_date || (s.created_at ? new Date(s.created_at).toLocaleString() : ''),
          confidence: s.confidence || '0%',
          severity: s.severity || 'Mild',
          color: s.severity === 'Severe' ? 'red' : s.severity === 'Moderate' ? 'amber' : 'green',
          image: s.image_path?.includes('captured_scan_') ? '' : resolveImageUrl(s.image_path),
          toothType: s.tooth_type || 'Unknown',
          affectedArea: s.affected_area || 'Unknown',
          patient_id: s.patient_id
        }));

        // Avoid duplicates with local scans
        const localIds = new Set(combinedScans.map(s => String(s.id)));
        const uniqueRemote = mappedRemote.filter((s: any) => !localIds.has(String(s.id)));
        combinedScans = [...combinedScans, ...uniqueRemote];
      }
    } catch (error) {
      console.error('Error fetching scan history from DB:', error);
      setDbError(true);
    }

    setScans(combinedScans);
    updateStats(combinedScans);
    setIsLoading(false);
  };

  const handleDeleteScan = async (e: React.MouseEvent, scanId: string | number) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this scan? This will remove it from both the app and database.')) {
      return;
    }
    await performDelete(scanId);
  };

  const performDelete = async (scanId: string | number) => {
    try {
      // Use the onDeleteScan prop which handles both DB and App-level state/storage
      if (onDeleteScan) {
        const result = await onDeleteScan(scanId);
        if (result.status) {
          setScans(prevScans => {
            const updated = prevScans.filter(s => String(s.id) !== String(scanId));
            updateStats(updated);
            return updated;
          });
          alert("Scan deleted successfully");
        } else {
          alert("Failed to delete scan: " + (result.message || "Unknown error"));
        }
      } else {
        // Fallback for direct API call
        const response = await fetch(`${API_BASE_URL}/delete_scan/${scanId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setScans(prev => {
            const filtered = prev.filter(s => String(s.id) !== String(scanId));
            updateStats(filtered);
            return filtered;
          });
          alert("Scan deleted successfully");
        } else {
          const data = await response.json();
          alert("Failed to delete: " + (data.message || response.statusText));
        }
      }
    } catch (error: any) {
      console.error("Delete Error:", error);
      alert("Error: " + (error.message || "Failed to connect to server"));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedScans.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedScans.size} selected scans?`)) return;

    setIsLoading(true);
    const idsToDelete = Array.from(selectedScans);
    for (const id of idsToDelete) {
      await performDelete(id);
    }
    setSelectedScans(new Set());
    setIsSelectionMode(false);
    setIsLoading(false);
    alert('Selected scans deleted successfully');
  };

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

  const toggleSelectAll = () => {
    if (selectedScans.size === scans.length) {
      setSelectedScans(new Set());
      setIsSelectionMode(false);
    } else {
      const allIds = scans.map(s => s.id);
      setSelectedScans(new Set(allIds));
      setIsSelectionMode(true);
    }
  };

  const handleExportData = () => {
    if (scans.length === 0) return;

    const scansToExport = isSelectionMode && selectedScans.size > 0
      ? scans.filter(s => selectedScans.has(s.id))
      : scans;

    // Create CSV header
    const headers = ['ID', 'Title', 'Date', 'Confidence', 'Severity', 'Tooth Type', 'Affected Area'];
    const csvRows = [
      headers.join(','),
      ...scansToExport.map(s => [
        s.id,
        `"${s.title}"`,
        `"${s.date}"`,
        s.confidence,
        s.severity,
        s.toothType || 'Unknown',
        s.affectedArea || 'Unknown'
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Dental_Scan_History_Export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadReports = () => {
    if (scans.length === 0) return;

    // If specific scans are selected, maybe we show a special combined view?
    // For now, if one is selected, show that one's report. 
    // If many are selected or none, show the most recent one.
    const targetScan = isSelectionMode && selectedScans.size === 1
      ? scans.find(s => selectedScans.has(s.id))
      : scans[0];

    if (onViewScanReport) {
      onViewScanReport(targetScan);
    } else {
      onNavigate('report-details');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-white flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate(userRole === 'doctor' ? 'home' : 'patient-home')}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl text-gray-900 font-semibold text-center">Scan History</h2>
            <p className="text-xs text-gray-500 mt-0.5">{patientId ? `History for ${patientId}` : 'Past dental scans & reports'}</p>
          </div>
          {scans.length > 0 && (
            <div className="ml-auto flex items-center gap-2">
              {!isSelectionMode ? (
                <button
                  onClick={() => setIsSelectionMode(true)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl transition-colors"
                >
                  Select
                </button>
              ) : (
                <>
                  <button
                    onClick={toggleSelectAll}
                    className="text-xs font-bold text-gray-600 hover:text-gray-700 bg-gray-100 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    {selectedScans.size === scans.length ? 'Unselect All' : 'Select All'}
                  </button>
                  <button
                    onClick={() => {
                      setIsSelectionMode(false);
                      setSelectedScans(new Set());
                    }}
                    className="text-xs font-bold text-gray-500 hover:text-gray-600 px-1"
                  >
                    Cancel
                  </button>
                  {selectedScans.size > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      title="Delete Marked"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-2.5">
          <div className="bg-blue-50 rounded-2xl p-3.5 text-center">
            <p className="text-xs text-gray-600 mb-1">Total</p>
            <p className="text-2xl text-blue-600 font-bold">{stats.total}</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-3.5 text-center">
            <p className="text-xs text-gray-600 mb-1">Severe</p>
            <p className="text-2xl text-red-600 font-bold">{stats.severe}</p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-3.5 text-center">
            <p className="text-xs text-gray-600 mb-1">Mod</p>
            <p className="text-2xl text-orange-600 font-bold">{stats.moderate}</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-3.5 text-center">
            <p className="text-xs text-gray-600 mb-1">Mild</p>
            <p className="text-2xl text-green-600 font-bold">{stats.mild}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-4 overflow-y-auto bg-gray-50">
        {/* DB connection warning */}
        {dbError && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mb-4 flex items-center gap-2">
            <span className="text-amber-500 text-lg">⚠️</span>
            <div>
              <p className="text-xs font-semibold text-amber-800">Could not load database scans</p>
              <p className="text-xs text-amber-700">Restart backend to see all patient scans. Showing local session scans only.</p>
            </div>
          </div>
        )}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 animate-pulse font-medium">Fetching History...</p>
          </div>
        ) : scans.length === 0 ? (
          <div className="bg-white rounded-[32px] p-10 text-center border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-lg font-bold text-gray-800">No Scans Yet</p>
            <p className="text-sm text-gray-500 mt-2">Upload a scan to see the AI analysis history here.</p>
          </div>
        ) : (
          <>
            <button
              onClick={() => onNavigate('doctor-ai-analyses')}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-2xl hover:from-blue-600 hover:to-cyan-500 transition-all mb-5 flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-base font-semibold">Recent AI Analyses</p>
                  <p className="text-xs text-white/90">View uploaded scans with AI detection</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base text-gray-900 font-semibold">Recent Scans</h3>
            </div>

            <div className="space-y-3 mb-6">
              {scans.map((scan) => (
                <div key={scan.id} className="relative group/container flex items-center gap-3">
                  {isSelectionMode && (
                    <button
                      onClick={(e) => toggleSelection(e, scan.id)}
                      className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${selectedScans.has(scan.id)
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 hover:border-blue-400'
                        }`}
                    >
                      {selectedScans.has(scan.id) && <CheckCircle className="w-4 h-4" />}
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      if (isSelectionMode) {
                        toggleSelection(e, scan.id);
                      } else {
                        onViewScanReport ? onViewScanReport(scan) : onNavigate('report-details');
                      }
                    }}
                    className="w-full bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-blue-50 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                        {scan.image ? (
                          <img
                            src={scan.image}
                            alt={scan.title}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              if (target.nextElementSibling) {
                                (target.nextElementSibling as HTMLElement).style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <div
                          className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100"
                          style={{ display: scan.image ? 'none' : 'flex' }}
                        >
                          <FileText className="w-8 h-8 text-blue-300" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-base text-gray-900 font-bold truncate pr-8">{scan.title}</h4>
                          <div className="text-right flex-shrink-0">
                            <p className={`text-lg font-black ${scan.severity === 'Severe' ? 'text-red-600' :
                              scan.severity === 'Moderate' ? 'text-orange-600' :
                                'text-green-600'
                              }`}>{scan.confidence}</p>
                            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Confidence</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <p className="text-xs font-semibold text-gray-500">{scan.date}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs px-3 py-1.5 rounded-xl font-bold inline-flex items-center gap-2 shadow-sm ${scan.severity === 'Severe' ? 'bg-red-50 text-red-700' :
                              scan.severity === 'Moderate' ? 'bg-orange-50 text-orange-700' :
                                'bg-green-50 text-green-700'
                              }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${scan.severity === 'Severe' ? 'bg-red-600' :
                              scan.severity === 'Moderate' ? 'bg-orange-600' :
                                'bg-green-600'
                              }`}></span>
                            {scan.severity}
                          </span>
                          
                          <div className="flex items-center gap-2">
                             <button
                               onClick={(e) => handleDeleteScan(e, scan.id)}
                               className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                               title="Delete Scan"
                             >
                               <Trash2 className="w-4 h-4" />
                             </button>
                             <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Progress Overview Section - Hidden if no scans */}
        {scans.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 mb-6 shadow-sm">
            <h3 className="text-base text-gray-900 font-bold mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-green-500" />
              Progress Overview
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-600">Risk Reduction</span>
                <span className="text-lg font-black text-green-600">-15%</span>
              </div>
              <div className="w-full bg-gray-50 rounded-full h-3 border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Analysis suggests oral health stability. Keep following the recommended peptide routine.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pb-12">
          <button
            onClick={handleExportData}
            disabled={scans.length === 0}
            className="bg-white border-2 border-gray-100 text-gray-600 py-4 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            Export Data
          </button>
          <button
            onClick={handleDownloadReports}
            disabled={scans.length === 0}
            className="bg-white border-2 border-blue-500 text-blue-600 py-4 rounded-2xl hover:bg-blue-50 transition-all font-bold text-sm flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <FileText className="w-5 h-5" />
            Full Reports
          </button>
        </div>
      </div>
    </div>
  );
}
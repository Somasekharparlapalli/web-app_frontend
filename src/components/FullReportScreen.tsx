import { useState } from 'react';
import { ArrowLeft, Trash2, Share2, CheckCircle, Droplet, Download } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
// @ts-ignore - html2pdf doesn't have official types
import html2pdf from 'html2pdf.js';

interface FullReportScreenProps {
  onNavigate: (screen: string) => void;
  scanData?: any;
  onDeleteScan?: (id: string | number) => Promise<{ status: boolean; message?: string }>;
  patients?: any[];
  userProfile?: any;
}

export function FullReportScreen({ onNavigate, scanData, onDeleteScan, patients = [], userProfile }: FullReportScreenProps) {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Default scan data if none provided
  const report = scanData || {
    id: 1,
    title: 'Significant Caries Detected',
    date: 'Mar 09, 2026 11:18',
    confidence: '100.0%',
    severity: 'Severe',
    color: 'red',
    image: 'https://images.unsplash.com/photo-1661701422669-bcfe6d07c30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjB0ZWV0aCUyMGNhdml0eSUyMGNsb3NlLXVwfGVufDF8fHx8MTc3MzEyNTIzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    toothType: 'Canine',
    affectedArea: 'Upper Teeth'
  };

  const getPeptides = (severity: string) => {
    if (severity === 'Severe') {
      return [
        { name: 'Nisin Peptide', description: 'High-potency antimicrobial peptide for deep penetration and severe infection control.', severity: 'Severe' },
        { name: 'Cecropin Peptide', description: 'Broad-spectrum antimicrobial activity suitable for advanced caries cases.', severity: 'Severe' }
      ];
    } else if (severity === 'Moderate') {
      return [
        { name: 'KSL-W Peptide', description: 'Effective against moderate bacterial infections with balanced penetration.', severity: 'Moderate' },
        { name: 'LL-37 Peptide', description: 'Natural antimicrobial peptide with immune-boosting properties.', severity: 'Moderate' }
      ];
    } else {
      return [
        { name: 'Histatin-5 Peptide', description: 'Gentle antimicrobial peptide suitable for mild cases and prevention.', severity: 'Mild' }
      ];
    }
  };

  const peptides = getPeptides(report.severity);

  // Find patient details
  const patient = patients.find(p => String(p.id) === String(report.patient_id || ''));
  const patientId = report.patient_id || 'N/A';
  const patientName = patient?.name || patient?.full_name || (report.patient_id ? `Patient ${report.patient_id}` : 'Anonymous Patient');

  const handleDelete = async () => {
    if (!report.id) return;
    
    if (onDeleteScan) {
      const result = await onDeleteScan(report.id);
      if (!result.status) {
        alert(result.message || "Failed to delete report");
        return;
      }
    }

    setShowDeleteConfirm(false);
    setDeleteSuccess(true);
    setTimeout(() => {
      setDeleteSuccess(false);
      // Navigate back to history after success
      onNavigate('history');
    }, 1500);
  };

  const handleShare = async () => {
    const shareText = `
        Dental Scan Full Report
        -----------------------
        Status: ${report.severity} Caries
        Confidence: ${report.confidence}
        Tooth: ${report.toothType}
        Date: ${report.date}
        
        Recommended Peptides:
        ${peptides.map(p => `- ${p.name}`).join('\n')}
        
        Certified by Varnish Dental Clinic.
    `.trim().replace(/^\s+/gm, '');

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'Dental Scan Report',
          text: shareText,
          // url: window.location.href // Uncomment if you have a public link
        });
        setShareSuccess(true);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        setShareSuccess(true);
        // Change text alert to indicate copy
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }

    setTimeout(() => {
      setShareSuccess(false);
    }, 2000);
  };

  const handleDownload = () => {
    // Generate Professional Text Report Content
    const reportContent = `
=========================================
      DENTAL SCAN: FULL CLINICAL REPORT
=========================================

PATIENT INFORMATION
-------------------
Patient Name: ${patientName}
Patient ID: ${patientId}
Report Date: ${report.date || new Date().toLocaleDateString()}

DIAGNOSTIC ANALYSIS
-------------------
Condition: ${report.title}
Risk Level: ${report.severity}
AI Confidence: ${report.confidence}
Tooth Type: ${report.toothType}
Affected Area: ${report.affectedArea}

AI FINDINGS
-----------
${report.aiFindings || 'Clinical analysis shows signs of dental concern in the specified area.'}

RECOMMENDATIONS
---------------
- Schedule a clinical examination for professional validation.
- Review AI peatidic recommendations: ${peptides.map(p => p.name).join(', ')}.
- Monitor the affected area for increased sensitivity.

CERTIFIED BY
------------
${userProfile?.full_name || userProfile?.name || 'Dr. Satish'}
${userProfile?.specialty || 'Dentist'}
${userProfile?.clinic_name || userProfile?.clinicName || 'Varnish Dental Clinic'}

-----------------------------------------
This is an AI-assisted dental report. 
Generated via Varnish Dental Pro.
=========================================
`.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Dental_Report_${patientName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
            <h3 className="text-[22px] text-gray-900 font-bold text-center mb-3">Delete Report?</h3>
            <p className="text-base text-gray-500 text-center mb-8 leading-relaxed">
              Are you sure you want to delete this scan report? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-[20px] hover:bg-gray-200 transition-all font-bold text-lg active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-[1.2] bg-red-600 text-white py-4 rounded-[20px] hover:bg-red-700 transition-all font-bold text-lg shadow-lg shadow-red-200 active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Messages */}
      {deleteSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <p className="font-medium">Report deleted successfully!</p>
          </div>
        </div>
      )}

      {shareSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
            <Share2 className="w-5 h-5" />
            <p className="font-medium">
              {typeof navigator.share === 'function' ? 'Report shared successfully!' : 'Report details copied to clipboard!'}
            </p>
          </div>
        </div>
      )}

      {downloadSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
            <Download className="w-5 h-5" />
            <p className="font-medium">PDF downloaded successfully!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] px-5 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('scan-history')}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h2 className="text-lg text-white font-semibold">Full Report</h2>
              <p className="text-xs text-white/90 mt-0.5">Generated Analysis Report</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Trash2 className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => handleShare()}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div id="report-content" className="flex-1 overflow-y-auto px-5 py-5 bg-gray-50">
        {/* Patient Reference Header - Integrated */}
        <div className="flex justify-between items-end mb-5 px-1">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Patient Report</p>
            <h3 className="text-xl text-gray-900 font-black tracking-tight">{patientName}</h3>
            <p className="text-[10px] text-blue-500 font-bold">ID: {patientId}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Status</p>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase text-white ${report.severity === 'Severe' ? 'bg-red-500' : report.severity === 'Moderate' ? 'bg-amber-500' : 'bg-green-500'}`}>
              Certified
            </span>
          </div>
        </div>

        {/* Analysis Details */}
        <div className="bg-white rounded-2xl p-5 mb-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">ANALYSIS DETAILS</p>
          
          {/* Scan Image */}
          <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-gray-100">
            <ImageWithFallback
              src={report.image}
              alt="Dental Scan"
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>

          {/* Title and Description */}
          <h3 className="text-xl text-gray-900 font-semibold mb-2">{report.title}</h3>
          <p className="text-sm text-gray-600 mb-4">
            AI analysis identifies severe caries in {report.toothType}. Immediate clinical intervention is advised.
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Severity</p>
              <p className="text-lg text-gray-900 font-semibold">{report.severity}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Confidence</p>
              <p className="text-lg text-blue-600 font-semibold">{report.confidence}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Tooth Type</p>
              <p className="text-lg text-gray-900 font-semibold">{report.toothType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Affected Area</p>
              <p className="text-lg text-gray-900 font-semibold">{report.affectedArea}</p>
            </div>
          </div>
        </div>

        {/* Clinical Recommendations */}
        <div className="bg-white rounded-2xl p-5 mb-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">CLINICAL RECOMMENDATIONS</p>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-base text-gray-900 font-semibold mb-1">Recommended Action</h4>
                <p className="text-sm text-gray-700">
                  Urgent clinical intervention and intensive peptide therapy recommend.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommended Peptides */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Droplet className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="text-base text-purple-900 font-semibold">AI Recommended Peptides</h4>
              <p className="text-xs text-purple-700">Based on {report.severity} risk level</p>
            </div>
          </div>

          {/* Peptide Cards */}
          <div className="space-y-3 mb-4">
            {peptides.map((peptide, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 border border-purple-100">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-base text-gray-900 font-semibold">{peptide.name}</h5>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    peptide.severity === 'Severe' ? 'bg-red-100 text-red-700' :
                    peptide.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {peptide.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{peptide.description}</p>
              </div>
            ))}
          </div>

          {/* View All Peptide Types Button */}
          <button
            onClick={() => onNavigate('peptide-types')}
            className="w-full bg-purple-600 text-white py-3.5 rounded-2xl hover:bg-purple-700 transition-colors font-semibold"
          >
            View All Peptide Types
          </button>
        </div>

        {/* Download Report Button */}
        <button
          onClick={handleDownload}
          className="w-full bg-blue-500 text-white py-4 rounded-2xl hover:bg-blue-600 transition-all font-semibold flex items-center justify-center gap-2 mb-5 active:scale-95 shadow-md active:shadow-sm"
        >
          <Download className="w-5 h-5" />
          Download Full Report
        </button>

        {/* Certified By */}
        <div className="bg-white rounded-2xl p-5 mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">CERTIFIED BY</p>
          <p className="text-base text-gray-900 font-semibold">{userProfile?.full_name || userProfile?.name || 'satish'}</p>
          <p className="text-sm text-gray-600">{userProfile?.specialty || 'dentist'}</p>
          <p className="text-sm text-gray-600">{userProfile?.clinic_name || userProfile?.clinicName || 'Varnish Dental Clinic'}</p>
          <p className="text-xs text-gray-500 mt-3">Report Date: {report.date || 'March 10, 2026'}</p>
        </div>
      </div>
    </div>
  );
}
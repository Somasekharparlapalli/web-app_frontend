import { useState } from 'react';
import { ArrowLeft, FileText, Calendar, AlertCircle, CheckCircle, Download, Share2, TrendingUp, XCircle } from 'lucide-react';
import { AIChatButton } from './AIChatButton';
import type { MedicalData } from '../App';

interface ReportDetailsScreenProps {
  onNavigate: (screen: string) => void;
  medicalData?: MedicalData;
}

export function ReportDetailsScreen({ onNavigate, medicalData }: ReportDetailsScreenProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleDownloadPDF = () => {
    // Generate and download PDF
    const reportContent = generatePDFContent(medicalData);
    const blob = new Blob([reportContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DentalScan_Report_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };

  const generatePDFContent = (data?: MedicalData): string => {
    // Generate a simple text-based report (in real app, use a PDF library like jsPDF)
    const date = new Date().toLocaleDateString();
    let content = `DENTAL SCAN REPORT\n`;
    content += `===================\n\n`;
    content += `Generated: ${date}\n`;
    content += `Report ID: #DCR-2026-0122\n`;
    content += `Patient: John Smith\n\n`;
    content += `VITAL SIGNS\n`;
    content += `-----------\n`;
    content += `Blood Pressure: ${data?.vitalSigns?.bloodPressure || '120/80 mmHg'}\n`;
    content += `Pulse Rate: ${data?.vitalSigns?.pulseRate || '72 bpm'}\n`;
    content += `Respiratory Rate: ${data?.vitalSigns?.respiratoryRate || '16 /min'}\n`;
    content += `Temperature: ${data?.vitalSigns?.temperature || '98.6°F'}\n\n`;
    content += `PHYSICAL MEASUREMENTS\n`;
    content += `---------------------\n`;
    content += `Height: ${data?.physicalMeasurements?.height || '5\'8"'}\n`;
    content += `Weight: ${data?.physicalMeasurements?.weight || '165 lbs'}\n`;
    content += `BMI: ${data?.physicalMeasurements?.bmi || '25.1'}\n\n`;
    content += `MEDICAL HISTORY\n`;
    content += `---------------\n`;
    content += `${data?.medicalHistory?.join('\n') || 'No significant medical history'}\n\n`;
    content += `PHYSICAL EXAMINATION\n`;
    content += `--------------------\n`;
    content += `${data?.physicalExam || 'Overall health: Good'}\n\n`;
    content += `---\nEnd of Report\n`;
    
    return content;
  };

  const handleShareReport = () => {
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
    }, 3000);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('history')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h2 className="text-xl text-gray-800">Report Details</h2>
              <p className="text-xs text-gray-500">Scan ID: #DCR-2026-0122</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShareReport}
              className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Share2 className="w-5 h-5 text-blue-500" />
            </button>
            <button
              onClick={handleDownloadPDF}
              className="p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Download className="w-5 h-5 text-green-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Download Success Message */}
        {downloadSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm text-green-800 font-medium">PDF Downloaded Successfully!</p>
                <p className="text-xs text-green-600">DentalScan_Report_Jan22_2026.pdf</p>
              </div>
            </div>
          </div>
        )}

        {/* Share Success Message */}
        {shareSuccess && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm text-blue-800 font-medium">Report Shared Successfully!</p>
                <p className="text-xs text-blue-600">The report has been shared securely</p>
              </div>
            </div>
          </div>
        )}

        {/* Date & Time */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm text-gray-800">Scan Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-600">Date</p>
              <p className="text-sm text-gray-800">January 30, 2026</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Time</p>
              <p className="text-sm text-gray-800">10:30 AM</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Doctor</p>
              <p className="text-sm text-gray-800">Dr. Smith</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Type</p>
              <p className="text-sm text-gray-800">Comprehensive</p>
            </div>
          </div>
        </div>

        {/* Medical History Review */}
        <h3 className="text-sm text-gray-700 mb-3">Medical History Review</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-700">Previous dental work reviewed</p>
                <p className="text-xs text-gray-500 mt-0.5">Last filling: March 2025 (Tooth #14)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-700">No allergies reported</p>
                <p className="text-xs text-gray-500 mt-0.5">Safe to proceed with all treatments</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-700">Current medications: None</p>
                <p className="text-xs text-gray-500 mt-0.5">No drug interactions to consider</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-700">No chronic conditions</p>
                <p className="text-xs text-gray-500 mt-0.5">General health: Excellent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vital Signs */}
        <h3 className="text-sm text-gray-700 mb-3">Vital Signs</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-600">Blood Pressure</p>
            </div>
            <p className="text-lg text-gray-800">120/80</p>
            <p className="text-xs text-gray-500">mmHg</p>
            <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Normal</span>
          </div>

          <div className="bg-white border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs text-gray-600">Pulse Rate</p>
            </div>
            <p className="text-lg text-gray-800">72</p>
            <p className="text-xs text-gray-500">bpm</p>
            <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Normal</span>
          </div>

          <div className="bg-white border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-600">Respiratory Rate</p>
            </div>
            <p className="text-lg text-gray-800">16</p>
            <p className="text-xs text-gray-500">breaths/min</p>
            <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Normal</span>
          </div>

          <div className="bg-white border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-600">Temperature</p>
            </div>
            <p className="text-lg text-gray-800">98.6</p>
            <p className="text-xs text-gray-500">°F (37.0°C)</p>
            <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Normal</span>
          </div>
        </div>

        {/* Physical Measurements */}
        <h3 className="text-sm text-gray-700 mb-3">Physical Measurements</h3>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg text-purple-600">↕</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">Height</p>
              <p className="text-lg text-gray-800">5'8"</p>
              <p className="text-xs text-gray-500">173 cm</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg text-purple-600">⚖</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">Weight</p>
              <p className="text-lg text-gray-800">165 lbs</p>
              <p className="text-xs text-gray-500">75 kg</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg text-purple-600">📊</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">BMI</p>
              <p className="text-lg text-gray-800">25.1</p>
              <p className="text-xs text-gray-500">Overweight</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-200">
            <p className="text-xs text-gray-600 mb-2">BMI Classification</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-green-200 rounded-l-full"></div>
              <div className="flex-1 h-2 bg-yellow-200"></div>
              <div className="flex-1 h-2 bg-orange-200"></div>
              <div className="flex-1 h-2 bg-red-200 rounded-r-full"></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">18.5</span>
              <span className="text-xs text-gray-500">25.0</span>
              <span className="text-xs text-gray-500">30.0</span>
            </div>
            <div className="mt-2 flex items-center gap-1 justify-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="text-xs text-gray-600">Current: 25.1 (Slightly Overweight)</p>
            </div>
          </div>
        </div>

        {/* General Physical Examination */}
        <h3 className="text-sm text-gray-700 mb-3">General Physical Examination</h3>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Overall Health Status</p>
                <p className="text-xs text-gray-600">Good - Patient appears healthy and alert</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Oral Hygiene Assessment</p>
                <p className="text-xs text-gray-600">Excellent - Regular brushing and flossing evident</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Gum Health</p>
                <p className="text-xs text-gray-600">Good - Pink, firm, no bleeding or inflammation</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Visible Abnormalities</p>
                <p className="text-xs text-gray-600">None detected - No lesions, swelling, or discoloration</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Areas of Concern</p>
                <p className="text-xs text-gray-600">Minor plaque buildup on lower molars - Recommend enhanced cleaning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-gray-200 my-6"></div>
        <h2 className="text-base text-gray-800 mb-4 text-center">📋 Detailed Dental Report</h2>

        {/* Risk Assessment */}
        <h3 className="text-sm text-gray-700 mb-3">Risk Assessment</h3>
        <div className="bg-white border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-800">Moderate Risk</span>
            </div>
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
              Confidence: 87%
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Early signs of enamel demineralization detected in the upper left molar region.
          </p>
        </div>

        {/* Findings */}
        <h3 className="text-sm text-gray-700 mb-3">Key Findings</h3>
        <div className="space-y-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Affected Area</p>
                <p className="text-xs text-gray-600">Upper Left Molar (Tooth #26)</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Condition Type</p>
                <p className="text-xs text-gray-600">Initial Caries Formation</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Recommended Action</p>
                <p className="text-xs text-gray-600">Antimicrobial Peptide Varnish Application</p>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Recommendations */}
        <h3 className="text-sm text-gray-700 mb-3">Treatment Recommendations</h3>
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">Apply antimicrobial peptide varnish within 2 weeks</p>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">Improve daily oral hygiene routine</p>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">Schedule follow-up scan in 3 months</p>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">Reduce sugar intake and acidic beverages</p>
            </li>
          </ul>
        </div>

        {/* Progress Indicator */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 mb-6">
          <h3 className="text-sm text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            Overall Oral Health Score
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Overall Health</span>
              <span className="text-green-600">72%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="w-full bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition-colors mb-3"
        >
          Download Full Report (PDF)
        </button>

        <button
          onClick={() => onNavigate('recommendation')}
          className="w-full bg-white border-2 border-blue-500 text-blue-500 p-4 rounded-xl hover:bg-blue-50 transition-colors"
        >
          View Treatment Plan
        </button>
      </div>
      
      <AIChatButton context="report" />
    </div>
  );
}
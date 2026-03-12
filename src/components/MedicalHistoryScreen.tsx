import { useState } from 'react';
import { ArrowLeft, Heart, AlertCircle, CheckCircle, Clock, Pill, FileText, Calendar, XCircle } from 'lucide-react';
import { AIChatButton } from './AIChatButton';

interface MedicalHistoryScreenProps {
  onNavigate: (screen: string) => void;
}

export function MedicalHistoryScreen({ onNavigate }: MedicalHistoryScreenProps) {
  const [success, setSuccess] = useState(false);

  const handleUpdate = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('profile')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl text-gray-800">Medical History</h2>
            <p className="text-xs text-gray-500">Your health information</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm text-green-800 font-medium">Medical History Updated Successfully!</p>
                <p className="text-xs text-green-600">Your changes have been saved • {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm text-gray-800">Patient Information</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Blood Group</span>
              <span className="text-xs text-gray-800">O+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Age</span>
              <span className="text-xs text-gray-800">28 years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Gender</span>
              <span className="text-xs text-gray-800">Female</span>
            </div>
          </div>
        </div>

        <h3 className="text-sm text-gray-700 mb-3">Medical Conditions</h3>
        <div className="space-y-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Allergies</p>
                <p className="text-xs text-gray-600">No known allergies</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Pill className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Current Medications</p>
                <p className="text-xs text-gray-600">None</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">Previous Dental Treatments</p>
                <p className="text-xs text-gray-600 mb-2">Routine cleaning - Dec 2025</p>
                <p className="text-xs text-gray-600">Filling - Aug 2025</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-sm text-gray-700 mb-3">Recent Visits</h3>
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <p className="text-sm text-gray-800">January 15, 2026</p>
            </div>
            <p className="text-xs text-gray-600 ml-8">Regular Checkup - No issues found</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <p className="text-sm text-gray-800">December 10, 2025</p>
            </div>
            <p className="text-xs text-gray-600 ml-8">Professional Cleaning - Completed</p>
          </div>
        </div>

        <button 
          onClick={handleUpdate}
          className="w-full mt-6 bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition-colors"
        >
          Update Medical History
        </button>
      </div>
      
      <AIChatButton context="medical" />
    </div>
  );
}

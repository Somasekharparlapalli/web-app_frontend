import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, User } from 'lucide-react';
import { Patient } from '../types';
import { apiService } from '../api/apiService';

interface AddPatientScreenProps {
  onNavigate: (screen: string) => void;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  doctorId: string;
  onPatientAdded: () => void;
}

export function AddPatientScreen({ onNavigate, setPatients, doctorId, onPatientAdded }: AddPatientScreenProps) {
  // Generate unique Patient ID (backup if API doesn't return one)
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [oralHygieneScore, setOralHygieneScore] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setError('');

    if (!name.trim()) {
      setError('Please enter patient name');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!age.trim() || isNaN(Number(age)) || Number(age) <= 0) {
      setError('Please enter a valid age');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!phone.trim() || phone.trim().length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!oralHygieneScore) {
      setError('Please select oral hygiene score');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setIsLoading(true);

    try {
      const patientData = {
        full_name: name,
        age: Number(age),
        gender,
        phone_number: phone,
        medical_history: medicalHistory,
        oral_hygiene_score: oralHygieneScore,
        status: 'Active',
        doctor_id: doctorId
      };

      const response = await apiService.addPatient(patientData);

      if (response.status) {
        setSuccess(true);
        onPatientAdded();

        // Navigate back after showing success message
        setTimeout(() => {
          onNavigate('patients');
        }, 800);
      } else {
        setError(response.message || 'Failed to add patient');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] px-6 pt-6 pb-12 rounded-b-[32px] md:rounded-b-[48px] shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('patients')}
              className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm border border-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl text-white font-bold tracking-tight">Add New Patient</h1>
              <p className="text-blue-50/80 text-sm mt-0.5">Enter patient information below</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto -mt-6">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-0 md:py-0 pb-12">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 animate-fade-in">
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm text-green-800 font-medium">Patient added successfully!</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 justify-center">
                <XCircle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl text-gray-800 font-semibold">Patient Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Full Name */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block font-medium">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter patient full name"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 placeholder:text-gray-400"
                />
              </div>

              {/* Age */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block font-medium">Age *</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter age"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 placeholder:text-gray-400"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block font-medium">Gender *</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block font-medium">Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 placeholder:text-gray-400"
                />
              </div>

              {/* Medical History */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block font-medium">Medical History</label>
                <textarea
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  placeholder="Enter any relevant medical history (optional)"
                  rows={4}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 placeholder:text-gray-400 resize-none"
                />
              </div>

              {/* Oral Hygiene Score */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block font-medium">Oral Hygiene Score *</label>
                <select
                  value={oralHygieneScore}
                  onChange={(e) => setOralHygieneScore(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800"
                >
                  <option value="">Select Score</option>
                  <option value="Poor">Poor (Needs Immediate Attention)</option>
                  <option value="Fair">Fair (Requires Improvement)</option>
                  <option value="Good">Good (Satisfactory)</option>
                  <option value="Excellent">Excellent (Very Good)</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse md:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => onNavigate('patients')}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={success}
                className={`flex-1 py-4 rounded-xl font-medium transition-all shadow-md ${success
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] text-white hover:opacity-90 hover:shadow-lg'
                  }`}
              >
                {success ? 'Patient Added ✓' : 'Save Patient'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
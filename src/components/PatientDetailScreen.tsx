import { useState } from 'react';
import { ArrowLeft, Trash2, Edit, Activity, Users, FileText, Settings, User, CheckCircle, XCircle } from 'lucide-react';

import { Patient } from '../types';
import { apiService } from '../api/apiService';

interface PatientDetailScreenProps {
  onNavigate: (screen: string) => void;
  patients: Patient[];
  selectedPatientId: string | number | null;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export function PatientDetailScreen({ onNavigate, patients, selectedPatientId, setPatients }: PatientDetailScreenProps) {
  const patient = patients.find(p => p.id === selectedPatientId);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(patient?.name || '');
  const [phone, setPhone] = useState(patient?.phone || '');
  const [age, setAge] = useState(patient?.age.toString() || '');
  const [gender, setGender] = useState(patient?.gender || 'Female');
  const [medicalHistory, setMedicalHistory] = useState(patient?.medicalHistory || '');
  const [oralHygieneScore, setOralHygieneScore] = useState(patient?.oralHygieneScore || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!patient) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] px-6 pt-6 pb-6 rounded-b-[32px]">
          <button
            onClick={() => onNavigate('patients')}
            className="hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Patient not found</p>
        </div>
      </div>
    );
  }

  // Generate patient ID
  const patientId = `PAT${String(patient.id).padStart(5, '0')}`;

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${patient.name}?`)) {
      try {
        const response = await apiService.deletePatient(patient.id);
        if (response.status) {
          setPatients(prevPatients => prevPatients.filter(p => p.id !== patient.id));
          onNavigate('patients');
        } else {
          alert('Failed to delete patient');
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred');
      }
    }
  };

  const handleSave = async () => {
    setError('');

    if (!name.trim()) {
      setError('Please enter patient name');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!phone.trim()) {
      setError('Please enter phone number');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!age.trim() || isNaN(Number(age)) || Number(age) <= 0) {
      setError('Please enter a valid age');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!oralHygieneScore) {
      setError('Please select oral hygiene score');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const updateData = {
        full_name: name,
        age: Number(age),
        gender,
        phone_number: phone,
        medical_history: medicalHistory,
        oral_hygiene_score: oralHygieneScore
      };

      const response = await apiService.editPatient(patient.id, updateData);

      if (response.status) {
        // Update the patient in local state
        setPatients(prevPatients =>
          prevPatients.map(p =>
            p.id === patient.id
              ? { ...p, name, phone, age: Number(age), gender, medicalHistory, oralHygieneScore }
              : p
          )
        );

        setSuccess(true);
        setIsEditing(false);

        // Clear success message after delay
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        setError(response.message || 'Failed to update patient');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(patient.name);
    setPhone(patient.phone);
    setAge(patient.age.toString());
    setGender(patient.gender);
    setMedicalHistory(patient.medicalHistory || '');
    setOralHygieneScore(patient.oralHygieneScore || '');
    setError('');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] px-6 pt-6 pb-12 rounded-b-[32px] md:rounded-b-[48px] shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('patients')}
                className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm border border-white/20"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl text-white font-bold tracking-tight">Patient Details</h1>
                <p className="text-blue-50/80 text-sm mt-0.5">{patient.name} - {patientId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                className="p-2.5 bg-white/10 hover:bg-red-500/20 rounded-xl transition-all border border-white/10 group"
                title="Delete Patient"
              >
                <Trash2 className="w-5 h-5 text-white group-hover:text-red-200" />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2.5 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-bold shadow-md flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden md:inline">Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto -mt-6">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-0 md:py-0 pb-12">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm text-green-800 font-medium">Patient updated successfully!</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Patient Information Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200">
            {isEditing ? (
              <div>
                <h2 className="text-xl text-gray-800 font-semibold mb-6">Edit Patient Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Patient ID - Read Only */}
                  <div className="md:col-span-2">
                    <label className="text-base text-gray-700 mb-2 block">Patient ID *</label>
                    <div className="w-full px-4 py-3.5 bg-gray-100 rounded-xl text-gray-800 font-medium">
                      {patientId}
                    </div>
                  </div>

                  {/* Full Name - Editable */}
                  <div className="md:col-span-2">
                    <label className="text-base text-gray-700 mb-2 block">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter patient name"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Age - Editable */}
                  <div>
                    <label className="text-base text-gray-700 mb-2 block">Age *</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter age"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Gender - Editable */}
                  <div>
                    <label className="text-base text-gray-700 mb-2 block">Gender *</label>
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

                  {/* Phone Number - Editable */}
                  <div className="md:col-span-2">
                    <label className="text-base text-gray-700 mb-2 block">Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Medical History - Editable */}
                  <div className="md:col-span-2">
                    <label className="text-base text-gray-700 mb-2 block">Medical History</label>
                    <textarea
                      value={medicalHistory}
                      onChange={(e) => setMedicalHistory(e.target.value)}
                      placeholder="Enter medical history (optional)"
                      rows={4}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800 placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  {/* Oral Hygiene Score - Editable */}
                  <div className="md:col-span-2">
                    <label className="text-base text-gray-700 mb-2 block">Oral Hygiene Score *</label>
                    <select
                      value={oralHygieneScore}
                      onChange={(e) => setOralHygieneScore(e.target.value)}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800"
                    >
                      <option value="">Select Score</option>
                      <option value="Poor">Poor</option>
                      <option value="Fair">Fair</option>
                      <option value="Good">Good</option>
                      <option value="Excellent">Excellent</option>
                    </select>
                  </div>
                </div>

                {/* Edit Mode Buttons */}
                <div className="flex flex-col md:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] text-white py-3.5 rounded-xl hover:opacity-90 transition-opacity font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl text-gray-800 font-semibold mb-6">Patient Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Patient ID */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Patient ID</p>
                    <p className="text-lg text-gray-800 font-medium">{patientId}</p>
                  </div>

                  {/* Name */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p className="text-lg text-gray-800 font-medium">{patient.name}</p>
                  </div>

                  {/* Age */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Age</p>
                    <p className="text-lg text-gray-800 font-medium">{patient.age} years</p>
                  </div>

                  {/* Gender */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Gender</p>
                    <p className="text-lg text-gray-800 font-medium">{gender}</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-lg text-gray-800 font-medium">{patient.phone}</p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${patient.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                      }`}>
                      {patient.status}
                    </span>
                  </div>

                  {/* Medical History */}
                  <div className="md:col-span-2 lg:col-span-3">
                    <p className="text-sm text-gray-500 mb-1">Medical History</p>
                    <p className="text-lg text-gray-800 font-medium">{medicalHistory}</p>
                  </div>

                  {/* Oral Hygiene Score */}
                  <div className="md:col-span-2 lg:col-span-3">
                    <p className="text-sm text-gray-500 mb-1">Oral Hygiene Score</p>
                    <p className="text-lg text-gray-800 font-medium">{oralHygieneScore}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => onNavigate('upload')}
                    className="bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] text-white py-4 rounded-xl hover:opacity-90 transition-opacity font-medium"
                  >
                    SCAN TEETH
                  </button>
                  <button
                    onClick={() => onNavigate('history')}
                    className="bg-white border-2 border-[#007AFF] text-[#007AFF] py-4 rounded-xl hover:bg-blue-50 transition-colors font-medium"
                  >
                    VIEW HISTORY
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import {
  ArrowLeft,
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  CheckCircle,
  Activity,
  FileText,
  Settings,
  User
} from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { Patient } from '../types';

interface PatientsScreenProps {
  onNavigate: (screen: string) => void;
  patients: Patient[];
  setSelectedPatientId: (id: string | number) => void;
}

export function PatientsScreen({ onNavigate, patients, setSelectedPatientId }: PatientsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  );

  const handlePatientClick = (patientId: string | number) => {
    setSelectedPatientId(patientId);
    onNavigate('patient-detail');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] px-6 pt-6 pb-12 rounded-b-[32px] md:rounded-b-[48px] shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm border border-white/20"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl text-white font-bold tracking-tight">My Patients</h1>
                <p className="text-blue-50/80 text-sm mt-0.5">Manage and view patient records</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('add-patient')}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span>Add Patient</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto -mt-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-0 md:py-0 pb-12 space-y-6">
          {/* Search Bar */}
          <div>
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder:text-gray-400 shadow-sm"
              />
            </div>
          </div>

          {/* Patient Stats */}
          <div>
            <h2 className="text-lg text-gray-700 font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <Users className="w-10 h-10 text-[#2196F3] mb-3" />
                  <p className="text-3xl text-gray-800 font-bold mb-1">{patients.length}</p>
                  <p className="text-sm text-gray-600">Total Patients</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <Activity className="w-10 h-10 text-[#4CAF50] mb-3" />
                  <p className="text-3xl text-gray-800 font-bold mb-1">{patients.filter(p => p.status === 'Active').length}</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="w-10 h-10 text-[#FFA726] mb-3" />
                  <p className="text-3xl text-gray-800 font-bold mb-1">{patients.filter(p => p.status === 'Scheduled').length}</p>
                  <p className="text-sm text-gray-600">Scheduled</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <CheckCircle className="w-10 h-10 text-[#9C27B0] mb-3" />
                  <p className="text-3xl text-gray-800 font-bold mb-1">92%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patients List */}
          <div>
            <h2 className="text-lg text-gray-700 font-semibold mb-4">All Patients ({filteredPatients.length})</h2>

            {filteredPatients.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-2">No patients found</p>
                <p className="text-sm text-gray-400">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => handlePatientClick(patient.id)}
                    className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all hover:border-blue-300 text-left group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${patient.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                        }`}>
                        {patient.status}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-gray-800 mb-1.5">{patient.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                      <span className="text-gray-400">📞</span> {patient.phone}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{patient.nextVisit}</span>
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{patient.age} years</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
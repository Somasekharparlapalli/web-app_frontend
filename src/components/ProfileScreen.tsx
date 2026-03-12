import { ArrowLeft, Edit3, Camera } from 'lucide-react';
import { useState } from 'react';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
  userProfile: {
    name: string;
    email: string;
    phone: string;
    specialty: string;
    license?: string;
    clinicName?: string;
    bio?: string;
    profile_image?: string;
  };
  userRole?: 'doctor' | 'patient' | 'admin' | 'student' | null;
}

export function ProfileScreen({ onNavigate, userProfile }: ProfileScreenProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header with Profile */}
      <div className="bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] px-6 pt-6 pb-12 rounded-b-[32px] flex-shrink-0">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="mb-6 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        {/* Profile Picture and Info */}
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="relative mb-4">
            <div className="w-[140px] h-[140px] bg-white/20 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 border-[6px] border-white/40">
              {userProfile.profile_image && !imgError ? (
                <img 
                  src={`${userProfile.profile_image}${userProfile.profile_image.includes('?') ? '&' : '?'}t=${Date.now()}`} 
                  alt={userProfile.name} 
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)} 
                />
              ) : (
                <span className="text-5xl font-bold text-white uppercase">{userProfile.name?.charAt(0) || 'D'}</span>
              )}
            </div>
            {/* Edit Icon */}
            <button
              onClick={() => onNavigate('edit-profile')}
              className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors border-2 border-[#3A8DFF]"
            >
              <Edit3 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Name and Role */}
          <h1 className="text-white text-2xl font-semibold mb-1">{userProfile.name}</h1>
          <p className="text-white/90 text-base">{userProfile.specialty}</p>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Profile Information Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="text-base text-gray-600 mb-4">Profile Information</h3>

          <div className="space-y-2 text-sm text-gray-500 mb-6">
            <p>{userProfile.email}</p>
            <p>{userProfile.phone || 'Phone Not Available'}</p>
            <p>Specialty: {userProfile.specialty}</p>
            <p>License: {userProfile.license || 'Not Available'}</p>
            <p>Clinic: {userProfile.clinicName || 'Varnish Dental Clinic'}</p>
            <p className="pt-2">Bio: {userProfile.bio || 'No bio provided.'}</p>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => onNavigate('edit-profile')}
            className="w-full bg-[#3A8DFF] hover:bg-[#2d7ae6] text-white py-3.5 rounded-xl transition-colors font-medium"
          >
            Edit Profile
          </button>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={() => onNavigate('doctor-login')}
          className="w-full bg-[#FF4C4C] hover:bg-[#e63939] text-white py-3.5 rounded-xl transition-colors font-medium mb-6"
        >
          SIGN OUT
        </button>
      </div>
    </div>
  );
}
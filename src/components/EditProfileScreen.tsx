import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, CheckCircle, XCircle, Building2, FileText, Camera, Loader2 } from 'lucide-react';

interface EditProfileScreenProps {
  onNavigate: (screen: string) => void;
  userProfile: {
    name: string;
    email: string;
    phone: string;
    specialty: string;
    clinicName: string;
    license: string;
    bio: string;
    profile_image: string;
  };
  onSaveProfile: (profile: any) => Promise<boolean>;
}

export function EditProfileScreen({ onNavigate, userProfile, onSaveProfile }: EditProfileScreenProps) {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [specialty, setSpecialty] = useState(userProfile.specialty);
  const [clinicName, setClinicName] = useState(userProfile.clinicName);
  const [license, setLicense] = useState(userProfile.license);
  const [bio, setBio] = useState(userProfile.bio);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(userProfile.profile_image);
  const [imgError, setImgError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setImgError(false);
    }
  };

  const handleSave = async () => {
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    setIsLoading(true);

    const success = await onSaveProfile({
      name,
      email,
      phone,
      specialty,
      clinicName,
      license,
      bio,
      profile_image: profileImage
    });

    setIsLoading(false);

    if (success) {
      setSuccess(true);
      setTimeout(() => {
        onNavigate('profile');
      }, 1500);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] px-6 py-6 pb-20 flex-shrink-0 rounded-b-[40px]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('profile')}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-2xl text-white font-bold tracking-tight">Edit Profile</h2>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 -mt-12 px-6 overflow-y-auto pb-24">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-8 relative">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-blue-100 flex items-center justify-center">
              {previewUrl && !imgError ? (
                <img 
                  src={previewUrl.startsWith('http') ? `${previewUrl}${previewUrl.includes('?') ? '&' : '?'}t=${Date.now()}` : previewUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)} 
                />
              ) : (
                <span className="text-5xl font-bold text-blue-500 uppercase">{name?.charAt(0) || userProfile.name?.charAt(0) || 'D'}</span>
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg cursor-pointer transition-all transform hover:scale-105">
              <Camera className="w-5 h-5" />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
          <p className="mt-4 text-sm font-semibold text-gray-500">Change Profile Picture</p>
        </div>

        {/* Status Messages */}
        <div className="max-w-2xl mx-auto mb-6">
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-800 font-bold">Success!</p>
                <p className="text-xs text-green-600">Your profile has been updated perfectly.</p>
              </div>
            </div>
          )}

          {error && !success && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-red-800 font-bold">Update Failed</p>
                <p className="text-xs text-red-600">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Form Sections */}
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-gray-800 pb-2 border-b border-gray-100">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all font-medium text-gray-800"
                    placeholder="Dr. Name"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all font-medium text-gray-800"
                    placeholder="doctor@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Phone</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all font-medium text-gray-800"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-gray-800 pb-2 border-b border-gray-100">Professional Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Specialty</label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all font-medium text-gray-800"
                  placeholder="e.g. Endodontist"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">License No.</label>
                <input
                  type="text"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all font-medium text-gray-800"
                  placeholder="MED-123456"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Clinic Name</label>
                <div className="relative group">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all font-medium text-gray-800"
                    placeholder="Clinic name"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all font-medium text-gray-800 resize-none"
                  placeholder="Write a brief bio..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button Container */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent">
        <div className="max-w-2xl mx-auto flex gap-4">
          <button
            onClick={() => onNavigate('profile')}
            disabled={isLoading}
            className="flex-1 px-8 py-5 bg-white border-2 border-gray-100 text-gray-600 rounded-[24px] font-bold shadow-sm hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || success}
            className={`flex-[2] px-8 py-5 rounded-[24px] font-bold shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all ${success
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-[#3A8DFF] to-[#1C5DFF] text-white'
              } disabled:opacity-75`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Successfully Saved</span>
              </>
            ) : (
              'Save Profile'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { ArrowLeft, Shield, Eye, Database, MapPin, Bell, Share2, Trash2, CheckCircle } from 'lucide-react';

interface PrivacySettingsScreenProps {
  onNavigate: (screen: string) => void;
}

export function PrivacySettingsScreen({ onNavigate }: PrivacySettingsScreenProps) {
  const [dataSharingEnabled, setDataSharingEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState(true);
  const [locationServices, setLocationServices] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [thirdPartySharing, setThirdPartySharing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSaveSettings = () => {
    setSuccess(true);
    
    // Navigate back after showing success message
    setTimeout(() => {
      onNavigate('settings');
    }, 600);
  };

  const handleDeleteData = () => {
    if (confirm('⚠️ Delete All Data?\n\nThis will permanently delete all your scan history, reports, and personal data. This action cannot be undone.\n\nAre you sure you want to continue?')) {
      alert('✅ Data Deletion Initiated\n\nYour data deletion request has been submitted. All data will be removed within 24-48 hours.');
    }
  };

  const handleExportData = () => {
    alert('✅ Export Data\n\nYour data export is being prepared. You will receive an email with a download link within 24 hours.\n\nExport includes:\n• All scan reports\n• Medical history\n• Treatment records\n• Personal information');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('settings')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h2 className="text-xl text-gray-800">Privacy Settings</h2>
            <p className="text-xs text-gray-500">Manage your data & privacy</p>
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
                <p className="text-sm text-green-800 font-medium">Privacy Settings Saved!</p>
                <p className="text-xs text-green-600">Your preferences have been updated. Redirecting...</p>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800 mb-1">Your Privacy Matters</p>
              <p className="text-xs text-gray-600">
                Control how your data is collected, used, and shared. We're committed to protecting your privacy.
              </p>
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <h3 className="text-sm text-gray-700 mb-3">Data Collection</h3>
        <div className="space-y-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Diagnostic Data Sharing</p>
                  <p className="text-xs text-gray-500">Help improve AI accuracy</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={dataSharingEnabled}
                  onChange={(e) => setDataSharingEnabled(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Usage Analytics</p>
                  <p className="text-xs text-gray-500">Anonymous app usage data</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Location Services</p>
                  <p className="text-xs text-gray-500">Find nearby dental clinics</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={locationServices}
                  onChange={(e) => setLocationServices(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Personalization */}
        <h3 className="text-sm text-gray-700 mb-3">Personalization</h3>
        <div className="space-y-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Personalized Recommendations</p>
                  <p className="text-xs text-gray-500">AI-based treatment suggestions</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={personalizedRecommendations}
                  onChange={(e) => setPersonalizedRecommendations(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
              </label>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Marketing Communications</p>
                  <p className="text-xs text-gray-500">Newsletters and updates</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={marketingEmails}
                  onChange={(e) => setMarketingEmails(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Third-party Sharing</p>
                  <p className="text-xs text-gray-500">Share with partners</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={thirdPartySharing}
                  onChange={(e) => setThirdPartySharing(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <h3 className="text-sm text-gray-700 mb-3">Data Management</h3>
        <div className="space-y-3">
          <button
            onClick={handleExportData}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-800">Export My Data</p>
                <p className="text-xs text-gray-500">Download a copy of your data</p>
              </div>
            </div>
          </button>

          <button
            onClick={handleDeleteData}
            className="w-full bg-red-50 border border-red-200 rounded-xl p-4 hover:bg-red-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-red-700">Delete All My Data</p>
                <p className="text-xs text-red-600">Permanently remove your data</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Footer Button */}
      <div className="px-6 py-4 border-t border-gray-200">
        <button
          onClick={handleSaveSettings}
          disabled={success}
          className={`w-full py-3.5 rounded-xl transition-colors ${
            success
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {success ? 'Settings Saved' : 'Save Privacy Settings'}
        </button>
      </div>
    </div>
  );
}
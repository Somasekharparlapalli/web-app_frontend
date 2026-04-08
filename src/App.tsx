import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { LoginScreen } from './components/LoginScreen';
import { DoctorLoginScreen } from './components/DoctorLoginScreen';
import { DoctorSignUpScreen } from './components/DoctorSignUpScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { HomeScreen } from './components/HomeScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { EditProfileScreen } from './components/EditProfileScreen';
import { UploadImageScreen } from './components/UploadImageScreen';
import { DetectionResultScreen } from './components/DetectionResultScreen';
import { VarnishInfoScreen } from './components/VarnishInfoScreen';
import { RecommendationScreen } from './components/RecommendationScreen';
import { ScanHistoryScreen } from './components/ScanHistoryScreen';
import { DoctorAIAnalysesScreen } from './components/DoctorAIAnalysesScreen';
import { AboutScreen } from './components/AboutScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { MedicalHistoryScreen } from './components/MedicalHistoryScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ReportDetailsScreen } from './components/ReportDetailsScreen';
import { FullReportScreen } from './components/FullReportScreen';
import { PreventionTipsScreen } from './components/PreventionTipsScreen';
import { FAQScreen } from './components/FAQScreen';
import { PeptideTypesScreen } from './components/PeptideTypesScreen';
import { LanguageScreen } from './components/LanguageScreen';
import { ChangePasswordScreen } from './components/ChangePasswordScreen';
import { PrivacySettingsScreen } from './components/PrivacySettingsScreen';
import { ContactSupportScreen } from './components/ContactSupportScreen';
import { FeedbackScreen } from './components/FeedbackScreen';
import { SavedRecommendationsScreen } from './components/SavedRecommendationsScreen';
import { PatientsScreen } from './components/PatientsScreen';
import { ScheduleAppointmentScreen } from './components/ScheduleAppointmentScreen';
import { AddPatientScreen } from './components/AddPatientScreen';
import { PatientDetailScreen } from './components/PatientDetailScreen';
import { TermsOfServiceScreen } from './components/TermsOfServiceScreen';
import { AppInfoScreen } from './components/AppInfoScreen';
import { SystemDisclaimerScreen } from './components/SystemDisclaimerScreen';
import { CaseStudiesScreen } from './components/CaseStudiesScreen';
import { ResourcesScreen } from './components/ResourcesScreen';
import { NavigationHistoryScreen } from './components/NavigationHistoryScreen';
import { WebLayout } from './components/WebLayout';
import { Patient, ScanData, MedicalData, UserRole, PortalType } from './types';
import { apiService } from './api/apiService';
import { UPLOADS_URL } from './api/config';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [currentScanData, setCurrentScanData] = useState<ScanData | null>(null);
  const [currentReportData, setCurrentReportData] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [previousScreen, setPreviousScreen] = useState<string>('');
  const [forgotPasswordPortal, setForgotPasswordPortal] = useState<PortalType>('doctor');
  const [userProfile, setUserProfile] = useState({
    id: '',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '',
    specialty: 'Dental Care Specialist',
    clinicName: 'Varnish Dental Clinic',
    license: '',
    bio: '',
    profile_image: ''
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('auth');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | number | null>(null);

  const fetchPatients = async (doctorId: string) => {
    try {
      const response = await apiService.getPatients(doctorId);
      if (response.status) {
        const mappedPatients = response.data.map((p: any) => ({
          id: p.id,
          name: p.full_name,
          phone: p.phone_number,
          age: p.age,
          status: p.status || 'Active',
          nextVisit: p.dateAdded || 'Not scheduled',
          gender: p.gender,
          medicalHistory: p.medical_history || 'None',
          oralHygieneScore: p.oral_hygiene_score || 'Good'
        }));
        setPatients(mappedPatients);
        fetchAllScans(mappedPatients, doctorId);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleLoginSuccess = (doctorData: any) => {
    if (!doctorData) return;

    const updatedProfile = {
      id: (doctorData.id || '').toString(),
      name: doctorData.full_name || doctorData.fullName || 'Doctor Name',
      email: doctorData.email || '',
      phone: doctorData.phone_number || doctorData.phone || '',
      specialty: doctorData.specialty || 'Dentist',
      clinicName: doctorData.clinic_name || doctorData.clinicName || 'Varnish Dental Clinic',
      license: doctorData.license_number || doctorData.medical_license_number || '',
      bio: doctorData.bio || '',
      profile_image: doctorData.profile_image
        ? (doctorData.profile_image.startsWith('http')
          ? doctorData.profile_image
          : `${UPLOADS_URL}${doctorData.profile_image.replace(/^(\/)?uploads\//, '')}`)
        : ''
    };

    setUserProfile(updatedProfile);
    try {
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    } catch (e) {
      console.error('Failed to save profile to storage', e);
    }

    setUserRole('doctor');
    setCurrentScreen('home');

    // Fetch patients and scans for this doctor
    if (updatedProfile.id) {
      fetchPatients(updatedProfile.id);
      fetchAllScans(undefined, updatedProfile.id);
    }
  };

  const handleSaveProfile = async (profileData: any) => {
    try {
      const response = await apiService.updateDoctorProfile({
        ...profileData,
        id: userProfile.id
      });
      if (response.status) {
        handleLoginSuccess(response.data);
        return true;
      } else {
        alert(response.message || 'Failed to update profile');
        return false;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating profile');
      return false;
    }
  };

  useEffect(() => {
    if (currentScreen === 'home' && userProfile.id) {
      fetchPatients(userProfile.id);
      fetchAllScans();
    }
  }, [currentScreen]);

  const [doctorAnalysisHistory, setDoctorAnalysisHistory] = useState<any[]>([]);

  useEffect(() => {
    if (userProfile.id) {
      try {
        const specificSaved = localStorage.getItem(`doctorAnalysisHistory_${userProfile.id}`);
        const parsedSpecific = specificSaved ? JSON.parse(specificSaved) : [];

        if (Array.isArray(parsedSpecific) && parsedSpecific.length > 0) {
          setDoctorAnalysisHistory(parsedSpecific);
        } else {
          // Migration step: copy over items from generic key to doctor-specific key on first load
          const genericSaved = localStorage.getItem('doctorAnalysisHistory');
          if (genericSaved) {
            const parsedGeneric = JSON.parse(genericSaved);
            if (Array.isArray(parsedGeneric) && parsedGeneric.length > 0) {
              setDoctorAnalysisHistory(parsedGeneric);
              // Save to scoped key for future loads
              localStorage.setItem(`doctorAnalysisHistory_${userProfile.id}`, JSON.stringify(parsedGeneric));
            } else {
              setDoctorAnalysisHistory([]);
            }
          } else {
            setDoctorAnalysisHistory([]);
          }
        }
      } catch (err) {
        console.error('Error during doctorAnalysisHistory migration/loading:', err);
        setDoctorAnalysisHistory([]);
      }
    } else {
      setDoctorAnalysisHistory([]);
    }
  }, [userProfile.id]);

  const [allDbScans, setAllDbScans] = useState<any[]>([]);

  async function fetchAllScans(currentPatients: any[] = patients, doctorId?: string) {
    try {
      const response = await apiService.getScans(doctorId || userProfile.id || undefined);
      if (response.status && response.data) {
        const mappedScans = response.data.map((s: any) => ({
          ...s,
          image: s.image_path?.includes('captured_scan_') ? '' : (s.image_path ? `${UPLOADS_URL}${s.image_path.replace(/^(\/)?uploads\//, '')}` : s.image),
          riskLevel: s.severity || 'Mild',
          date: s.created_at ? new Date(s.created_at).toLocaleDateString() : 'Recent'
        }));

        // Filter by patients to isolate data to the logged-in doctor
        const patientIdSet = new Set((currentPatients || []).map(p => String(p.id)));
        const filteredScans = mappedScans.filter((s: any) =>
          s.patient_id ? patientIdSet.has(String(s.patient_id)) : false
        );

        setAllDbScans(filteredScans);
      }
    } catch (error) {
      console.error('Error fetching all scans:', error);
    }
  };

  const medicalReports: MedicalData[] = [
    {
      scanId: 'local-#DCR-2026-0130',
      date: 'January 30, 2026',
      time: '10:30 AM',
      doctor: 'Dr. Smith',
      scanType: 'Comprehensive Dental Scan',
      patientName: 'John Smith',
      age: 45,
      medicalHistory: {
        previousDentalWork: 'Last filling: March 2025 (Tooth #14)',
        allergies: 'No allergies reported - Safe to proceed with all treatments',
        medications: 'None - No drug interactions to consider',
        chronicConditions: 'No chronic conditions - General health: Excellent'
      },
      vitalSigns: {
        bloodPressure: '120/80',
        bloodPressureStatus: 'Normal',
        pulseRate: 72,
        pulseStatus: 'Normal',
        respiratoryRate: 16,
        respiratoryStatus: 'Normal',
        temperature: 98.6,
        temperatureUnit: 'F',
        temperatureStatus: 'Normal'
      },
      physicalMeasurements: {
        height: '5\'8"',
        heightCm: 173,
        weight: '165 lbs',
        weightKg: 75,
        bmi: 25.1,
        bmiCategory: 'Slightly Overweight'
      },
      generalExamination: {
        overallHealth: 'Good - Patient appears healthy and alert',
        oralHygiene: 'Excellent - Regular brushing and flossing evident',
        gumHealth: 'Good - Pink, firm, no bleeding or inflammation',
        abnormalities: 'None detected - No lesions, swelling, or discoloration',
        areasOfConcern: 'Minor plaque buildup on lower molars - Recommend enhanced cleaning'
      }
    },
  ];

  const [currentMedicalReport, setCurrentMedicalReport] = useState<MedicalData>(medicalReports[0]);


  const handleScanComplete = (scanData: ScanData) => {
    setCurrentScanData(scanData);
    setCurrentScreen('result');
  };

  const getAIFindings = (riskLevel: string, toothType: string): string => {
    if (riskLevel === 'Severe') {
      return `Deep caries detected with potential pulp involvement in ${toothType.toLowerCase()}`;
    } else if (riskLevel === 'Moderate') {
      return `Moderate enamel erosion with early dentin exposure in ${toothType.toLowerCase()}`;
    } else {
      return `Minor surface demineralization detected in ${toothType.toLowerCase()}`;
    }
  };

  const handleSaveScanLocally = (scanData: ScanData, dbId: string | number) => {
    if (userRole === 'doctor' && scanData) {
      const newDoctorAnalysis = {
        id: dbId || `local-${doctorAnalysisHistory.length + 1}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        timestamp: new Date(),
        severity: scanData.riskLevel,
        riskLevel: scanData.riskLevel,
        status: 'Completed',
        color: scanData.riskLevel === 'Severe' ? 'red' : scanData.riskLevel === 'Moderate' ? 'amber' : 'green',
        ageGroup: scanData.ageGroup,
        peptides: scanData.peptideRecommendations || [],
        confidence: scanData.confidence,
        affectedArea: scanData.affectedArea,
        toothType: scanData.toothType,
        hasIssue: scanData.hasIssue,
        aiFindings: getAIFindings(scanData.riskLevel, scanData.toothType),
        image: scanData.image, // Base64 string preventing 404s natively!
        patient_id: scanData.patient_id,
        doctorComments: scanData.doctorComments
      };
      const updated = [newDoctorAnalysis, ...doctorAnalysisHistory];
      setDoctorAnalysisHistory(updated);
      try { localStorage.setItem(`doctorAnalysisHistory_${userProfile.id}`, JSON.stringify(updated)); } catch { }
      fetchAllScans(); // refreshing DB list instantly
    }
  };

  const handleDeleteScan = async (scanId: string | number) => {
    try {
      // If it's a remote scan (number or numeric string that's not local-)
      if (typeof scanId !== 'string' || !scanId.startsWith('local-')) {
        const response = await apiService.deleteScan(scanId);
        if (!response.status) {
          throw new Error(response.message || 'Failed to delete from database');
        }
      }

      // Update local state and storage
      const updated = doctorAnalysisHistory.filter(s => String(s.id) !== String(scanId));
      setDoctorAnalysisHistory(updated);
      setAllDbScans(prev => prev.filter(s => String(s.id) !== String(scanId)));
      localStorage.setItem(`doctorAnalysisHistory_${userProfile.id}`, JSON.stringify(updated));
      return { status: true };
    } catch (error: any) {
      console.error('Error in handleDeleteScan:', error);
      return { status: false, message: error.message };
    }
  };

  const handleViewRecommendation = (scanData: ScanData) => {
    setCurrentScanData(scanData);
    setCurrentScreen('recommendation');
  };

  const handleViewReport = (reportIndex: number) => {
    setCurrentMedicalReport(medicalReports[reportIndex]);
    setCurrentScreen('report-details');
  };

  const handleViewScanReport = (scanData: any) => {
    setCurrentReportData(scanData);
    setCurrentScreen('report-details');
  };

  const handleSelectRole = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleNavigate = (newScreen: string) => {
    // Clear sensitive doctor data when navigating to authentication/login screens (Sign Out effect)
    if (['auth', 'login', 'doctor-login', 'signup', 'doctor-signup'].includes(newScreen)) {
      setUserProfile({
        id: '',
        name: 'Dr. Sarah Johnson', // Fallback defaults
        email: 'sarah.johnson@email.com',
        phone: '',
        specialty: 'Dental Care Specialist',
        clinicName: 'Varnish Dental Clinic',
        license: '',
        bio: '',
        profile_image: ''
      });
      setPatients([]);
      setDoctorAnalysisHistory([]);
      setAllDbScans([]);
      setUserRole(null);
    }
    setPreviousScreen(currentScreen);
    setCurrentScreen(newScreen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'auth':
        return <AuthScreen onNavigate={handleNavigate} />;
      case 'login':
        return <LoginScreen onNavigate={handleNavigate} setUserRole={setUserRole} setForgotPasswordPortal={setForgotPasswordPortal} onLoginSuccess={handleLoginSuccess} />;
      case 'doctor-login':
        return <DoctorLoginScreen onNavigate={handleNavigate} setUserRole={setUserRole} setForgotPasswordPortal={setForgotPasswordPortal} onLoginSuccess={handleLoginSuccess} />;
      case 'doctor-signup':
        return <DoctorSignUpScreen onNavigate={handleNavigate} setUserRole={setUserRole} onSignUpSuccess={handleLoginSuccess} />;
      case 'signup':
        return <DoctorSignUpScreen onNavigate={handleNavigate} setUserRole={setUserRole} onSignUpSuccess={handleLoginSuccess} />;
      case 'forgot-password':
        return <ForgotPasswordScreen onNavigate={handleNavigate} forgotPasswordPortal={forgotPasswordPortal} />;
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} userProfile={userProfile} onViewReport={handleViewReport} doctorAnalysisHistory={doctorAnalysisHistory} onDeleteScan={handleDeleteScan} patients={patients} allDbScans={allDbScans} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} userProfile={userProfile} userRole={userRole} />;
      case 'edit-profile':
        return <EditProfileScreen onNavigate={handleNavigate} userProfile={userProfile} onSaveProfile={handleSaveProfile} />;
      case 'upload':
        return <UploadImageScreen onNavigate={handleNavigate} onScanComplete={handleScanComplete} userRole={userRole} patientId={selectedPatientId?.toString()} patients={patients} />;
      case 'result':
        return <DetectionResultScreen onNavigate={handleNavigate} scanData={currentScanData} userRole={userRole} onSaveScanLocally={handleSaveScanLocally} />;
      case 'varnish':
        return <VarnishInfoScreen onNavigate={handleNavigate} />;
      case 'varnish-info':
        return <VarnishInfoScreen onNavigate={handleNavigate} />;
      case 'recommendation':
        return <RecommendationScreen onNavigate={handleNavigate} scanData={currentScanData} />;
      case 'history':
        return <ScanHistoryScreen onNavigate={handleNavigate} userRole={userRole} onViewScanReport={handleViewScanReport} patientId={selectedPatientId?.toString()} doctorId={userProfile.id} doctorAnalysisHistory={doctorAnalysisHistory} onDeleteScan={handleDeleteScan} patients={patients} />;
      case 'scan-history':
        return <ScanHistoryScreen onNavigate={handleNavigate} userRole={userRole} onViewScanReport={handleViewScanReport} patientId={selectedPatientId?.toString()} doctorId={userProfile.id} doctorAnalysisHistory={doctorAnalysisHistory} onDeleteScan={handleDeleteScan} patients={patients} />;
      case 'doctor-ai-analyses':
        return <DoctorAIAnalysesScreen onNavigate={handleNavigate} doctorAnalysisHistory={doctorAnalysisHistory} />;
      case 'about':
        return <AboutScreen onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsScreen onNavigate={handleNavigate} darkMode={darkMode} setDarkMode={setDarkMode} userRole={userRole} />;
      case 'medical-history':
        return <MedicalHistoryScreen onNavigate={handleNavigate} />;
      case 'notifications':
        return <NotificationsScreen onNavigate={handleNavigate} userRole={userRole} />;
      case 'report-details':
        return <FullReportScreen onNavigate={handleNavigate} scanData={currentReportData} onDeleteScan={handleDeleteScan} patients={patients} userProfile={userProfile} />;
      case 'full-report':
        return <FullReportScreen onNavigate={handleNavigate} scanData={currentReportData} onDeleteScan={handleDeleteScan} patients={patients} userProfile={userProfile} />;
      case 'prevention-tips':
        return <PreventionTipsScreen onNavigate={handleNavigate} />;
      case 'prevention':
        return <PreventionTipsScreen onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQScreen onNavigate={handleNavigate} />;
      case 'peptide-types':
        return <PeptideTypesScreen onNavigate={handleNavigate} userRole={userRole} previousScreen={previousScreen} />;
      case 'language':
        return <LanguageScreen onNavigate={handleNavigate} />;
      case 'changePassword':
        return <ChangePasswordScreen onNavigate={handleNavigate} />;
      case 'privacySettings':
        return <PrivacySettingsScreen onNavigate={handleNavigate} />;
      case 'contactSupport':
        return <ContactSupportScreen onNavigate={handleNavigate} />;
      case 'feedback':
        return <FeedbackScreen onNavigate={handleNavigate} />;
      case 'saved-recommendations':
        return <SavedRecommendationsScreen onNavigate={handleNavigate} onViewRecommendation={handleViewRecommendation} />;
      case 'saved-plans':
        return <SavedRecommendationsScreen onNavigate={handleNavigate} onViewRecommendation={handleViewRecommendation} />;
      case 'patients':
        return <PatientsScreen onNavigate={handleNavigate} patients={patients} setSelectedPatientId={setSelectedPatientId} />;
      case 'schedule-appointment':
        return <ScheduleAppointmentScreen onNavigate={handleNavigate} />;
      case 'add-patient':
        return <AddPatientScreen onNavigate={handleNavigate} setPatients={setPatients} doctorId={userProfile.id} onPatientAdded={() => fetchPatients(userProfile.id)} />;
      case 'patient-detail':
        return <PatientDetailScreen onNavigate={handleNavigate} patients={patients} selectedPatientId={selectedPatientId} setPatients={setPatients} />;
      case 'terms-of-service':
        return <TermsOfServiceScreen onNavigate={handleNavigate} />;
      case 'app-info':
        return <AppInfoScreen onNavigate={handleNavigate} />;
      case 'system-disclaimer':
        return <SystemDisclaimerScreen onNavigate={handleNavigate} />;
      case 'case-studies':
        return <CaseStudiesScreen onNavigate={handleNavigate} />;
      case 'resources':
        return <ResourcesScreen onNavigate={handleNavigate} />;
      case 'navigation-history':
        return <NavigationHistoryScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} userProfile={userProfile} onViewReport={handleViewReport} doctorAnalysisHistory={doctorAnalysisHistory} onDeleteScan={handleDeleteScan} patients={patients} allDbScans={allDbScans} />;
    }
  };

  // Check if screen should use WebLayout
  const fullScreenScreens = ['splash', 'auth', 'login', 'doctor-login', 'doctor-signup', 'signup', 'forgot-password'];
  const shouldUseWebLayout = !fullScreenScreens.includes(currentScreen) && userRole !== null;

  return (
    <div className={`h-screen w-full overflow-hidden ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {shouldUseWebLayout ? (
        <WebLayout
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          userRole={userRole}
          userProfile={userProfile}
        >
          {renderScreen()}
        </WebLayout>
      ) : (
        renderScreen()
      )}
    </div>
  );
}
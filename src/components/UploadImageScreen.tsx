import { useState, useRef } from 'react';
import { ArrowLeft, Camera, CheckCircle, AlertCircle, User, ChevronDown } from 'lucide-react';
import { AIChatButton } from './AIChatButton';
import { ScanData } from '../types';

interface Patient {
  id: string | number;
  name: string;
}

interface UploadImageScreenProps {
  onNavigate: (screen: string) => void;
  onScanComplete: (scanData: ScanData) => void;
  userRole?: 'doctor' | 'patient' | 'admin' | 'student' | null;
  patientId?: string;
  patients?: Patient[];
}

export function UploadImageScreen({ onNavigate, onScanComplete, userRole, patientId, patients = [] }: UploadImageScreenProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  // Patient selector: pre-fill with patientId prop if provided
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patientId || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!selectedFile || !selectedImage) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      // --- STRICT FRONTLINE PIXEL HEURISTIC FOR TEETH ---
      const isValidToothImage = await new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 224;
          canvas.height = 224;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(true);
          ctx.drawImage(img, 0, 0, 224, 224);
          const data = ctx.getImageData(0, 0, 224, 224).data;

          let enamel = 0;
          let gums = 0;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            // Enamel (White/Yellowish)
            if (r > 140 && g > 130 && b > 100 && Math.abs(r - g) < 40) enamel++;
            // Gums (Pink/Reddish)
            else if (r > 100 && g < r * 0.75 && b < r * 0.75) gums++;
          }

          const total = 224 * 224;
          const enamelRatio = enamel / total;
          const gumRatio = gums / total;

          // Strict Requirement: Must have at least 10% teeth pixels.
          // If less than 25% teeth, it MUST also have visible gums (>1%) to prove it's a mouth.
          if (enamelRatio > 0.10 && (enamelRatio > 0.25 || gumRatio > 0.01)) {
            resolve(true);
          } else {
            resolve(false);
          }
        };
        img.onerror = () => resolve(false);
        img.src = selectedImage;
      });

      if (!isValidToothImage) {
        setIsAnalyzing(false);
        setIsInvalid(true);
        setError("Invalid Image Detected: No distinct teeth or gums found. Please upload a clear, focused, close-up picture strictly containing teeth.");
        return;
      }
      // --------------------------------------------------

      const formData = new FormData();
      formData.append('file', selectedFile);
      // Always send patient_id if one is selected
      if (selectedPatientId) {
        formData.append('patient_id', selectedPatientId);
      }

      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      // Teeth validation guardrail - TIGHTENED
      const detectedToothType = (result['Tooth Type'] || 'Unknown').toString().toLowerCase();
      const riskLevel = (result['Risk Level'] || '').toString().toLowerCase();
      const conditionTitle = (result['condition_title'] || '').toString().toLowerCase();
      const confidenceStr = (result['Confidence'] || '0%').toString().replace('%', '');
      const confidence = parseFloat(confidenceStr);

      // Secondary backend guardrail: Block if AI specifically identifies non-teeth (None or Unknown), if condition_title flags it as invalid, or if confidence is low
      if (conditionTitle === 'invalid image' || detectedToothType === 'none' || detectedToothType === 'unknown' || confidence < 80) {
        setIsAnalyzing(false);
        setIsInvalid(true);
        setError("Invalid Image Detected: The AI could not find any visible teeth in this photo. Please upload a clear, close-up picture of teeth to get an analysis.");
        return;
      }

      setIsInvalid(false);

      const currentRiskLevel = result['Risk Level'] || 'Moderate';
      const scanData: ScanData = {
        image: selectedImage,
        imageUrl: result['image_url'] || result['image_path'] || result['file_path'] || selectedFile.name || '',
        hasIssue: currentRiskLevel !== 'None',
        severity: currentRiskLevel === 'Severe' ? 'high' : currentRiskLevel === 'Moderate' ? 'moderate' : 'low',
        confidence: parseFloat(result['Confidence']?.replace('%', '') || '0'),
        affectedArea: result['Affected Area'] || 'Unknown',
        ageGroup: result['Age Group'] || 'Unknown',
        riskLevel: currentRiskLevel,
        toothType: detectedToothType,
        peptideRecommendations: (result['Recommended Peptides'] || []).map((p: string) => `${p} Peptide`),
        patient_id: selectedPatientId || patientId,
        id: result['id']
      };

      setIsAnalyzing(false);
      onScanComplete(scanData);

    } catch (err: any) {
      console.error('Scan error:', err);
      setError("AI Analysis failed due to a technical error. Please ensure you have a stable network and try again.");
      setIsAnalyzing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setIsInvalid(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedPatient = patients.find(p => String(p.id) === selectedPatientId);

  return (
    <div className="h-full flex flex-col bg-white relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm mx-4 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <Camera className="absolute inset-0 m-auto w-10 h-10 text-blue-500 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Image...</h3>
            <p className="text-sm text-gray-500 mb-6">Our Dental AI is scanning for caries and identifying tooth structures</p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full animate-shimmer" style={{ width: '100%', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-xl text-gray-900 font-semibold">Scan Teeth</h2>
        </div>
      </div>

      <div className="flex-1 px-5 py-5 overflow-y-auto bg-gray-50 space-y-4">

        {/* Patient Selector */}
        {userRole === 'doctor' && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> Link to Patient
            </label>
            <div className="relative">
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">— Select Patient —</option>
                {patients.map((p) => (
                  <option key={String(p.id)} value={String(p.id)}>
                    {p.name} ({p.id})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {selectedPatient && (
              <p className="text-xs text-blue-600 mt-1.5 font-medium">
                ✓ Scan will be saved under <span className="font-bold">{selectedPatient.name}</span> (ID: {selectedPatientId})
              </p>
            )}
            {!selectedPatientId && (
              <p className="text-xs text-amber-600 mt-1.5">
                ⚠ No patient selected — scan will save without a patient ID
              </p>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-xl">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-red-900 mb-1 flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Invalid</span>
                  Invalid Image Detected
                </p>
                <p className="text-xs text-red-600 font-medium leading-relaxed">{error}</p>

                {error.includes("Invalid Image") && (
                  <div className="mt-4 bg-white/70 rounded-xl p-3 border border-red-100">
                    <p className="text-[10px] font-bold text-red-800 mb-2 uppercase tracking-widest">Scanning Requirements:</p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2 text-[11px] text-red-700 font-bold">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        Show ONLY teeth (no full face)
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-red-700 font-bold">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        Use bright, natural light
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-red-700 font-bold">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        Hold camera 3-5 inches away
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {selectedImage ? (
          <div className="bg-white rounded-3xl p-4 shadow-md border border-gray-100 relative overflow-hidden group">
            <div className="relative">
              <img src={selectedImage} alt="Selected" className={`w-full h-80 object-cover rounded-2xl transition-all duration-500 ${isInvalid ? 'grayscale brightness-50 contrast-125' : ''}`} />

              {isInvalid && (
                <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-300">
                  <div className="bg-red-600/90 text-white px-6 py-3 rounded-2xl border-2 border-white/50 shadow-2xl backdrop-blur-md">
                    <p className="text-2xl font-black italic tracking-tighter uppercase">Invalid Image</p>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-2xl m-4"></div>
            <p className="text-center text-xs text-gray-500 mt-3 font-semibold uppercase tracking-wider">{selectedFile?.name}</p>

            {isAnalyzing && (
              <div className="absolute inset-x-4 top-4 bottom-4 rounded-2xl pointer-events-none overflow-hidden">
                <div className="w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] absolute z-10 animate-scan"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-blue-200 rounded-3xl p-10 flex flex-col items-center justify-center min-h-[300px] shadow-sm">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Camera className="w-10 h-10 text-blue-400" />
            </div>
            <p className="text-gray-900 text-lg font-bold mb-2">No Image Selected</p>
            <p className="text-gray-500 text-sm text-center max-w-[240px] leading-relaxed">
              Please capture or upload a <span className="text-blue-600 font-bold underline">clear, close-up</span> photo of the teeth for AI analysis.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <Camera className="w-5 h-5" /> Capture or Upload
          </button>

          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
            className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${selectedFile && !isAnalyzing
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            <CheckCircle className="w-5 h-5" />
            Run AI Analysis
          </button>
        </div>
      </div>
      <AIChatButton context="upload" />
    </div>
  );
}
export interface Patient {
    id: string | number;
    name: string;
    phone: string;
    age: number;
    status: string;
    nextVisit: string;
    gender: string;
    medicalHistory: string;
    oralHygieneScore: string;
}

export interface ScanData {
    image: string;
    imageUrl?: string;
    hasIssue: boolean;
    severity: 'none' | 'low' | 'moderate' | 'high';
    confidence: number;
    affectedArea: string;
    ageGroup: string;
    riskLevel: string;
    toothType: string;
    peptideRecommendations?: string[];
    patient_id?: string | number;
    id?: string | number;
    doctorComments?: string;
}

export interface MedicalData {
    scanId: string;
    date: string;
    time: string;
    doctor: string;
    scanType: string;
    patientName: string;
    age: number;
    medicalHistory: {
        previousDentalWork: string;
        allergies: string;
        medications: string;
        chronicConditions: string;
    };
    vitalSigns: {
        bloodPressure: string;
        bloodPressureStatus: 'Normal' | 'Elevated' | 'High';
        pulseRate: number;
        pulseStatus: 'Normal' | 'Elevated' | 'Low';
        respiratoryRate: number;
        respiratoryStatus: 'Normal' | 'Elevated' | 'Low';
        temperature: number;
        temperatureUnit: 'F' | 'C';
        temperatureStatus: 'Normal' | 'Elevated' | 'Low';
    };
    physicalMeasurements: {
        height: string;
        heightCm: number;
        weight: string;
        weightKg: number;
        bmi: number;
        bmiCategory: string;
    };
    generalExamination: {
        overallHealth: string;
        oralHygiene: string;
        gumHealth: string;
        abnormalities: string;
        areasOfConcern: string;
    };
}

export type UserRole = 'doctor' | 'patient' | 'admin' | 'student' | null;
export type PortalType = 'doctor' | 'patient' | 'student';

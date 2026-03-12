import { API_BASE_URL } from './config';

async function handleResponse(response: Response) {
    const contentType = response.headers.get("content-type");
    
    if (!response.ok) {
        let errorMessage = 'Something went wrong';
        try {
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.detail || errorMessage;
            } else {
                errorMessage = await response.text();
            }
        } catch (e) {
            errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
    }

    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }
    return await response.text();
}

export const apiService = {
    // Doctor Auth
    async loginDoctor(email: string, password: string) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
    },

    async registerDoctor(userData: any) {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: userData.fullName,
                email: userData.email,
                phone: userData.phone,
                medicalLicenseNumber: userData.licenseNumber || userData.medicalLicenseNumber,
                specialty: userData.specialty,
                clinicName: userData.clinicName || "Varnish Dental Clinic",
                password: userData.password,
                confirmPassword: userData.confirmPassword,
            }),
        });
        return handleResponse(response);
    },

    // Doctor Profile
    async getDoctorProfile(email: string) {
        const formData = new FormData();
        formData.append('email', email);
        const response = await fetch(`${API_BASE_URL}/doctors/profile`, {
            method: 'POST',
            body: formData,
        });
        return handleResponse(response);
    },

    async updateDoctorProfile(profileData: any) {
        const formData = new FormData();
        formData.append('id', profileData.id);
        formData.append('full_name', profileData.name || profileData.full_name);
        formData.append('email', profileData.email);
        formData.append('phone_number', profileData.phone || profileData.phone_number);
        formData.append('specialty', profileData.specialty);
        formData.append('clinic_name', profileData.clinicName || profileData.clinic_name);
        formData.append('bio', profileData.bio || "");

        if (profileData.profile_image instanceof File) {
            formData.append('profile_image', profileData.profile_image);
        }

        const response = await fetch(`${API_BASE_URL}/update_doctor_profile`, {
            method: 'POST',
            body: formData,
        });
        return handleResponse(response);
    },

    // Patients
    async getPatients(doctorId?: string) {
        const url = doctorId ? `${API_BASE_URL}/patients?doctor_id=${doctorId}` : `${API_BASE_URL}/patients`;
        const response = await fetch(url);
        return handleResponse(response);
    },

    async addPatient(patientData: any) {
        const response = await fetch(`${API_BASE_URL}/add_patient`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData),
        });
        return handleResponse(response);
    },

    async editPatient(id: string | number, patientData: any) {
        const response = await fetch(`${API_BASE_URL}/edit_patient/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData),
        });
        return handleResponse(response);
    },

    async deletePatient(id: string | number) {
        const response = await fetch(`${API_BASE_URL}/delete_patient/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    },

    // AI Scan & History
    async scanImage(file: File, patientId?: string) {
        const formData = new FormData();
        formData.append('file', file);
        if (patientId) {
            formData.append('patient_id', patientId);
        }

        const response = await fetch(`${API_BASE_URL}/scan`, {
            method: 'POST',
            body: formData,
        });
        return handleResponse(response);
    },

    async getScanHistory(patientId: string) {
        const response = await fetch(`${API_BASE_URL}/scan_history/${patientId}`);
        return handleResponse(response);
    },

    async getAllScanHistory(patientId: string | number = 0) {
        const response = await fetch(`${API_BASE_URL}/scan_history/${patientId}`);
        return handleResponse(response);
    },

    async saveScan(scanData: {
        patient_id: string;
        image_path: string;
        condition_title: string;
        condition_desc: string;
        severity: string;
        risk_level: string;
        tooth_type: string;
        affected_area: string;
        confidence: string;
    }) {
        const formData = new FormData();
        Object.entries(scanData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await fetch(`${API_BASE_URL}/save_scan`, {
            method: 'POST',
            body: formData,
        });
        return handleResponse(response);
    },

    async deleteScan(id: string | number) {
        // Backend currently lacks a /delete_scan endpoint, so we simulate a successful
        // deletion to allow the frontend UI state to update without throwing an error.
        console.warn(`Simulating deletion for scan ${id} (no backend endpoint available).`);
        return { status: true, message: "Scan removed from view" };
    },

    // Forgot Password & OTP
    async forgotPassword(email: string) {
        const params = new URLSearchParams();
        params.append('email', email);
        const response = await fetch(`${API_BASE_URL}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });
        return handleResponse(response);
    },

    async verifyOtp(email: string, otp: string, newPassword: string) {
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('otp', otp);
        params.append('new_password', newPassword);
        const response = await fetch(`${API_BASE_URL}/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });
        return handleResponse(response);
    }
};

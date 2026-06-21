// patientServices.js centralizes all patient-related API communication
import { API_BASE_URL } from "../config/config.js";

// Base endpoint for patient-related actions
const PATIENT_API = API_BASE_URL + '/patient';

/**
 * Handles patient registration
 * Sends a POST request with patient details
 */
export async function patientSignup(data) {
    try {
        const response = await fetch(`${PATIENT_API}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        
        // Return a structured response for the UI
        return { 
            success: response.ok, 
            message: result.message || (response.ok ? "Registro exitoso" : "Error en el registro")
        };
    } catch (error) {
        console.error("Error :: patientSignup :: ", error);
        return { success: false, message: "Error de conexión al registrarse" };
    }
}

/**
 * Handles patient login
 * Returns the full response for downstream processing (tokens, status checks)
 */
export async function patientLogin(data) {
    try {
        // Log removed in production; useful for dev
        return await fetch(`${PATIENT_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Error :: patientLogin :: ", error);
        throw error;
    }
}

/**
 * Retrieves logged-in patient details using their token
 */
export async function getPatientData(token) {
    try {
        const response = await fetch(`${PATIENT_API}/${token}`);
        if (response.ok) {
            const data = await response.json();
            return data.patient;
        }
        return null;
    } catch (error) {
        console.error("Error :: getPatientData :: ", error);
        return null;
    }
}

/**
 * Fetches appointments for a specific patient/doctor view
 * Dynamic URL supports both patient and doctor dashboard requirements
 */
export async function getPatientAppointments(id, token, user) {
    try {
        const response = await fetch(`${PATIENT_API}/${id}/${user}/${token}`);
        if (response.ok) {
            const data = await response.json();
            return data.appointments;
        }
        return null;
    } catch (error) {
        console.error("Error :: getPatientAppointments :: ", error);
        return null;
    }
}

/**
 * Filters patient appointments based on status and search query
 */
export async function filterAppointments(condition, name, token) {
    try {
        const response = await fetch(`${PATIENT_API}/filter/${condition}/${name}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data; // Returns object with appointments array
        } else {
            console.error("Failed to filter appointments:", response.statusText);
            return { appointments: [] };
        }
    } catch (error) {
        console.error("Error :: filterAppointments :: ", error);
        alert("Ocurrió un error al filtrar las citas.");
        return { appointments: [] };
    }
}


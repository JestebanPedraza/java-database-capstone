import { API_BASE_URL } from '../config/config.js';

const DOCTOR_API = API_BASE_URL + '/doctor';

export async function getDoctors() {
    try {
        const response = await fetch(DOCTOR_API);
        const data = await response.json();
        return data.doctors || [];
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return [];
    }
}

export async function deleteDoctor(id, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/delete/${id}/${token}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return {
            success: response.ok,
            message: data.message || 'Doctor deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting doctor:', error);
        return { success: false, message: 'Failed to delete doctor' };
    }
}

export async function saveDoctor(doctor, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/save/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doctor)
        });
        const data = await response.json();
        return {
            success: response.ok,
            message: data.message || 'Doctor saved successfully'
        };
    } catch (error) {
        console.error('Error saving doctor:', error);
        return { success: false, message: 'Failed to save doctor' };
    }
}

export async function filterDoctors(name, time, specialty) {
    // Handle empty values as 'null' strings if expected by backend route pattern
    const searchName = name || 'null';
    const searchTime = time || 'null';
    const searchSpecialty = specialty || 'null';

    try {
        const response = await fetch(`${DOCTOR_API}/filter/${searchName}/${searchTime}/${searchSpecialty}`);
        if (response.ok) {
            const data = await response.json();
            return data.doctors || [];
        } else {
            console.error('Failed to filter doctors');
            return [];
        }
    } catch (error) {
        console.error('Error filtering doctors:', error);
        alert('Ocurrió un error al filtrar los médicos.');
        return [];
    }
}


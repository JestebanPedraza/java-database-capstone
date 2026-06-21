import { getAllAppointments } from './services/appointmentRecordService.js';
import { createPatientRow } from './components/patientRows.js';

const patientTableBody = document.getElementById('patientTableBody');
let selectedDate = new Date().toISOString().split('T')[0];
const token = localStorage.getItem('token');
let patientName = '';

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            patientName = val;
            loadAppointments();
        });
    }

    const todayButton = document.getElementById('todayButton');
    const datePicker = document.getElementById('datePicker');

    if (todayButton) {
        todayButton.addEventListener('click', () => {
            selectedDate = new Date().toISOString().split('T')[0];
            if (datePicker) datePicker.value = selectedDate;
            loadAppointments();
        });
    }

    if (datePicker) {
        datePicker.value = selectedDate;
        datePicker.addEventListener('change', (e) => {
            selectedDate = e.target.value;
            loadAppointments();
        });
    }

    if (typeof renderContent === 'function') {
        renderContent();
    }
    loadAppointments();
});

async function loadAppointments() {
    try {
        const appointments = await getAllAppointments(selectedDate, patientName, token);
        patientTableBody.innerHTML = '';

        if (!appointments || appointments.length === 0) {
            patientTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No se encontraron citas para hoy.</td></tr>';
            return;
        }

        appointments.forEach(appointment => {
            const patient = {
                id: appointment.patientId,
                name: appointment.patientName,
                phone: appointment.patientPhone,
                email: appointment.patientEmail
            };
            const row = createPatientRow(patient, appointment.id, appointment.doctorId);
            patientTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading appointments:', error);
        patientTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Error al cargar las citas. Inténtelo más tarde.</td></tr>';
    }
}


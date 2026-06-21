import { openModal } from '../components/modals.js';
import { API_BASE_URL } from '../config/config.js';

const ADMIN_API = API_BASE_URL + '/admin';
const DOCTOR_API = API_BASE_URL + '/doctor/login';

window.onload = function () {
    const adminBtn = document.getElementById('btn-admin');
    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            openModal('adminLogin');
        });
    }

    const doctorBtn = document.getElementById('btn-doctor');
    if (doctorBtn) {
        doctorBtn.addEventListener('click', () => {
            openModal('doctorLogin');
        });
    }
};

window.adminLoginHandler = async function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const admin = { username, password };

    try {
        const response = await fetch(ADMIN_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(admin)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            selectRole('admin');
        } else {
            alert('¡Credenciales inválidas!');
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        alert('Ocurrió un error inesperado.');
    }
};

window.doctorLoginHandler = async function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const doctor = { email, password };

    try {
        const response = await fetch(DOCTOR_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctor)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            selectRole('doctor');
        } else {
            alert('¡Credenciales inválidas!');
        }
    } catch (error) {
        console.error('Error during doctor login:', error);
        alert('Ocurrió un error inesperado.');
    }
};


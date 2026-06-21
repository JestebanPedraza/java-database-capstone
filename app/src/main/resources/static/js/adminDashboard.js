import { openModal } from './components/modals.js';
import { getDoctors, filterDoctors, saveDoctor } from './services/doctorServices.js';
import { createDoctorCard } from './components/doctorCard.js';

window.onload = function () {
    const addDocBtn = document.getElementById('addDocBtn');
    if (addDocBtn) {
        addDocBtn.addEventListener('click', () => {
            openModal('addDoctor');
        });
    }

    loadDoctorCards();

    const searchBar = document.getElementById('searchBar');
    const filterTime = document.getElementById('filterTime');
    const filterSpecialty = document.getElementById('filterSpecialty');

    if (searchBar) searchBar.addEventListener('input', filterDoctorsOnChange);
    if (filterTime) filterTime.addEventListener('change', filterDoctorsOnChange);
    if (filterSpecialty) filterSpecialty.addEventListener('change', filterDoctorsOnChange);
};

export async function loadDoctorCards() {
    try {
        const doctors = await getDoctors();
        renderDoctorCards(doctors);
    } catch (error) {
        console.error('Error loading doctor cards:', error);
    }
}

async function filterDoctorsOnChange() {
    const name = document.getElementById('searchBar').value || 'null';
    const time = document.getElementById('filterTime').value || 'null';
    const specialty = document.getElementById('filterSpecialty').value || 'null';

    try {
        const doctors = await filterDoctors(name, time, specialty);
        const contentDiv = document.getElementById('content');
        if (doctors.length > 0) {
            renderDoctorCards(doctors);
        } else {
            contentDiv.innerHTML = '<p>No se encontraron médicos.</p>';
        }
    } catch (error) {
        console.error('Error filtering doctors:', error);
        alert('Error al filtrar médicos.');
    }
}

function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    doctors.forEach(doctor => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
    });
}

window.adminAddDoctor = async function () {
    const name = document.getElementById('doctorName').value;
    const specialty = document.getElementById('specialization').value;
    const email = document.getElementById('doctorEmail').value;
    const password = document.getElementById('doctorPassword').value;
    const phone = document.getElementById('doctorPhone').value;

    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
    const availability = Array.from(availabilityCheckboxes).map(cb => cb.value).join(', ');

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Sesión no válida. Por favor, inicie sesión de nuevo.');
        return;
    }

    const doctor = { name, specialty, email, password, phone, availability };

    try {
        const result = await saveDoctor(doctor, token);
        if (result.success) {
            alert(result.message);
            location.reload();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error in adminAddDoctor:', error);
        alert('Error al agregar el médico.');
    }
};


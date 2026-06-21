// patientDashboard.js
import { getDoctors, filterDoctors } from './services/doctorServices.js';
import { openModal } from './components/modals.js';
import { createDoctorCard } from './components/doctorCard.js';
import { patientSignup, patientLogin } from './services/patientServices.js';

document.addEventListener("DOMContentLoaded", () => {
    loadDoctorCards();

    const signupBtn = document.getElementById("patientSignup");
    if (signupBtn) signupBtn.addEventListener("click", () => openModal("patientSignup"));

    const loginBtn = document.getElementById("patientLogin");
    if (loginBtn) loginBtn.addEventListener("click", () => openModal("patientLogin"));

    const searchBar = document.getElementById("searchBar");
    const filterTime = document.getElementById("filterTime");
    const filterSpecialty = document.getElementById("filterSpecialty");

    if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
    if (filterTime) filterTime.addEventListener("change", filterDoctorsOnChange);
    if (filterSpecialty) filterSpecialty.addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
    try {
        const doctors = await getDoctors();
        renderDoctorCards(doctors);
    } catch (error) {
        console.error("Failed to load doctors:", error);
    }
}

async function filterDoctorsOnChange() {
    const searchBarVal = document.getElementById("searchBar").value.trim();
    const filterTimeVal = document.getElementById("filterTime").value;
    const filterSpecialtyVal = document.getElementById("filterSpecialty").value;

    const name = searchBarVal || 'null';
    const time = filterTimeVal || 'null';
    const specialty = filterSpecialtyVal || 'null';

    try {
        const doctors = await filterDoctors(name, time, specialty);
        renderDoctorCards(doctors);
    } catch (error) {
        console.error("Failed to filter doctors:", error);
        alert("❌ Ocurrió un error al filtrar los médicos.");
    }
}

function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";

    if (doctors && doctors.length > 0) {
        doctors.forEach(doctor => {
            const card = createDoctorCard(doctor);
            contentDiv.appendChild(card);
        });
    } else {
        contentDiv.innerHTML = "<p>No se encontraron médicos con los filtros seleccionados.</p>";
    }
}

window.signupPatient = async function () {
    try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;

        const data = { name, email, password, phone, address };
        const { success, message } = await patientSignup(data);
        if (success) {
            alert(message);
            document.getElementById("modal").style.display = "none";
            location.reload();
        } else {
            alert(message);
        }
    } catch (error) {
        console.error("Signup failed:", error);
        alert("❌ Ocurrió un error al registrarse.");
    }
};

window.loginPatient = async function () {
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const data = { email, password };
        const response = await patientLogin(data);
        
        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.token);
            // Redirigir al dashboard de paciente logueado
            window.location.href = "/pages/loggedPatientDashboard.html";
        } else {
            alert('❌ ¡Credenciales inválidas!');
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("❌ Error al iniciar sesión.");
    }
};


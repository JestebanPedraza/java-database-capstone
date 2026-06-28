// patientDashboard.js
import { getDoctors } from './services/doctorServices.js';
import { openModal } from './components/modals.js';
import { createDoctorCard } from './components/doctorCard.js';
import { patientSignup, patientLogin } from './services/patientServices.js';

let cachedDoctors = [];

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
        cachedDoctors = doctors;
        renderDoctorCards(doctors);
    } catch (error) {
        console.error("Failed to load doctors:", error);
    }
}

function filterDoctorsOnChange() {
    const searchBarVal = normalizeText(document.getElementById("searchBar").value.trim());
    const filterTimeVal = document.getElementById("filterTime").value;
    const filterSpecialtyVal = normalizeSpecialty(document.getElementById("filterSpecialty").value);

    const doctors = cachedDoctors.filter(doctor => {
        const doctorName = normalizeText(doctor.name || "");
        const doctorSpecialty = normalizeSpecialty(doctor.specialty || "");
        const availableTimes = getDoctorAvailableTimes(doctor);

        const matchesName = !searchBarVal || doctorName.includes(searchBarVal);
        const matchesSpecialty = !filterSpecialtyVal
            || doctorSpecialty.includes(filterSpecialtyVal)
            || filterSpecialtyVal.includes(doctorSpecialty);
        const matchesTime = !filterTimeVal
            || availableTimes.length === 0
            || availableTimes.some(time => isTimeInPeriod(time, filterTimeVal));

        return matchesName && matchesSpecialty && matchesTime;
    });

    renderDoctorCards(doctors);
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
        contentDiv.innerHTML = "<p>No se encontraron medicos con los filtros seleccionados.</p>";
    }
}

function normalizeText(value) {
    return String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function normalizeSpecialty(value) {
    const normalized = normalizeText(value);
    const aliases = {
        cardiology: "cardiologist",
        dentistry: "dentist",
        pediatrics: "pediatrician",
        pedodontist: "pediatrician",
        "general physician": "general",
        "medicina general": "general"
    };

    return aliases[normalized] || normalized;
}

function getDoctorAvailableTimes(doctor) {
    if (Array.isArray(doctor.availableTimes)) {
        return doctor.availableTimes;
    }
    if (Array.isArray(doctor.availability)) {
        return doctor.availability;
    }
    if (typeof doctor.availability === "string") {
        return doctor.availability.split(",").map(time => time.trim()).filter(Boolean);
    }
    return [];
}

function isTimeInPeriod(timeValue, period) {
    if (!timeValue || !period) return false;

    const firstSlot = String(timeValue).toLowerCase().split("-")[0].trim();
    const hourMatch = firstSlot.match(/\d{1,2}/);

    if (!hourMatch) return true;

    let hour = parseInt(hourMatch[0], 10);
    if (Number.isNaN(hour)) return true;

    const hasAm = firstSlot.includes("am");
    const hasPm = firstSlot.includes("pm");

    if (hasPm && hour < 12) {
        hour += 12;
    } else if (hasAm && hour === 12) {
        hour = 0;
    }

    if (period === "AM") return hour < 12;
    if (period === "PM") return hour >= 12;
    return true;
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
        alert("Ocurrio un error al registrarse.");
    }
};

window.loginPatient = async function () {
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const data = { identifier: email, password };
        const response = await patientLogin(data);

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.token);
            window.location.href = "/pages/loggedPatientDashboard.html";
        } else {
            alert("Credenciales invalidas.");
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("Error al iniciar sesion.");
    }
};

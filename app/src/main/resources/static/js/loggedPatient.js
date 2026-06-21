// loggedPatient.js 
import { getDoctors } from './services/doctorServices.js';
import { createDoctorCard } from './components/doctorCard.js';
import { bookAppointment } from './services/appointmentRecordService.js';

let cachedDoctors = [];

document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();
});

function loadDoctorCards() {
  getDoctors()
    .then(doctors => {
      cachedDoctors = doctors;
      renderDoctorCards(doctors);
    })
    .catch(error => {
      console.error("Failed to load doctors:", error);
    });
}

export function showBookingOverlay(e, doctor, patient) {
  const button = e.target;
  const rect = button.getBoundingClientRect();
  console.log(patient.name)
  console.log(patient)
  const ripple = document.createElement("div");
  ripple.classList.add("ripple-overlay");
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  document.body.appendChild(ripple);

  setTimeout(() => ripple.classList.add("active"), 50);

  const modalApp = document.createElement("div");
  modalApp.classList.add("modalApp");

  modalApp.innerHTML = `
    <h2>Book Appointment</h2>
    <input class="input-field" type="text" value="${patient.name}" disabled />
    <input class="input-field" type="text" value="${doctor.name}" disabled />
    <input class="input-field" type="text" value="${doctor.specialty}" disabled/>
    <input class="input-field" type="email" value="${doctor.email}" disabled/>
    <input class="input-field" type="date" id="appointment-date" />
    <select class="input-field" id="appointment-time">
      <option value="">Select time</option>
      ${doctor.availableTimes.map(t => `<option value="${t}">${t}</option>`).join('')}
    </select>
    <button class="confirm-booking">Confirm Booking</button>
  `;

  document.body.appendChild(modalApp);

  setTimeout(() => modalApp.classList.add("active"), 600);

  modalApp.querySelector(".confirm-booking").addEventListener("click", async () => {
    const date = modalApp.querySelector("#appointment-date").value;
    const time = modalApp.querySelector("#appointment-time").value;
    const token = localStorage.getItem("token");
    const startTime = time.split('-')[0];
    const appointment = {
      doctor: { id: doctor.id },
      patient: { id: patient.id },
      appointmentTime: `${date}T${startTime}:00`,
      status: 0
    };


    const { success, message } = await bookAppointment(appointment, token);

    if (success) {
      alert("Appointment Booked successfully");
      ripple.remove();
      modalApp.remove();
    } else {
      alert("❌ Failed to book an appointment :: " + message);
    }
  });
}



// Filter Input
document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);



function filterDoctorsOnChange() {
  const searchBar = normalizeText(document.getElementById("searchBar").value.trim());
  const filterTime = document.getElementById("filterTime").value;
  const filterSpecialty = normalizeText(document.getElementById("filterSpecialty").value.trim());

  const doctors = cachedDoctors.filter(doctor => {
    const doctorName = normalizeText(doctor.name || "");
    const doctorSpecialty = normalizeText(doctor.specialty || "");
    const availableTimes = getDoctorAvailableTimes(doctor);

    const matchesName = !searchBar || doctorName.includes(searchBar);
    const matchesSpecialty = !filterSpecialty
      || doctorSpecialty.includes(filterSpecialty)
      || filterSpecialty.includes(doctorSpecialty);
    const matchesTime = !filterTime
      || availableTimes.length === 0
      || availableTimes.some(time => isTimeInPeriod(time, filterTime));

    return matchesName && matchesSpecialty && matchesTime;
  });

  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (doctors.length > 0) {
    renderDoctorCards(doctors);
  } else {
    contentDiv.innerHTML = "<p>No se encontraron médicos con los filtros seleccionados.</p>";
    console.log("Nothing");
  }
}

function normalizeText(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getDoctorAvailableTimes(doctor) {
  if (Array.isArray(doctor.availableTimes)) {
    return doctor.availableTimes;
  }
  if (Array.isArray(doctor.availability)) {
    return doctor.availability;
  }
  if (typeof doctor.availability === "string") {
    return doctor.availability.split(",").map(t => t.trim()).filter(Boolean);
  }
  return [];
}

function isTimeInPeriod(timeValue, period) {
  if (!timeValue || !period) return false;

  const normalized = String(timeValue).toLowerCase();
  const firstSlot = normalized.split('-')[0].trim();

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

export function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });

}

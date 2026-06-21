import { showBookingOverlay } from "../loggedPatient.js";
import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";

/**
 * Function to create and return a DOM element for a single doctor card
 * @param {Object} doctor - The doctor object containing name, specialty, etc.
 * @returns {HTMLElement} The complete doctor card element
 */
export function createDoctorCard(doctor) {
  // Create the main container for the doctor card
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  // Retrieve the current user role from localStorage
  const role = localStorage.getItem("userRole");

  // Create a div to hold doctor information
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  // Create and set the doctor’s name
  const name = document.createElement("h3");
  name.textContent = doctor.name;

  // Create and set the doctor's specialization
  const specialization = document.createElement("p");
  specialization.textContent = doctor.specialty;

  // Create and set the doctor's email
  const email = document.createElement("p");
  email.textContent = doctor.email;

  // Create and list available appointment times
  const availability = document.createElement("p");
  availability.textContent = Array.isArray(doctor.availability) ? doctor.availability.join(", ") : doctor.availability;

  // Append all info elements to the doctor info container
  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  // Create a container for card action buttons
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  // === ADMIN ROLE ACTIONS ===
  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";

    // Attach a click listener to the delete button
    removeBtn.addEventListener("click", async () => {
      // 1. Confirm deletion
      if (confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) {
        // 2. Get token from localStorage
        const token = localStorage.getItem("token");
        // 3. Call API to delete
        const result = await deleteDoctor(doctor.id, token);
        // 4. On success: remove the card from the DOM
        if (result.success) {
          alert("Doctor deleted successfully");
          card.remove();
        } else {
          alert("Error: " + result.message);
        }
      }
    });

    // Add delete button to actions container
    actionsDiv.appendChild(removeBtn);
  }

  // === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
  else if (role === "patient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";

    // Alert patient to log in before booking
    bookNow.addEventListener("click", () => {
      alert("Patient needs to login first.");
    });

    // Add button to actions container
    actionsDiv.appendChild(bookNow);
  }

  // === LOGGED-IN PATIENT ROLE ACTIONS ===
  else if (role === "loggedPatient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";

    // Handle booking logic for logged-in patient
    bookNow.addEventListener("click", async (e) => {
      // 1. Get token from localStorage
      const token = localStorage.getItem("token");
      // 2. Fetch patient data using the token
      const patientData = await getPatientData(token);
      if (patientData) {
        // 3. Show booking overlay with doctor and patient info
        showBookingOverlay(e, doctor, patientData);
      } else {
        alert("Session expired or invalid. Please login again.");
      }
    });

    // Add button to actions container
    actionsDiv.appendChild(bookNow);
  }

  // Append doctor info and action buttons to the card
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  // Return the complete doctor card element
  return card;
}



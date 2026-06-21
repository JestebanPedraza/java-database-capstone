// header.js

function renderHeader() {
  const headerDiv = document.getElementById("header");
  if (!headerDiv) return;

  // 1. Verificar página de inicio para limpiar sesión
  if (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("/index.html")) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
  }

  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // 2. Logo base y título para todos los encabezados
  let headerContent = `
    <header class="header">
      <div class="logo-section" onclick="window.location.href='/'" style="cursor:pointer">
        <img src="/assets/images/logo/Logo.png" alt="Hospital CRM Logo" class="logo-img">
        <span class="logo-title">Hospital CMS</span>
      </div>
      <nav class="nav-links">`;

  // 3. Verificación de sesión expirada
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Sesión expirada o inicio de sesión inválido. Por favor, inicie sesión nuevamente.");
    window.location.href = "/";
    return;
  }

  // 4. Inyección basada en el ROL
  if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn">Agregar Doctor</button>
      <a href="#" class="logout-link" id="logoutBtn">Cerrar sesión</a>`;
  } else if (role === "doctor") {
    headerContent += `
      <button class="adminBtn" id="homeBtn">Inicio</button>
      <a href="#" class="logout-link" id="logoutBtn">Cerrar sesión</a>`;
  } else if (role === "patient") {
    headerContent += `
      <button id="patientLogin" class="adminBtn">Iniciar sesión</button>
      <button id="patientSignup" class="adminBtn">Registrarse</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `
      <button id="homeBtn" class="adminBtn">Inicio</button>
      <button id="patientAppointments" class="adminBtn">Citas</button>
      <a href="#" class="logout-link" id="logoutPatientBtn">Cerrar sesión</a>`;
  } else {
    // Caso por defecto (página inicial)
  }

  headerContent += `
      </nav>
    </header>`;

  headerDiv.innerHTML = headerContent;

  // 5. Adjuntar Escuchadores de Eventos
  attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
  const role = localStorage.getItem("userRole");

  // Botón Agregar Doctor (Solo Admin)
  const addDocBtn = document.getElementById("addDocBtn");
  if (addDocBtn) {
    addDocBtn.addEventListener("click", () => {
      if (typeof openModal === "function") {
          openModal("addDoctor");
      } else {
          // Si openModal no es global (por ser módulo), intentamos acceder vía window o simplemente llamamos si está cargado
          window.openModal ? window.openModal("addDoctor") : console.error("openModal no definida");
      }
    });
  }

  // Login/Signup (Solo Patient)
  const loginBtn = document.getElementById("patientLogin");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.openModal ? window.openModal("patientLogin") : console.error("openModal no definida");
    });
  }

  const signupBtn = document.getElementById("patientSignup");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      window.openModal ? window.openModal("patientSignup") : console.error("openModal no definida");
    });
  }

  // Botones de Inicio
  const homeBtn = document.getElementById("homeBtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      if (role === "doctor") {
          const token = localStorage.getItem("token");
          window.location.href = `/doctorDashboard/${token}`;
      } else if (role === "loggedPatient") {
          window.location.href = "/pages/loggedPatientDashboard.html";
      }
    });
  }

  // Botón Citas (Paciente Logueado)
  const appBtn = document.getElementById("patientAppointments");
  if (appBtn) {
    appBtn.addEventListener("click", () => {
      window.location.href = "/pages/patientAppointments.html";
    });
  }

  // Logout Genérico
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }

  // Logout Paciente
  const logoutPatientBtn = document.getElementById("logoutPatientBtn");
  if (logoutPatientBtn) {
    logoutPatientBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logoutPatient();
    });
  }
}

function logout() {
  localStorage.removeItem("userRole");
  localStorage.removeItem("token");
  window.location.href = "/";
}

function logoutPatient() {
  localStorage.removeItem("token");
  localStorage.setItem("userRole", "patient");
  window.location.href = "/pages/patientDashboard.html";
}

// Ejecutar renderizado al cargar el componente
document.addEventListener("DOMContentLoaded", renderHeader);
window.renderHeader = renderHeader;
window.logout = logout;
window.logoutPatient = logoutPatient;
window.attachHeaderButtonListeners = attachHeaderButtonListeners;

   

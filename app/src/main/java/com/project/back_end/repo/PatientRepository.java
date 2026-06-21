package com.project.back_end.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.back_end.models.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    // Encuentra un paciente por su dirección de correo electrónico.
    Patient findByEmail(String email);

    // Encuentra un paciente usando ya sea el correo electrónico o el número de teléfono.
    Patient findByEmailOrPhone(String email, String phone);
}


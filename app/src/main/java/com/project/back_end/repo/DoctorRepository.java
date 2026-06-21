package com.project.back_end.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.back_end.models.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // Encuentra un doctor por su dirección de correo electrónico.
    Doctor findByEmail(String email);

    // Encuentra doctores por coincidencia parcial de nombre.
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE CONCAT('%', :name, '%')")
    List<Doctor> findByNameLike(@Param("name") String name);

    // Filtra doctores por nombre parcial y especialidad exacta (sin importar mayúsculas o minúsculas).
    @Query("SELECT d FROM Doctor d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%')) AND LOWER(d.specialty) = LOWER(:specialty)")
    List<Doctor> findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(@Param("name") String name, @Param("specialty") String specialty);

    // Encuentra doctores por especialidad, ignorando mayúsculas o minúsculas.
    List<Doctor> findBySpecialtyIgnoreCase(String specialty);
}
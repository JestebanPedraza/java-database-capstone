package com.project.back_end.models;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Document(collection = "prescripciones")
public class Prescription {

    @Id
    private String id;
    @NotBlank
    private String nombrePaciente;
    @NotNull
    private Integer cita;
    @NotEmpty
    @Valid
    private List<Medication> medicamentos;
    private List<String> etiquetas;
    @NotNull
    @Valid
    private Metadata metadata;
    @Size(min=3, max=500)
    private String notasDoctor;

    public static class Medication {
        @NotBlank
        @Size(max = 100)
        private String nombre;
        @NotBlank
        @Size(max = 50)
        private String dosis;
        @NotBlank
        @Size(max = 50)
        private String frecuencia;
        @NotBlank
        @Size(max = 50)
        private String duracion;

        // Getters and Setters
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public String getDosis() { return dosis; }
        public void setDosis(String dosis) { this.dosis = dosis; }
        public String getFrecuencia() { return frecuencia; }
        public void setFrecuencia(String frecuencia) { this.frecuencia = frecuencia; }
        public String getDuracion() { return duracion; }
        public void setDuracion(String duracion) { this.duracion = duracion; }
    }

    public static class Metadata {
        @NotNull
        private LocalDateTime creadoEn;
        @NotNull
        private LocalDateTime actualizadoEn;
        @NotBlank
        private String estado;

        // Getters and Setters
        public LocalDateTime getCreadoEn() { return creadoEn; }
        public void setCreadoEn(LocalDateTime creadoEn) { this.creadoEn = creadoEn; }
        public LocalDateTime getActualizadoEn() { return actualizadoEn; }
        public void setActualizadoEn(LocalDateTime actualizadoEn) { this.actualizadoEn = actualizadoEn; }
        public String getEstado() { return estado; }
        public void setEstado(String estado) { this.estado = estado; }
    }

    public Prescription() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombrePaciente() {
        return nombrePaciente;
    }

    public void setNombrePaciente(String nombrePaciente) {
        this.nombrePaciente = nombrePaciente;
    }

    public Integer getCita() {
        return cita;
    }

    public void setCita(Integer cita) {
        this.cita = cita;
    }

    public List<Medication> getMedicamentos() {
        return medicamentos;
    }

    public void setMedicamentos(List<Medication> medicamentos) {
        this.medicamentos = medicamentos;
    }

    public List<String> getEtiquetas() {
        return etiquetas;
    }

    public void setEtiquetas(List<String> etiquetas) {
        this.etiquetas = etiquetas;
    }

    public Metadata getMetadata() {
        return metadata;
    }

    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }

    public String getNotasDoctor() {
        return notasDoctor;
    }

    public void setNotasDoctor(String notasDoctor) {
        this.notasDoctor = notasDoctor;
    }
}


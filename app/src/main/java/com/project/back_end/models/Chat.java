package com.project.back_end.models;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Document(collection = "chat")
public class Chat {

    @Id
    private String id;
    @NotBlank
    private String pacienteId;
    @NotBlank
    private String doctorId;
    @NotNull
    @Valid
    private Metadata metadata;

    public static class Metadata {
        @NotNull
        private LocalDateTime creadoEn;
        @NotNull
        private LocalDateTime actualizadoEn;

        // Getters and Setters
        public LocalDateTime getCreadoEn() { return creadoEn; }
        public void setCreadoEn(LocalDateTime creadoEn) { this.creadoEn = creadoEn; }
        public LocalDateTime getActualizadoEn() { return actualizadoEn; }
        public void setActualizadoEn(LocalDateTime actualizadoEn) { this.actualizadoEn = actualizadoEn; }
    }

    public Chat() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(String pacienteId) {
        this.pacienteId = pacienteId;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public Metadata getMetadata() {
        return metadata;
    }

    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }
}

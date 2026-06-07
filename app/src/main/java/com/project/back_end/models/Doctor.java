package com.project.back_end.models;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "doctores")
public class Doctor {

    @Id
    @Column(name = "id_usuario")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_usuario")
    private User user;

    @Size(max = 260)
    private String resumen;

    @NotBlank
    @Size(max = 50)
    @Column(name = "num_tarjeta_profesional", unique = true, nullable = false)
    private String numTarjetaProfesional;

    @NotBlank
    @Size(min = 3, max = 50)
    @Column(nullable = false)
    private String especialidad;

    @Column(name = "funciones_descripcion", columnDefinition = "TEXT")
    private String funcionesDescripcion;

    @ElementCollection
    private List<LocalDateTime> notAvailableTimes;

    public Doctor() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getResumen() {
        return resumen;
    }

    public void setResumen(String resumen) {
        this.resumen = resumen;
    }

    public String getNumTarjetaProfesional() {
        return numTarjetaProfesional;
    }

    public void setNumTarjetaProfesional(String numTarjetaProfesional) {
        this.numTarjetaProfesional = numTarjetaProfesional;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public String getFuncionesDescripcion() {
        return funcionesDescripcion;
    }

    public List<LocalDateTime> getNotAvailableTimes() {
        return notAvailableTimes;
    }

    public void setNotAvailableTimes(List<LocalDateTime> notAvailableTimes) {
        this.notAvailableTimes = notAvailableTimes;
    }

    public void addNotAvailableTime(LocalDateTime time) {
        this.notAvailableTimes.add(time);
    }

    public void clearNotAvailableTimes() {
        notAvailableTimes.removeIf(time -> time.isBefore(LocalDateTime.now()));
    }

    public void setFuncionesDescripcion(String funcionesDescripcion) {
        this.funcionesDescripcion = funcionesDescripcion;
    }
}



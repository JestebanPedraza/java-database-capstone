package com.project.back_end.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.back_end.models.Appointment;
import com.project.back_end.services.AppointmentService;
import com.project.back_end.services.Service;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

	private final AppointmentService appointmentService;
	private final Service service;

	@Autowired
	public AppointmentController(AppointmentService appointmentService, Service service) {
		this.appointmentService = appointmentService;
		this.service = service;
	}

	@GetMapping("/{date}/{patientName}/{token}")
	public ResponseEntity<Map<String, Object>> getAppointments(
			@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
			@PathVariable String patientName,
			@PathVariable String token) {
		ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "doctor");
		if (!tokenValidation.getStatusCode().is2xxSuccessful()) {
			Map<String, Object> error = new HashMap<>();
			if (tokenValidation.getBody() != null) {
				error.putAll(tokenValidation.getBody());
			}
			return ResponseEntity.status(tokenValidation.getStatusCode()).body(error);
		}

		Map<String, Object> result = appointmentService.getAppointment(patientName, date, token);
		if (result.containsKey("error")) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}
		return ResponseEntity.ok(result);
	}

	@PostMapping("/{token}")
	public ResponseEntity<Map<String, String>> bookAppointment(
			@PathVariable String token,
			@RequestBody Appointment appointment) {
		ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "patient");
		if (!tokenValidation.getStatusCode().is2xxSuccessful()) {
			return tokenValidation;
		}

		int validationResult = service.validateAppointment(appointment);
		Map<String, String> response = new HashMap<>();

		if (validationResult == -1) {
			response.put("message", "Doctor not found");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}

		if (validationResult == 0) {
			response.put("message", "Doctor not available or already booked");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}

		int bookingResult = appointmentService.bookAppointment(appointment);
		if (bookingResult == 1) {
			response.put("message", "Appointment booked successfully");
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		}

		response.put("message", "Error booking appointment");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

	@PutMapping("/{token}")
	public ResponseEntity<Map<String, String>> updateAppointment(
			@PathVariable String token,
			@RequestBody Appointment appointment) {
		ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "patient");
		if (!tokenValidation.getStatusCode().is2xxSuccessful()) {
			return tokenValidation;
		}
		return appointmentService.updateAppointment(appointment);
	}

	@DeleteMapping("/{id}/{token}")
	public ResponseEntity<Map<String, String>> cancelAppointment(
			@PathVariable long id,
			@PathVariable String token) {
		ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "patient");
		if (!tokenValidation.getStatusCode().is2xxSuccessful()) {
			return tokenValidation;
		}
		return appointmentService.cancelAppointment(id, token);
	}
}

package com.project.back_end.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.back_end.models.Prescription;
import com.project.back_end.services.PrescriptionService;
import com.project.back_end.services.Service;

import jakarta.validation.Valid;

@RestController
@RequestMapping("${api.path}" + "prescription")
public class PrescriptionController {
	private final PrescriptionService prescriptionService;
	private final Service service;

	public PrescriptionController(PrescriptionService prescriptionService, Service service) {
		this.prescriptionService = prescriptionService;
		this.service = service;
	}

	@PostMapping("/{token}")
	public ResponseEntity<Map<String, String>> savePrescription(
			@PathVariable String token,
			@Valid @RequestBody Prescription prescription) {
		ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "doctor");
		if (!tokenValidation.getStatusCode().is2xxSuccessful()) {
			return tokenValidation;
		}
		return prescriptionService.savePrescription(prescription);
	}

	@GetMapping("/{appointmentId}/{token}")
	public ResponseEntity<Map<String, Object>> getPrescription(
			@PathVariable Long appointmentId,
			@PathVariable String token) {
		ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "doctor");
		if (!tokenValidation.getStatusCode().is2xxSuccessful()) {
			Map<String, Object> error = new HashMap<>();
			if (tokenValidation.getBody() != null) {
				error.putAll(tokenValidation.getBody());
			}
			return ResponseEntity.status(tokenValidation.getStatusCode()).body(error);
		}

		ResponseEntity<Map<String, Object>> result = prescriptionService.getPrescription(appointmentId);
		if (result.getStatusCode().is2xxSuccessful()
				&& result.getBody() != null
				&& result.getBody().get("prescription") == null) {
			Map<String, Object> notFound = new HashMap<>();
			notFound.put("message", "No existe receta para esta cita");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(notFound);
		}

		return result;
	}

}

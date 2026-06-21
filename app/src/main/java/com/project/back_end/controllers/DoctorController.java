package com.project.back_end.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

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

import com.project.back_end.DTO.Login;
import com.project.back_end.models.Doctor;
import com.project.back_end.services.DoctorService;
import com.project.back_end.services.Service;

@RestController
@RequestMapping("${api.path}" + "doctor")
public class DoctorController {

	private final DoctorService doctorService;
	private final Service service;

	public DoctorController(DoctorService doctorService, Service service) {
		this.doctorService = doctorService;
		this.service = service;
	}

	@GetMapping("/availability/{user}/{doctorId}/{date}/{token}")
	public ResponseEntity<Map<String, Object>> getDoctorAvailability(
			@PathVariable String user,
			@PathVariable Long doctorId,
			@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
			@PathVariable String token) {
		ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, user);
		if (!tokenValidation.getStatusCode().is2xxSuccessful()) {
			Map<String, Object> error = new HashMap<>();
			if (tokenValidation.getBody() != null) {
				error.putAll(tokenValidation.getBody());
			}
			return ResponseEntity.status(tokenValidation.getStatusCode()).body(error);
		}

		Map<String, Object> response = new HashMap<>();
		response.put("available_slots", doctorService.getDoctorAvailability(doctorId, date));
		return ResponseEntity.ok(response);
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getDoctor() {
		Map<String, Object> response = new HashMap<>();
		response.put("doctors", doctorService.getDoctors());
		return ResponseEntity.ok(response);
	}

	@PostMapping("/{token}")
	public ResponseEntity<Map<String, String>> saveDoctor(
			@RequestBody Doctor doctor,
			@PathVariable String token) {
		ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "admin");
		if (!tokenValidation.getStatusCode().is2xxSuccessful()) {
			return tokenValidation;
		}

		int result = doctorService.saveDoctor(doctor);
		Map<String, String> response = new HashMap<>();

		if (result == 1) {
			response.put("message", "Doctor agregado a la base de datos");
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		}
		if (result == -1) {
			response.put("message", "El doctor ya existe");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
		}

		response.put("message", "Ocurrió un error interno");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> doctorLogin(@RequestBody Login login) {
		return doctorService.validateDoctor(login);
	}

	@PutMapping("/{token}")
	public ResponseEntity<Map<String, String>> updateDoctor(
			@RequestBody Doctor doctor,
			@PathVariable String token) {
		ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "admin");
		if (!tokenValidation.getStatusCode().is2xxSuccessful()) {
			return tokenValidation;
		}

		int result = doctorService.updateDoctor(doctor);
		Map<String, String> response = new HashMap<>();

		if (result == 1) {
			response.put("message", "Doctor actualizado");
			return ResponseEntity.ok(response);
		}
		if (result == -1) {
			response.put("message", "Doctor no encontrado");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}

		response.put("message", "Ocurrió un error interno");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

	@DeleteMapping("/{id}/{token}")
	public ResponseEntity<Map<String, String>> deleteDoctor(
			@PathVariable long id,
			@PathVariable String token) {
		ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "admin");
		if (!tokenValidation.getStatusCode().is2xxSuccessful()) {
			return tokenValidation;
		}

		int result = doctorService.deleteDoctor(id);
		Map<String, String> response = new HashMap<>();

		if (result == 1) {
			response.put("message", "Doctor eliminado exitosamente");
			return ResponseEntity.ok(response);
		}
		if (result == -1) {
			response.put("message", "Doctor no encontrado con el id");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}

		response.put("message", "Ocurrió un error interno");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

	@GetMapping("/filter/{name}/{time}/{speciality}")
	public ResponseEntity<Map<String, Object>> filter(
			@PathVariable String name,
			@PathVariable String time,
			@PathVariable String speciality) {
		return ResponseEntity.ok(service.filterDoctor(name, speciality, time));
	}

}

# Diseño de la Base de Datos

Este documento describe el diseño de la base de datos para el proyecto de Gestión de Citas y Prescripciones Médicas, derivado directamente como fuente de verdad a partir de los modelos de la aplicación en Java.

---

## Diseño de Base de Datos relacional (MySQL) - Base de Datos: `cms`

A continuación se detallan las tablas que forman parte de la base de datos relacional MySQL, las cuales se mapean mediante Spring Data JPA (Hibernate).

### 1. Tabla: `admins`
Representa a los administradores de la plataforma.
* **Atributos:**
  * `id`: `BIGINT`, Primary Key, Auto Increment. Mapeado con estrategia `GenerationType.IDENTITY`.
  * `username`: `VARCHAR(255)`, Not Null. Nombre de usuario para iniciar sesión.
  * `password`: `VARCHAR(255)`, Not Null. Contraseña de acceso (marcada como Write-only / sólo escritura para evitar exposición).

### 2. Tabla: `doctors`
Representa a los doctores de la plataforma.
* **Atributos:**
  * `id`: `BIGINT`, Primary Key, Auto Increment. Mapeado con estrategia `GenerationType.IDENTITY`.
  * `name`: `VARCHAR(100)`, Not Null. Nombre del doctor (validación de longitud entre 3 y 100 caracteres).
  * `specialty`: `VARCHAR(50)`, Not Null. Especialidad médica (validación de longitud entre 3 y 50 caracteres).
  * `email`: `VARCHAR(255)`, Not Null. Correo electrónico (validación de formato de Email).
  * `password`: `VARCHAR(255)`, Not Null. Contraseña de acceso (longitud mínima de 6 caracteres, Write-only).
  * `phone`: `VARCHAR(10)`, Not Null. Teléfono del doctor (validado para contener exactamente 10 dígitos numéricos).

### 3. Tabla (Relación): `doctor_available_times`
Tabla secundaria autogenerada para almacenar la colección de horarios de disponibilidad de cada doctor (`@ElementCollection` en JPA).
* **Mapeo:** Vinculada de forma automática con la tabla `doctors`.
* **Atributos:**
  * `doctor_id`: `BIGINT`, Foreign Key → `doctors(id)`, Not Null. Identificador del doctor asignado.
  * `available_times`: `VARCHAR(255)`, Not Null. El rango de horario en formato de texto (ej. `"09:00-10:00"`).

### 4. Tabla: `patients`
Representa a los pacientes registrados en la plataforma.
* **Atributos:**
  * `id`: `BIGINT`, Primary Key, Auto Increment. Mapeado con estrategia `GenerationType.IDENTITY`.
  * `name`: `VARCHAR(100)`, Not Null. Nombre completo (longitud entre 3 y 100 caracteres).
  * `email`: `VARCHAR(255)`, Not Null. Correo electrónico de contacto (con validación de formato Email).
  * `password`: `VARCHAR(255)`, Not Null. Contraseña de acceso (longitud mínima de 6 caracteres).
  * `phone`: `VARCHAR(10)`, Not Null. Teléfono de contacto (validado para contener exactamente 10 dígitos numéricos).
  * `address`: `VARCHAR(255)`, Not Null. Dirección residencial (longitud máxima de 255 caracteres).

### 5. Tabla: `appointments`
Representa las citas programadas entre los pacientes y los doctores.
* **Atributos:**
  * `id`: `BIGINT`, Primary Key, Auto Increment. Mapeado con estrategia `GenerationType.IDENTITY`.
  * `doctor_id`: `BIGINT`, Foreign Key → `doctors(id)`, Not Null. Relación `ManyToOne` que apunta al doctor asignado.
  * `patient_id`: `BIGINT`, Foreign Key → `patients(id)`, Not Null. Relación `ManyToOne` que apunta al paciente asignado.
  * `appointment_time`: `DATETIME`, Not Null. Fecha y hora de la cita (con validación para asegurar que siempre sea una fecha futura).
  * `status`: `INT`, Not Null. Estado de la cita médica:
    * `0` = Programada (Scheduled)
    * `1` = Completada (Completed)

---

## Diseño de Base de Datos No Relacional (MongoDB) - Base de Datos: `prescriptions`

A continuación se detalla la estructura documental para MongoDB de los esquemas asociados a las prescripciones médicas, utilizando Spring Data MongoDB.

### 1. Colección: `prescriptions`
Almacena el registro detallado de las fórmulas y recetas médicas formuladas durante una cita médica.
* **Documento (Ejemplo en JSON):**
```json
{
  "_id": "64abc123456789abcdef1234",
  "patientName": "John Doe",
  "appointmentId": 15,
  "medication": "Amoxicilina",
  "dosage": "500 mg cada 8 horas",
  "doctorNotes": "Tomar con abundante agua después de cada comida por un periodo continuo de 7 días."
}
```

* **Esquema y Restricciones:**
  * `_id`: `String` (representado internamente por el `ObjectId` único de MongoDB), Primary Key de la colección.
  * `patientName`: `String`, Not Null (longitud mínima de 3 y máxima de 100 caracteres).
  * `appointmentId`: `Long` (Number), Not Null. Representa una clave lógica/referencial que se conecta con la tabla de MySQL, apuntando a `appointments(id)`.
  * `medication`: `String`, Not Null (longitud mínima de 3 y máxima de 100 caracteres).
  * `dosage`: `String`, Not Null. Instrucción de dosificación.
  * `doctorNotes`: `String`, Opcional (longitud máxima de 200 caracteres, puede ser nulo o vacío).

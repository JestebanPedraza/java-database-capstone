## Diseño de Base de Datos MySQL

### Tabla: roles
- id: INT, Primary Key, Auto Increment
- nombre_rol: VARCHAR(30), Not Null, Unique (Ej: 'Admin', 'Doctor', 'Paciente')

### Tabla: usuarios:
- id: INT, Primary Key, Auto Increment
- nombre: VARCHAR(100), Not Null
- correo: VARCHAR(100), Not Null, Unique
- telefono: VARCHAR(20), Null
- contrasena: VARCHAR(255), Not Null
- documento_identidad: VARCHAR(50), Not Null, Unique
- id_rol: INT, Foreign Key → roles(id_rol)

### Tabla: doctores
- id_usuario: INT, Primary Key, Foreign Key → usuarios(id_usuario)
- resumen: VARCHAR(260), Null
- num_tarjeta_profesional: VARCHAR(50), Not Null, Unique
- especialidad: VARCHAR(100), Not Null
- funciones_descripcion: TEXT, Null

### Tabla: pacientes
- id_usuario: INT, Primary Key, Foreign Key → usuarios(id_usuario) ON DELETE CASCADE
- fecha_nacimiento: DATE, Null
- grupo_sanguineo: VARCHAR(5), Null
- contacto_emergencia: varchar(20), Null

### Tabla: citas
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctores(id_usuario)
- patient_id: INT, Foreign Key → pacientes(id_usuario)
- appointment_time: DATETIME, Not Null
- descripcion: Text, Not Null
- status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled)

## Diseño de colección de MongoDB
### colección: prescripciones
```json
{
  "_id": "ObjectId('64abc123456')",
  "nombrePaciente": "John Smith",
  "cita": 51,
  "medicamentos": [
    {
      "nombre": "Amoxacilina",
      "dosis": "500mg",
      "frecuencia": "caca 8 horas",
      "duracion": "7 días"
    },
    {
      "nombre": "Ibuprofen",
      "dosis": "200mg",
      "frecuencia": "Every 6 hours",
      "duracion": "3 days"
    }
  ],
  "etiquetas": ["Antibiótico", "Relajante muscular"],
  "metadata": {
    "creadoEn": "2025-12-30-01T12:00:00Z",
    "actualizadoEn": "2026-02-15-01T12:00:00Z",
    "estado": "activo"
  }
  "notasDoctor": "Tome 1 tableta cada 6 horas.",
}
```
### colección chat
```json
{
  "_id": "ObjectId('64abc123456')",
  "paciente_id": "2"
  "doctor_id": "1"
  "metadata": {
    "creadoEn": "2025-12-30-01T12:00:00Z",
    "actualizadoEn": "2025-12-31-01T12:00:00Z"
  }
}
```

### colección comentarios
```json
{
  "_id": "ObjectId('64abc123456')",
  "chat": "chat_doc123_pac456"
  "mensaje": "Doctor, quisiera preguuntar sobre el procedimiento"
  "metadata": {
    "creadoEn": "2025-12-30-01T12:00:00Z",
    "leidoEn": "2025-12-31-01T12:00:00Z"
  }
}
```

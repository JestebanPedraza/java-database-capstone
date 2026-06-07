# User Story Template

**Title:**
_Como [user role], Quiero [feature/goal], para [reason]._

**Criterios de aceptación:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]

**Prioridad:** [High/Medium/Low]  
**Puntos de historia:** [Estimated Effort in Points]  
**Notas:**
- [Additional information or edge cases]
---
## **Historias de usuario para el rol Administrador**

## 1. **Inicio de sesión**
_Como administrador, quiero iniciar sesión en el portal, para poder acceder y gestionar la plataforma de forma segura._

**Criterios de aceptación:**
1. El sistema debe mostrar un formulario con los campos: Correo electrónico, Contraseña y un botón de "Ingresar".
2. Si las credenciales son correctas, el sistema debe redirigir al administrador al Dashboard principal y generar un token de sesión seguro.
3. Si las credenciales son incorrectas, el sistema debe mostrar un mensaje de error claro ("Usuario o contraseña incorrectos") sin especificar cuál de los dos falló, por motivos de seguridad.

**Prioridad:** Alta  
**Puntos de historia:** 3  
**Notas:** 
- La contraseña debe viajar y guardarse encriptada en la base de datos y no mostrarse en texto plano
- Se debe restringir el númeor de intentos a máximo 5 intentos para evitar ataques de fuerza bruta


## 2. **Cerrar sesión**
_Como administrador, quiero cerrar sesión en el portal, para proteger el acceso al sistema._

**Criterios de aceptación:**
1. Debe existir un botón visible de "Cerrar sesión" en la barra de navegación superior desde cualquier pantalla del portal.
2. Al hacer clic en "Cerrar sesión", el sistema debe invalidar el token de sesión actual de forma inmediata.
3. El sistema debe redirigir automáticamente al usuario a la pantalla de Inicio de Sesión (Login) y bloquear el uso del botón "Atrás" del navegador para volver al contenido protegido.

**Prioridad:** Alta  
**Puntos de historia:** 1  
**Notas:**
- Asegurar la invalidación del token.


## 3. **Agregar doctores**
_Como administrador, quiero agregar perfiles de doctores al portal, para poder disponer de nuevos doctores en el sistema._

**Criterios de aceptación:**
1. El sistema debe proveer un formulario con los campos necesarios para agregar un nuevo doctor
2. El sistema debe validar los campos obligatorios del formulario, validar formato correcto y tipos esperados por campo
3. El sistema debe hacer validaciones de doctores duplicados
4. El sistema debe garantizar las inserciones a la base de datos si se realiza completamente, evitando valores a medias. 

**Prioridad:** Alta  
**Puntos de historia:** 7  
**Notas:**
- Al crear al doctor se debería informar por email al doctor y garantizar su acceso inmediato ala sistema

## 4. **Eliminar doctor**
_Como administrador, quiero eliminar perfiles de doctores, para mantener los doctores disponibles que realmente estén en la clínica._

**Criterios de aceptación:**
1. Al seleccionar la opción de eliminar un doctor, el sistema debe mostrar un mensaje de confirmación ("¿Está seguro de que desea eliminar al Dr. [Nombre]?")
2. El sistema debe validar que otros componentes del sistema no se vean afectados con la eliminación del doctor
3. Por integridad de datos, la eliminación debe ser un borrado lógico (cambiar estado a "Inactivo") para no perder el historial médico de los pacientes atendidos por él

**Prioridad:** Media  
**Puntos de historia:** 3  
**Notas:**
- Un doctor "Inactivo" ya no debe aparecer disponible en la agenda para nuevas citas.

## 5. **Estadísticas de uso**
_Ejecutar un procedimiento almacenado en MySQL CLI para obtener el número de citas por mes y rastrear las estadísticas de uso._

**Criterios de aceptación:**
1. El sistema debe ejecutar de forma interna un procedimiento almacenado en la base de datos MySQL para obtener el número de citas por mes y rastrear las estadísticas de uso.
2. El sistema debe permitir el acceso a esta información emdainte una página o seccioón en el sistema
3. El sistema debe permitir filtrar las estadísticas por mes 

**Prioridad:** Media  
**Puntos de historia:** 5  
**Notas:**
- El procedimiento almacenado en MySQL CLI debe estar optimizado con índices en las fechas de las citas para evitar problemas de rendimiento cuando la base de datos crezca
---
## **Historias de usuario para el rol Paciente**

## 1. **Ver doctores**
_Como paciente, quiero ver la lista de doctores disponibles, para explorar diferentes opciones._

**Criterios de aceptación:**
1. El sistema debe permitir ver la lista de doctores a los pacientes incluso si no se ha registrado o no ha iniciado sesión
2. El sistema debe listar únicamente a los doctores que se encuentren en estado "Activo" o disponibles en la clínica
3. El usuario debe poder visualizar de un detalle básico de la información del doctor (nombre, especialidad y funciones/descripción corta) desde la lista principal

**Prioridad:** Alta  
**Puntos de historia:** 3  
**Notas:**
- Se debe exponer solo información básica de cada doctor, como nombre, especialidad y funciones.


## 2. **Registro de pacientes**
_Como paciente, quiero registrarme usando mi correo electrónico y contraseña, para poder reservar citas en el portal._

**Criterios de aceptación:**
1. El sistema debe solicitar mediante un formulario los datos obligatorios: Nombre completo, Correo electrónico, Contraseña y Confirmación de contraseña.
2. El sistema debe validar que el formato de correo electrónico sea válido y que la contraseña cumpla con políticas de seguridad.
3. Si el correo electrónico ya está registrado, el sistema debe mostrar un mensaje de alerta indicando que la cuenta ya existe y sugerir iniciar sesión.

**Prioridad:** Alta  
**Puntos de historia:** 5  
**Notas:**
- Tras un registro exitoso, se debe iniciar sesión automáticamente.


## 3. **Inicio de sesión pacientes**
_Como paciente, quiero iniciar sesión en el portal, para poder gestionar mis reservas de forma personalizada._

**Criterios de aceptación:**
1. El sistema debe mostrar un formulario con los campos: Correo electrónico, Contraseña y un botón de "Ingresar".
2. Al ingresar los datos correctos, el sistema debe generar token de autenticación y dirigir al paciente a su panel de control (Dashboard de Paciente) donde vea su información y reservas.
3. Si las credenciales son incorrectas, el sistema debe mostrar un mensaje de error claro ("Usuario o contraseña incorrectos") sin especificar cuál de los dos falló, por motivos de seguridad.

**Prioridad:** Alta  
**Puntos de historia:** 3  
**Notas:**
- La contraseña debe viajar y guardarse encriptada en la base de datos y no mostrarse en texto plano
- Se debe restringir el númeor de intentos a máximo 5 intentos para evitar ataques de fuerza bruta.


## 4. **Cerrar sesión pacientes**
_Como paciente, quiero cerrar sesión en el portal, para asegurar mi cuenta y proteger mis datos personales._

**Criterios de aceptación:**
1. El botón de "Cerrar sesión" debe estar visible en el menú de usuario desde cualquier sección del portal de pacientes.
2. Al hacer clic en "Cerrar sesión", el sistema debe invalidar el token de sesión actual de forma inmediata.
3. El sistema debe redirigir automáticamente al usuario a la pantalla de Inicio de Sesión (Login) y bloquear el uso del botón "Atrás" del navegador para volver al contenido protegido.

**Prioridad:** Alta  
**Puntos de historia:** 1  
**Notas:**
- Asegurar la invalidación del token.


## 5. **Reservar cita médica**
_Como paciente, quiero iniciar sesión y reservar una cita de una hora para consultar con un doctor de mi elección._

**Criterios de aceptación:**
1. El sistema debe contar con una sección o página para poder agendar una nueva cita
2. El flujo debe permitir al paciente seleccionar el doctor, el día y los bloques de horarios disponibles (restringidos estrictamente a duraciones de 1 hora).
3. Al confirmar la reserva, el sistema debe restar ese bloque de la disponibilidad del doctor
4. Se debe mostrar un mensaje indicando que la cita se registro correctamente

**Prioridad:** Alta  
**Puntos de historia:** 7  
**Notas:**
- El sistema no debe permitir que dos pacientes agenden exactamente el mismo bloque horario con el mismo doctor (control de concurrencia).


## 6. **Visualizar próximas citas**
_Como paciente, quiero ver mis próximas citas programadas, para poder prepararme adecuadamente para las consultas._

**Criterios de aceptación:**
1. El sistema debe mostrar una sección o pestaña llamada "Mis próximas citas"
2. La lista debe mostrar de forma clara: Fecha, Hora (inicio y fin), Nombre del doctor, Especialidad y demás campos relevantes de la cita
3. Las citas deben ordenarse cronológicamente, mostrando primero la cita más cercana en el tiempo.

**Prioridad:** Media  
**Puntos de historia:** 5  
**Notas:**
- En esta misma sección se puede evaluar a futuro añadir un botón para "Cancelar cita" o "Reprogramar" si las políticas de la clínica lo permiten.
- Evaluar si se muestran las citas en tipo calendario, viendo el detalle a través del hover en la cita o si se muestran en unta tabla de la próxima a la más lejana.

---
## **Historias de usuario para el rol Doctor**

## 1. **Inicio de sesión Doctor**
_Como doctor, quiero iniciar sesión en el portal, para poder acceder y gestionar mis citas de forma segura._

**Criterios de aceptación:**
1. El sistema debe mostrar un formulario con los campos: Correo electrónico, Contraseña y un botón de "Ingresar".
2. Al ingresar los datos correctos, el sistema debe generar token de autenticación y dirigir al paciente a su panel de control (Dashboard de Doctor).
3. Si las credenciales son incorrectas, el sistema debe mostrar un mensaje de error claro ("Usuario o contraseña incorrectos") sin especificar cuál de los dos falló, por motivos de seguridad.

**Prioridad:** Alta 
**Puntos de historia:** 3  
**Notas:**
- La contraseña debe viajar y guardarse encriptada en la base de datos y no mostrarse en texto plano.
- Se debe restringir el número de intentos a máximo 5 para evitar ataques de fuerza bruta.


## 2. **Cerrar sesión Doctor**
_Como doctor, quiero cerrar sesión en el portal, para proteger mis datos y la información de mis pacientes._

**Criterios de aceptación:**
1. El botón de "Cerrar sesión" debe estar visible en el menú de usuario desde cualquier sección del portal de doctores.
2. Al hacer clic en "Cerrar sesión", el sistema debe invalidar el token de sesión actual de forma inmediata.
3. El sistema debe redirigir automáticamente al usuario a la pantalla de Inicio de Sesión (Login) y bloquear el uso del botón "Atrás" del navegador para volver al contenido protegido.

**Prioridad:** Alta 
**Puntos de historia:** 1  
**Notas:**
- Asegurar la invalidación del token para proteger la información médica confidencial.


## 3. **Ver calendario de citas**
_Como doctor, quiero ver mi calendario de citas, para mantenerme organizado con mis consultas diarias y semanales._

**Criterios de aceptación:**
1. El sistema debe ofrecer una vista de calendario interactiva (con opciones de visualización por día, semana y mes) que cargue las citas asignadas al doctor autenticado.
2. Cada cita en el calendario debe mostrar a simple vista la hora de inicio/fin, el nombre del paciente.
3. El calendario debe actualizarse en tiempo real o permitir un refresco rápido para reflejar nuevas reservas hechas por los pacientes.
4. El calendario debe permitir acceder al detalle de la cita.

**Prioridad:** Alta 
**Puntos de historia:** 7  
**Notas:**
- Las citas pasadas deberían mostrarse con una opacidad o color diferente para distinguirlas de las próximas.


## 4. **Gestionar indisponibilidad**
_Como doctor, quiero marcar bloques de tiempo como indisponibles, para informar a los pacientes y que solo puedan agendar en mis horarios libres._

**Criterios de aceptación:**
1. El sistema debe permitir al doctor seleccionar un rango de fecha y hora directamente en su interfaz para marcarlo como "No disponible" (ej. por vacaciones, congresos o asuntos personales).
2. El sistema debe validar que el bloque de tiempo seleccionado no tenga citas de pacientes ya programadas.
3. Los bloques marcados como indisponibles deben restarse automáticamente de la agenda pública, impidiendo que los pacientes los visualicen o seleccionen al intentar reservar.

**Prioridad:** Media 
**Puntos de historia:** 5  
**Notas:**
- Se debe evaluar para una nueva hu: si el doctor intenta indisponer un horario que ya tenía una cita programada qué comportamiento deberia tener. Ejemplo: reasginar automaticamente la cita a otra hora disponible o impedir la indisposición de la hora.

## 5. **Actualizar perfil profesional**
_Como doctor, quiero actualizar mi perfil con mi especialización e información de contacto, para que los pacientes vean datos correctos y vigentes._

**Criterios de aceptación:**
1. El sistema debe proveer un formulario de edición con campos modificables como: Teléfono de contacto, Descripción/Funciones, Especialidades y Fotografía de perfil.
2. Campos críticos como el Nombre o la Cédula Profesional no deben ser modificables por el doctor (solo lectura), requiriendo la intervención del Administrador si se necesitan cambiar.
3. Al guardar los cambios, el sistema debe validar los formatos de los campos editados y actualizar la información de manera inmediata en la base de datos.

**Prioridad:** Baja 
**Puntos de historia:** 5  
**Notas:**
- Si el doctor cambia su correo electrónico de contacto, evaluar si este afectará también su usuario de inicio de sesión.


## 6. **Ver detalles del paciente**
_Como doctor, quiero ver los detalles del paciente de mis próximas citas, para poder estar preparado antes de la consulta._

**Criterios de aceptación:**
1. Al hacer clic sobre el nombre del paciente en una cita próxima en el calendario/lista, el sistema debe desplegar una vista detallada del paciente asignado.
2. El sistema debe restringir el acceso a estos detalles, permitiendo que el doctor solo vea la información de los pacientes que explícitamente tienen una cita agendada con él

**Prioridad:** Baja 
**Puntos de historia:** 3  
**Notas:**
- Se debe evaluar si esta información se detalla en el mismo detalle de la cita o si se crea una sección de proximos pacientes por cita.



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

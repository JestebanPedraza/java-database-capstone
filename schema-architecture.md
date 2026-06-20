# Arquitectura de la aplicación

## Resumen de la arquitectura

Esta aplicación de Spring Boot utiliza tanto controladores MVC como REST. Se utilizan plantillas de Thymeleaf para los paneles de administración y de doctor, mientras que las API REST sirven a todos los demás módulos. La aplicación interactúa con dos bases de datos: MySQL (para datos de pacientes, doctores, citas y administración) y MongoDB (para recetas). Todos los controladores dirigen las solicitudes a través de una capa de servicio común, que a su vez delega en los repositorios apropiados. MySQL utiliza entidades JPA mientras que MongoDB utiliza modelos de documentos.

## Flujo numerado de datos y control

1. El usuario accede ak Dashboard administrador o a la página de citas
2. La acción es enrutada hacía controladores Thymeleaf o REST apropiadamente
3. El controlador llama al servicio correspondiente
5. El servicio aplica reglas de negocio, y realiza el llamado los repositorios MySQL o MongoDB
6. El repositorio mapea las entidades en modelos de bases de datos y realiza la transacción o consulta a la base de datos
7. La base de datos responde y el servicio se encarga de cargar los datos en la plantilla de Thymeleaf o de serializarlos en JSON

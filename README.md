# Gestión de Tareas - Aplicación Angular

Esta aplicación es una solución completa para la gestión de tareas, desarrollada con Angular 13. Permite a los usuarios registrarse e iniciar sesión mediante JWT, y realizar operaciones CRUD sobre tareas. Además, los usuarios pueden compartir tareas con otros, listar sus propias tareas y ver las tareas que se les han compartido.

## Características

- **Autenticación y Registro:**
  - Registro de usuarios.
  - Inicio de sesión con JWT para la autenticación.

- **Gestión de Tareas:**
  - Crear, editar y eliminar tareas.
  - Marcar tareas como completadas o pendientes.
  - Compartir tareas con otros usuarios mediante invitaciones.
  - Listado de tareas propias (con paginación y búsqueda).
  - Listado de tareas compartidas.

- **Estado Global:**
  - Implementación de un store basado en `BehaviorSubject` para centralizar el manejo del estado de las tareas.
  - Sincronización automática entre componentes al actualizar el estado.

- **Buenas Prácticas:**
  - Arquitectura modular y separación de responsabilidades.
  - Uso de Angular Material para la interfaz de usuario.
  - Manejo adecuado de errores y validaciones.

## Tecnologías Utilizadas

- **Frontend:**
  - Angular 13
  - TypeScript
  - RxJS
  - Angular Material

- **Autenticación:**
  - JWT

- **Control de Estado:**
  - Store basado en `BehaviorSubject` para centralizar las tareas.

## Instalación y Configuración

### Requisitos

- Node.js (v14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Williamsanchez06/task-manager-frontend.git
   cd task-manager-frontend
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**

   Crea o edita el archivo `src/environments/environment.ts` y configura la URL de la API (por ejemplo, `apiUrl`) y otros parámetros necesarios para la autenticación JWT.

4. **Ejecutar la aplicación:**

   ```bash
   ng serve
   ```

   La aplicación se ejecutará en `http://localhost:4200`.

## Uso de la Aplicación

- **Registro y Login:**
  - Accede a la sección de autenticación para registrarte o iniciar sesión. El sistema utilizará JWT para manejar la sesión.

- **Gestión de Tareas:**
  - Una vez autenticado, el usuario puede:
    - Crear nuevas tareas.
    - Editar y eliminar tareas existentes.
    - Compartir tareas con otros usuarios.
    - Consultar el listado de sus tareas, con soporte para paginación y búsqueda.
    - Visualizar las tareas que han sido compartidas con él.

## Estado Global y Control de Tareas

La aplicación utiliza un **store** basado en `BehaviorSubject` para centralizar el estado de las tareas. Esto permite que cualquier operación CRUD (crear, actualizar, eliminar o compartir) se refleje de inmediato en toda la aplicación.

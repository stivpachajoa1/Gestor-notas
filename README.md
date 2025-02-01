Proyecto de Gestión de Eventos  

Este proyecto es una aplicación completa para la gestión de eventos, que incluye un backend (API REST) y un frontend (React). A continuación, se describe el proceso de instalación, configuración y ejecución para ambos componentes. 
Tabla de Contenidos  

    Requisitos Previos 
    Instalación del Backend 
    Instalación del Frontend 
    Ejecución del Proyecto 
    Endpoints de la API 
    Contribuciones 
     

Requisitos Previos  

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema: 
Backend  

    Node.js (v16 o superior)
    npm (v8 o superior)
    MongoDB (local o conexión a un servicio en la nube como MongoDB Atlas)
    Postman (opcional, para probar los endpoints)
     

Frontend  

    Node.js (v16 o superior)
    npm (v8 o superior)
    Un navegador moderno (Chrome, Firefox, etc.)
     

Instalación del Backend  
1. Clonar el Repositorio  
bash
 
git clone https://github.com/tu-repositorio/backend.git
cd backend
 
 
2. Instalar Dependencias  

El backend utiliza las siguientes dependencias principales: 

    bcryptjs : Para cifrar contraseñas.
    cors : Para habilitar CORS.
    dotenv : Para cargar variables de entorno.
    express : Framework web minimalista.
    express-rate-limit : Para limitar solicitudes.
    express-validator : Para validar datos.
    helmet : Para mejorar la seguridad.
    jwt-simple : Para manejar tokens JWT.
    mongoose : Para interactuar con MongoDB.
    morgan : Para registrar logs.
     

Además, se usa nodemon como dependencia de desarrollo para reiniciar el servidor automáticamente. 

Instala todas las dependencias ejecutando: 
bash
 
npm install bcryptjs cors dotenv express express-rate-limit express-validator helmet jwt-simple mongoose morgan
npm install --save-dev nodemon
 
 
3. Configurar Variables de Entorno  

Crea un archivo .env en la raíz del proyecto y configura las siguientes variables: 
env
 
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-manager
JWT_SECRET=tu_secreto_jwt
 
 

    Nota:  Si usas MongoDB Atlas, reemplaza MONGODB_URI con la URI de conexión proporcionada por el servicio. 
     

4. Configuración de Scripts  

Asegúrate de que el archivo package.json tenga los siguientes scripts: 
json

"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
 
 
5. Iniciar el Servidor  

Para iniciar el servidor en modo de desarrollo: 
bash
 
npm run dev
 
 

El servidor estará disponible en http://localhost:5000. 
Instalación del Frontend  
1. Clonar el Repositorio  
bash
 
git clone https://github.com/tu-repositorio/frontend.git
cd frontend
 
 
2. Instalar Dependencias  

El frontend utiliza las siguientes dependencias principales: 

    @emotion/react  y @emotion/styled : Para manejar estilos CSS-in-JS.
    @mui/icons-material  y @mui/material : Componentes de Material-UI.
    axios : Cliente HTTP para comunicarse con el backend.
    framer-motion : Para animaciones.
    react , react-dom : Bibliotecas principales de React.
    react-particles  y tsparticles : Para efectos de partículas.
    react-router-dom : Para manejar rutas.
     

Instala todas las dependencias ejecutando: 
bash

 
npm install @emotion/react @emotion/styled @mui/icons-material @mui/material axios cra-template framer-motion react react-dom react-particles react-router-dom react-scripts tsparticles
 
 
3. Configurar Variables de Entorno  

Crea un archivo .env en la raíz del proyecto y configura la URL base de la API: 
env
 

REACT_APP_API_URL=http://localhost:5000/api
 
 

    Nota:  Si el backend está desplegado en un servidor remoto, reemplaza http://localhost:5000 con la URL correspondiente. 
     

4. Iniciar la Aplicación  

Para iniciar la aplicación en modo de desarrollo: 
bash
 
 
npm start
 
 

La aplicación estará disponible en http://localhost:3000. 
Ejecución del Proyecto  
Backend  

    El backend se ejecuta en http://localhost:5000.
    Puedes usar herramientas como Postman para probar los endpoints de la API.
     

Frontend  

    El frontend se ejecuta en http://localhost:3000.
    Abre esta URL en tu navegador para interactuar con la aplicación.
     

Endpoints de la API  

A continuación, se enumeran los principales endpoints disponibles en el backend: 
Autenticación  

    POST /auth/register : Registrar un nuevo usuario. 
        Body:
        json
         
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "securepassword"
    }
     
     
     

POST /auth/login : Iniciar sesión. 

    Body:
    json
     
        {
          "email": "john@example.com",
          "password": "securepassword"
        }
         
         
         
     

Eventos  

    GET /events : Obtener todos los eventos del usuario autenticado. 

    POST /events : Crear un nuevo evento. 
        Body:
        json
         
    {
      "name": "Conferencia",
      "date": "2023-12-01",
      "time": "10:00",
      "location": "Ciudad",
      "description": "Descripción del evento"
    }
     
     
     

PUT /events/:id : Actualizar un evento existente. 

DELETE /events/:id : Eliminar un evento. 

Contribuciones  

Si deseas contribuir al proyecto, sigue estos pasos: 

    Haz un fork del repositorio.
    Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
    Realiza tus cambios y haz commit (git commit -m "Añadir nueva funcionalidad").
    Sube los cambios a tu rama (git push origin feature/nueva-funcionalidad).
    Abre un Pull Request en GitHub.
     

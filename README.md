# Unicity - Plataforma de Conexión de Oficios

![Entidad-Relacion](/frontend/public/unicityLogo.png)

## Descripción del Proyecto

**Unicity** es una aplicación diseñada para promover y difundir diversos oficios y servicios disponibles en la comunidad. Este proyecto tiene como objetivo facilitar la conexión entre personas que buscan servicios específicos y profesionales capacitados en diferentes áreas.

### ¿A quién va dirigido?

La plataforma está dirigida a dos grupos principales:

1. **Clientes**: Personas que necesitan contratar a profesionales para realizar trabajos específicos, como reparación de electrodomésticos, servicios de electricidad, carpintería, albañilería, entre otros.

2. **Profesionales**: Trabajadores autónomos que ofrecen servicios en sus respectivos oficios y desean aumentar su visibilidad y conectividad con potenciales clientes.

### Características Principales

- **Búsqueda y Filtrado**: Los usuarios pueden buscar profesionales de oficios específicos a través de una barra de búsqueda y filtros por categoría (Electricidad, Carpintería, Albañilería, etc.).
- **Perfil de Usuario**: Los profesionales pueden crear un perfil donde detallen sus servicios, experiencia, tarifas, y otros datos relevantes.

- **Interfaz Amigable**: La aplicación cuenta con un diseño intuitivo que facilita la navegación y búsqueda de servicios.

- **Autenticación de Usuarios**: Los usuarios pueden registrarse e iniciar sesión para gestionar sus perfiles y servicios de manera segura.

- **Interacción Directa**: Los clientes pueden contactar directamente a los profesionales a través de la plataforma para discutir detalles del servicio requerido.

### Dependencias

El proyecto utiliza las siguientes dependencias:

- **bcrypt**: Una biblioteca para hashear contraseñas y garantizar la seguridad de la información del usuario.
- **cookie-parser**: Un middleware para analizar cookies en las solicitudes HTTP.
- **cors**: Un middleware que permite la gestión de solicitudes de origen cruzado, facilitando la interacción entre diferentes dominios.
- **express**: Un framework minimalista y flexible para construir aplicaciones web y APIs en Node.js.
- **express-session**: Un middleware para manejar sesiones de usuario, permitiendo la persistencia de datos entre solicitudes.
- **jsonwebtoken**: Una biblioteca para generar y verificar tokens JWT, utilizada en la autenticación y autorización de usuarios.
- **mongoose**: Una biblioteca de modelado de datos para MongoDB y Node.js, que facilita la interacción con bases de datos.
- **morgan**: Un middleware para registrar solicitudes HTTP, útil para depuración y monitoreo de aplicaciones.
- **multer**: Un middleware para gestionar la subida de archivos en formularios HTML.
- **autoprefixer**: Un plugin de PostCSS que añade prefijos de navegador automáticamente a CSS.
- **postcss**: Un transformador de CSS que permite usar plugins para modificar CSS.
- **tailwindcss**: Un framework de CSS que permite crear diseños modernos y personalizados.
- **vite**: Un entorno de desarrollo y construcción que proporciona una experiencia rápida y ligera para aplicaciones web.

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Ticii18/Unicity.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd unicity
   ```

3. Instalar las dependencias en cada carpeta
   ```bash
   cd backend
   npm install
   ```
   ```bash
    cd frontend
    npm install
   ```
4. - **Ejecución en Desarrollo**:
     Ingresar en cada directorio desde una terminal diferente y ejecutar el comando `npm run dev`

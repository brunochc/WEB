# Documentación del Proceso de Desarrollo: Professional Web

Este documento registra el proceso completo de desarrollo de la primera etapa del sitio web profesional, desde la concepción de la idea hasta la implementación técnica inicial.

## 1. Fase de Análisis y Estrategia

### 1.1. Definición del Objetivo
El objetivo principal era crear una web profesional que sirviera para contactar empleadores en el extranjero (Canadá, Europa), diferenciándose de un perfil estándar de desarrollador.

### 1.2. Estrategia "Dual Profile"
Se identificó una oportunidad única al combinar dos facetas del perfil:
1.  **Ingeniero de Software/Datos:** Experiencia formal en MERN, Python, KPIs y Optimización (Codelco, STP).
2.  **Habilidades de Vida (Life Skills):** Experiencia práctica en mecánica automotriz y construcción de alta exigencia.

**Concepto Central:** "Transformar el Caos Operativo en Eficiencia Estructurada".
Se decidió utilizar la experiencia práctica como prueba de la capacidad de resolución de problemas complejos y análisis sistémico.

### 1.3. Definición de Contenidos
-   Se redactó un borrador (`content_draft.md`) estructurando la narrativa.
-   Se integró la experiencia en minería como el "puente" entre el mundo físico y el digital.

## 2. Fase de Diseño

### 2.1. Concepto Visual
Se generó un concepto visual que divide/mezcla dos mundos:
-   **Tech:** Azul oscuro, limpio, sintaxis de código.
-   **Industrial:** Tonos metálicos, precisión mecánica.
-   **Paleta de Colores:** Dark Blue (`#0a192f`) como base, con acentos Cyan/Teal (`#64ffda`) y texto claro (`#e6f1ff`).

## 3. Fase de Implementación Técnica

### 3.0. Configuración del Entorno (Prerrequisitos)
El entorno de desarrollo requirió una preparación específica debido a que el sistema base (Ubuntu) no contaba con las herramientas necesarias para un stack moderno de React + Vite.

#### 3.0.1. Diagnóstico Inicial
Al intentar ejecutar comandos de Node.js, nos encontramos con errores de `command not found`. Esto indicó una instalación limpia sin entornos de ejecución de JavaScript.

#### 3.0.2. Resolución de Dependencias
1.  **Herramientas del Sistema:**
    *   `curl`: Necesario para descargar el script de instalación de NVM.
    *   `build-essential`: Requerido para compilar ciertos paquetes nativos de Node.js si fuera necesario.
    ```bash
    sudo apt update
    sudo apt install curl build-essential -y
    ```

2.  **Gestión de Versiones (NVM):**
    Optamos por **NVM (Node Version Manager)** en lugar de instalar Node.js directamente desde `apt`.
    *   *¿Por qué?* Los repositorios de Ubuntu suelen tener versiones antiguas de Node.js. Vite requiere versiones recientes (v18+ o v20+). NVM nos permite instalar la última versión LTS sin afectar el sistema operativo y sin necesitar `sudo` para instalar paquetes globales.
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    source ~/.bashrc # Recargar configuración del shell
    ```

3.  **Instalación de Node.js:**
    Instalamos la versión **v24.12.0 (LTS)**.
    *   *Verificación:* `node -v` confirmó la versión correcta.
    *   *Configuración:* `nvm alias default 24.12.0` asegura que esta versión persista en nuevas sesiones de terminal.

### 3.1. Inicialización del Proyecto
-   **Herramienta:** Vite (v7.3.0).
-   **Framework:** React.
-   **Comando:** `npm create vite@latest web -- --template react`
-   **Directorio:** El proyecto se alojó en la subcarpeta `web/` para mantener separado el código fuente de la web de otros posibles activos (como el CV en LaTeX).

### 3.2. Arquitectura del Proyecto
Se estableció una estructura de directorios modular pensada para la escalabilidad:

```
web/
├── src/
│   ├── components/  # Bloques de construcción reutilizables.
│   │   ├── Navbar.jsx  # Navegación principal.
│   │   └── Layout.jsx  # "Wrapper" que define la estructura común (Header/Footer).
│   ├── pages/       # Vistas completas (Rutas).
│   │   ├── Home.jsx    # Portada con Hero Section.
│   │   ├── About.jsx   # Contenido principal (Life Skills).
│   │   └── Projects.jsx # Catálogo de proyectos (Futuro).
│   ├── styles/      # Estilos CSS separados por responsabilidad.
│   │   ├── Navbar.css
│   │   ├── Home.css
│   │   └── About.css
│   ├── App.jsx      # Configuración de Rutas (React Router).
│   └── main.jsx     # Punto de entrada de la aplicación.
```

### 3.3. Dependencias
-   `react-router-dom`: Para la navegación SPA (Single Page Application).

### 3.4. Desarrollo de Componentes y Decisiones de Diseño

#### A. Sistema de Navegación (Router)
Implementamos `react-router-dom` para crear una **Single Page Application (SPA)**. Esto significa que la navegación es instantánea y no recarga la página, brindando una experiencia de usuario fluida y "premium".

#### B. Componente `About` (El Corazón del Contenido)
Aquí reside la estrategia de diferenciación. En lugar de un texto plano, estructuramos la información en **Tarjetas (Cards)** visuales:
-   **Sección Filosofía:** Texto introductorio que define tu enfoque de "Análisis Sistémico".
-   **Tarjetas de Habilidades:**
    -   *Mecánica:* Destacando el diagnóstico y la interconexión de sistemas.
    -   *Construcción:* Enfatizando la pulcritud y la planificación de alta exigencia.
    -   *Minería:* Presentada como el caso de éxito de optimización de datos masivos.

#### C. Estilos y Paleta de Colores
Se definieron variables CSS globales (`:root`) para facilitar cambios futuros y asegurar consistencia.
-   **Fondo (`#0a192f`):** Azul profundo, evoca seriedad, tecnología y profundidad.
-   **Acento (`#64ffda`):** Cian brillante, utilizado para destacar palabras clave y botones, guiando la atención del usuario.
-   **Tipografía:** Se seleccionó una familia sans-serif moderna (`Inter`, `Roboto`) para máxima legibilidad en pantallas.

## 4. Ejecución y Visualización
### 4.1. Iniciar el Servidor de Desarrollo
Para ver la página web en tu navegador, sigue estos pasos:

1.  **Ejecutar el comando:**
    Es importante entrar primero a la carpeta del proyecto `web`:
    ```bash
    cd web
    npm run dev
    ```
2.  **Identificar la URL:**
    La terminal mostrará un mensaje similar a:
    ```
      VITE v7.3.0  ready in 250 ms

      ➜  Local:   http://localhost:5173/
      ➜  Network: use --host to expose
    ```
3.  **Abrir en el Navegador:**
    *   Mantén presionada la tecla `Ctrl` y haz clic en el enlace `http://localhost:5173/`.
    *   O copia esa dirección y pégala en la barra de direcciones de tu navegador (Chrome, Firefox, etc.).

### 4.2. Estado Actual
La aplicación es funcional en entorno local.
-   **Build:** Verificado con `npm run build`.

## 5. Próximos Pasos
-   Implementar la generación/descarga del PDF desde `resume.tex`.
-   Poblar la sección de Proyectos con casos de uso reales.
-   Despliegue (Deploy) en un servicio de hosting (ej. Vercel, Netlify).

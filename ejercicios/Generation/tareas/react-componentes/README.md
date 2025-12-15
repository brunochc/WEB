# react-componentes
# Instrucciones - Migración a Componentes React con Vite

## 📌 Descripción
Bienvenido/a a tu tarea de práctica con Componentes React. En esta actividad vas a dar tu primer paso con React migrando una maqueta HTML/CSS a una aplicación con componentes.

No se trata de que quede perfecto, sino de que practiques y entiendas.

## ✅ Requisitos previos
- Tener instalado Node.js (recomendado LTS) y npm.
- Conocer HTML y CSS básicos.

Verifica tu versión de Node y npm:

```bash
node -v
npm -v
```

## 🚀 Cómo iniciar el proyecto
Este repositorio ya contiene un proyecto creado con Vite dentro de `tarea-vite/`.

1) Instalar dependencias:

```bash
cd tarea-vite
npm install
```

2) Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

3) Abrir la app en tu navegador (Vite te mostrará la URL, normalmente http://localhost:5173).

## 🧭 Estructura sugerida del proyecto
Dentro de `tarea-vite/` se propone la siguiente organización básica:

```
tarea-vite/
  src/
    componentes/
      Header.jsx
      SidebarItem.jsx
      RelatedPost.jsx
      Article.jsx
      Main.jsx
      Footer.jsx
    App.jsx
    main.jsx
  index.html
  package.json
```

Nota: En este proyecto usamos `src/componentes/` (en español) para los componentes.

## 🧩 Objetivo: migración a componentes

1) Configuración inicial de React
- Asegúrate de tener Node.js y npm.
- El proyecto ya está creado con Vite; si necesitas crear uno nuevo: `npm create vite@latest` y elige React.

2) Estructura del proyecto
- Organiza tus componentes dentro de `src/componentes/`.
- Cada sección o elemento importante de la maqueta deberá ser un componente funcional.

3) Análisis de la maqueta
- Revisa el HTML y CSS originales (los que tenías como base) y define la división en componentes.
- Identifica componentes reutilizables (por ejemplo, tarjetas, ítems de lista, etc.).

4) Creación de componentes
- Crea archivos `.jsx` para cada componente: `Header.jsx`, `Main.jsx`, `Article.jsx`, `SidebarItem.jsx`, `RelatedPost.jsx`, `Footer.jsx`, etc.
- Usa Functional Components y, si corresponde, props para parametrizar.

5) Migración de HTML a JSX
- Copia el HTML relevante a cada componente y conviértelo a JSX.
- Mantén la estructura y las clases CSS (class en HTML -> className en JSX).
- Cierra todas las etiquetas y usa llaves `{}` para interpolar valores.

6) Estilos CSS
- Copia los estilos CSS de la maqueta a archivos `.css` o módulos CSS y expórtalos donde corresponda.
- Asegúrate de que las rutas a imágenes y fuentes sean correctas (usa la carpeta `public/` cuando convenga).

7) Importación y composición
- Importa y compón tus componentes dentro del componente raíz (`App.jsx`).
- Ejemplo: `App.jsx` puede contener `<Header />`, `<Main />`, `<Footer />`, etc.

8) Componente raíz
- `App.jsx` debe organizar la estructura general de la página y orquestar los componentes hijos.

9) Estilización responsive
- Asegúrate de que la app se vea bien en diferentes tamaños de pantalla (media queries, flex/grid, etc.).

10) Documentación y comentarios
- Agrega comentarios claros para explicar qué hace cada componente y qué props espera.
- Documenta cualquier configuración especial.

## 🧪 Scripts útiles
- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera el build de producción.
- `npm run preview`: sirve el build para verificarlo localmente.

## 🧱 Convenciones recomendadas
- Nombres de componentes en PascalCase: `Header.jsx`, `RelatedPost.jsx`.
- Un componente por archivo dentro de `src/componentes/`.
- Usa props para datos variables y evita duplicar HTML.
- Extrae componentes cuando veas repetición (p. ej., `SidebarItem`).

## 📤 Entrega
1) Crea un repositorio en GitHub con el nombre: `react-componentes`.
2) Sube tu código a ese repositorio.
3) Copia el link de tu repositorio y entrégalo como respuesta de la tarea.

Comandos de referencia para Git (si los necesitas):

```bash
git init
git add .
git commit -m "Migración a componentes React con Vite"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/react-componentes.git
git push -u origin main
```

## 📚 Recursos
- Documentación oficial de React: https://react.dev/
- Guía de Vite: https://vitejs.dev/guide/

¡Éxitos con la práctica y a divertirse construyendo con React!
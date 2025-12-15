---
# Lista de Publicaciones con React

Aplicación React creada con Vite que consume la API pública JSONPlaceholder para listar publicaciones. Implementa manejo de estado con `useState`, efectos con `useEffect`, renderización dinámica y extras opcionales como loading, manejo de error y límite de resultados.

## Objetivo (Rúbrica)
- **[Creación del proyecto]** Vite + React.
- **[Estructura de componentes]** `src/App.jsx` y `src/PostsList.jsx`.
- **[Estado]** `useState` para almacenar publicaciones.
- **[Efectos]** `useEffect` para solicitar datos al montar el componente.
- **[Consumo de API]** `https://jsonplaceholder.typicode.com/posts`.
- **[Renderización]** Mostrar `title` y `body` de cada publicación.
- **[Extras]** Loading, error y límite a primeras 10 publicaciones.

## Tecnologías
- React + Vite
- Fetch API
- (Opcional) Bootstrap

## Requisitos
- Node.js >= 18
- npm >= 9

## Instalación y ejecución
```bash
npm install       # instalar dependencias
npm run dev       # modo desarrollo
npm run build     # build de producción
npm run preview   # previsualizar build
```
La app se sirve normalmente en `http://localhost:5173` (el puerto puede variar).

## Estructura relevante
```
lista-publicaciones/
└─ src/
   ├─ App.jsx           # Componente raíz, renderiza <PostsList />
   ├─ PostsList.jsx     # Consume la API y renderiza publicaciones
   ├─ main.jsx          # Punto de entrada Vite/ReactDOM
   └─ App.css / index.css
```

## Componentes clave
- `src/App.jsx`
  - Importa y muestra `PostsList`.

- `src/PostsList.jsx`
  - Estado: `posts`, `loading`.
  - Efecto: `useEffect` hace `fetch` al endpoint y guarda los datos en `posts`.
  - Renderización:
    - Muestra mensaje de carga mientras `loading` es `true`.
    - Si no hay resultados, muestra "No posts found".
    - Lista las primeras 10 publicaciones, mostrando `title` y `body`.

## Consumo de API
- Endpoint utilizado: `https://jsonplaceholder.typicode.com/posts`
- Flujo:
  1. `useEffect` se ejecuta al montar el componente.
  2. Se hace `fetch`, se parsea con `response.json()`.
  3. Se actualiza el estado `posts` con los datos recibidos.
  4. Se controla `loading` y posibles errores con `.catch()` y `.finally()`.

## Renderización y límite de resultados
- Se mapean las publicaciones con `posts.slice(0, 10).map(...)` para mostrar solo las primeras 10.
- Cada ítem muestra `title` y `body`.

## Manejo de carga y error (extras)
- Loading: mensaje "Loading..." mientras se obtienen los datos.
- Error: se captura con `.catch(error => console.log(error))` y puede mostrarse en la UI si se desea.

## (Opcional) Integrar Bootstrap
Si quieres usar Bootstrap rápidamente vía CDN, agrega en `index.html` dentro de `<head>`:
```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous"
>
```
Y en el body antes de cerrar `</body>`:
```html
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
  crossorigin="anonymous"
></script>
```
Luego puedes envolver cada publicación en clases como `card`, `card-body`, etc.

## Deploy
Publica el contenido de `dist/` en un hosting estático (Netlify, Vercel, GitHub Pages).

## Enlaces
- JSONPlaceholder: https://jsonplaceholder.typicode.com/
- React: https://react.dev/
- Vite: https://vitejs.dev/
- Bootstrap: https://getbootstrap.com/
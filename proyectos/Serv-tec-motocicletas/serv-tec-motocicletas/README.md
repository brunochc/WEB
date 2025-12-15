# MotoValpo — Sitio web

Sitio web de Servicio Técnico de Motocicletas (MotoValpo), construido con React + Vite y TypeScript. Diseño dark con animaciones y componentes modernos.

## Características
- UI moderna con Tailwind CSS (tema oscuro, gradientes y acentos).
- Animaciones con `motion` (Framer Motion API para React).
- Iconografía con `lucide-react`.
- Componentes accesibles (Radix UI) y utilidades UI.
- Notificaciones con `sonner`.
- Despliegue en GitHub Pages.

## Stack técnico
- React 18 + TypeScript
- Vite 6 (`@vitejs/plugin-react-swc`)
- Tailwind CSS 4
- Radix UI (`@radix-ui/*`)
- motion (framer-motion API)
- lucide-react
- sonner

## Requisitos
- Node.js 18 o 20 (recomendado LTS)
- npm 9+

## Instalación
```bash
npm ci   # o npm install
```

## Desarrollo
```bash
npm run dev
```
- Servidor local: http://localhost:3000
- HMR habilitado.

## Build (producción)
```bash
npm run build
npm run preview  # vista previa local del build
```
- Output a `dist/`.
- El proyecto usa `base: '/valpomoto/'` en `vite.config.ts` para funcionar bajo GitHub Pages.

## Despliegue (GitHub Pages)
Hay scripts ya configurados con `gh-pages`:
```bash
npm run predeploy   # build + copia de 404.html
npm run deploy      # publica dist/ a la rama gh-pages
```
Pasos:
1) Ejecuta `npm run deploy`.
2) Espera 1–3 minutos a que GitHub Pages actualice.
3) URL del sitio: https://brunochc.github.io/valpomoto/

Si prefieres automatizar al hacer push a `master`, crea un workflow en `.github/workflows/deploy.yml` que construya y publique `dist/` en `gh-pages`.

## Rutas, imágenes y metadatos
- Como el sitio vive en `/valpomoto/`, evita rutas absolutas del tipo `/archivo.png` en runtime. Usa rutas relativas o considera `import.meta.env.BASE_URL` en código cuando necesites construir paths a `public/`.
- Para metadatos (Open Graph / Twitter), se añadieron etiquetas en `public/index.html`. Recomendado usar URL absoluta para `og:image` en producción:
  - `https://brunochc.github.io/valpomoto/meta.png`

## Estructura relevante
```
public/
  favicon.ico
  meta.png           # imagen para metadatos (OG/Twitter)
  casco-de-motocicleta-seguro.jpg
src/
  App.tsx            # layout principal (Header, Hero, Services, Gallery, Contact, Footer)
  components/
    Header.tsx
    Hero.tsx
    Services.tsx
    Gallery.tsx
    Contact.tsx
    Footer.tsx
    figma/ImageWithFallback.tsx
    ui/*             # componentes UI (Radix + utilidades)
  styles/globals.css
  index.css          # salida Tailwind generada
vite.config.ts       # base '/valpomoto/' y alias
```

## Scripts disponibles
- `npm run dev`: desarrollo con Vite.
- `npm run build`: build de producción a `dist/`.
- `npm run preview`: servidor de vista previa del build.
- `npm run predeploy`: build + copia `dist/index.html` a `dist/404.html` (necesario para SPAs en GitHub Pages).
- `npm run deploy`: publica `dist/` a la rama `gh-pages`.

## Buenas prácticas
- Optimiza imágenes antes de subir (ancho ~1600px, calidad ~80%).
- Evita hotlinking de imágenes de terceros; colócalas en `public/` respetando licencias.
- Para imágenes en runtime bajo GitHub Pages, valida rutas con `BASE_URL`.

## Solución de problemas
- “No se actualiza la página tras push a master”: debes publicar `dist/` a `gh-pages` (`npm run deploy`) o automatizar con GitHub Actions.
- Imágenes locales no cargan en producción: revisa el `base` (`/valpomoto/`) y usa rutas que lo contemplen o `import.meta.env.BASE_URL`.
- Metadatos no se ven en redes: usa URL absoluta para `og:image` y espera el refresco del crawler (o usa las herramientas de depuración de cada red).

---
2025 MotoValpo. Todos los derechos reservados.

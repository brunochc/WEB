# Real Services

Plataforma de servicios profesionales que conecta proveedores de servicios con clientes.

## Estructura del Proyecto

```
real-services/
├── client/          # Frontend (React + Vite)
├── server/          # Backend (Node.js + Express + MongoDB)
└── README.md
```

## Inicio Rápido

### Backend

```bash
cd server
npm install
cp .env.example .env
# Configura las variables de entorno en .env
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Características

- ✅ Autenticación de usuarios (clientes y proveedores)
- ✅ Gestión de servicios profesionales
- ✅ Sistema de reservas/contactos
- ✅ Perfiles de usuarios
- ✅ Búsqueda y filtrado de servicios

## Tecnologías

### Backend
- Node.js
- Express
- MongoDB
- JWT para autenticación

### Frontend
- React
- React Router
- Axios
- Vite

## Licencia

ISC

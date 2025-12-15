#!/bin/bash

# Script para crear estructura de proyecto de servicios profesionales
# Uso: ./setup-project.sh [nombre-proyecto]

PROJECT_NAME=${1:-"real-services"}

echo "🚀 Creando proyecto: $PROJECT_NAME"

# Crear directorio raíz del proyecto
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# ============================================
# ESTRUCTURA DEL SERVIDOR (Backend)
# ============================================
echo "📦 Creando estructura del servidor..."

mkdir -p server/{src/{config,controllers,models,routes,middleware,services,utils},tests,logs}

# Archivos del servidor
cat > server/package.json << 'EOF'
{
  "name": "real-services-server",
  "version": "1.0.0",
  "description": "Backend para plataforma de servicios profesionales",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "keywords": ["services", "professionals", "marketplace"],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "dotenv": "^16.0.3",
    "cors": "^2.8.5",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.5.0"
  }
}
EOF

cat > server/.env.example << 'EOF'
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/real-services
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRE=7d
EOF

cat > server/.gitignore << 'EOF'
node_modules/
.env
logs/*.log
*.log
.DS_Store
EOF

cat > server/src/index.js << 'EOF'
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Servicios Profesionales' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
EOF

cat > server/src/config/database.js << 'EOF'
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
EOF

# Modelos
cat > server/src/models/User.js << 'EOF'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['client', 'provider'],
    default: 'client'
  },
  phone: String,
  avatar: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
EOF

cat > server/src/models/Service.js << 'EOF'
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  category: {
    type: String,
    required: true,
    enum: ['plomería', 'electricidad', 'carpintería', 'limpieza', 'jardinería', 'tecnología', 'educación', 'otros']
  },
  price: {
    type: Number,
    required: true
  },
  priceType: {
    type: String,
    enum: ['por_hora', 'fijo', 'a_convenir'],
    default: 'por_hora'
  },
  images: [String],
  location: {
    city: String,
    state: String,
    country: String
  },
  availability: {
    type: String,
    enum: ['disponible', 'ocupado', 'pausado'],
    default: 'disponible'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', serviceSchema);
EOF

cat > server/src/models/Booking.js << 'EOF'
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'confirmado', 'en_progreso', 'completado', 'cancelado'],
    default: 'pendiente'
  },
  message: String,
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
EOF

# Controladores
cat > server/src/controllers/authController.js << 'EOF'
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generar JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const user = await User.create({ name, email, password, role });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
EOF

cat > server/src/controllers/serviceController.js << 'EOF'
const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('provider', 'name email avatar');
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create({
      ...req.body,
      provider: req.user.id
    });
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('provider', 'name email avatar phone');
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
EOF

cat > server/src/controllers/bookingController.js << 'EOF'
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      client: req.user.id
    });
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ client: req.user.id })
      .populate('service')
      .populate('provider', 'name email phone');
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
EOF

# Middleware
cat > server/src/middleware/auth.js << 'EOF'
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No tienes permisos para esta acción' });
    }
    next();
  };
};
EOF

# Rutas
cat > server/src/routes/auth.js << 'EOF'
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
EOF

cat > server/src/routes/users.js << 'EOF'
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Ruta de usuarios' });
});

module.exports = router;
EOF

cat > server/src/routes/services.js << 'EOF'
const express = require('express');
const { getAllServices, createService, getServiceById } = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllServices);
router.post('/', protect, authorize('provider'), createService);
router.get('/:id', getServiceById);

module.exports = router;
EOF

cat > server/src/routes/bookings.js << 'EOF'
const express = require('express');
const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);

module.exports = router;
EOF

cat > server/README.md << 'EOF'
# Real Services - Backend

## Instalación

```bash
npm install
```

## Configuración

1. Copia `.env.example` a `.env`
2. Configura las variables de entorno

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Estructura

- `src/config/` - Configuraciones (DB, etc.)
- `src/controllers/` - Lógica de negocio
- `src/models/` - Modelos de MongoDB
- `src/routes/` - Rutas de la API
- `src/middleware/` - Middleware personalizado
EOF

# ============================================
# ESTRUCTURA DEL CLIENTE (Frontend)
# ============================================
echo "🎨 Creando estructura del cliente..."

mkdir -p client/{public,src/{components/{common,auth,services,bookings,layout},pages,context,hooks,services,utils,styles}}

# Archivos del cliente
cat > client/package.json << 'EOF'
{
  "name": "real-services-client",
  "version": "1.0.0",
  "description": "Frontend para plataforma de servicios profesionales",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.3.0"
  }
}
EOF

cat > client/index.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Real Services - Servicios Profesionales</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

cat > client/vite.config.js << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
EOF

cat > client/.gitignore << 'EOF'
node_modules/
dist/
.env
.DS_Store
EOF

cat > client/src/main.jsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

cat > client/src/App.jsx << 'EOF'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
EOF

cat > client/src/context/AuthContext.jsx << 'EOF'
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Aquí podrías validar el token con el backend
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
EOF

cat > client/src/pages/Home.jsx << 'EOF'
import React from 'react';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Encuentra el Profesional que Necesitas</h1>
        <p>Conecta con expertos en servicios profesionales</p>
      </section>
    </div>
  );
}

export default Home;
EOF

cat > client/src/pages/Login.jsx << 'EOF'
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
EOF

cat > client/src/pages/Register.jsx << 'EOF'
import React from 'react';

function Register() {
  return (
    <div className="register-page">
      <h2>Registro</h2>
    </div>
  );
}

export default Register;
EOF

cat > client/src/pages/Services.jsx << 'EOF'
import React from 'react';

function Services() {
  return (
    <div className="services-page">
      <h2>Servicios Disponibles</h2>
    </div>
  );
}

export default Services;
EOF

cat > client/src/pages/ServiceDetail.jsx << 'EOF'
import React from 'react';

function ServiceDetail() {
  return (
    <div className="service-detail">
      <h2>Detalle del Servicio</h2>
    </div>
  );
}

export default ServiceDetail;
EOF

cat > client/src/pages/Dashboard.jsx << 'EOF'
import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Panel de Control</h2>
    </div>
  );
}

export default Dashboard;
EOF

cat > client/src/components/layout/Header.jsx << 'EOF'
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/services">Servicios</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
EOF

cat > client/src/components/layout/Footer.jsx << 'EOF'
import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Real Services. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
EOF

cat > client/src/styles/index.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.header {
  background-color: #333;
  color: white;
  padding: 1rem 2rem;
}

.header nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.header a {
  color: white;
  text-decoration: none;
}

.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.login-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.login-form input {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-form button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.login-form button:hover {
  background-color: #0056b3;
}
EOF

cat > client/README.md << 'EOF'
# Real Services - Frontend

## Instalación

```bash
npm install
```

## Ejecución

```bash
# Desarrollo
npm run dev

# Build
npm run build
```

## Estructura

- `src/components/` - Componentes React
- `src/pages/` - Páginas de la aplicación
- `src/context/` - Context API para estado global
- `src/services/` - Servicios API
- `src/styles/` - Estilos CSS
EOF

# ============================================
# ARCHIVOS RAÍZ
# ============================================
echo "📝 Creando archivos raíz..."

cat > README.md << 'EOF'
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
EOF

cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Environment variables
.env
.env.local

# Logs
logs/
*.log

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Build
dist/
build/
EOF

echo ""
echo "✅ ¡Proyecto creado exitosamente!"
echo ""
echo "📁 Estructura creada:"
echo "   $PROJECT_NAME/"
echo "   ├── client/          (Frontend - React)"
echo "   ├── server/          (Backend - Node.js)"
echo "   └── README.md"
echo ""
echo "🚀 Próximos pasos:"
echo ""
echo "   1. cd $PROJECT_NAME/server"
echo "   2. npm install"
echo "   3. cp .env.example .env"
echo "   4. Configura MongoDB en .env"
echo "   5. npm run dev"
echo ""
echo "   En otra terminal:"
echo "   1. cd $PROJECT_NAME/client"
echo "   2. npm install"
echo "   3. npm run dev"
echo ""
echo "🎉 ¡Feliz desarrollo!"

const User = require('../models/User');

/**
 * Crea un nuevo usuario en MongoDB
 */
const registerNewUser = async (req, res) => {
  try {
    console.log('📥 Body recibido:', req.body);

    const { name, email, password, age } = req.body;

    // Validaciones básicas
    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Nombre, email y contraseña son obligatorios'
      });
    }

    // Crear usuario en MongoDB
    const newUser = await User.create({
      name,
      email,
      password, // En producción, hashear esta contraseña
      age: age || null
    });

    console.log('✅ Usuario creado en MongoDB:', newUser._id);

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Error creando usuario:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'El email ya está registrado'
      });
    }

    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};

/**
 * Lista todos los usuarios de MongoDB
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('-password') // Excluir contraseña
      .sort({ createdAt: -1 });

    console.log(`📋 Usuarios encontrados: ${users.length}`);

    res.json({
      count: users.length,
      users
    });
  } catch (error) {
    console.error('❌ Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }

  
};

/**
 * Obtiene un usuario por ID de MongoDB
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Buscando usuario ID: ${id}`);

    // Validar que el ID tenga formato de MongoDB
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      message: 'Usuario encontrado',
      data: user
    });
  } catch (error) {
    console.error('❌ Error obteniendo usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
  
};

/**
 * Actualiza un usuario en MongoDB
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    console.log(`✏️ Actualizando usuario ID: ${id}`, req.body);

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { 
        name, 
        email, 
        age
      },
      { 
        new: true, // Devuelve el documento actualizado
        runValidators: true 
      }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      message: 'Usuario actualizado exitosamente',
      data: updatedUser
    });
  } catch (error) {
    console.error('❌ Error actualizando usuario:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ error: 'El email ya está en uso' });
    }

    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/**
 * Elimina un usuario (borrado lógico)
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ Eliminando usuario ID: ${id}`);

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    console.error('❌ Error eliminando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/**
 * Login básico (para desarrollo)
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const user = await User.findOne({ email, isActive: true }).select('+password');

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({
      message: 'Login exitoso',
      token: 'fake-jwt-token', // En producción usar JWT real
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  registerNewUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
};
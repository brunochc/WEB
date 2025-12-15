
//req --> nos permite acceder a la informacion que viene del cliente
//res --> nos permite enviar una respuesta al cliente


const registerNewUser = (req, res) => {
    // Aquí irá la lógica para crear un usuario
    console.log(req.body)
    res.status(201).json({
        msg: 'Usuario creado correctamente'})
        data:{
            nombre: req.body.nombre
        }
}

const getAllUsers = (req, res) => {
    // Aquí irá la lógica para obtener todos los usuarios
    res.send('Aquí obtendremos todos los usuarios')
}

const updateUser = (req, res) => {
    // Aquí irá la lógica para actualizar un usuario
    const { id } = req.params
    res.send(`Aquí actualizaremos el usuario con ID: ${id}`)
}

const deleteUser = (req, res) => {
    // Aquí irá la lógica para eliminar un usuario
    const { id } = req.params
    res.send(`Aquí eliminaremos el usuario con ID: ${id}`)
}

const getUserById = (req, res) => {
    // Aquí irá la lógica para obtener un usuario por ID
    console.log(req.params.id)
    const { id } = req.params
    res.send(`Aquí obtendremos el usuario con ID: ${id}`)
}

const loginUser = (req, res) => {
    // Aquí irá la lógica para login de usuario
    res.send('Aquí loguearemos un usuario')
}

module.exports = {
    registerNewUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserById,
    loginUser
}
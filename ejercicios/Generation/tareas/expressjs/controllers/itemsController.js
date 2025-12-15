// Almacenamiento en memoria
let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" }
];

let nextId = 4;

const itemsController = {
  // GET /items - Obtener todos los items
  getAllItems: (req, res) => {
    res.json({
      count: items.length,
      items: items
    });
  },

  // GET /items/:id - Obtener un item por ID
  getItemById: (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(item => item.id === itemId);
    
    if (!item) {
      return res.status(404).json({
        error: 'Item no encontrado',
        message: `No se encontró ningún item con el ID ${itemId}`
      });
    }
    
    res.json(item);
  },

  // POST /items - Crear un nuevo item
  createItem: (req, res) => {
    const { name } = req.body;
    
    // Validar que se proporcionó un nombre
    if (!name || name.trim() === '') {
      return res.status(400).json({
        error: 'Datos inválidos',
        message: 'El campo "name" es requerido y no puede estar vacío'
      });
    }
    
    // Crear nuevo item
    const newItem = {
      id: nextId++,
      name: name.trim()
    };
    
    // Agregar a la lista
    items.push(newItem);
    
    // Responder con el item creado
    res.status(201).json({
      message: 'Item creado exitosamente',
      item: newItem
    });
  }
};

module.exports = itemsController;

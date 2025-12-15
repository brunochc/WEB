const express = require('express');
const itemsController = require('./controllers/itemsController');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas 
app.get('/', (req, res) => {
	res.json({
		message: 'Bienvenido a api Express',
		endpoints: {
			'GET /items': 'obtener todos los items',
			'GET /items/:id:': 'Obtener un item por ID',
			'POST /items': 'Crear un nuevo item'
		}
	});
});

// Rutas para items

app.get('/items', itemsController.getAllItems);
app.get('/items/:id', itemsController.getItemById);
app.post('/items', itemsController.createItem);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('Prueba los endpoints:');
  console.log('   GET /');
  console.log('   GET /items');
  console.log('   GET /items/1');
  console.log('   POST /items');
});

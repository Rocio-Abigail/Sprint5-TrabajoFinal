// Importa Express y el middleware method-override para habilitar métodos PUT y DELETE desde formularios HTML
import express from 'express';
import methodOverride from 'method-override';

// Importa los controladores que manejan la lógica para cada ruta relacionada con países
import {
  mostrarFormularioEdicionPais,
  crearPaisController,
  listarPaisesController,
  editarPaisController,
  eliminarPaisController,
  mostrarDashboard 
} from '../controllers/paisesController.mjs';
// Importa los middlewares para validar datos y transformar campos de tipo array

import { validarPais } from '../middlewares/validacionesPais.mjs';
 import { transformarCamposArray } from '../middlewares/validacionesPais.mjs';
import { manejarErroresDeValidacion } from '../middlewares/validarErrores.mjs';

// Crea el router de Express
const router = express.Router();

// Aplica el middleware method-override para soportar PUT y DELETE en formularios HTML
router.use(methodOverride('_method'));

// Ruta para listar todos los países
router.get('/paises', listarPaisesController);

// Ruta para mostrar la página de inicio
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});
// Ruta para mostrar el dashboard con los paises
router.get('/dashboard-paises', mostrarDashboard); 

// Ruta para mostrar el Formulario para agregar un nuevo país
router.get('/paises/agregar', (req, res) => {
  res.render('addPais', { title: 'Agregar País', errores: [], datos: {} });
});

// Ruta para crear un nuevo país
// Se aplican los middlewares para transformar campos, validar, y manejar errores antes de llamar al controlador
router.post('/paises',transformarCamposArray, validarPais, manejarErroresDeValidacion, crearPaisController);

// Formulario de edición
router.get('/paises/:id/edit', mostrarFormularioEdicionPais);

// Editar un país existente
// Se aplican los mismos middlewares de transformación, validación y manejo de errores
router.put('/paises/:id',transformarCamposArray, validarPais, manejarErroresDeValidacion, editarPaisController);

// Ruta para Eliminar un país por su Id
router.delete('/paises/:id', eliminarPaisController);

// Exporta el router para ser usado en la app principal
export default router;


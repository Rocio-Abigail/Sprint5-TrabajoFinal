import express from 'express';
import methodOverride from 'method-override';

import {
  mostrarFormularioNuevoPais,
  mostrarFormularioEdicionPais,
  crearPaisController,
  listarPaisesController,
  editarPaisController,
  eliminarPaisController,
  mostrarDashboard // Ruta para mostrar el dashboard
} from '../controllers/paisesController.mjs';

import { validarPais } from '../middlewares/validacionesPais.mjs';
 import { transformarCamposArray } from '../middlewares/validacionesPais.mjs';
import { manejarErroresDeValidacion } from '../middlewares/validarErrores.mjs';

const router = express.Router();

router.use(methodOverride('_method'));

// Ruta para listar todos los países
router.get('/paises', listarPaisesController);

router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

router.get('/dashboard-paises', mostrarDashboard);  // Ruta para dashboard-paises

// Formulario para agregar un nuevo país
router.get('/paises/agregar', (req, res) => {
  res.render('addPais', { title: 'Agregar País', errores: [], datos: {} });
});

// Crear un nuevo país
router.post('/paises',transformarCamposArray, validarPais, manejarErroresDeValidacion, crearPaisController);

// Formulario de edición
router.get('/paises/:id/edit', mostrarFormularioEdicionPais);

// Editar un país existente
router.put('/paises/:id',transformarCamposArray, validarPais, manejarErroresDeValidacion, editarPaisController);

// Eliminar un país
router.delete('/paises/:id', eliminarPaisController);

export default router;


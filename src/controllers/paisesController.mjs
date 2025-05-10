import { validationResult } from 'express-validator';
import {
  obtenerTodosLosPaises,
  obtenerPaisPorId,
  crearPais,
  actualizarPais,
  eliminarPais,
} from '../services/paisesService.mjs';
import { renderizarListaPaises } from '../views/responseView.mjs';

// Mostrar todos los países en formato JSON
export async function listarPaisesController(req, res) {
  try {
    const paises = await obtenerTodosLosPaises();
    res.status(200).json(renderizarListaPaises(paises));
  } catch (error) {
    console.error('[Controlador] Error al listar países:', error);
    res.status(500).json({ mensaje: 'Error al listar países', error: error.message });
  }
}

export async function mostrarDashboard(req, res) {
  try {
    const paises = await obtenerTodosLosPaises();

    const totalPoblacion = paises.reduce((sum, p) => sum + (p.population || 0), 0);
    const totalArea = paises.reduce((sum, p) => sum + (p.area || 0), 0);
    const giniValidos = paises.filter(p => typeof p.gini === 'number');
    const giniValues = paises
  .map(p => {
    const valoresGini = p.gini ? Object.values(p.gini) : [];
    return valoresGini.length > 0 ? valoresGini[0] : null;
  })
  .filter(v => typeof v === 'number');

const promedioGini = giniValues.reduce((sum, g) => sum + g, 0) / (giniValues.length || 1);


    res.render('dashboard-paises', {
      paises,
      totalArea,
      totalPoblacion,
      promedioGini: isNaN(promedioGini) ? 'N/A' : promedioGini.toFixed(2),
       title: 'Dashboard de Países'
    });
  } catch (error) {
    console.error('Error al mostrar el dashboard:', error);
    res.status(500).send('Error interno del servidor');
  }
}


// Formulario para agregar país (GET)
export function mostrarFormularioNuevoPais(req, res) {
  res.render('addPais', {
    title: 'Agregar País',
    errores: [],
    datos: {}
  });
}

export async function crearPaisController(req, res) {
  console.log('[Controlador] petición recibida para crear un nuevo pais', req.body);

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log('[Controlador] Errores de validación:', errores.array());
    return res.status(400).render('addPais', {
      errores: errores.array(),
      datos: req.body,
      title: 'Agregar País'
    });
  }

  // Verifica si name.spa.official está presente en req.body
  if (!req.body.name || !req.body.name.spa || !req.body.name.spa.official) {
    return res.status(400).render('addPais', {
      errores: [{ msg: 'El campo "name.spa.official" es obligatorio.' }],
      datos: req.body,
      title: 'Agregar País'
    });
  }

  try {
    const nuevoPais = {
      ...req.body,
      area: parseFloat(req.body.area),
      population: parseInt(req.body.population),
      gini: { '2019': parseFloat(req.body.gini) },
      borders: req.body.borders || []
    };

    const resultado = await crearPais(nuevoPais);
    console.log('[Controlador] País creado con éxito:', resultado);
    return res.redirect('/api/dashboard-paises');
  } catch (error) {
    console.error('[Controlador] Error al agregar país:', error);
    return res.status(500).render('addPais', {
      errores: [{ msg: 'Error interno al guardar el país.' }],
      datos: req.body,
      title: 'Agregar País'
    });
  }
}


// Mostrar formulario de edición (GET)
export async function mostrarFormularioEdicionPais(req, res) {
  try {
    const { id } = req.params;
    const pais = await obtenerPaisPorId(id);

    if (!pais) {
      return res.status(404).send('País no encontrado');
    }

    // Extraer valor del Gini (primer valor disponible)
    const giniValor = pais.gini ? Object.values(pais.gini)[0] : '';

    res.render('editPais', {
      pais,
      giniValor, // lo pasamos a la vista
      errores: [],
      title: 'Editar País'
    });
  } catch (error) {
    console.error('[Controlador] Error al mostrar formulario de edición:', error.message);
    res.status(500).send('Error al mostrar formulario de edición');
  }
}


// Editar país (PUT)
export async function editarPaisController(req, res) {
  const errores = validationResult(req);
  const { id } = req.params;

  if (!errores.isEmpty()) {
    const pais = { ...req.body, _id: id };
    return res.status(400).render('editPais', {
      errores: errores.array(),
      pais,
      title: 'Editar País'
    });
  }

  try {
    const datosActualizados = {
      ...req.body,
      area: parseFloat(req.body.area),
      population: parseInt(req.body.population),
      gini: new Map([['2019', parseFloat(req.body.gini)]]),
      borders: req.body.borders || []
    };

    const actualizado = await actualizarPais(id, datosActualizados);

    if (!actualizado) {
      return res.status(404).send('País no encontrado');
    }

    res.redirect('/api/dashboard-paises');
  } catch (error) {
    console.error('[Controlador] Error al editar país:', error.message);
    res.status(500).render('editPais', {
      errores: [{ msg: 'Error interno al editar el país.' }],
      pais: { ...req.body, _id: id },
      title: 'Editar País'
    });
  }
}

// Eliminar país (DELETE)
export async function eliminarPaisController(req, res) {
  console.log('[Controlador] Petición para eliminar país con ID:', req.params.id);

  try {
    const paisEliminado = await eliminarPais(req.params.id);

    if (!paisEliminado) {
      return res.status(404).json({ mensaje: 'País no encontrado' });
    }

    console.log('[Controlador] País eliminado:', paisEliminado);
    res.redirect('/api/dashboard-paises');
  } catch (error) {
    console.error('[Controlador] Error al eliminar país:', error);
    res.status(500).json({ mensaje: 'Error al eliminar país', error: error.message });
  }
}

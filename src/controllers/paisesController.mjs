// Importamos validationResult para capturar errores de validación del middleware express-validator
import { validationResult } from 'express-validator';

// Importamos funciones del servicio que interactúa con la base de datos
import {
  obtenerTodosLosPaises,
  obtenerPaisPorId,
  crearPais,
  actualizarPais,
  eliminarPais,
} from '../services/paisesService.mjs';

// Importamos una función de vista para formatear la respuesta en JSON
import { renderizarListaPaises } from '../views/responseView.mjs';


// Mostrar todos los países en formato JSON
export async function listarPaisesController(req, res) {
  try {
    const paises = await obtenerTodosLosPaises();
    res.status(200).json(renderizarListaPaises(paises)); // Responde con los países formateados
  } catch (error) {
    console.error('[Controlador] Error al listar países:', error);
    res.status(500).json({ mensaje: 'Error al listar países', error: error.message });
  }
}

// Mostrar el dashboard en vista renderizada con EJS
export async function mostrarDashboard(req, res) {
  try {
    const paises = await obtenerTodosLosPaises({ creador: "Rocio Ruiz" });

    // Normaliza el nombre oficial del país para facilitar su visualización
    const paisesConNombreOficial = paises.map(pais => {
      let nombreOficial = '—';
      if (pais.name?.nativeName?.spa?.official) {
        nombreOficial = pais.name.nativeName.spa.official;
      } else if (pais.name?.spa?.official) {
        nombreOficial = pais.name.spa.official;
      } else if (pais.name?.official) {
        nombreOficial = pais.name.official;
      }

      return {
        ...pais,
        nombreOficial
      };
    });

    // Calcular totales
    const totalPoblacion = paisesConNombreOficial.reduce((sum, p) => sum + (p.population || 0), 0);
    const totalArea = paisesConNombreOficial.reduce((sum, p) => sum + (p.area || 0), 0);

    // Calcular promedio de Gini si existe
    const giniValues = paisesConNombreOficial
      .map(p => {
        const valoresGini = p.gini ? Object.values(p.gini) : [];
        return valoresGini.length > 0 ? valoresGini[0] : null;
      })
      .filter(v => typeof v === 'number');

    const promedioGini = giniValues.reduce((sum, g) => sum + g, 0) / (giniValues.length || 1);

    // Renderiza la vista EJS con datos
    res.render('dashboard-paises', {
      paises: paisesConNombreOficial,
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

// Mostrar el formulario para agregar un país (GET)
export function mostrarFormularioNuevoPais(req, res) {
  res.render('addPais', {
    title: 'Agregar País',
    errores: [],
    datos: {}
  });
}

// Procesar la creación de un nuevo país (POST)
export async function crearPaisController(req, res) {
  console.log('[Controlador] petición recibida para crear un nuevo pais', req.body);

  // Validar errores del formulario
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log('[Controlador] Errores de validación:', errores.array());
    return res.status(400).render('addPais', {
      errores: errores.array(),
      datos: req.body,
      title: 'Agregar País'
    });
  }

  // Validar manualmente campo obligatorio adicional
  if (!req.body.officialName) {
    return res.status(400).render('addPais', {
      errores: [{ msg: 'El campo "Nombre Oficial" es obligatorio.' }],
      datos: req.body,
      title: 'Agregar País'
    });
  }

  try {
    // Construir objeto de país a partir de los datos del formulario
    const nuevoPais = {
      ...req.body,
      name: {
        common: req.body.officialName,
        official: req.body.officialName,
        nativeName: {
          spa: {
            official: req.body.officialName,
            common: req.body.officialName
          }
        }
      },
      area: parseFloat(req.body.area),
      population: parseInt(req.body.population),
      gini: { '2019': parseFloat(req.body.gini) },
      borders: req.body.borders,
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

// Mostrar el formulario de edición para un país específico
export async function mostrarFormularioEdicionPais(req, res) {
  try {
    const { id } = req.params;
    const pais = await obtenerPaisPorId(id);

    if (!pais) {
      return res.status(404).send('País no encontrado');
    }

    // Obtener valor de Gini desde el objeto o Map
    let giniValor = '';
    if (pais.gini instanceof Map) {
      giniValor = [...pais.gini.values()][0];
    } else if (typeof pais.gini === 'object' && pais.gini !== null) {
      giniValor = Object.values(pais.gini)[0];
    }

    res.render('editPais', {
      pais,
      giniValor,
      errores: [],
      title: 'Editar País'
    });
  } catch (error) {
    console.error('[Controlador] Error al mostrar formulario de edición:', error.message);
    res.status(500).send('Error al mostrar formulario de edición');
  }
}

// Procesar la edición de un país (PUT)
export async function editarPaisController(req, res) {
  const errores = validationResult(req);
  const { id } = req.params;

  if (!errores.isEmpty()) {
    const pais = { ...req.body, _id: id };
    const giniValor = req.body.gini || '';
    return res.status(400).render('editPais', {
      errores: errores.array(),
      pais,
      giniValor,
      title: 'Editar País'
    });
  }

  try {
    // Armar objeto actualizado con los datos del formulario
    const datosActualizados = {
      name: {
        common: req.body.officialName,
        official: req.body.officialName,
        nativeName: {
          spa: {
            official: req.body.officialName,
            common: req.body.officialName
          }
        }
      },
      area: parseFloat(req.body.area),
      population: parseInt(req.body.population),
      gini: { "2019": parseFloat(req.body.gini) },
      borders: req.body.borders,
      creador: req.body.creador
    };

    const actualizado = await actualizarPais(id, datosActualizados);

    if (!actualizado) {
      return res.status(404).send('País no encontrado');
    }

    res.redirect('/api/dashboard-paises');
  } catch (error) {
    console.error('[Controlador] Error al editar país:', error.message);

    const pais = { ...req.body, _id: id };
    const giniValor = req.body.gini || '';

    res.status(500).render('editPais', {
      errores: [{ msg: 'Error interno al editar el país.' }],
      pais,
      giniValor,
      title: 'Editar País'
    });
  }
}

// Eliminar un país (DELETE)
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

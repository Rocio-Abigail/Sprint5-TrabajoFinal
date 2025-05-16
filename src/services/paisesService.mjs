// Importa el repositorio que maneja las operaciones con la base de datos
import paisRepository from '../repositories/paisRepository.mjs';

/**
 * Servicio para obtener todos los países.
 * Permite aplicar un filtro opcional (por creador).
 */
export async function obtenerTodosLosPaises(filtro = {}) {
  console.log("[Servicio] Obteniendo todos los países...");
  try {
    const paises = await paisRepository.obtenerTodos(filtro);
    console.log("[Servicio] Países obtenidos:", paises);
    return paises;
  } catch (error) {
    console.error("[Servicio] Error al obtener todos los países:", error);
    throw error; 
  }
}

// Servicio para obtener un país específico por su ID.

export async function obtenerPaisPorId(id) {
  console.log("[Servicio] Obteniendo país por ID:", id);
  try {
    const pais = await paisRepository.obtenerPorId(id);
    console.log("[Servicio] País obtenido:", pais);
    return pais;
  } catch (error) {
    console.error("[Servicio] Error al obtener país por ID:", error);
    throw error;
  }
}
/**
 * Servicio para crear un nuevo país en la base de datos.
 * Recibe un objeto con los datos del país a crear.
 */
export async function crearPais(datosPais) {
  console.log("[Servicio] Creando país con datos:", datosPais);
  try {
    const nuevoPais = await paisRepository.crearPais(datosPais);
    console.log("[Servicio] País creado:", nuevoPais);
    return nuevoPais;
  } catch (error) {
    console.error("[Servicio] Error al crear país:", error);
    throw error;
  }
}
/**
 * Servicio para actualizar un país existente.
 * Requiere el ID del país a modificar y los nuevos datos.
 */
export async function actualizarPais(id, datosActualizados) {
  console.log("[Servicio] Actualizando país con ID:", id, "Datos:", datosActualizados);
  try {
    const paisActualizado = await paisRepository.actualizarPais(id, datosActualizados);
    console.log("[Servicio] País actualizado:", paisActualizado);
    return paisActualizado;
  } catch (error) {
    console.error("[Servicio] Error al actualizar país:", error);
    throw error;
  }
}
/**
 * Servicio para eliminar un país por su ID.
 */
export async function eliminarPais(id) {
  console.log("[Servicio] Eliminando país con ID:", id);
  try {
    const paisEliminado = await paisRepository.eliminarPais(id);
    console.log("[Servicio] País eliminado:", paisEliminado);
    return paisEliminado;
  } catch (error) {
    console.error("[Servicio] Error al eliminar país:", error);
    throw error;
  }
}

// Importa el modelo 'Pais' que representa la colección de países en MongoDB
import Pais from '../models/Pais.mjs';
// import IRepository from './IRepository.mjs'; // Comentado: posiblemente se use para herencia o implementación futura


// Clase que encapsula operaciones de base de datos para la colección de países
class PaisRepository {

   // Método para obtener todos los países que tengan un 'name.official' definido,
  // combinando con filtros adicionales si se proporciona
 async obtenerTodos(filtroAdicional = {}) {
    const filtroBase = { 'name.official': { $exists: true }, ...filtroAdicional };
    return await Pais.find(filtroBase).lean(); //.lean() retorna objetos JavaScript simples en lugar de documentos Mongoose
  }

    // Método para obtener un país por su ID de MongoDB
  async obtenerPorId(id) {
    return await Pais.findById(id);
  }
  // Método para crear un nuevo país con los datos proporcionados
  async crearPais(datos) {
    return await Pais.create(datos);
  }
// Método para actualizar un país existente por su ID
// El parámetro { new: true } hace que se devuelva el documento actualizado
  async actualizarPais(id, datos) {
    return await Pais.findByIdAndUpdate(id, datos, { new: true });
  }
 // Método para eliminar un país por su ID
  async eliminarPais(id) {
    return await Pais.findByIdAndDelete(id);
  }
}

// Exporta una instancia única de la clase PaisRepository
export default new PaisRepository();

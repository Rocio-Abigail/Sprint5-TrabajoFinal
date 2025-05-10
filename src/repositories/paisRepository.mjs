import Pais from '../models/Pais.mjs';
// import IRepository from './IRepository.mjs';

class PaisRepository {
  async obtenerTodos() {
    return await Pais.find({'name.official': { $exists: true }}).lean();
  }

  async obtenerPorId(id) {
    return await Pais.findById(id);
  }

  async crearPais(datos) {
    return await Pais.create(datos);
  }

  async actualizarPais(id, datos) {
    return await Pais.findByIdAndUpdate(id, datos, { new: true });
  }

  async eliminarPais(id) {
    return await Pais.findByIdAndDelete(id);
  }
}

export default new PaisRepository();

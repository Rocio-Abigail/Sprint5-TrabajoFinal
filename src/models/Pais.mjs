
import mongoose from 'mongoose';

const PaisSchema = new mongoose.Schema({
  name: {
      common: String,
     official: String,
    spa: {
      common: String,
      official: { type: String}
    }
  },
  capital: [String],
  borders: [String],
  area: Number,
  population: Number,
  gini: {
    type: Map,
    of: Number
  },
  timezones: [String],
  creador: String
});

const Pais = mongoose.model('Pais', PaisSchema, 'Grupo-13'); // Tercer parámetro = nombre explícito de la colección
export default Pais;

// import mongoose from 'mongoose';

// const superheroSchema = new mongoose.Schema({
//     nombreSuperHeroe: { type: String, required: true},
//     nombreReal: {type: String, required: true },
//     edad: {type: Number, min: 0 },
//     planetaOrigen: {type: String, default: 'Desconocido'},
//     debilidad: String,
//     poderes: [String],
//     aliados: [String],
//     enemigos: [String],
//     creador: String,
//     createdAt: {type: Date, default: Date.now}
// });
// const superHero = mongoose.model('SuperHero', superheroSchema, 'Grupo-13');
// export default superHero
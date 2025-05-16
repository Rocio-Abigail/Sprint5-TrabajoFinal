// Importa mongoose, una biblioteca ODM (Object Data Modeling) para MongoDB
import mongoose from 'mongoose';

// Define el esquema de Mongoose para un documento del modelo Pais
const PaisSchema = new mongoose.Schema({
   // Campo 'name', que es un objeto con varias propiedades
  name: {
      common: String,
     official: String,
    spa: {
      common: String,
      official: { type: String}
    }
  },
   // Campo 'capital': array de strings (puede haber más de una capital)
  capital: [String],

  // Campo 'borders': array de strings que representa códigos de países fronterizos
  borders: [String],

  // Campo 'area': número que representa el área del país en km²
  area: Number,

  // Campo 'population': número que representa la población del país
  population: Number,

  // Campo 'gini': un mapa de año → valor del índice de Gini (número entre 0 y 100)
  gini: {
    type: Map,  // Tipo Mongoose para representar objetos dinámicos
    of: Number   // Cada valor del mapa debe ser un número
  },
 // Campo 'timezones': array de strings con las zonas horarias del país
  timezones: [String],

  // Campo 'creador': string que representa quién registró el país
  creador: String
});

// Crea el modelo 'Pais' basado en el esquema definido y lo asocia con la colección 'Grupo-13'
const Pais = mongoose.model('Pais', PaisSchema, 'Grupo-13');

// Exporta el modelo para poder usarlo en otras partes del proyecto
export default Pais;

import fetch from 'node-fetch';
import mongoose from 'mongoose';
import { connectDB } from '../config/dbConfig.mjs';

// Conectar a la base de datos
await connectDB();

// Definir un esquema laxo y modelo
const paisSchema = new mongoose.Schema({}, { strict: false });
const Pais = mongoose.model('Pais', paisSchema, 'Grupo-13');

// Función para consumir la API y procesar los países
const cargarPaises = async () => {
  try {
    // Obtener los países desde la API
    const response = await fetch('https://restcountries.com/v3.1/all');
    const paises = await response.json();

    // Filtrar países que tienen español como idioma
    const paisesHispanohablantes = paises.filter(pais => 
      pais.languages && pais.languages.spa
    );

    // Procesar los datos
    const paisesProcesados = paisesHispanohablantes.map(pais => {
      // Mostrar nombre del país en consola
      console.log('Agregando país:', pais.name.common);

      // Eliminar propiedades no deseadas
      const {
        translations, tld, cca2, ccn3, cca3, cioc, idd,
        altSpellings, car, coatOfArms, postalCode, demonyms,
        ...restoPais
      } = pais;

      // Agregar propiedad "creador"
      return {
        ...restoPais,
        creador: 'Rocio Ruiz',
      };
    });

    // Insertar en MongoDB
    await Pais.insertMany(paisesProcesados);
    console.log('Países cargados correctamente en MongoDB');

  } catch (error) {
    console.error('Error al cargar los países:', error);
  } finally {
    mongoose.connection.close();
  }
};

cargarPaises();




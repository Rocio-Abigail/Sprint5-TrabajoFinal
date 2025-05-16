// Función para formatear un objeto "pais" y devolver solo las propiedades relevantes
export function renderizarPais(pais) {
    return {
      nombreOficial: pais.name?.official,  // Extrae el nombre oficial del país (si existe)
      capital: pais.capital,   // Capital del país (puede ser un arreglo)
      area: pais.area,  // Superficie del país en km²
      poblacion: pais.population,  // Población total del país
      gini: pais.gini, // Índice GINI (mide la desigualdad)
      "Zonas Horarias" : pais.timezones,   // Zonas horarias 
      fronteras: pais.borders,     // Países fronterizos
      creador: pais.creador     // Nombre del creador que registró el país en la base de datos
    };
  }
  // Función que toma una lista de países y aplica la función renderizarPais a cada uno
  // Formatea una lista de países para mostrar en JSON
  export function renderizarListaPaises(listaPaises) {
    return listaPaises.map(renderizarPais);
  }


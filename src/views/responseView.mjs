export function renderizarPais(pais) {
    return {
      id: pais._id,
      nombreOficial: pais.name?.official,
      capital: pais.capital,
      area: pais.area,
      poblacion: pais.population,
      gini: pais.gini,
      fronteras: pais.borders,
      creador: pais.creador
    };
  }
  
  // Formatear una lista de países para mostrar en JSON
  export function renderizarListaPaises(listaPaises) {
    return listaPaises.map(renderizarPais);
  }

// export function renderizarPaises(pais){
//     return {
//         Nombre: pais.nombrePais,
//         Capital: pais.capital, 
//         "Paises Limítrofes": pais.limitrofes,
//         Area: pais.area, 
//         Poblacion: pais.poblacion, 
//         gini: pais.gini,
//         "Zonas Horarias" : pais.zonaHoraria, 
//         Creador: pais.creador
// };
// }

// export function renderizarListaPaises(paises){
//     return paises.map(pais => renderizarPaises(pais))
// }


// export function renderizarSuperheroe(superheroe) {
//     return {
//         Nombre: superheroe.nombreSuperHeroe,
//         "Nombre Real": superheroe.nombreReal,
//         Edad: superheroe.edad,
//         "Planeta de Origen": superheroe.planetaOrigen,
//         Debilidad: superheroe.debilidad,
//         Poderes: superheroe.poderes,
//         Aliados: superheroe.aliados,
//         Enemigos: superheroe.enemigos
//     };
// }

// export function renderizarListaSuperheroes(superheroes) {
//     return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
// }

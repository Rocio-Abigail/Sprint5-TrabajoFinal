class IRepository{
    obtenerPorId(id){
        throw new Error('Metodo obtenerPorID() no implementado');
    }

    obtenerTodos(){
        throw new Error('Método obtenerTodos() no implementado');
    }

    buscarPorAtributo( atributo, valor){
        throw new Error('Método buscarPorAtributo() no implementado');
    }

    insertarPais(nuevoPais){
        throw new Error ('Método insertarPais() no implementado')
    }

}

export default IRepository;


// class IRepository {
//     obtenerPorId(id) {
//         throw new Error("Método 'ObtenerPorId()' no implementado");
//     }
//     obtenerTodos() {
//         throw new Error("Método 'obtenerTodos()' no implementado");
//     }
//     buscarPorAtributo(atributo, valor) {
//         throw new Error("Método 'buscarPorAtributo()' no implementado");
//     }
//     obtenerMayoresDe30() {
//         throw new Error("Método 'obtenerMayoresDe30()' no implementado");
//     }
// }

// export default IRepository;
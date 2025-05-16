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

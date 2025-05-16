// Importamos el módulo 'mongoose' para interactuar con MongoDB desde Node.js
import mongoose from 'mongoose';

// Definimos una función asíncrona que se encargará de conectar nuestra aplicación a la base de datos
export async function connectDB() {
    try {
        // Intentamos conectarnos a MongoDB usando una URI de conexión con credenciales y nombre de clúster
        await mongoose.connect('mongodb+srv://Grupo-13:grupo13@cursadanodejs.ls9ii.mongodb.net/Node-js');

        // Si la conexión fue exitosa, se muestra este mensaje en consola
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        // Si ocurre un error durante la conexión, lo mostramos en consola
        console.error('Error al conectar a MongoDB:', error);

        // Finalizamos el proceso con un código de error (1) para indicar que algo salió mal
        process.exit(1);
    }
}

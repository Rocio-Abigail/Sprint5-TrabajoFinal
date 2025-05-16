// Middleware para manejar errores

// Importa la función validationResult de express-validator
// Esta función sirve para recopilar los errores resultantes de las validaciones previas en la solicitud
import { validationResult } from 'express-validator';

// Middleware personalizado para manejar errores de validación
export const manejarErroresDeValidacion = (req, res, next) => {

   // Extrae los errores de validación de la solicitud actual
    const errores = validationResult(req);
      // Si hay errores de validación
    if (!errores.isEmpty()) {
       // Muestra por consola los errores encontrados
      console.log('[VALIDACIÓN] Errores encontrados:', errores.array());
      
    // Devuelve una respuesta con estado 400 (Bad Request) y un objeto JSON con los errores
      return res.status(400).json({
        //status: 'error',
          // message general de error
        message: 'Validation failed',

         // Formatea cada error para mostrar solo el campo y el mensaje correspondiente
        errors: errores.array().map(error => ({
            field: error.param, // El nombre del campo con error
            message: error.msg, // El mensaje de error personalizado
        }))
    });
    }
    // Si no hay errores, muestra mensaje por consola y pasa al siguiente middleware o controlador
    console.log('[VALIDACIÓN] No se encontraron errores. Continúa al controlador.');
    next();
  };

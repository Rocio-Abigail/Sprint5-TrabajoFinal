// Middleware para manejar errores
import { validationResult } from 'express-validator';
export const manejarErroresDeValidacion = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      console.log('[VALIDACIÓN] Errores encontrados:', errores.array());
      return res.status(400).json({
        //status: 'error',
        message: 'Validation failed',
        errors: errores.array().map(error => ({
            field: error.param,
            message: error.msg,
        }))
    });
    }
  
    console.log('[VALIDACIÓN] No se encontraron errores. Continúa al controlador.');
    next();
  };

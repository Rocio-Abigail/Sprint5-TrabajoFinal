// Importa funciones de express-validator:
// - body: para validar campos específicos del body de la petición.
// - validationResult: para verificar si hay errores luego de las validaciones.
import { body,validationResult } from 'express-validator';

// Middleware de validación de datos para crear o editar un país
export const validarPais = [

   // Validación del campo 'officialName' (nombre oficial del país)
  body('officialName')
    .trim() // Elimina espacios en blanco al inicio y al final
    .notEmpty().withMessage('El nombre oficial es obligatorio.') // No puede estar vacío
    .isLength({ min: 3, max: 90 }).withMessage('Debe tener entre 3 y 90 caracteres.'), // Longitud mínima y máxima
   
  // Validación del campo 'capital' (debe ser un array con al menos una cadena válida)
  body('capital')
    .notEmpty().withMessage('La capital es obligatoria.')
    .isArray({ min: 1 }).withMessage('La capital debe ser un array.') // Debe ser un array con al menos un elemento
    .custom((arr) => arr.every(c => typeof c === 'string' && c.length >= 3 && c.length <= 90))
    .withMessage('Cada capital debe tener entre 3 y 90 caracteres.'), // Cada elemento debe ser string y tener longitud válida

  // Validación del campo 'borders' (opcional, pero si existe, debe ser un array de códigos de 3 letras mayúsculas)
  
  body('borders')
    .optional({ nullable: true }) // Campo opcional (puede estar ausente o ser null)
    .isArray().withMessage('Fronteras debe ser un array.') // Si existe, debe ser array
    .custom((arr) => arr.every(code => /^[A-Z]{3}$/.test(code)))
    .withMessage('Cada frontera debe ser un código de 3 letras mayúsculas.'),// Cada elemento debe ser un código de 3 letras
// Validación del campo 'area'
  body('area')
    .notEmpty().withMessage('El área es obligatoria.')  // Campo requerido
    .isFloat({ gt: 0 }).withMessage('El área debe ser un número positivo.'),// Debe ser un número flotante positivo

      // Validación del campo 'población'
  body('population')
    .notEmpty().withMessage('La población es obligatoria.') // Campo requerido
    .isInt({ gt: 0 }).withMessage('La población debe ser un número entero positivo.'),

  // Validación del campo 'gini'
  body('gini')
    .optional({ nullable: true }) // Campo opcional
    .isFloat({ min: 0, max: 100 }).withMessage('El índice Gini debe estar entre 0 y 100.'), // Si existe, debe ser número entre 0 y 100

    // Validación del campo 'Zonas Horarias'
  body('timezones')
    .notEmpty().withMessage('Las zonas horarias son obligatorias.')// Campo requerido
    .isArray({ min: 1 }).withMessage('Debe contener al menos una zona horaria.'),// Debe ser array con al menos un elemento

  // Middleware para continuar
  (req, res, next) => {
    console.log('[VALIDACIÓN] Ejecutando validaciones para país...');
    next();
  }
];
// Middleware para transformar strings en arrays
// transforma campos tipo string en arrays, separando por comas
export const transformarCamposArray = (req, res, next) => {
  const transformar = campo => { 
    if (typeof req.body[campo] === 'string') {  // Si el campo es string
      req.body[campo] = req.body[campo]  
        .split(',')  // Separa por comas
        .map(e => e.trim())  // Elimina espacios extra
        .filter(e => e !== ''); // Elimina cadenas vacías
    }
  };
  
   // Aplica la transformación a los campos que deben ser arrays
  ['capital', 'timezones', 'borders'].forEach(transformar);

  console.log('[TRANSFORMAR] Convertidos a arrays:', {
    capital: req.body.capital,
    timezones: req.body.timezones,
    borders: req.body.borders,
  });

  next();
};




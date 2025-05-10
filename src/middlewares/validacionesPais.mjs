import { body,validationResult } from 'express-validator';

export const validarPais = [
  body('name.official')
    .trim()
    .notEmpty().withMessage('El nombre oficial es obligatorio.')
    .isLength({ min: 3, max: 90 }).withMessage('Debe tener entre 3 y 90 caracteres.'),

  body('capital')
    .notEmpty().withMessage('La capital es obligatoria.')
    .isArray({ min: 1 }).withMessage('La capital debe ser un array.')
    .custom((arr) => arr.every(c => typeof c === 'string' && c.length >= 3 && c.length <= 90))
    .withMessage('Cada capital debe tener entre 3 y 90 caracteres.'),

  body('borders')
    .optional({ nullable: true })
    .isArray().withMessage('Fronteras debe ser un array.')
    .custom((arr) => arr.every(code => /^[A-Z]{3}$/.test(code)))
    .withMessage('Cada frontera debe ser un código de 3 letras mayúsculas.'),

  body('area')
    .notEmpty().withMessage('El área es obligatoria.')
    .isFloat({ gt: 0 }).withMessage('El área debe ser un número positivo.'),

  body('population')
    .notEmpty().withMessage('La población es obligatoria.')
    .isInt({ gt: 0 }).withMessage('La población debe ser un número entero positivo.'),

  body('gini')
    .optional({ nullable: true })
    .isFloat({ min: 0, max: 100 }).withMessage('El índice Gini debe estar entre 0 y 100.'),

  body('timezones')
    .notEmpty().withMessage('Las zonas horarias son obligatorias.')
    .isArray({ min: 1 }).withMessage('Debe contener al menos una zona horaria.'),

  // Middleware para continuar
  (req, res, next) => {
    console.log('[VALIDACIÓN] Ejecutando validaciones para país...');
    next();
  }
];
// Middleware para transformar strings en arrays
export const transformarCamposArray = (req, res, next) => {
  const transformar = campo => {
    if (typeof req.body[campo] === 'string') {
      req.body[campo] = req.body[campo]
        .split(',')
        .map(e => e.trim())
        .filter(e => e !== '');
    }
  };

  ['capital', 'timezones', 'borders'].forEach(transformar);

  console.log('[TRANSFORMAR] Convertidos a arrays:', {
    capital: req.body.capital,
    timezones: req.body.timezones,
    borders: req.body.borders,
  });

  next();
};




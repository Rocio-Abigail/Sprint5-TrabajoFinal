# Sprint5-TrabajoFinal
Este es el proyecto final del tercer modulo de la diplomatura

# 🌍 Países Hispanohablantes- Grupo 13
Proyecto web que permite administrar información de países hispanohablantes, incluyendo su capital, fronteras, área, población, índice de Gini y creador. Los datos se obtienen inicialmente desde una API externa y se almacenan en MongoDB.

## 🚀 Funcionalidades

-  Cargar países hispanohablantes desde la API `https://restcountries.com/v3.1/all`
- CRUD completo: crear, leer, actualizar y eliminar países
-  Validaciones de datos en backend (Express-validator)
-  Vista tipo dashboard con estadísticas
- Interfaz con EJS y Tailwind CSS
- Estructura por capas: controladores, servicios, rutas, middlewares

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- EJS
- Tailwind CSS
- Express-Validator
- Method-Override

  ## 📦 Instalación
  
1. Clonar repositorio y entrar a la carpeta
   
git clone https://github.com/Rocio-Abigail/Sprint5-TrabajoFinal.git

cd src

2. Instalar dependencias
   
npm install

3. Configurar la conexión a MongoDB
   
const uri = 'mongodb+srv://Grupo-13:grupo13@cursadanodejs.ls9ii.mongodb.net/Node-js'

4. Cargar países desde la API
   
node scripts/importarPaises.mjs

5. Iniciar la aplicación
   
npm start

Abrir en el navegador: http://localhost:3000/paises

 ## ✍️ Autor
Rocio Abigail Ruiz- Grupo 13 
Proyecto realizado en el marco del tercer módulo de la diplomatura en desarrollo web fullstack del Nodo tecnológico y la Universidad Nacional de Catamarca.

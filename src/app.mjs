// Importación de módulos necesarios
import express from 'express'; // Framework web para Node.js
import { connectDB } from './config/dbConfig.mjs'; // Función para conectar a la base de datos MongoDB
import paisesRoutes from './routes/paisesRoutes.mjs';// Función para conectar a la base de datos MongoDB
import path from 'path'; // Módulo para trabajar con rutas de archivos
import { fileURLToPath } from 'url'; // Necesario para obtener __dirname en ES Modules
import methodOverride from 'method-override'; // Permite usar métodos HTTP como PUT y DELETE desde formularios HTML
import expressLayouts from 'express-ejs-layouts';  // Middleware para usar layouts con EJS

const app = express(); // Crear la aplicación de Express
const PORT = process.env.PORT || 3000; // Puerto por defecto o el definido en variables de entorno

// Obtener la ruta del directorio actual (por usar módulos ES)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));


// Middleware para establecer un título por defecto si no se define
app.use((req, res, next) => {
    res.locals.title = 'paisesApp';
    next();
  });

// Configurar EJS con layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Carpeta donde estarán los archivos .ejs
app.use(expressLayouts);
app.set('layout', 'layout');

// Middleware para parsear JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true })); //esta linea es importante para que express pueda leer los datos del formulario

app.use(methodOverride('_method')); // este método permite solicitudes PUT en html

// Conexión a base de datos
connectDB();

// Registra las rutas bajo el prefijo "/api"
app.use('/api', paisesRoutes);

// Middleware para manejar rutas no definidas (Error 404)
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

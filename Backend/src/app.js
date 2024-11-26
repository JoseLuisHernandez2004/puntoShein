import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Importar middleware de CORS
import helmet from 'helmet'; // Importar helmet para la seguridad
import rateLimit from 'express-rate-limit'; // Importar rate-limit para limitar peticiones

import authRoutes from './routes/auth.routes.js';
import errorRoutes from './routes/error.routes.js';
import documentRoutes from './routes/document.routes.js';
import userRoutes from './routes/user.routes.js';
import companyProfileRoutes from './routes/companyProfile.routes.js';

const app = express();

// Middleware de seguridad
app.use(helmet());

// Configuración de CORS
const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000', 'https://puntoshein.netlify.app', 'https://puntoshein.com'];
app.use(cors({
  origin: allowedOrigins, // Utilizar variables de entorno para los orígenes permitidos
  credentials: true, // Permitir cookies y encabezados
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

// Limitar el número de peticiones por usuario
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar cada IP a 100 peticiones por ventana de tiempo
  message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.',
});
app.use(limiter);

// Middlewares generales
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); // Para manejar cookies

// Rutas
app.use('/api', authRoutes);
app.use('/api', errorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/company-profile', companyProfileRoutes); // Registrar rutas del perfil de la empresa

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Ocurrió un error en el servidor',
  });
});

export default app;

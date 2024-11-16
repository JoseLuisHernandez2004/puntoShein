import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Importar middleware de CORS
import authRoutes from './routes/auth.routes.js';
import errorRoutes from './routes/error.routes.js';
import documentRoutes from './routes/document.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://puntoshein.netlify.app'], // URLs permitidas
  credentials: true,  // Permitir cookies y encabezados
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());  // Para manejar cookies

// Rutas
app.use('/api', authRoutes);
app.use('/api', errorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
export default app;

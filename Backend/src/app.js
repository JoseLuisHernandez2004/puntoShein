import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import CORS middleware

import authRoutes from './routes/auth.routes.js';


const app = express();

// Use CORS middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://puntoshein.netlify.app'], // Your React app's URL
  origin: '*',
  credentials: true, // Allow credentials (cookies, headers)
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());  
app.use('/api', authRoutes);

export default app;

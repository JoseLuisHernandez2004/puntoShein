import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'; // Cambia esto a "import * as dotenv from 'dotenv';"

dotenv.config(); // Cargar variables de entorno desde .env

async function bootstrap() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI); // Asegúrate de que la variable está definida en tu .env
    console.log('Conectado a la base de datos MongoDB');

    // Crear la aplicación Nest
    const app = await NestFactory.create(AppModule);
    
    // Configurar el puerto donde se ejecutará el servidor
    const PORT = process.env.PORT || 3001; 
    await app.listen(PORT);
    
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Iniciar la aplicación
bootstrap();

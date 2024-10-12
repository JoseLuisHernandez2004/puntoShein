import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'; // Importar dotenv

dotenv.config(); // Cargar variables de entorno desde el archivo .env

async function bootstrap() {
  try {
    // Conectar a MongoDB usando la variable de entorno
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos MongoDB');

    const app = await NestFactory.create(AppModule);
    app.enableCors(); // Habilitar CORS

    // Configurar el puerto desde la variable de entorno
    const PORT = process.env.PORT || 3001;
    await app.listen(PORT);

    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

bootstrap();

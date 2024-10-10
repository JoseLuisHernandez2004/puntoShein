import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://luis2004hdez:P55LiaCTmaeL4qDj@cluster0.exewy.mongodb.net/puntoShein'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

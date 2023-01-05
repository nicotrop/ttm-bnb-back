import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HebergementsModule } from './hebergements/hebergements.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/tothemoun'),
    HebergementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

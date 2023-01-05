import { Module } from '@nestjs/common';
import { HebergementsService } from './hebergements.service';
import { HebergementsController } from './hebergements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hebergements, HebergementsSchema } from './hebergements.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hebergements.name, schema: HebergementsSchema },
    ]),
  ],
  controllers: [HebergementsController],
  providers: [HebergementsService],
  exports: [HebergementsService],
})
export class HebergementsModule {}

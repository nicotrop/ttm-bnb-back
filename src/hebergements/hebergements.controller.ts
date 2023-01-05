import { Body, Controller, Post } from '@nestjs/common';
import { HebergementsService } from './hebergements.service';
import { CreateHebergementsDto } from './dto/createHebergements.dto';

@Controller('hebergements')
export class HebergementsController {
  constructor(private readonly hebergementsService: HebergementsService) {}

  @Post('/create')
  async create(
    @Body() hebergement: CreateHebergementsDto,
  ): Promise<CreateHebergementsDto> {
    return this.hebergementsService.create(hebergement);
  }
}

import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { HebergementsService } from './hebergements.service';
import { CreateHebergementsDto } from './dto/createHebergements.dto';
import { Hebergements } from './hebergements.schema';
import { accessToken } from './dto/accessToken.dto';

@Controller('hebergements')
export class HebergementsController {
  constructor(private readonly hebergementsService: HebergementsService) {}

  @Post('/create')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'GET, POST')
  @Header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  async create(
    @Body() hebergement: CreateHebergementsDto,
  ): Promise<CreateHebergementsDto> {
    return this.hebergementsService.create(hebergement);
  }

  @Get('/get')
  async getAll(): Promise<Hebergements[]> {
    return this.hebergementsService.getAll();
  }

  @Get('/getID/:slug')
  async getBySlug(@Param() params: { slug: string }): Promise<Hebergements> {
    const { slug } = params;
    return this.hebergementsService.findbySlug(slug);
  }

  @Post('/login/:slug')
  async login(
    @Body() body: { password: string },
    @Param() params: { slug: string },
  ): Promise<accessToken> {
    const { slug } = params;
    const { password } = body;
    console.log(slug, password);
    return await this.hebergementsService.checkCode(slug, password);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { HebergementsController } from './hebergements.controller';
import { HebergementsService } from './hebergements.service';

describe('HebergementsController', () => {
  let controller: HebergementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HebergementsController],
      providers: [HebergementsService],
    }).compile();

    controller = module.get<HebergementsController>(HebergementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

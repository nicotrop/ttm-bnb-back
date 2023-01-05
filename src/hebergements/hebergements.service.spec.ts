import { Test, TestingModule } from '@nestjs/testing';
import { HebergementsService } from './hebergements.service';

describe('HebergementsService', () => {
  let service: HebergementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HebergementsService],
    }).compile();

    service = module.get<HebergementsService>(HebergementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

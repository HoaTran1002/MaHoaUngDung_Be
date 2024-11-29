import { Test, TestingModule } from '@nestjs/testing';
import { LopController } from './lop.controller';
import { LopService } from './lop.service';

describe('LopController', () => {
  let controller: LopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LopController],
      providers: [LopService],
    }).compile();

    controller = module.get<LopController>(LopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

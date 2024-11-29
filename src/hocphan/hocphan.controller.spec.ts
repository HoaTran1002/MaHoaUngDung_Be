import { Test, TestingModule } from '@nestjs/testing';
import { HocphanController } from './hocphan.controller';
import { HocphanService } from './hocphan.service';

describe('HocphanController', () => {
  let controller: HocphanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HocphanController],
      providers: [HocphanService],
    }).compile();

    controller = module.get<HocphanController>(HocphanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

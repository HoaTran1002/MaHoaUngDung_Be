import { Test, TestingModule } from '@nestjs/testing';
import { BangdiemController } from './bangdiem.controller';
import { BangdiemService } from './bangdiem.service';

describe('BangdiemController', () => {
  let controller: BangdiemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BangdiemController],
      providers: [BangdiemService],
    }).compile();

    controller = module.get<BangdiemController>(BangdiemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

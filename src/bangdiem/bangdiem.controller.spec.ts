import { Test, TestingModule } from '@nestjs/testing';
import { BangdiemController } from './bangdiem.controller';
import { BangDiemService } from './bangdiem.service';

describe('BangdiemController', () => {
  let controller: BangdiemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BangdiemController],
      providers: [BangDiemService],
    }).compile();

    controller = module.get<BangdiemController>(BangdiemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

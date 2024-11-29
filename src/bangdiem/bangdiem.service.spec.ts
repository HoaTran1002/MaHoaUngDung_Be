import { Test, TestingModule } from '@nestjs/testing';
import { BangdiemService } from './bangdiem.service';

describe('BangdiemService', () => {
  let service: BangdiemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BangdiemService],
    }).compile();

    service = module.get<BangdiemService>(BangdiemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

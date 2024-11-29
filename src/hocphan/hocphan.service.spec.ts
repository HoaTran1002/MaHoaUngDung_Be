import { Test, TestingModule } from '@nestjs/testing';
import { HocphanService } from './hocphan.service';

describe('HocphanService', () => {
  let service: HocphanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HocphanService],
    }).compile();

    service = module.get<HocphanService>(HocphanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

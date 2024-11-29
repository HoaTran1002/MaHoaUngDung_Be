import { Module } from '@nestjs/common';
import { HocphanService } from './hocphan.service';
import { HocphanController } from './hocphan.controller';
import { HocPhan } from './entities/hocphan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HocPhanRepository } from './repositories/hocphan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HocPhan])],
  controllers: [HocphanController],
  providers: [HocphanService, HocPhanRepository],
})
export class HocphanModule {}

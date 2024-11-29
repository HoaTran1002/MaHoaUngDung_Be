import { Module } from '@nestjs/common';
import { LopService } from './lop.service';
import { LopController } from './lop.controller';
import { LopRepository } from './repositories/lop.repository';
import { Lop } from './entities/Lop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Lop])],
  controllers: [LopController],
  providers: [LopService, LopRepository],
})
export class LopModule {}

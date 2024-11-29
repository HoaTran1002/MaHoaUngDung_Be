import { Module } from '@nestjs/common';
import { BangDiemService } from './bangdiem.service';
import { BangdiemController } from './bangdiem.controller';
import { BangDiemRepository } from './repositories/bangdiem.repository';
import { BangDiem } from './entities/bangdiem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BangDiem])],
  controllers: [BangdiemController],
  providers: [BangDiemService, BangDiemRepository],
})
export class BangdiemModule {}

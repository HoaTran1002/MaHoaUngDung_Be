import { Module } from '@nestjs/common';
import { SinhvienService } from './sinhvien.service';
import { SinhvienController } from './sinhvien.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SinhVien } from './entities/sinhvien.entity';
import { SinhVienRepository } from './repositories/sinhvien.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SinhVien])],
  controllers: [SinhvienController],
  providers: [SinhvienService, SinhVienRepository],
  exports: [SinhVienRepository, TypeOrmModule],
})
export class SinhvienModule {}

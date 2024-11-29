import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhanVienRepository } from './repositories/nhanvien.repository';
import { NhanVien } from './entities/nhanvien.entity';
import { NhanVienService } from './nhanvien.service';
import { NhanVienController } from './nhanvien.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NhanVien])],
  controllers: [NhanVienController],
  providers: [NhanVienRepository, NhanVienService],
  exports: [NhanVienRepository, TypeOrmModule],
})
export class NhanVienModule {}

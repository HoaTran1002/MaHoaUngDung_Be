import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SinhvienModule } from 'src/sinhvien/sinhvien.module';
import { NhanVienModule } from 'src/nhanvien/nhanvien.module';

@Module({
  imports: [SinhvienModule, NhanVienModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

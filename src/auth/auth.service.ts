import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NhanVien } from 'src/nhanvien/entities/nhanvien.entity';
import { SinhVien } from 'src/sinhvien/entities/sinhvien.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as _ from 'lodash'; // Import lodash

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SinhVien)
    private readonly sinhVienRepository: Repository<SinhVien>,
    @InjectRepository(NhanVien)
    private readonly nhanVienRepository: Repository<NhanVien>,
  ) {}

  // Hàm đăng nhập
  async login(createAuthDto: CreateAuthDto) {
    const { TENDN, MATKHAU } = createAuthDto;

    // Kiểm tra bảng SinhVien
    const sinhVien = await this.sinhVienRepository.findOne({
      where: { TENDN },
    });

    if (sinhVien) {
      const dbPassword = sinhVien.MATKHAU;

      const clientHashedPassword = Buffer.from(MATKHAU, 'hex');

      if (!_.isEqual(dbPassword, clientHashedPassword)) {
        throw new UnauthorizedException('Mật khẩu không chính xác');
      }

      return { user: 'SinhVien', data: sinhVien };
    }

    const nhanVien = await this.nhanVienRepository.findOne({
      where: { TENDN },
    });

    if (nhanVien) {
      const dbPassword = nhanVien.MATKHAU;

      const clientHashedPassword = Buffer.from(MATKHAU);

      if (!_.isEqual(dbPassword, clientHashedPassword)) {
        throw new UnauthorizedException('Mật khẩu không chính xác');
      }

      return { user: 'NhanVien', data: nhanVien };
    }

    throw new UnauthorizedException('Tên đăng nhập không tồn tại');
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SinhVien } from 'src/sinhvien/entities/sinhvien.entity';
import { NhanVien } from 'src/nhanvien/entities/nhanvien.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SinhVien)
    private readonly sinhVienRepository: Repository<SinhVien>,
    @InjectRepository(NhanVien)
    private readonly nhanVienRepository: Repository<NhanVien>,
  ) {}

  private hashPassword(password: string): Buffer {
    return crypto.createHash('sha1').update(password).digest();
  }

  private async findUserByUsername(TENDN: string) {
    const sinhVien = await this.sinhVienRepository.findOne({
      where: { TENDN },
    });
    if (sinhVien) return { user: 'SinhVien', data: sinhVien };

    const nhanVien = await this.nhanVienRepository.findOne({
      where: { TENDN },
    });
    if (nhanVien) return { user: 'NhanVien', data: nhanVien };

    return null;
  }

  async login(createAuthDto: CreateAuthDto) {
    const { TENDN, MATKHAU } = createAuthDto;

    const user = await this.findUserByUsername(TENDN);
    if (!user) {
      throw new UnauthorizedException('Tên đăng nhập không tồn tại');
    }

    const { user: userType, data } = user;

    const clientHashedPassword = this.hashPassword(MATKHAU);

    if (
      !(
        Buffer.from(data.MATKHAU, 'hex').toString('utf-8') ===
        clientHashedPassword.toString('utf-8')
      )
    ) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    return { user: userType, data };
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { NhanVien } from '../entities/nhanvien.entity';
import { CreateNhanVienDto } from '../dto/create-nhanvien.dto';

@Injectable()
export class NhanVienRepository extends Repository<NhanVien> {
  constructor(private readonly dataSource: DataSource) {
    super(NhanVien, dataSource.createEntityManager());
  }

  async addEmployee(nhanVien: Partial<CreateNhanVienDto>): Promise<NhanVien> {
    try {
      const newNhanVien = this.create(nhanVien);
      return await this.save(newNhanVien);
    } catch (error) {
      throw new Error(`Lỗi khi thêm nhân viên: ${error.message}`);
    }
  }

  async findByManv(MANV: string): Promise<NhanVien | null> {
    return await this.findOne({ where: { MANV } });
  }
}

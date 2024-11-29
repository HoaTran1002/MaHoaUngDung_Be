import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SinhVien } from '../entities/sinhvien.entity';
import { CreateSinhVienDto } from '../dto/create-sinhvien.dto';

@Injectable()
export class SinhVienRepository extends Repository<SinhVien> {
  constructor(private readonly dataSource: DataSource) {
    super(SinhVien, dataSource.createEntityManager());
  }

  async addSinhVien(SinhVien: Partial<CreateSinhVienDto>): Promise<SinhVien> {
    try {
      const newSinhVien = this.create(SinhVien);
      return await this.save(newSinhVien);
    } catch (error) {
      throw new Error(`Lỗi khi thêm sinh viên: ${error.message}`);
    }
  }

  async findByMASV(MASV: string): Promise<SinhVien | null> {
    return await this.findOne({ where: { MASV } });
  }
}

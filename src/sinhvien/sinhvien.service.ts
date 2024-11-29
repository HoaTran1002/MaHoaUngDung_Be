import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSinhVienDto } from './dto/create-sinhvien.dto';
import { UpdateSinhVienDto } from './dto/update-sinhvien.dto';
import { SinhVienRepository } from './repositories/sinhvien.repository';
import { SinhVien } from './entities/sinhvien.entity';

@Injectable()
export class SinhvienService {
  constructor(private readonly sinhVienRepository: SinhVienRepository) {}

  async createSinhVien(
    sinhvien: Partial<CreateSinhVienDto>,
  ): Promise<SinhVien> {
    return await this.sinhVienRepository.addSinhVien(sinhvien);
  }

  async findAll(): Promise<SinhVien[]> {
    return await this.sinhVienRepository.find({});
  }

  async getSinhVienByMASV(MASV: string): Promise<SinhVien | null> {
    return await this.sinhVienRepository.findByMASV(MASV);
  }

  async update(
    MASV: string,
    updateSinhVienDto: UpdateSinhVienDto,
  ): Promise<SinhVien> {
    // Tìm sinh viên theo MASV
    const sinhvien = await this.sinhVienRepository.findOne({ where: { MASV } });
    if (!sinhvien) {
      throw new NotFoundException(`Sinh vien with MASV ${MASV} not found.`);
    }

    // Cập nhật thông tin sinh viên
    Object.assign(sinhvien, updateSinhVienDto);
    return await this.sinhVienRepository.save(sinhvien);
  }

  async remove(MASV: string): Promise<void> {
    // Tìm sinh viên theo ID
    const sinhvien = await this.sinhVienRepository.findOne({ where: { MASV } });
    if (!sinhvien) {
      throw new NotFoundException(`Sinh vien with MASV ${MASV} not found.`);
    }

    // Xóa sinh viên
    await this.sinhVienRepository.remove(sinhvien);
  }
}

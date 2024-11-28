import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNhanVienDto } from './dto/create-nhanvien.dto';
import { NhanVienRepository } from './repositories/nhanvien.repository';
import { NhanVien } from './entities/nhanvien.entity';
import { UpdateNhanVienDto } from './dto/update-nhanvien.dto';

@Injectable()
export class NhanVienService {
  constructor(private readonly nhanVienRepository: NhanVienRepository) {}

  async createNhanVien(
    nhanVien: Partial<CreateNhanVienDto>,
  ): Promise<NhanVien> {
    return await this.nhanVienRepository.addEmployee(nhanVien);
  }

  async findAll(): Promise<NhanVien[]> {
    return await this.nhanVienRepository.find({});
  }

  async getNhanVienByManv(MANV: string): Promise<NhanVien | null> {
    return await this.nhanVienRepository.findByManv(MANV);
  }

  async update(
    MANV: string,
    updateNhanVienDto: UpdateNhanVienDto,
  ): Promise<NhanVien> {
    // Tìm nhân viên theo MANV
    const nhanVien = await this.nhanVienRepository.findOne({ where: { MANV } });
    if (!nhanVien) {
      throw new NotFoundException(`Employee with MANV ${MANV} not found.`);
    }

    // Cập nhật thông tin nhân viên
    Object.assign(nhanVien, updateNhanVienDto);
    return await this.nhanVienRepository.save(nhanVien);
  }

  async remove(MANV: string): Promise<void> {
    // Tìm nhân viên theo ID
    const nhanVien = await this.nhanVienRepository.findOne({ where: { MANV } });
    if (!nhanVien) {
      throw new NotFoundException(`Employee with MANV ${MANV} not found.`);
    }

    // Xóa nhân viên
    await this.nhanVienRepository.remove(nhanVien);
  }
}

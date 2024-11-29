import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHocPhanDto } from './dto/create-hocphan.dto';
import { UpdateHocphanDto } from './dto/update-hocphan.dto';
import { HocPhan } from './entities/hocphan.entity';
import { HocPhanRepository } from './repositories/hocphan.repository';

@Injectable()
export class HocphanService {
  constructor(private readonly hocPhanRepository: HocPhanRepository) {}

  async create(payload: Partial<CreateHocPhanDto>): Promise<HocPhan> {
    return await this.hocPhanRepository.addHocPhan(payload);
  }

  async findAll(): Promise<HocPhan[]> {
    return await this.hocPhanRepository.find({});
  }

  async getHocPhanByMAHP(MAHP: string): Promise<HocPhan | null> {
    return await this.hocPhanRepository.findByMAHP(MAHP);
  }

  async update(
    MAHP: string,
    updateLHocPhanDto: UpdateHocphanDto,
  ): Promise<HocPhan> {
    // Tìm học phần theo MAHP
    const hocphan = await this.hocPhanRepository.findOne({ where: { MAHP } });
    if (!hocphan) {
      throw new NotFoundException(`Hoc Phan with MAHP ${MAHP} not found.`);
    }

    // Cập nhật thông tin học phần
    Object.assign(hocphan, updateLHocPhanDto);
    return await this.hocPhanRepository.save(hocphan);
  }

  async remove(MAHP: string): Promise<void> {
    // Tìm học phần theo ID
    const hocphan = await this.hocPhanRepository.findOne({ where: { MAHP } });
    if (!hocphan) {
      throw new NotFoundException(`Employee with MAHP ${MAHP} not found.`);
    }

    // Xóa học phần
    await this.hocPhanRepository.remove(hocphan);
  }
}

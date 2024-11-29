import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLopDto } from './dto/create-lop.dto';
import { UpdateLopDto } from './dto/update-lop.dto';
import { LopRepository } from './repositories/lop.repository';
import { Lop } from './entities/Lop.entity';

@Injectable()
export class LopService {
  constructor(private readonly lopRepository: LopRepository) {}

  async create(payload: Partial<CreateLopDto>): Promise<Lop> {
    return await this.lopRepository.addLop(payload);
  }

  async findAll(): Promise<Lop[]> {
    return await this.lopRepository.find({});
  }

  async getLopByMALOP(MALOP: string): Promise<Lop | null> {
    return await this.lopRepository.findByMALOP(MALOP);
  }

  async update(MALOP: string, updateLopDto: UpdateLopDto): Promise<Lop> {
    // Tìm lớp theo MALOP
    const lop = await this.lopRepository.findOne({ where: { MALOP } });
    if (!lop) {
      throw new NotFoundException(`Lop with MALOP ${MALOP} not found.`);
    }

    // Cập nhật thông tin lớp
    Object.assign(lop, updateLopDto);
    return await this.lopRepository.save(lop);
  }

  async remove(MALOP: string): Promise<void> {
    // Tìm lớp theo ID
    const lop = await this.lopRepository.findOne({ where: { MALOP } });
    if (!lop) {
      throw new NotFoundException(`Employee with MALOP ${MALOP} not found.`);
    }

    // Xóa lớp
    await this.lopRepository.remove(lop);
  }
}

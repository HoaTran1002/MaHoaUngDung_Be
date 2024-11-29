import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBangDiemDto } from './dto/create-bangdiem.dto';
import { UpdateBangDiemDto } from './dto/update-bangdiem.dto';
import { BangDiemRepository } from './repositories/bangdiem.repository';

@Injectable()
export class BangDiemService {
  constructor(private readonly bangdiemRepository: BangDiemRepository) {}

  async create(createBangdiemDto: CreateBangDiemDto) {
    const bangDiem = this.bangdiemRepository.create(createBangdiemDto);
    return await this.bangdiemRepository.save(bangDiem);
  }

  async findAll() {
    return await this.bangdiemRepository.find();
  }

  async findOne(masv: string, mahp: string) {
    const bangDiem = await this.bangdiemRepository.findOne({
      where: { MASV: masv, MAHP: mahp },
    });
    if (!bangDiem) {
      throw new NotFoundException(
        `Bảng điểm không tồn tại cho MASV: ${masv} và MAHP: ${mahp}`,
      );
    }
    return bangDiem;
  }

  async update(
    masv: string,
    mahp: string,
    updateBangdiemDto: UpdateBangDiemDto,
  ) {
    const bangDiem = await this.findOne(masv, mahp);
    Object.assign(bangDiem, updateBangdiemDto);
    return await this.bangdiemRepository.save(bangDiem);
  }

  async remove(masv: string, mahp: string) {
    const bangDiem = await this.findOne(masv, mahp);
    return await this.bangdiemRepository.remove(bangDiem);
  }
}

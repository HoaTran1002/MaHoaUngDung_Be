import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { HocPhan } from '../entities/hocphan.entity';
import { CreateHocPhanDto } from '../dto/create-hocphan.dto';

@Injectable()
export class HocPhanRepository extends Repository<HocPhan> {
  constructor(private readonly dataSource: DataSource) {
    super(HocPhan, dataSource.createEntityManager());
  }

  async addHocPhan(HocPhan: Partial<CreateHocPhanDto>): Promise<HocPhan> {
    try {
      const newHocPhan = this.create(HocPhan);
      return await this.save(newHocPhan);
    } catch (error) {
      throw new Error(`Lỗi khi thêm HocPhan: ${error.message}`);
    }
  }

  async findByMAHP(MAHP: string): Promise<HocPhan | null> {
    return await this.findOne({ where: { MAHP } });
  }
}

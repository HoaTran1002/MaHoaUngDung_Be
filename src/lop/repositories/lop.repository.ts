import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Lop } from '../entities/Lop.entity';
import { CreateLopDto } from '../dto/create-Lop.dto';

@Injectable()
export class LopRepository extends Repository<Lop> {
  constructor(private readonly dataSource: DataSource) {
    super(Lop, dataSource.createEntityManager());
  }

  async addLop(Lop: Partial<CreateLopDto>): Promise<Lop> {
    try {
      const newLop = this.create(Lop);
      return await this.save(newLop);
    } catch (error) {
      throw new Error(`Lỗi khi thêm Lop: ${error.message}`);
    }
  }

  async findByMALOP(MALOP: string): Promise<Lop | null> {
    return await this.findOne({ where: { MALOP } });
  }
}

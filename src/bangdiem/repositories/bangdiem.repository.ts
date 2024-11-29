import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BangDiem } from '../entities/bangdiem.entity';

@Injectable()
export class BangDiemRepository extends Repository<BangDiem> {
  constructor(private readonly dataSource: DataSource) {
    super(BangDiem, dataSource.createEntityManager());
  }
}

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('HOCPHAN')
export class HocPhan {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  MAHP: string; // Mã học phần (khóa chính)

  @Column({ type: 'nvarchar', length: 100 })
  TENHP: string; // Tên học phần (bắt buộc)

  @Column({ type: 'int', nullable: true })
  SOTC?: number; // Số tín chỉ (có thể null)
}

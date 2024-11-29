import { NhanVien } from 'src/nhanvien/entities/nhanvien.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('LOP')
export class Lop {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  MALOP: string; // Mã lớp (khóa chính)

  @Column({ type: 'nvarchar', length: 100 })
  TENLOP: string; // Tên lớp

  @Column({ type: 'varchar', length: 20, nullable: true })
  MANV?: string; // Mã nhân viên (có thể null)

  @ManyToOne(() => NhanVien, (nhanVien) => nhanVien.MANV, { nullable: true })
  @JoinColumn({ name: 'MANV' }) // Tham chiếu tới cột MANV trong bảng NHANVIEN
  nhanVien?: NhanVien; // Liên kết với bảng NHANVIEN
}

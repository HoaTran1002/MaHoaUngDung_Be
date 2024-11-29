import { HocPhan } from 'src/hocphan/entities/hocphan.entity';
import { SinhVien } from 'src/sinhvien/entities/sinhvien.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('BANGDIEM')
export class BangDiem {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  MASV: string; // Mã sinh viên (khóa chính, liên kết với bảng SINHVIEN)

  @PrimaryColumn({ type: 'varchar', length: 20 })
  MAHP: string; // Mã học phần (khóa chính, liên kết với bảng HOCPHAN)

  @Column({ type: 'varbinary', length: 255, nullable: true })
  DIEMTHI?: string; // Điểm thi được mã hóa (có thể null)

  @ManyToOne(() => SinhVien, (sinhVien) => sinhVien.MASV, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'MASV' }) // Tham chiếu đến MASV trong bảng SINHVIEN
  sinhVien: SinhVien;

  @ManyToOne(() => HocPhan, (hocPhan) => hocPhan.MAHP, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'MAHP' }) // Tham chiếu đến MAHP trong bảng HOCPHAN
  hocPhan: HocPhan;
}

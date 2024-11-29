import { Lop } from 'src/lop/entities/Lop.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('SINHVIEN')
export class SinhVien {
  @PrimaryColumn({ type: 'nvarchar', length: 20 })
  MASV: string; // Mã sinh viên (khóa chính)

  @Column({ type: 'nvarchar', length: 100 })
  HOTEN: string; // Họ tên (bắt buộc)

  @Column({ type: 'datetime', nullable: true })
  NGAYSINH?: Date; // Ngày sinh (có thể null)

  @Column({ type: 'nvarchar', length: 200, nullable: true })
  DIACHI?: string; // Địa chỉ (có thể null)

  @Column({ type: 'varchar', length: 20 })
  MALOP: string; // Mã lớp (khóa ngoại)

  @Column({ type: 'nvarchar', length: 100 })
  TENDN: string; // Tên đăng nhập (bắt buộc)

  @Column({ type: 'varbinary', length: 255 })
  MATKHAU: string; // Mật khẩu đã mã hóa (SHA1)

  @ManyToOne(() => Lop, (lop) => lop.MALOP, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'MALOP' }) // Tham chiếu tới cột MALOP trong bảng LOP
  lop: Lop; // Liên kết với bảng LOP
}

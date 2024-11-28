import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('NHANVIEN')
export class NhanVien {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  MANV: string; // Mã nhân viên

  @Column({ type: 'nvarchar', length: 100 })
  HOTEN: string; // Họ tên

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  EMAIL?: string; // Email (có thể null)

  @Column({ type: 'varbinary', length: 255, nullable: true })
  LUONG?: Buffer; // Lương đã mã hóa RSA

  @Column({ type: 'nvarchar', length: 100 })
  TENDN: string; // Tên đăng nhập

  @Column({ type: 'varbinary', length: 255 })
  MATKHAU: Buffer; // Mật khẩu đã mã hóa SHA1

  @Column({ type: 'varchar', length: 255, nullable: true })
  PUBKEY?: string; // Khóa công khai
}

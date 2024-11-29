import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsDateString,
} from 'class-validator';

export class CreateSinhVienDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  MASV: string; // Mã sinh viên

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  HOTEN: string; // Họ tên

  @IsDateString()
  @IsOptional()
  NGAYSINH?: Date; // Ngày sinh (có thể null)

  @IsString()
  @IsOptional()
  @Length(1, 200)
  DIACHI?: string; // Địa chỉ (có thể null)

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  MALOP: string; // Mã lớp

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  TENDN: string; // Tên đăng nhập

  @IsNotEmpty()
  MATKHAU: Buffer; // Mật khẩu đã mã hóa
}

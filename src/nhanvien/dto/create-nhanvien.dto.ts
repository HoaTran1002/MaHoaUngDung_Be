import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsHexadecimal,
} from 'class-validator';

export class CreateNhanVienDto {
  @IsString()
  @IsNotEmpty()
  readonly MANV: string; // Mã nhân viên

  @IsString()
  @IsNotEmpty()
  readonly HOTEN: string; // Họ tên

  @IsEmail()
  @IsOptional()
  readonly EMAIL?: string; // Email (tùy chọn)

  @IsHexadecimal()
  @IsNotEmpty()
  readonly LUONG: string; // Lương đã mã hóa bằng RSA từ client

  @IsString()
  @IsNotEmpty()
  readonly TENDN: string; // Tên đăng nhập

  @IsHexadecimal()
  @IsNotEmpty()
  readonly MATKHAU: string; // Mật khẩu đã mã hóa SHA1 từ client

  @IsString()
  @IsNotEmpty()
  readonly PUBKEY: string; // Khóa công khai từ client
}
function Controller(
  arg0: string,
): (target: typeof CreateNhanVienDto) => void | typeof CreateNhanVienDto {
  throw new Error('Function not implemented.');
}

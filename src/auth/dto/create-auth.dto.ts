import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  TENDN: string; // Tên đăng nhập

  @IsString()
  @IsNotEmpty()
  MATKHAU: string; // Mật khẩu đã mã hóa SHA1
}

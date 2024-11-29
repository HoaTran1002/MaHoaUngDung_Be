import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateLopDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  MALOP: string; // Mã lớp

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  TENLOP: string; // Tên lớp

  @IsString()
  @IsOptional()
  @Length(1, 20)
  MANV?: string; // Mã nhân viên (có thể null)
}

export class UpdateLopDto {
  @IsString()
  @IsOptional()
  @Length(1, 100)
  TENLOP?: string; // Tên lớp (có thể cập nhật)

  @IsString()
  @IsOptional()
  @Length(1, 20)
  MANV?: string; // Mã nhân viên (có thể cập nhật)
}

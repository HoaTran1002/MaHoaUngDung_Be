import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  Length,
} from 'class-validator';

export class CreateHocPhanDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  MAHP: string; // Mã học phần

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  TENHP: string; // Tên học phần

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(10)
  SOTC?: number; // Số tín chỉ (có thể null)
}

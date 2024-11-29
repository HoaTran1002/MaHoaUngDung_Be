import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBangDiemDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  MASV: string; // Mã sinh viên

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  MAHP: string; // Mã học phần

  @IsNotEmpty()
  DIEMTHI: string; // Điểm thi đã mã hóa
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateBangDiemDto } from './create-bangdiem.dto';

export class UpdateBangDiemDto extends PartialType(CreateBangDiemDto) {}

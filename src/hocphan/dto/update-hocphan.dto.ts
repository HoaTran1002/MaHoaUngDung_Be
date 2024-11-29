import { PartialType } from '@nestjs/mapped-types';
import { CreateHocPhanDto } from './create-hocphan.dto';

export class UpdateHocphanDto extends PartialType(CreateHocPhanDto) {}

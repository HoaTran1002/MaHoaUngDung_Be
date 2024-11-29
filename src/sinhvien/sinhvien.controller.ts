import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SinhvienService } from './sinhvien.service';
import { CreateSinhVienDto } from './dto/create-sinhvien.dto';
import { UpdateSinhVienDto } from './dto/update-sinhvien.dto';

@Controller('sinhvien')
export class SinhvienController {
  constructor(private readonly sinhvienService: SinhvienService) {}

  @Post()
  create(@Body() createSinhvienDto: CreateSinhVienDto) {
    return this.sinhvienService.createSinhVien(createSinhvienDto);
  }

  @Get()
  findAll() {
    return this.sinhvienService.findAll();
  }

  @Get(':MASV')
  findOne(@Param('MASV') MASV: string) {
    return this.sinhvienService.getSinhVienByMASV(MASV);
  }

  @Patch(':MASV')
  update(
    @Param('MASV') MASV: string,
    @Body() updateSinhVienDto: UpdateSinhVienDto,
  ) {
    return this.sinhvienService.update(MASV, updateSinhVienDto);
  }

  @Delete(':MASV')
  remove(@Param('MASV') MASV: string) {
    return this.sinhvienService.remove(MASV);
  }
}

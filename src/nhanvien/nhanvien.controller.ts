import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NhanVienService } from './nhanvien.service';
import { CreateNhanVienDto } from './dto/create-nhanvien.dto';
import { UpdateNhanVienDto } from './dto/update-nhanvien.dto';

@Controller('nhanvien')
export class NhanVienController {
  constructor(private readonly nhanVienService: NhanVienService) {}

  @Post()
  create(@Body() createNhanVienDto: CreateNhanVienDto) {
    return this.nhanVienService.createNhanVien(createNhanVienDto);
  }

  @Get()
  findAll() {
    return this.nhanVienService.findAll();
  }

  @Get(':MANV')
  findOne(@Param('MANV') MANV: string) {
    return this.nhanVienService.getNhanVienByManv(MANV);
  }

  @Patch(':MANV')
  update(
    @Param('MANV') MANV: string,
    @Body() updateNhanVienDto: UpdateNhanVienDto,
  ) {
    return this.nhanVienService.update(MANV, updateNhanVienDto);
  }

  @Delete(':MANV')
  remove(@Param('MANV') MANV: string) {
    return this.nhanVienService.remove(MANV);
  }
}

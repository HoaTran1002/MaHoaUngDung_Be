import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BangDiemService } from './bangdiem.service';
import { CreateBangDiemDto } from './dto/create-bangdiem.dto';
import { UpdateBangDiemDto } from './dto/update-bangdiem.dto';

@Controller('bangdiem')
export class BangdiemController {
  constructor(private readonly bangdiemService: BangDiemService) {}

  @Post()
  create(@Body() createBangdiemDto: CreateBangDiemDto) {
    return this.bangdiemService.create(createBangdiemDto);
  }

  @Get()
  findAll() {
    return this.bangdiemService.findAll();
  }

  @Get(':masv/:mahp')
  findOne(@Param('masv') masv: string, @Param('mahp') mahp: string) {
    return this.bangdiemService.findOne(masv, mahp);
  }

  @Patch(':masv/:mahp')
  update(
    @Param('masv') masv: string,
    @Param('mahp') mahp: string,
    @Body() updateBangdiemDto: UpdateBangDiemDto,
  ) {
    return this.bangdiemService.update(masv, mahp, updateBangdiemDto);
  }

  @Delete(':masv/:mahp')
  remove(@Param('masv') masv: string, @Param('mahp') mahp: string) {
    return this.bangdiemService.remove(masv, mahp);
  }
}

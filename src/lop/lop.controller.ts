import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LopService } from './lop.service';
import { CreateLopDto } from './dto/create-lop.dto';
import { UpdateLopDto } from './dto/update-lop.dto';

@Controller('lop')
export class LopController {
  constructor(private readonly lopService: LopService) {}

  @Post()
  create(@Body() createLopDto: CreateLopDto) {
    return this.lopService.create(createLopDto);
  }

  @Get()
  findAll() {
    return this.lopService.findAll();
  }

  @Get(':MALOP')
  findOne(@Param('MALOP') MALOP: string) {
    return this.lopService.getLopByMALOP(MALOP);
  }

  @Patch(':MALOP')
  update(@Param('MALOP') MALOP: string, @Body() updateLopDto: UpdateLopDto) {
    return this.lopService.update(MALOP, updateLopDto);
  }

  @Delete(':MALOP')
  remove(@Param('MALOP') MALOP: string) {
    return this.lopService.remove(MALOP);
  }
}
